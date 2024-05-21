import express, {  } from "express";
import dotenv from "dotenv";
import session from "./public/db/session";
import { connect, findCardByName } from './public/db/database'
import { loginRouter } from "./routes/loginRouter";
import { registerRouter } from "./routes/registerRouters";
import { secureMiddleware } from "./public/middleware/secureMiddleware";
import { deckRouter } from "./routes/deckRouter";
import { drawRouter } from "./routes/drawRouter";
import { mainRouter } from "./routes/mainRouter";
import { cardInfoRouter } from "./routes/cardInfoRouter";

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3000;  


app.set("view engine", "ejs");
app.set("port", port);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);


//Routing: 
app.use(loginRouter());
app.use(registerRouter());
app.use(deckRouter());
app.use(drawRouter());
app.use(mainRouter()); 
app.use(cardInfoRouter());
app.get("/", async (req, res) => {
  res.render("index")
})


app.get("/cardinfo", secureMiddleware,async (req, res) => {
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


app.listen(port, async() => {
  try {
      await connect();
      console.log("Server started on http://localhost:" + port);
  } catch (e) {
      console.log(e);
      process.exit(1); 
  }
});


