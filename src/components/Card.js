import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { prod, handleClick } = this.props;
    const { id, title, thumbnail, price } = prod;

    return (
      <div>
        <Link
          to={ { pathname: `/product/${id}`, state: { title, thumbnail, price } } }
          data-testid="product-detail-link"
        >
          <div data-testid="product">
            <p>{ title }</p>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
          </div>
        </Link>
        <button
          type="button"
          id={ id }
          data-testid="product-add-to-cart"
          onClick={ () => handleClick(prod) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}
Card.propTypes = {
  prod: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default Card;
