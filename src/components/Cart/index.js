import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAll} = value
      const showEmptyView = cartList.length === 0

      const emptyCart = () => {
        removeAll()
      }

      const totalBill = () =>
        cartList.reduce((total, item) => total + item.price * item.quantity, 0)

      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="heading-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    onClick={emptyCart}
                    className="remove-buttons"
                  >
                    Remove all
                  </button>
                </div>
                <CartListView />

                <div className="bill-container">
                  <h3 className="para">TotalBill</h3>
                  <p className="para">Order Total:</p>
                  <h3 className="para">Rs: {totalBill()}/-</h3>
                  <button type="button" className="checkout-button">
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
