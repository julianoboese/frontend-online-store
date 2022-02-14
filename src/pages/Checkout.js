import React from 'react';
import PropTypes from 'prop-types';

function Checkout(props) {
  const { cartProducts } = props;

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
          </div>
        ))}
      <p>
        Total:
        <span>
          {'R$ '}
          {cartProducts.reduce((acc, prod) => acc + prod.price, 0)}
        </span>
      </p>
    </section>
  );

  return (
    <>
      <section className="cart">
        { truth ? prods : warning }
      </section>
      <section className="user-data">
        <form>
          <label htmlFor="name">
            Nome completo
            <input type="text" name="name" id="name" data-testid="checkout-fullname" />
          </label>
          <label htmlFor="email">
            Email
            <input type="email" name="email" id="email" data-testid="checkout-email" />
          </label>
          <label htmlFor="cpf">
            CPF
            <input type="text" name="cpf" id="cpf" data-testid="checkout-cpf" />
          </label>
          <label htmlFor="phone">
            Telefone
            <input type="tel" name="phone" id="phone" data-testid="checkout-phone" />
          </label>
          <label htmlFor="cep">
            CEP
            <input type="text" name="cep" id="cep" data-testid="checkout-cep" />
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              name="address"
              id="address"
              data-testid="checkout-address"
            />
          </label>
        </form>
      </section>
    </>
  );
}

Checkout.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Checkout;
