const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');

const Vip = props => {
  const serializeProps = { itemData: props.itemData };
  return (
    <div>
      <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true
        })};`}
      </Script>
      <h2>{props.itemData.item.title}</h2>
      <img src={props.itemData.item.picture} alt="" />
      <p>Esta es la vista de la vip</p>
    </div>
  );
};

module.exports = Vip;
