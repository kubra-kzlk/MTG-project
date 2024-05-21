import { Collection, MongoClient, ObjectId } from "mongodb";
import { Card, CardsResponse } from "../interfaces/mgtcards";
import { User } from "../interfaces/user";
import * as bcrypt from 'bcrypt';
import _ from 'lodash'; // dit is een js library die ik heb gevonden die ons fetching en zetten van de data makkelijker maak naar de database, voor de cards in orde te brengen
import { Deck } from "../interfaces/deck";

export const MONGO_URI= process.env.MONGO_URI ?? "mongodb+srv://wpl:password_wpl@projectwpl.l2arpvq.mongodb.net/?retryWrites=true&w=majority&appName=projectwpl";
const client = new MongoClient(MONGO_URI)
const saltRounds: number = 10;

export const usersCollection: Collection<User> = client.db("projectwpl").collection<User>("wpl_users");
export const cardsCollection: Collection<Card> = client.db("projectwpl").collection<Card>("cards");
export const decksCollection: Collection<Deck> = client.db("projectwpl").collection<Deck>("decks");

export async function getDecks(userId: ObjectId) {
    return await decksCollection.find({ userId }).toArray();
}

export async function findDeckById(id: ObjectId): Promise<Deck | null> {
    return await decksCollection.findOne({ _id: id });
}

export async function createDeck(deckData: { name: string; imageUrl: string }, userId: ObjectId): Promise<Deck> {
    const newDeck: Deck = {
        _id: new ObjectId(),
        name: deckData.name,
        imageUrl: deckData.imageUrl,
        cards: {},
        totalCards: 0,
        userId: userId
    };
    await decksCollection.insertOne(newDeck);
    return newDeck;
}

export async function updateDeck(deckId: ObjectId, deckUpdate: { name?: string; imageUrl?: string }): Promise<void> {
    await decksCollection.updateOne({ _id: deckId }, { $set: deckUpdate });
}

export async function deleteDeck(deckId: ObjectId): Promise<void> {
    await decksCollection.deleteOne({ _id: deckId });
}

export async function addCardToDeck(deckId: ObjectId, cardId: string, card: Card, quantity: number): Promise<void> {
    const deck = await findDeckById(deckId);
    if (!deck) throw new Error('Deck not found');

    if (deck.totalCards + quantity > 60) throw new Error('Deck cannot have more than 60 cards');

    const cardInDeck = deck.cards[cardId];
    if (cardInDeck) {
        if (cardInDeck.quantity + quantity > 4) throw new Error('Cannot have more than 4 of the same card in a deck');
        cardInDeck.quantity += quantity;
    } else {
        deck.cards[cardId] = { card, quantity };
    }

    deck.totalCards += quantity;

    await decksCollection.updateOne({ _id: deckId }, { $set: { cards: deck.cards, totalCards: deck.totalCards } });
}

//behandeling van de kaarten: 
export async function getAllCards() {
    return await cardsCollection.find().toArray();
}
export async function getPageCard(page: number, cardsPerPage: number = 10) {
    const skippedCards = (page - 1) * cardsPerPage;
    return cardsCollection.find().skip(skippedCards).limit(cardsPerPage).toArray();
}



//login : 
export async function login(email: string, password: string) {
    if (email === "" || password === "") {
        throw new Error("Email and password zijn nodig");
    }
    let user : User | null = await usersCollection.findOne<User>({email: email});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            return user;
        } else {
            throw new Error("Password is faut");
        }
    } else {
        throw new Error("User is niet gevonden");
    }
}


//register :

export async function register(email: string, password: string) {
    if (email === "" || password === "") {
        throw new Error("Email and password required");
    }
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser: User = {
        email: email,
        password: hashedPassword,
    };
    
    const result = await usersCollection.insertOne(newUser);
    return result.insertedId;
}



export async function findUserByEmail(email: string): Promise<User | null> {
    return await usersCollection.findOne({ email });
}

export async function searchCards(query: string): Promise<Card[]> {
    return cardsCollection.find({ name: { $regex: query, $options: 'i' } }).toArray();
}
export async function findCardByName(name:string):Promise<Card | null>{
    return await cardsCollection.findOne({name})
}







export async function loadCardsFromApi() {
    const cards: Card[] = await getAllCards();
    if (cards.length === 0) {
        console.log('database is empty, loading users from api');
        const response = await fetch("https://api.magicthegathering.io/v1/cards");
        let arrayOfCards = await response.json() as CardsResponse;
        const cardsfilling: Card[] = arrayOfCards.cards.filter(card => card.imageUrl !== null)
            .map(card => _.pick(card, ['name', 'names', 'cmc', 'colors', 'type', 'rarity', 'text', 'artist', 'number', 'power', 'toughness', 'imageUrl'])) as Card[];
        const uniqueCards = _.unionBy(cardsfilling, 'name');

        await cardsCollection.insertMany(uniqueCards);
    }
}







//behandeling van de datbase connect - exit
async function exit() {
    try {
        await client.close();
        console.log('Disconnected from database');
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}
export async function connect() {
    try {
        await client.connect();
        await loadCardsFromApi();
        console.log("Connected to database");
        process.on('SIGINT', exit);
    } catch (error) { console.log('er is een error bij het inloggen: ' + error) }

}



