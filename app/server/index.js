require('@babel/register');
require('@babel/polyfill');

require.extensions['.scss'] = () => {};
const express = require('express');
const axios = require('axios');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const favicon = require('serve-favicon');
const { getItem, getItemListing } = require('./services/item-service');
const template = require('./template');
const Home = require('../shared/components/pages/home');
const Search = require('../shared/components/pages/search');
const Vip = require('../shared/components/pages/vip');
const server = express();
const port = 3000;

server.use('/', express.static(path.join(__dirname, '../../build')));
server.use('/static', express.static(path.join(__dirname, '../static')));
server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));

server.get('/', (req, res) => {
  res.send(
    template(
      'home',
      ReactDOMServer.renderToString(React.createElement(Home, {}, null))
    )
  );
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

server.get('/items', (req, res) => {
  const query = req.query.search;
  const props = {};
  axios
    .get(`http://localhost:3000/api/items`, { params: { q: query } })
    .then(response => {
      props.items = response.data.items;
      res.send(
        template(
          'search',
          ReactDOMServer.renderToString(
            React.createElement(Search, { ...props }, null)
          )
        )
      );
    })
    .catch(e => console.error(e));
});

server.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  console.log(itemId);
  const props = {};
  axios
    .get(`http://localhost:3000/api/items/${itemId}`)
    .then(response => {
      props.itemData = response.data;
      res.send(
        template(
          'vip',
          ReactDOMServer.renderToString(
            React.createElement(Vip, { ...props }, null)
          )
        )
      );
    })
    .catch(e => console.error(e));
});

server.listen(port, () => console.log(`Server running on port ${port}!`));
