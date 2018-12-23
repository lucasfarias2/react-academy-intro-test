const express = require('express');
const axios = require('axios');
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
  axios
    .get(`http://api.mercadolibre.com/items/${req.params.id}`)
    .then(response => {
      const itemDto = {
        author: { name: 'Lucas', lastname: 'Farías' },
        item: {
          id: response.data.id,
          title: response.data.title,
          price: {
            currency: response.data.currency_id,
            amount: response.data.price,
            decimals: 0
          },
          picture: response.data.permalink,
          condition: response.data.condition,
          free_shipping: response.data.shipping.free_shipping,
          sold_quantity: response.data.sold_quantity,
          descripcion: 'Descripcion'
        }
      };
      res.json(itemDto);
    })
    .catch(error => {
      console.log(error);
    });
});

server.listen(port, () => console.log(`Server running on port ${port}!`));
