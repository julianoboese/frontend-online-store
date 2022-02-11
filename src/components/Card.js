import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { id, title, image, price, handleClick } = this.props;
    return (
      <div>
        <Link
          to={ { pathname: `/product/${id}`, state: { title, image, price } } }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <p>{ title }</p>
            <img src={ image } alt={ title } />
            <p>{ price }</p>
          </div>
        </Link>
        <button
          type="button"
          id={ id }
          data-testid="product-add-to-cart"
          onClick={ handleClick }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}
Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Card;
