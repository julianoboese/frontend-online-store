import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../assets/shopping-cart.png';
import { getCategories } from '../services/api';

class Home extends Component {
  render() {
    return (
      <>
        <section>
          {categories.map((category) => (
            <label data-testid="category" key={ category.id } htmlFor={ category.id }>
              <input
                type="radio"
                name="category"
                value={ category.id }
                id={ category.id }
              />
              {category.name}
            </label>
          ))}
        </section>
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
      </>
    );
  }
}

export default Home;
