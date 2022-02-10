import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, bool } from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../assets/shopping-cart.png';

class ProductPage extends Component {
  state = {
    title: '',
    image: '',
    price: '',
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProduct(id);
    this.setState({ title: product.title,
      image: product.thumbnail,
      price: product.price });
  }

  render() {
    const { title, image, price } = this.state;
    return (
      <>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img src={ CartImage } alt="carrinho de compras" />
        </Link>
        <section>
          <h1 data-testid="product-detail-name">{title}</h1>
          <img src={ image } alt={ title } />
          <p>{price}</p>
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
};

export default ProductPage;
