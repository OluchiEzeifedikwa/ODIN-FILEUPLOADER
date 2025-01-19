const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require("node:path");
const app = express();
const PrismaSessionStore = require('./prisma-session-store');
const sessionStore = new PrismaSessionStore();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const upload = multer({ dest: './uploads/' });
const auth = require('./routes/auth');
// const fileRouter = require('./routes/fileRouter');
const folderRouter = require('./routes/folderRouter');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'jok',
    // store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
// app.use(fileRouter);
app.use(folderRouter);


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})


app.post('/signup', async(req, res) => {
  const {username, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10) 
  try {
    const user = await prisma.user.create({ data: {username, password: hashedPassword }});
    res.send(`User Created successfully: ${user.username}`);
  } catch (error) {
    res.status(500).send({message: 'Error Creating User'});
  }
});
  
app.post('/login', passport.authenticate('local', {
  successRedirect: '/upload',
  failureRedirect: '/login',
  
}));


const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server listening at ${PORT}`)
})




