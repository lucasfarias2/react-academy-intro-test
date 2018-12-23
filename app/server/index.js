const express = require('express');
const axios = require('axios');
const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World!');
});

const getDecimalsFromPrice = amount =>
  amount % 1 !== 0 ? parseInt(amount.toString().split('.')[1]) : 0;

server.get('/api/items', (req, res) => {
  const query = req.query.q;
  axios
    .get(`https://api.mercadolibre.com/sites/MLA/search`, {
      params: { q: query, limit: 4 }
    })
    .then(response => {
      const items = [];
      response.data.results.forEach((item) => {
        const currentItem = {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.trunc(item.price),
            decimals: getDecimalsFromPrice(item.price)
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
        }
        items.push(currentItem);
      })
      const listingDto = {
        author: { name: 'Lucas', lastname: 'Farías' },
        items,
      };
      res.json(listingDto);
    })
    .catch(error => {
      console.log(error);
    });
});

server.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  axios
    .get(`http://api.mercadolibre.com/items/${id}`)
    .then(response => {
      const itemDto = {
        author: { name: 'Lucas', lastname: 'Farías' },
        item: {
          id: response.data.id,
          title: response.data.title,
          price: {
            currency: response.data.currency_id,
            amount: Math.trunc(response.data.price),
            decimals: getDecimalsFromPrice(response.data.price)
          },
          picture: response.data.thumbnail,
          condition: response.data.condition,
          free_shipping: response.data.shipping.free_shipping,
          sold_quantity: response.data.sold_quantity,
          descripcion: 'Descripción'
        }
      };
      res.json(itemDto);
    })
    .catch(error => {
      console.log(error);
    });
});

server.listen(port, () => console.log(`Server running on port ${port}!`));
