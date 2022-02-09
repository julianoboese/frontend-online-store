import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <section>
        <form>
          <label htmlFor="search">
            Produto
            <input id="search" />
          </label>
        </form>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </section>
    );
  }
}
export default Home;
