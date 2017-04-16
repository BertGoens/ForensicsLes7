const express = require('express');
const app = express();

const session = require('express-session')

const bodyParser = require('body-parser');
const postParser = bodyParser.urlencoded({ extended: false }); // POST requests

const db = require('./db/db');
const db_group = require('./db/group')

const path = require('path');

const BASE_URL = '/forensics';
const PORT = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**** Middleware ****/
app.use(session({
  secret: 'bertbertbert',
  resave: false,
  saveUninitialized: true
}))

/**** Routing ****/
app.get(BASE_URL + '/', function (req, res) {
  res.render('login.html');
});

app.post(BASE_URL + '/', postParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  // post: get group name
  let groupname = req.body.groupname;

  // save groupname in user var
  req.session.groupname = groupname;

  // db: create group name if not exists
  db_group.getByTeamName(groupname).then(function (group) {
    if (!group || group.length < 1)
      db_group.createTeamByName(groupname).catch((err) => { console.error(err)})
  }).catch((err) => {
    console.error('\n' + err + '\n');
  })

// url: send user to scoreboard
res.redirect(BASE_URL + '/scoreboard')
})

app.get(BASE_URL + '/scoreboard', function (req, res) {
  const group = req.session.groupname = groupname;
  // db lookup: all flags (count) for each group
})

app.post(BASE_URL + '/scoreboard', function (req, res) {
  const group = req.session.groupname = groupname;
  // if flag in db
  // if flag not duplicate
  // add flag
  // send response: FLAG FOUND!
})

app.get(BASE_URL + '/details', function (req, res) {
  // overzicht welke flags gevonden
})

app.get(BASE_URL + '/*', function (req, res) {
  res.send(404);
});

let httpServer = app.listen(PORT, (err) => {
  (err) ? console.log('APP NOT OK!') : console.log('APP OK √');
})

db.getConnection()
  .then((conn) => { console.log(`DB OK √`); })
  .catch((err) => { console.log('DB NOT OK!') });
