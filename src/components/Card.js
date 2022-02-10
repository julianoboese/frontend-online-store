import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { id, title, image, price } = this.props;
    return (
      <Link
        to={ { pathname: `/product/${id}`, state: { title, image, price } } }
        data-testid="product-detail-link"
      >
        <div>
          <p>{ title }</p>
          <img src={ image } alt={ title } />
          <p>{ price }</p>
        </div>
      </Link>
    );
  }
}
Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default Card;
