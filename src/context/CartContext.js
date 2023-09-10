import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  decrementQuantityInCart: () => {},
  incrementQuantityInCart: () => {},
  removeAll: () => {},
})

export default CartContext
