import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isPresent = cartList.filter(eachItem => eachItem.id === product.id)

    if (isPresent.length > 0) {
      this.incrementQuantityInCart(product.id)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const tempList = cartList.filter(eachProduct => eachProduct.id !== id)
    this.setState({
      cartList: tempList,
    })
  }

  decrementQuantityInCart = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })

    this.setState({cartList: updatedCartList})
  }

  incrementQuantityInCart = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })

    this.setState({cartList: updatedCartList})
  }

  removeAll = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            decrementQuantityInCart: this.decrementQuantityInCart,
            incrementQuantityInCart: this.incrementQuantityInCart,
            removeAll: this.removeAll,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
