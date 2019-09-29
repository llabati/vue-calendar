require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone')
moment.tz.setDefault('UTC')
const serialize = require('serialize-javascript')

app.use('/public', express.static(path.join(__dirname, 'public')));


let renderer
let contentMarker = '<!--APP-->'

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  if (renderer){
    renderer.renderToString({}, (err, html) => {
      if (err) console.log(err)
      else res.send(template)
      //else res.send(template.replace(contentMarker, `<script> var __INITIAL_STATE__ = ${serialize(__INITIAL_STATE__)}</script>`));
    })
  } else {
    //res.send('<p>Awaiting compilation...</p>')
    res.send(template)
    //res.send(template.replace(contentMarker, `<script> var __INITIAL_STATE__ = ${serialize(__INITIAL_STATE__)}</script>`));
  }

});

//__INITIAL_STATE__ = [ { description: "Week end", date: "2019-9-28T00:00:00.000Z"}]

let events = []
app.use(require('body-parser').json())
app.post('/add_event', (req, res) => {
  console.log('RECEIVED!')
  console.log('REQ BODY', req.body.description, req.body.date)
  events.push({
    description: req.body.description,
    date: req.body.date
    //date: moment(req.body.date._d)
    })
    //console.log('EVENTS AFTER PUSH IN THE SERVER', window.__INITIAL_STATE__)
  res.sendStatus(200)
})
//console.log('EVENTS NOW', window.__INITIAL_STATE__)

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(function(bundle){
    console.log('NODE BUNDLE BUILT')
    let renderer = require('vue-server-renderer').createBundleRenderer(bundle)
  });
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("opn")(`http://localhost:${process.env.PORT}`);
  }
});


