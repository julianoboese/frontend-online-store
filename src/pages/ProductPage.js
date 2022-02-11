import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, bool, func } from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../assets/shopping-cart.png';

const number3 = 3;
const number4 = 4;
const number5 = 5;
const rating = [1, 2, number3, number4, number5];

class ProductPage extends Component {
  state = {
    id: '',
    title: '',
    image: '',
    price: '',

  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProduct(id);
    this.setState({ id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price });
  }

  handleChanges = ({ target }) => {
    const { value } = target;
    this.setState({ test: value });
  };

  go = () => {
  };

  render() {
    const { id, title, image, price, test } = this.state;
    const { handleClick } = this.props;
    return (
      <>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img src={ CartImage } alt="carrinho de compras" />
        </Link>
        <section className="productDetails">
          <h1 data-testid="product-detail-name">{title}</h1>
          <img src={ image } alt={ title } />
          <p>{price}</p>
          <button
            type="button"
            id={ id }
            name={ test }
            data-testid="product-detail-add-to-cart"
            onClick={ handleClick }
          >
            Adicionar ao carrinho
          </button>
        </section>
        <section>
          <form>
            <input
              type="email"
              data-testid="product-detail-email"
              name="email"
              onChange={ this.handlechanges }
            />
            <section>
              {rating.map((item) => (
                <input
                  key={ item }
                  type="radio"
                  name="rating"
                  data-testid={ `${item}-rating` }
                  value={ item }
                  onChange={ this.handlechanges }
                />
              ))}
            </section>
            <label htmlFor="comentary">
              <textarea
                id="comentary"
                data-testid="product-detail-evaluation"
                onChange={ this.handlechanges }
              />
            </label>
            <button type="submit" data-testid="submit-review-btn" onClick={ this.go }>
              Enviar
            </button>
          </form>
        </section>
      </>
    );
  }
}

ProductPage.propTypes = {
  match: shape({
    isExact: bool.isRequired,
    params: shape({
      id: string.isRequired,
    }).isRequired,
    path: string.isRequired,
    url: string.isRequired,
  }).isRequired,
  handleClick: func.isRequired,
};

export default ProductPage;
