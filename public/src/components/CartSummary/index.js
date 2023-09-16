// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })

      return (
        <div className="summary-card">
          <h1 className="total-text">
            Order Total: <span className="total-cost">Rs {total}/-</span>
          </h1>
          <p className="cart-total-text">{cartList.length} Items in cart</p>
          <button type="button" className="check-out-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
