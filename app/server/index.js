const express = require('express');
const { getItem, getItemListing } = require('./services/item-service');
const template = require('./template');
const path = require('path');
const server = express();
const port = 3000;

server.use('/', express.static(path.join(__dirname, '../../build')));

server.get('/', (req, res) => {
  res.send(template('home'));
});

server.get('/api/items', (req, res) => {
  getItemListing(req.query.q)
    .then(response => res.json(response))
    .catch(err => res.sendStatus(500, err));
});

server.get('/api/items/:id', (req, res) => {
  getItem(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.sendStatus(500, err));
});

server.listen(port, () => console.log(`Server running on port ${port}!`));
