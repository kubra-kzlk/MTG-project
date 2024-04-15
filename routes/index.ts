import express from "express";
import { Card, CardsResponse } from "../interfaces/mgtcards";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();

//view engine setup ==> niet aanraken
app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);

// app configuraties , nog bedenken
//niet aanraken
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));

//const api 

app.get("/", async (req, res) => {


    try {
        const response = await fetch("https://api.magicthegathering.io/v1/cards");
        const data: CardsResponse = await response.json();
        //const visibleCards = data.cards.filter(card => card.imageUrl);
        //res.render("index", { cards: visibleCards })
        res.render("landingpage");
    }
    catch (error) {
        console.error("Fetch error:", error);
        res.status(500).send("er is een error ergens fix het .");
    }
})

app.set("port", process.env.PORT || 3000);



app.listen(app.get("port"), () => console.log("[server] http://localhost:" + app.get("port")));