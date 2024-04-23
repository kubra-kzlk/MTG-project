import { Collection, Db, MongoClient } from "mongodb";
import { Card, CardsResponse } from "../interfaces/mgtcards";
import { fetchCards } from "../../routes/fetchCards";
import _ from 'lodash'; // dit is een js library die ik heb gevonden die ons fetching en zetten van de data makkelijker maak naar de database
const uri = "mongodb+srv://wpl:password_wpl@projectwpl.l2arpvq.mongodb.net/?retryWrites=true&w=majority&appName=projectwpl";
const client = new MongoClient(uri)

export const cardsCollection: Collection<Card> = client.db("projectwpl").collection<Card>("cards");


export async function getAllCards() {
    return await cardsCollection.find().toArray();
}

export async function getPageCard(params:number) {
    return cardsCollection.find().skip(params).limit(10).toArray();
}
async function exit() {
    try {
        await client.close();
        console.log('Disconnected from database');
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function loadCardsFromApi() {
    const cards : Card[] = await getAllCards();
    if (cards.length === 0){
      console.log('database is empty, loading users from api');
      const response = await fetch("https://api.magicthegathering.io/v1/cards");
      let arrayOfCards = await response.json() as CardsResponse;
      const cardsfilling : Card[] = arrayOfCards.cards.filter(card => card.imageUrl !== null)
        .map(card => _.pick(card, ['name', 'names', 'cmc', 'colors', 'type', 'rarity', 'text', 'artist', 'number', 'power', 'toughness', 'imageUrl'])) as Card[];
  
      // Remove duplicates from the `cardsfilling` array using the `_.unionBy()` method from Lodash
      const uniqueCards = _.unionBy(cardsfilling, 'name');
  
      await cardsCollection.insertMany(uniqueCards);
    }
  }
export async function connect() {
    try {
        await client.connect();
        await loadCardsFromApi();
        console.log("Connected to database");
        process.on('SIGINT', exit);

    } catch (error) { console.log('er is een error: ' + error) }
   
}



