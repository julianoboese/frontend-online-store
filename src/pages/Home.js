import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../assets/shopping-cart.png';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';

class Home extends Component {
  state={
    inputValue: '',
    selectedCatg: '',
    categories: [],
    prodList: [],
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChanges = ({ target }) => {
    const { value } = target;
    this.setState({ inputValue: value });
  }

  go = async (e) => {
    e.preventDefault();
    const { inputValue, selectedCatg } = this.state;
    const response = await getProductsFromCategoryAndQuery(selectedCatg, inputValue);
    const { results } = await response;
    this.setState({ prodList: results, inputValue: '' });
  };

  setCategory = async ({ target }) => {
    const { value } = target;
    this.setState({ selectedCatg: value });
    const response = await getProductsFromCategoryAndQuery(value);
    const { results } = await response;
    this.setState({ prodList: results });
  }

  render() {
    const { inputValue, categories, prodList } = this.state;
    const truth = prodList.length > 0;
    const warning = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
    const prods = (
      <section name="products">
        {prodList.map((prod) => (
          <Card
            key={ prod.id }
            id={ prod.id }
            title={ prod.title }
            image={ prod.thumbnail }
            price={ prod.price }
          />
        ))}
      </section>
    );
    return (
      <>
        <section className="categories">
          {categories.map((category) => (
            <label data-testid="category" key={ category.id } htmlFor={ category.id }>
              <input
                type="radio"
                name="category"
                value={ category.id }
                id={ category.id }
                onClick={ this.setCategory }
              />
              {category.name}
            </label>
          ))}
        </section>
        <section className="searches">
          <form>
            <label htmlFor="search">
              Produto
              <input
                id="search"
                data-testid="query-input"
                name="search"
                value={ inputValue }
                onChange={ this.handleChanges }
              />
            </label>

            <button
              type="submit"
              data-testid="query-button"
              onClick={ this.go }
            >
              Go!
            </button>
          </form>
          <Link data-testid="shopping-cart-button" to="/cart">
            <img src={ CartImage } alt="carrinho de compras" />
          </Link>
        </section>
        <section className="products">
          { truth ? prods : warning }
        </section>
      </>
    );
  }
}

export default Home;
