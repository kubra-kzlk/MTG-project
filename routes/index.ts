import express, { Request, Response } from "express";
import { Card } from "../public/models/mgtcards";
import { connect, findUserByEmail, findUserByName, getAllCards, getPageCard, searchCards } from '../public/db/database'
import bcrypt from 'bcrypt';
import { register } from "../public/controllers/registerController";
import { login } from "../public/controllers/loginController";


const app = express();




app.set("view engine", "ejs");
app.set("port", 3000);

//ap use 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app Post: 
app.post("/register", register);
app.post("/login", login);


//app.get
app.get("/", async (req, res) => {
  res.render("index")
})
app.get('/login', (req, res) => {
  res.render('login', {
    emailIsAlreadryInUse : false,
    checkEmailandPassword : true,
    email: ''
  })
})

app.get("/register", (req: Request, res: Response) => {
  res.render('register', {
    userEmailExists: false,
    passwordLengthError: false,
    passwordMatchError: false,
    email : ''
  })
})

app.get("/cardinfo", async (req, res) => {
  const cardName = req.query.name as string;
  const card = await findUserByName(cardName);

  if (card == null) {
    res.render("cardinfo", {
      card: card
    })
  } else {
    res.render("404")
  }

})


app.get("/main", async (req, res) => {

  const searchedCards: string = typeof req.query.searchedCards === "string" ? req.query.searchedCards : "";

  let cards: Card[] = [];

  const page = parseInt(req.query.p as string) || 1;

  let totalPages: number = 0;
  // checken als iets word gezocht ! 
  if (searchedCards !== "") {
    const filteredCards = await searchCards(searchedCards);
    totalPages = Math.ceil(filteredCards.length / 9)
    cards = filteredCards.slice((page - 1) * 9, page * 9);
  }
  else {
    cards = await getPageCard(page)
    const totalCards: number = (await getAllCards()).length;
    totalPages = Math.ceil(totalCards / 9);
  }

  res.render("main", {
    activePage: 'home',
    cards: cards,
    currentPage: page,
    totalPages: totalPages,
    searchedCards: searchedCards
  })
})


app.get('/next', async (req, res) => {
  const page = parseInt(req.query.p as string) || 1;
  const nextPage = page + 1;
  const totalCards = (await getAllCards()).length;
  const cards = await getPageCard(nextPage);
  const totalPages = Math.ceil(totalCards / 9);
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
})



app.listen(app.get("port"), async () => {

  await connect();
  console.log("[server] http://localhost:" + app.get("port"))
});


app.get('/decklist', async (req, res) => {

  res.render('decklist', {
    activePage: 'deck'
  });
});


