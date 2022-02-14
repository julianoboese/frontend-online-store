import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    const { cartProducts, handleClick, handleDecrease, handleRemove } = this.props;

    const truth = cartProducts.length > 0;
    const warning = (
      <div>
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      </div>
    );

    const prods = (
      <section className="cart-products">
        {cartProducts.filter((prod, index, allCartProducts) => index === allCartProducts
          .indexOf(allCartProducts.find((item) => item.id === prod.id)))
          .sort((a, b) => b.price - a.price)
          .map((prod) => (
            <div key={ prod.id }>
              <p data-testid="shopping-cart-product-name">{ prod.title }</p>
              <p data-testid="shopping-cart-product-quantity">
                { cartProducts.filter(
                  (item) => (item.id === prod.id),
                ).length }
              </p>
              <p>{ prod.price }</p>
              <button
                type="button"
                id={ prod.id }
                data-testid="product-decrease-quantity"
                onClick={ () => handleDecrease(prod.id) }
              >
                -
              </button>
              <button
                type="button"
                id={ prod.id }
                data-testid="product-increase-quantity"
                onClick={ () => handleClick(prod) }
              >
                +
              </button>
              <button
                type="button"
                id={ prod.id }
                onClick={ () => handleRemove(prod.id) }
              >
                Remover
              </button>
            </div>
          ))}
      </section>
    );

    return (
      <>
        <section className="cart">
          { truth ? prods : warning }
        </section>
        <Link to="/checkout">
          <button type="button" data-testid="checkout-products">Checkout</button>
        </Link>
      </>
    );
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Cart;
