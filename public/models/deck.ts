import { ObjectId } from "mongodb";
import { Card } from "./mgtcards";

export interface Deck {
    _id: ObjectId;
    userId: string;
    name: string;
    cards: {
      [cardId: string]: {
        card: Card;
        quantity: number;
      };
    };
    imageUrl: string;
  }
  
  export interface DeckCreate {
    name: string;
    userId: string;
    imageUrl: string;
  }
  
  export interface DeckUpdate {
    name?: string;
    imageUrl?: string;
  }