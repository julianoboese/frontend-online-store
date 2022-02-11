import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, bool, func } from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../assets/shopping-cart.png';

class ProductPage extends Component {
  state = {
    prod: {},
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
    this.setState({ prod: product,
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price });
  }

  render() {
    const { prod, id, title, image, price } = this.state;
    const { handleClick } = this.props;
    return (
      <>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img src={ CartImage } alt="carrinho de compras" />
        </Link>
        <section>
          <h1 data-testid="product-detail-name">{title}</h1>
          <img src={ image } alt={ title } />
          <p>{price}</p>
          <button
            type="button"
            id={ id }
            data-testid="product-detail-add-to-cart"
            onClick={ () => handleClick(prod) }
          >
            Adicionar ao carrinho
          </button>
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
