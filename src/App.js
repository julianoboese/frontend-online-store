import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Route exact path="/" component={ Home } />
      <Route exact path="/cart" component={ Cart } />
    </Router>
  );
}

export default App;
