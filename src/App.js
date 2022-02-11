import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import { getProduct } from './services/api';

class App extends Component {
  state = {
    cartProducts: [],

  }

  handleClick = async ({ target }) => {
    const { id } = target;
    const product = await getProduct(id);
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, product],
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
              <Cart { ...props } cartProducts={ cartProducts } />
            ) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductPage { ...props } handleClick={ this.handleClick } />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
