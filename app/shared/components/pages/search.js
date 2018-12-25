const React = require('react');
const serialize = require('serialize-javascript');
const Script = require('../helpers/script');
const Layout = require('../commons/layout');
const SvgChevron = require('../commons/svg-chevron');

const Search = props => {
  const serializeProps = { breadcrumb: props.breadcrumb, items: props.items };
  return (
    <div>
      <Script>
        {`window.ML_PRELOADED_STATE = ${serialize(serializeProps, {
          isJSON: true
        })};`}
      </Script>
      <Layout />
      <div className="search">
        <div className="item-list">
          <div className="item-list-left">
            <div className="item-list-breadcrumb__path">
              <ol>
                {props.breadcrumb.map(breadcrumbItem => (
                  <li key={breadcrumbItem.id}>
                    {breadcrumbItem.name}
                    <SvgChevron />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <section className="item-list-right">
            {props.items &&
              props.items.map(item => (
                <div key={item.id} className="item-list-item">
                  <a
                    href={`/items/${item.id}`}
                    className="item-list-item__picture"
                  >
                    <img src={item.picture} alt={item.title} />
                  </a>
                  <div className="item-list-item__container">
                    <a
                      href={`/items/${item.id}`}
                      className="item-list-item__container__title"
                    >
                      {item.title}
                    </a>
                    <div className="item-list-item__container__price">
                      {item.price.currency} ${item.price.amount}
                      {item.price.decimals > 0 && (
                        <sup>{item.price.decimals}</sup>
                      )}
                    </div>
                    {item.free_shipping && (
                      <div className="item-list-item__container__fs">
                        Envío gratis
                      </div>
                    )}
                    {item.condition !== 'new' && (
                      <div className="item-list-item__container__condition">
                        Usado
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

module.exports = Search;
