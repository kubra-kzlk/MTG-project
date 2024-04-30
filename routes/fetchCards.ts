import { Card, CardsResponse } from "../public/models/mgtcards";

export const fetchCards = async (): Promise<Card[]> => {
    try {
      const response = await fetch("https://api.magicthegathering.io/v1/cards");
      const arrayOfCards = await response.json() as CardsResponse;
      const uniqueCards = arrayOfCards.cards.filter((card, index, self) =>
        index === self.findIndex((c) => c.name === card.name)
      );
      const cards = uniqueCards.filter(card => card.imageUrl !== null) as Card[];
      return cards;
    } catch (error) {
      console.log('Error fetching cards from API: ' + error);
      return [];
    }
  };