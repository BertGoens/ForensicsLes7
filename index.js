require('dotenv-safe').load({
  sample: './.env'
})

const express = require('express');
const app = express();

const session = require('express-session')

const bodyParser = require('body-parser');
const postParser = bodyParser.urlencoded({ extended: false }); // POST requests

const db = require('./db/db');
const db_team = require('./db/team')
const db_flag = require('./db/flag')

const path = require('path');

const BASE_URL = '/forensics';

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/**** Middleware ****/
app.use(session({
  secret: process.env.SESSION_SECRET,
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
  db_team.getByTeamName(groupname).then(function (group) {
    if (!group || group.length < 1)
      db_team.createTeamByName(groupname).catch((err) => { console.error(err) })
  }).catch((err) => {
    console.error('\n' + err + '\n');
  })

  // url: send user to scoreboard
  res.redirect(BASE_URL + '/scoreboard')
})

app.get(BASE_URL + '/scoreboard', function (req, res) {
  const group = req.session.groupname = groupname;
  // db lookup: all flags (count) for each group

  // return
  // [team, flagcount, lastFlagFoundTime]
})

app.post(BASE_URL + '/scoreboard', function (req, res) {
  const team = req.session.groupname = groupname;

  // post: get flagname
  let flagname = req.body.flag;

  // check if flag exists
  db_flag.getFlagByName(flagname).then(function (flagRow) {
    if (flagRow.length > 0) {
      // Correct flag, add in database
      db_team.addFlagToTeam(team, flagname).then(() => {
        // Good job, send to scoreboard
        let scData = {
          scoreboard: ['team', 'flagcount', 'lastFlagFoundTime'],
          message: `Flag found, ${flagRow[points]}`
        };
        res.render('scoreboard.html', scoreboardData);
      }).catch((err) => {
        // Something went wrong (Duplicate flag?)
      })
    } else {
      // Wrong flag, pentalty!
    }
  })
})

app.get(BASE_URL + '/details', function (req, res) {
  // overzicht welke flags gevonden
})

app.get(BASE_URL + '/*', function (req, res) {
  res.send(404);
});

let httpServer = app.listen(process.env.PORT, (err) => {
  (err) ? console.log('APP NOT OK!') : console.log('APP OK √');
})

db.getConnection()
  .then((conn) => { console.log(`DB OK √`); })
  .catch((err) => { console.log('DB NOT OK!') });
