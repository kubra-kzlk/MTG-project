import express, { NextFunction, Request, Response } from "express";
import { Card } from "../public/models/mgtcards";
import { connect, createUser, findUserByEmail, getAllCards, getPageCard, usersCollection } from '../public/db/database'
import { NewUser, User } from "../public/models/user";
import bcrypt from 'bcrypt';


const app = express();
let emailIsAlreadryInUse = false;




app.set("view engine", "ejs");
app.set("port", 3000);

//ap use 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app Post: 


app.post("/register", async (req, res) => {
  const { username, email, password, "password-confirm": passwordConfirm } = req.body;

  const newUser: NewUser = { username, email, password, };

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.render('register', {
        userEmailExists: true
      });
      return;
    } else {
      await createUser(newUser);
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    emailIsAlreadryInUse = false;
    res.status(500).send("Error creating user.");
  }
  emailIsAlreadryInUse = false;

});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid password.");
  }
  res.redirect('/main')
}
);

//app.get
app.get("/", async (req, res) => {
  res.render("index")
})
app.get('/login', (req, res) => {
  emailIsAlreadryInUse = false;
  res.render('login')
})

app.get("/register", (req: Request, res: Response) => {
  res.render('register', {
    userEmailExists: emailIsAlreadryInUse
  })
})


app.get("/main", async (req, res) => {
  const page = parseInt(req.query.p as string) || 1;
  const totalCards = (await getAllCards()).length;
  const totalPages = Math.ceil(totalCards / 9);
  let cards: Card[] = await getPageCard(page);
  res.render("main", {
    cards: cards,
    currentPage: page,
    totalPages: totalPages,
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
  res.render('overview')
})



app.listen(app.get("port"), async () => {

  await connect();
  console.log("[server] http://localhost:" + app.get("port"))
});


app.get('/decklist', async (req, res) => {

  res.render('decklist', {

  });
});
