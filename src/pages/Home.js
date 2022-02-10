import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../assets/shopping-cart.png';

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
        <Link data-testid="shopping-cart-button" to="/cart">
          <img src={ CartImage } alt="carrinho de compras" />
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </section>
    );
  }
}

export default Home;
