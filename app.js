const express = require('express');
const path = require('path');

const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from the "public" directory (als je een 'public' map hebt)
app.use(express.static(path.join(__dirname, 'public')));

// Definieer routes voor elke pagina
app.get('/', (req, res) => {
  res.render('landingpage'); // De ejs-file voor je landing page
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/mainpage', (req, res) => {
  res.render('mainpage');
});

app.get('/cardinfopage', (req, res) => {
  res.render('cardinfopage');
});

app.get('/cardinfodetailpage', (req, res) => {
  res.render('cardinfodetailpage');
});

app.get('/deckpage', (req, res) => {
  res.render('deckpage');
});

app.get('/deckdetailpage', (req, res) => {
  res.render('deckdetailpage');
});

app.get('/detailpage', (req, res) => {
  res.render('detailpage');
});

// Zorg ervoor dat je voor elke unieke route een unieke view hebt.
// Als er meer pagina's zijn, ga door met het definiëren van routes op een vergelijkbare manier.

// Als je een 404 pagina hebt:
app.use((req, res, next) => {
  res.status(404).render('404'); // Zorg ervoor dat je een 404.ejs bestand hebt in je views map
});

// Start de server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
