
import { defineStore } from 'pinia'

type Product = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  category: string
}

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as Product[]
  }),

  // computed views of the data
  getters: {
    // total distinct items
    cartCount: (state) => state.cart.length,

    // total price = Σ price * quantity
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },

  // functions that change the data
  actions: {
    addToCart(product: Product) {
      const existingItem = this.cart.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        // trust the incoming shape, but ensure quantity at least 1
        this.cart.push({
          ...product,
          quantity: product.quantity || 1,
        })
      }

      localStorage.setItem('items', JSON.stringify(this.cart))
    },

    removeFromCart(id: number) {
      this.cart = this.cart.filter(item => item.id !== id)
      localStorage.setItem('items', JSON.stringify(this.cart))
    },

    // set an exact quantity
    updateQuantity(itemId: number, newQuantity: number) {
      const itemInCart = this.cart.find(item => item.id === itemId)
      if (!itemInCart) return

      if (newQuantity <= 0) {
        // optional: remove if <= 0
        this.removeFromCart(itemId)
      } else {
        itemInCart.quantity = newQuantity
      }

      localStorage.setItem('items', JSON.stringify(this.cart))
    },

    // decrease quantity by 1 (remove if reaches 0)
    decreaseQuantity(itemId: number) {
      const itemInCart = this.cart.find(item => item.id === itemId)
      if (!itemInCart) return

      if (itemInCart.quantity > 1) {
        itemInCart.quantity -= 1
      } else {
        this.removeFromCart(itemId)
      }

      localStorage.setItem('items', JSON.stringify(this.cart))
    },

    clearCart() {
      this.cart = []
      localStorage.removeItem('items')
    },

    loadToCart() {
      const savedItems = localStorage.getItem('items')
      if (savedItems) {
        this.cart = JSON.parse(savedItems)
      }
    },
    clearCartItem(itemID:number){
       const itemInCart = this.cart.find(item => item.id === itemID)
       if (!itemInCart) return
       this.removeFromCart(itemID)
    }
  }
})
