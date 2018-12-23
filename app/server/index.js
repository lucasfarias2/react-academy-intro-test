const express = require('express');
const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/api/items', (req, res) => {
  const query = req.query.q;
  console.log(req.query);
  res.send(`JSON de listado. Search term: ${query}`);
});

server.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  res.send(`JSON de item. ItemId: ${id}`);
});

server.listen(port, () => console.log(`Server running on port ${port}!`));
