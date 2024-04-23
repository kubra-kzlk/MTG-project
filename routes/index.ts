import express from "express";
import { Card } from "../public/interfaces/mgtcards";
import { fetchCards } from "./fetchCards";
import { connect, getAllCards, getPageCard } from '../public/db/database'
import path from "path";

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);

//ap use 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const api 

const cardsPerPage = 9;


app.get("/", async (req, res) => {
    res.render("index")
})

app.get("/main", async (req, res) => {

    const page = parseInt(req.query.p as string) || 1;

    const totalCards = (await getAllCards()).length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    let cards: Card[] = await getPageCard(page);
    res.render("main", {
        cards : cards,
        currentPage: page,
        totalPages: totalPages,
    })
})


app.get('/next', async (req, res) => {
    const page = parseInt(req.query.p as string) || 1;
    const nextPage = page + 1;
    const totalCards = (await getAllCards()).length;
    const cards = await getPageCard(nextPage);
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    res.render('main', {
      cards,
      currentPage: nextPage,
      totalPages: totalPages,
    });
  });


  app.get('/register' , (req, res)=>{

    res.render('register')
  })
  app.get('/overview' , (req, res)=>{

    res.render('overview')
  })

app.listen(app.get("port"), async () => {

    await connect();
    console.log("[server] http://localhost:" + app.get("port"))
});

