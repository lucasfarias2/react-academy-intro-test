const React = require('react');
require('./layout.scss');

class Layout extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input className="search-bar" placeholder="Ingresa tu busqueda..." />
          <button>Buscar</button>
        </form>
      </div>
    );
  }
}

module.exports = Layout;
