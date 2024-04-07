import express from "express";
import { Card , CardsResponse} from "../interfaces/mgtcards";
const app = express();


//view engine setup ==> niet aanraken
app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);

// app configuraties , nog bedenken

app.use(express.static("public"));

interface pokeapi{
    id :number ;
    name : string;
    weight : number;
    sprites : sprites;
}

interface sprites{
    front_default : string;
    back_default :string;
};


app.get("/", async(req, res)=>{


    try{
        const response = await fetch("https://api.magicthegathering.io/v1/cards");
        const data : CardsResponse = await response.json();
        const visibleCards = data.cards.filter(card => card.imageUrl);
        res.render("index", {cards :visibleCards})
    }
    catch (error) {
        console.error("Fetch error:", error);
        res.status(500).send("er is een error ergens fix het .");
    }
})



app.listen(app.get("port"), ()=>console.log( "[server] http://localhost:" + app.get("port")));