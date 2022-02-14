import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';

class App extends Component {
  state = {
    cartProducts: [],
  }

  handleClick = (product) => {
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
    }));
  }

  handleDecrease = (id) => {
    const { cartProducts } = this.state;
    cartProducts.splice(cartProducts
      .indexOf(cartProducts.find((item) => item.id === id)), 1);
    this.setState(() => ({
      cartProducts,
    }));
  }

  handleRemove = (id) => {
    this.setState((prevState) => ({
      cartProducts: prevState.cartProducts.filter((item) => item.id !== id),
    }));
  }

  render() {
    const { cartProducts } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home { ...props } handleClick={ this.handleClick } />
            ) }
          />
          <Route
            exact
            path="/cart"
            render={ (props) => (
              <Cart
                { ...props }
                cartProducts={ cartProducts }
                handleClick={ this.handleClick }
                handleDecrease={ this.handleDecrease }
                handleRemove={ this.handleRemove }
              />
            ) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductPage { ...props } handleClick={ this.handleClick } />
            ) }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
                cartProducts={ cartProducts }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
