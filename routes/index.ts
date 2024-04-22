import express from "express";
import { Card } from "../public/interfaces/mgtcards";
import { fetchCards } from "./fetchCards";
import { connect, getAllCards, getPageCard } from '../public/db/database'
import path from "path";

const app = express();

//app sets 
app.set("view engine", "ejs");
app.set("port", 3000);

//ap use 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const api 


app.get("/", async (req, res) => {


    res.render("index")
})

app.get("/main", async (req, res) => {
    const page = req.query.p || 1; 
    const cardsPerPage = 9; 
    let cards: Card[] = await getPageCard((Number(page) * cardsPerPage));
    res.render("main", {
        cards : cards
    })
})






app.listen(app.get("port"), async () => {
    await connect();
    console.log("[server] http://localhost:" + app.get("port"))
});