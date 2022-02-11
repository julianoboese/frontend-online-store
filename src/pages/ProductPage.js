import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, bool, func } from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../assets/shopping-cart.png';

const number3 = 3;
const number4 = 4;
const number5 = 5;
const ratings = [1, 2, number3, number4, number5];

class ProductPage extends Component {
  state = {
    prod: {},
    id: '',
    title: '',
    image: '',
    price: '',
    email: '',
    rating: '',
    comment: '',
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const product = await getProduct(id);
    this.setState({ prod: product,
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price });
  }

  handleChanges = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  go = (e) => {
    e.preventDefault();
    const { id, email, rating, comment } = this.state;
    const comments = JSON.parse(localStorage.getItem(JSON.stringify(id))) || [];
    localStorage.setItem(JSON.stringify(id),
      JSON.stringify([...comments, { email, rating, comment }]));
    this.forceUpdate();
  };

  render() {
    const { prod, id, title, image, price } = this.state;
    const { handleClick } = this.props;
    const comments = id && JSON.parse(localStorage.getItem(JSON.stringify(id)));
    console.log(comments, id);

    return (
      <>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img src={ CartImage } alt="carrinho de compras" />
        </Link>
        <section className="productDetails">
          <h1 data-testid="product-detail-name">{title}</h1>
          <img src={ image } alt={ title } />
          <p>{price}</p>
          <button
            type="button"
            id={ id }
            name={ test }
            data-testid="product-detail-add-to-cart"
            onClick={ () => handleClick(prod) }
          >
            Adicionar ao carrinho
          </button>
        </section>
        <section>
          <form>
            <input
              type="email"
              data-testid="product-detail-email"
              name="email"
              onChange={ this.handleChanges }
            />
            <section>
              {ratings.map((item) => (
                <input
                  key={ item }
                  type="radio"
                  name="rating"
                  data-testid={ `${item}-rating` }
                  value={ item }
                  onChange={ this.handleChanges }
                />
              ))}
            </section>
            <label htmlFor="comment">
              <textarea
                id="comment"
                name="comment"
                data-testid="product-detail-evaluation"
                onChange={ this.handleChanges }
              />
            </label>
            <button type="submit" data-testid="submit-review-btn" onClick={ this.go }>
              Enviar
            </button>
          </form>
        </section>
        <section className="commentsList">
          {comments && comments.map((comment) => (
            <div key={ comment.email }>
              <p>
                { comment.email }
                <span>{ comment.rating }</span>
              </p>
              <p>{comment.comment}</p>
            </div>
          ))}
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
  handleClick: func.isRequired,
};

export default ProductPage;
