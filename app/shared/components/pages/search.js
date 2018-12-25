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
      {props.items &&
        props.items.map(item => (
          <h4 key={item.id}>
            <a href={`/items/${item.id}`}>{item.title}</a>
          </h4>
        ))}
    </div>
  );
};

module.exports = Search;
