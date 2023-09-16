import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

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

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedData = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedData})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedData = cartList.map(eachItem => {
      if (id === eachItem.id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    this.setState({cartList: updatedData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    //   TODO: Update the code here to implement addCartItem
    const productObject = cartList.find(eachItem => eachItem.id === product.id)

    if (productObject) {
      const updatedData = cartList.map(eachItem => {
        if (productObject.id === eachItem.id) {
          const updatedQuantity = eachItem.quantity + product.quantity
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      })
      this.setState({cartList: updatedData})
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
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
    )
  }
}

export default App
