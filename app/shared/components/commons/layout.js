const React = require('react');
require('./layout.scss');

class Layout extends React.Component {
  constructor() {
    super();

    this.state = { searchTerm: '' };
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div>
        <form action="/items" method="get">
          <input
            onChange={this.handleSearchTermChange.bind(this)}
            className="search-bar"
            placeholder="Ingresa tu busqueda..."
          />
          <input type="hidden" value={this.state.searchTerm} name="search" />
          <button type="submit">Buscar</button>
        </form>
      </div>
    );
  }
}

module.exports = Layout;
