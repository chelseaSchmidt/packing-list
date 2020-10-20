const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { ItemBank, List } = require('../database/model.js');
require('../database/index.js');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, '..', 'client', 'public');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(publicDir));

app.post('/item-bank', (req, res) => {
  ItemBank.create({
    name: 'Item Bank',
    items: [],
  })
    .then((mRes) => {
      console.log(mRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/item-bank', (req, res) => {
  ItemBank.deleteOne({})
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.post('/item', (req, res) => {
  ItemBank.updateOne({}, { $push: { items: req.body } })
    .then((mRes) => {
      console.log(mRes);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.patch('/list', (req, res) => {

});

app.get('/item-bank', (req, res) => {
  ItemBank.findOne({})
    .then((doc) => {
      res.status(200);
      res.send(doc);
    })
    .catch(() => res.sendStatus(500));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
