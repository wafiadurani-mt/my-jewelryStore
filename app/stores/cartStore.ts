import { defineStore } from 'pinia'

type Product = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
  category:string
}

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as Product[]
  }),
 //computed views of the data
 /** Getters dont change the state they just compute values from it
  * API x
  * async x
  * actions x
  * state modifying logic
  */
  getters: {
    // total distinct items
    //Two methods to get the state of the
    /** cant call actions  */
    cartCount: (state) => state.cart.length,

    /** Gives the total of item price * quantity */
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
 //functions that change the data
 // getters can be accessed using this.gettername inside actions wheras vice versa isnt allowed
  actions: {
    addToCart(product: Product) {
      const existItem = this.cart.find(item => item.id === product.id)

      if (existItem) {
        existItem.quantity += 1
        localStorage.setItem('items',JSON.stringify(this.cart))
      } else {
        this.cart.push({ ...product, quantity: 1 })
        localStorage.setItem('items',JSON.stringify(this.cart))

        
      }
    },

    removeFromCart(id: number) {
      this.cart = this.cart.filter(item => item.id !== id)
      localStorage.setItem('items',JSON.stringify(this.cart))
    },

    // action to increase the quantity of the product
    updateQuantity(itemId: number,newQuantity:number) {
      const itemInCart = this.cart.find(item => item.id === itemId)
      if (itemInCart) {
        itemInCart.quantity=newQuantity
        localStorage.setItem('items',JSON.stringify(this.cart))
      }
    },

    // action to decrease the quantity of the product
    decreaseQuantity(itemId: number) {
      const itemInCart = this.cart.find(item => item.id === itemId)
      if (!itemInCart) return

      if (itemInCart.quantity > 1) {
        itemInCart.quantity -= 1
      } else {
        /** will update the cart with the new values */
        this.removeFromCart(itemId)
      }
    },
    clearCart(){
      this.cart=[];
      localStorage.removeItem('items')
    },
    loadToCart(){
      const saveItems=localStorage.getItem('items')
      if(saveItems) this.cart=JSON.parse(saveItems)
    }
  }
})
