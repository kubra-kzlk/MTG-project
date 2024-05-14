import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { Card, CardsResponse } from "../models/mgtcards";
import { NewUser, User } from "../models/user";
import * as bcrypt from 'bcrypt';
import _ from 'lodash'; // dit is een js library die ik heb gevonden die ons fetching en zetten van de data makkelijker maak naar de database
import { Deck, DeckCreate } from "../models/deck";

const uri = "mongodb+srv://wpl:password_wpl@projectwpl.l2arpvq.mongodb.net/?retryWrites=true&w=majority&appName=projectwpl";
const client = new MongoClient(uri)


export const usersCollection: Collection<User> = client.db("projectwpl").collection<User>("users");
export const cardsCollection: Collection<Card> = client.db("projectwpl").collection<Card>("cards");
export const decksCollection: Collection<Deck> = client.db("projectwpl").collection<Deck>("decks");



export async function getDecks(){
    return await decksCollection.find().toArray();
}

export async function findDeckById(id: string): Promise<Deck | null> {
    return await decksCollection.findOne({ id });;
  }
export async function createDeck(deckData: DeckCreate, userId :string): Promise<Deck> {
    const newDeck: Deck = {
        _id: new ObjectId().toString(),
        name: deckData.name,
        imageUrl: deckData.imageUrl,
        cards: {},
        userId: ""
    };
    await decksCollection.insertOne(newDeck);
    return newDeck;
  }

//behandeling van de kaarten: 
export async function getAllCards() {
    return await cardsCollection.find().toArray();
}
export async function getPageCard(page: number, cardsPerPage: number = 10) {
    const skippedCards = (page - 1) * cardsPerPage;
    return cardsCollection.find().skip(skippedCards).limit(cardsPerPage).toArray();
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


export async function createUser(newUser: NewUser): Promise<User> {
    const existingUser = await findUserByEmail(newUser.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
  
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const result =await client.db("projectwpl").collection("users").insertOne(newUser)
    const createdUser = {...newUser, _id: result.insertedId.toString() };
    console.log("User created!");
    return createdUser;
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

export async function findUserByName(name: string): Promise<User | null> {
    return await usersCollection.findOne({ name });
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



