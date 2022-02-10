import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { cartProducts } = this.props;

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
        {cartProducts.filter((prod, index) => index === cartProducts
          .indexOf(cartProducts.find((item) => item.id === prod.id)))
          .map((prod) => (
            <div key={ prod.id }>
              <p data-testid="shopping-cart-product-name">{ prod.title }</p>
              <p data-testid="shopping-cart-product-quantity">
                { cartProducts.filter(
                  (item) => (item.id === prod.id),
                ).length }
              </p>
            </div>
          ))}
      </section>
    );

    return (
      <section className="cart">
        { truth ? prods : warning }
      </section>
    );
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Cart;
