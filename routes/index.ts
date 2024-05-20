import express, { Request, Response } from "express";
import { Card } from "../public/models/mgtcards";
import { connect, createDeck, decksCollection, findCardByName, findDeckById, findUserByEmail, createUser, findUserByName, getAllCards, getPageCard, searchCards } from '../public/db/database'
import { register } from "../public/controllers/registerController";
import { login } from "../public/controllers/loginController";
import { Deck, DeckCreate, DeckUpdate } from "../public/models/deck";


const app = express();
const cardperpage = 10

app.set("view engine", "ejs");
app.set("port", 3000);

//ap use 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index")
})

app.get('/register', async (req: Request, res: Response) => {
  res.render('register', {
    email: '',
    password: '',
    passwordConfirm: '',
    userEmailExists: false,
    passwordLengthError: false,
    passwordMatchError: false
  });
});

app.post('/register', async (req: Request, res: Response) => {
  const { email, password, passwordConfirm } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.render('register', {
        email,
        password,
        passwordConfirm,
        userEmailExists: true,
        passwordLengthError: false,
        passwordMatchError: false
      });
    }
    await createUser({ email, password });
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).render('error', { message: 'Er is een probleem, gelieve opnieuw te proberen.' });
  }
});


app.get('/login', (req, res) => {
  res.render('login', {
    emailIsAlreadryInUse: false,
    checkEmailandPassword: true,
    email: '',
    password: ''
  })
})

app.post('/login', async (req, res) => {
  const email = req.body.email as string;
  const password = req.body.password as string;

  try {
    const user = await findUserByEmail(email);
    if (user) {
      if (user.password === password) {
        res.status(200).redirect('/mainpage');
      } else {
        res.status(401).redirect('/login?error=invalidCredentials');
      }
    } else {
      res.status(404).redirect('/login?error=userNotFound');
    }
  } catch (error) {
    res.status(500).redirect('/login?error=serverError');
  }
});


app.post('/decklist', async (req: Request, res: Response) => {
  try {
    const deckData: DeckCreate = req.body;
    const userId: string = "";
    await createDeck(deckData, userId);
    res.status(201).send({ success: true, message: 'Deck created' }); //de res status laten !! is voor javascript
    console.log('creatie werkte ')
    return;
  } catch (error) {
    console.error('Error creating deck:', error);
    res.status(500).send({ success: false, message: 'Error creating deck' });
  }
});

app.get('/decklist', async (req: Request, res: Response) => {
  try {
    const userId: string = "";
    const decks = await decksCollection.find({ userId }).toArray();
    res.render('decklist', { activePage: 'decklist', decks });
  } catch (error) {
    console.error('Error retrieving decks:', error);
    res.status(500).send({ success: false, message: 'Error retrieving decks' });
  }
});

app.get("/deckdetail", async (req, res) => {
  const deckId = req.query._id as string;
  const deck = await findDeckById(deckId);

  if (deck) {
    console.log("data is goed in deckdetail")
    console.log(deck)
    res.render("deckdetail", { activePage: 'deckdetail', deck: deck });
  } else {
    res.render("404");
  }
})

app.get("/cardinfo", async (req, res) => {
  const cardName = req.query.name as string;
  const pagelocated = parseInt(req.query.p as string)
  const searchedCards: string = typeof req.query.searchedCards === "string" ? req.query.searchedCards : "";
  const card = await findCardByName(cardName);

  if (card) {
    res.render("cardinfo", {
      activePage: 'cardinfo',
      card: card,
      p: pagelocated,
      searchedCards: searchedCards
    })
  } else {
    res.render("404")
  }

})

function getRarityClass(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common':
      return 'common-border';
    case 'uncommon':
      return 'uncommon-border';
    case 'rare':
      return 'rare-border';
    case 'mythic rare':
      return 'mythic-border';
    default:
      return '';
  }
}

app.get("/main", async (req, res) => {
  const searchedCards: string = typeof req.query.searchedCards === "string" ? req.query.searchedCards : "";
  let cards: Card[] = [];
  const page = parseInt(req.query.p as string) || 1;
  let totalPages: number = 0;
  // checken als iets word gezocht ! 
  if (searchedCards !== "") {
    const filteredCards = await searchCards(searchedCards);
    totalPages = Math.ceil(filteredCards.length / cardperpage)
    cards = filteredCards.slice((page - 1) * cardperpage, page * cardperpage);
  }
  else {
    cards = await getPageCard(page, cardperpage);
    const totalCards: number = (await getAllCards()).length;
    totalPages = Math.ceil(totalCards / cardperpage);
  }

  res.render("main", {
    activePage: 'home',
    cards: cards,
    currentPage: page,
    totalPages: totalPages,
    searchedCards: searchedCards, 
    getRarityClass: getRarityClass
  })
})

app.get('/next', async (req, res) => {
  const page = parseInt(req.query.p as string) || 1;
  const nextPage = page + 1;
  const totalCards = (await getAllCards()).length;
  const cards = await getPageCard(nextPage, cardperpage);
  const totalPages = Math.ceil(totalCards / cardperpage);
  res.render('main', {
    cards,
    currentPage: nextPage,
    totalPages: totalPages,
  });
});

app.get('/overview', (req, res) => {
  res.render('overview', {
    activePage: 'draw'
  })
});

app.listen(app.get("port"), async () => {

  await connect();
  console.log("[server] http://localhost:" + app.get("port"))
});



