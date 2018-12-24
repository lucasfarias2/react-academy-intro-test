const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');

const Search = props => {
  const serializeProps = { items: props.items };
  return (
    <div>
      <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true
        })};`}
      </Script>
      <h2>Search page</h2>

      {props.items.map(item => (
        <h4 key={item.id}>{item.title}</h4>
      ))}
      <p>Esta es la vista de la search</p>
    </div>
  );
};

module.exports = Search;
