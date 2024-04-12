const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('landingpage'); 
});

app.get('/login', (req, res) => {
  res.render('login ');
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




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
