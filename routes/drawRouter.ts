import express from "express";
import { secureMiddleware } from "../public/middleware/secureMiddleware";
import { ObjectId } from "mongodb";
import { drawCardFromDeck, getDecks, resetDeck, shuffleDeck } from "../public/db/database";


export function drawRouter(){
  const router = express.Router();

  router.get('/overview', secureMiddleware, async (req, res) => {
      const userId = new ObjectId(req.session.user?._id);
      const decks = await getDecks(userId);
      res.render('overview', {
          activePage: 'draw',
          decks
      });
  });

  router.post('/shuffle', secureMiddleware, async (req, res) => {
      const { deckId } = req.body;
      await shuffleDeck(new ObjectId(deckId));
      res.redirect('/overview');
  });

  router.post('/draw', secureMiddleware, async (req, res) => {
      const { deckId } = req.body;
      const result = await drawCardFromDeck(new ObjectId(deckId));
      if (!result) {
          res.json({ error: 'De decks zijn leeg, alle kaarten werden uitgehaald.' });
      } else {
          res.json(result);
      }
  });

  router.post('/reset', secureMiddleware, async (req, res) => {
      const { deckId } = req.body;
      const deck = await resetDeck(new ObjectId(deckId));
      res.json(deck);
  });

  return router;

}