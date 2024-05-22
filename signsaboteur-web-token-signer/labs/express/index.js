const express = require('express');
const cookieSession = require('cookie-session')
const { v1: uuidv1} = require('uuid');

const app = express();
const PORT = process.env.PORT || 8000;
const secret_key = uuidv1();

// Dummy user data
const users = [
    { id: 1, username: "admin", password: secret_key },
    { id: 2, username: "test", password: "test"}
];

// Setup cookie-session
app.use(cookieSession({
    name: 'express',
    keys: [secret_key, 'magic'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/express/', (req, res) => {
  res.redirect('/');
});

app.get('/express/user', (req, res) => {
  const user = users.find(user => req.session.passport && req.session.passport.user === user.username);
  if (user) {
    return res.status(200).json({
      username: user.username,
      message: `Hello ${user.username}! Your password is ${user.password}.`
    })
  } else {
    res.status(401).json({
      message: "UNAUTHORIZED"
    })
  }
});

app.post('/express/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.passport = {user: user.username};
        return res.status(200).json({
          username: user.username,
          message: `Hello ${user.username}! Welcome back.`
        })
    } else {
        res.status(401).json({
          message: "UNAUTHORIZED"
        })
    }
});

app.get('/express/logout', (req, res) => {
    req.session = null;
    res.status(200).json({"message":"OK"})
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});