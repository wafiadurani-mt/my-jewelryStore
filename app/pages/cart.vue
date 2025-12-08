<template>
 <main class="min-h-screen bg-gray-50 py-10 px-4 md:px-10"> 

  <div class="max-w-6xl mx-auto">
    
    <div class="flex flex-col md:flex-row gap-10">

      <!-- LEFT: Cart Items -->
      <div class="flex-1">
        <h1 class="text-3xl font-bold text-white bg-black px-4 py-3 rounded-md sticky top-16 z-10">
          Your Basket
        </h1>

        <!-- Items List -->
        <ul
          v-if="cartItemsLength >= 1"
          class="flex flex-col gap-5 mt-5"
        >
          <li
            v-for="item in items"
            :key="item.id"
            class="border bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition"
          >
            
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <NuxtImg 
                class="w-[120px] h-[120px] object-contain border rounded-md"
                :src="item.image" 
                alt="Product Image"
              />
            </div>

            <!-- Product Info -->
            <div class="flex flex-col flex-1 justify-between">
              <div>
                <p class="text-lg font-semibold">{{ item.title }}</p>
                <p class="text-gray-600 mt-1"><strong>Price:</strong> ${{ item.price }}</p>
              </div>

              <!-- Quantity -->
              <div class="mt-3">
                <label class="font-medium">Qty:</label>
                <input
                  v-model="item.quantity"
                  type="number"
                  min="1"
                  class="border w-16 text-center ml-3 py-1 rounded"
                  @change="updateQuantity(item.id, item.quantity)"
                />
                <span v-if="isUpdatedQuantity[item.id]" class="text-green-800 ml-2">Updated</span>
              </div>
            </div>

            <!-- Remove Button -->
            <div class="flex items-start sm:items-end">
              <button
                class="border px-3 py-2 bg-black text-white rounded-md hover:bg-red-600 transition text-sm"
                @click="removeItem(item.id)"
              >
                Remove
              </button>
            </div>

          </li>
        </ul>

        <div v-else class="mt-10 text-gray-500">
          No items to display.
        </div>

      </div>

      <!-- RIGHT: Summary Section -->
      <div
        :class="[
          cartItemsLength >= 1 ? 'flex flex-col gap-5' : 'hidden',
          'w-full md:w-80 bg-white border rounded-lg shadow-sm p-6 h-fit sticky top-20'
        ]"
      >
        
        <h2 class="text-xl font-semibold">Order Summary</h2>

        <div class="space-y-2 mt-3 text-gray-700">
          <p><strong>Total Items:</strong> {{ cartItemsLength }}</p>
          <p><strong>Total Price:</strong> ${{ cartItemsPrice.toFixed(2) }}</p>
        </div>

        <div class="flex flex-col gap-3 mt-5">
          <!-- Continue Shopping -->
          <NuxtLink 
            to="/"
            class="bg-white text-center text-black border border-black py-2 rounded-md text-sm hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </NuxtLink>

          <!-- Checkout -->
          <NuxtLink 
            to="/checkout"
            class="bg-black text-center text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Checkout
          </NuxtLink>
        </div>

      </div>

    </div>
  </div>

 </main> 
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore'
// Get the cart store instance
const cartStore = useCartStore()
//items value check
const isUpdatedQuantity=reactive({})

// Reactive values from the cart store
/**  dont need to use cartStore.length everytime while accessing the store */
const { cartCount: cartItemsLength, cartTotal: cartItemsPrice, cart } = storeToRefs(cartStore)

const items = cart


// Method to remove an item from the cart
const removeItem = (itemId) => {
  cartStore.clearCartItem(itemId)
  
}
 const updateQuantity=(itemId,itemquantity)=>{
  if(itemquantity>=1){
    cartStore.updateQuantity(itemId,itemquantity)
    isUpdatedQuantity[itemId]=true
    setTimeout(()=>{
      isUpdatedQuantity[itemId]=false
    },1000)
    
  }
  else{
    cartStore.decreaseQuantity(itemId)
    isUpdatedQuantity[itemId]=true
    setTimeout(()=>{
      isUpdatedQuantity[itemId]=false
    },1000)
    
  }
  
 }




//Change is made here 
onMounted(()=>{
    cartStore.loadToCart()
})

</script>

<style scoped>
/* Ensure that button is clickable*/
button {
  pointer-events: auto;
}
</style>
