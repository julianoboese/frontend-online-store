import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../assets/shopping-cart.png';
import { getCategories } from '../services/api';


class Home extends Component {
  state={
    categories: [],
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;

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
