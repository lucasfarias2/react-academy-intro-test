const express = require('express');
const { getItem, getItemListing } = require('./services/item-service');
const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World!');
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
