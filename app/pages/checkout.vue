<template>
  <main class="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- LEFT: Customer Info -->
      <section class="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <h1 class="text-2xl font-semibold mb-4">Checkout</h1>

        <h2 class="text-lg font-semibold mb-3">Customer Information</h2>

        <form class="space-y-4" @submit.prevent>
          <!-- Name -->
          <div class="flex gap-10">
            <div class="w-full">
                <label class="inline-block text-sm font-medium mb-1" for="fname">
                First Name
                </label>
                <input
                id="fname"
                v-model="customer.firstName"
                type="text"
                class="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="e.g. wafia"
                >
                <p v-if="showErrors && !customer.firstName" class="text-xs text-red-500 mt-1">
                Name is required.
                </p>
            </div>
            <div class="w-full">
                <label class="inline-block text-sm font-medium mb-1" for="lname">
                Last Name
                </label>
                <input
                id="lname"
                v-model="customer.lastName"
                type="text"
                class="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="e.g. khan"
                >
                <p v-if="showErrors && !customer.lastName" class="text-xs text-red-500 mt-1">
                Name is required.
                </p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-1" for="email">
              Email
            </label>
            <input
              id="email"
              v-model="customer.email"
              type="email"
              class="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="e.g. you@example.com"
            >
            <p v-if="showErrors && !isValidEmail(customer.email)" class="text-xs text-red-500 mt-1">
              Please enter a valid email.
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium mb-1" for="phone">
              Phone
            </label>
            <input
              id="phone"
              v-model="customer.phone"
              type="tel"
              class="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="e.g. +92 300 1234567"
            >
            <p v-if="showErrors && !customer.phone" class="text-xs text-red-500 mt-1">
              Phone is required.
            </p>
          </div>
          <!-- Address -->
          <div>
            <label class="block text-sm font-medium mb-1" for="phone">
              Address
            </label>
            <input
              id="phone"
              v-model="customer.address"
              type="tel"
              class="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="e.g. home address"
            >
            <p v-if="showErrors && !customer.phone" class="text-xs text-red-500 mt-1">
              Address is required.
            </p>
          </div>
          <!-- add shipping + payment here -->

          
        </form>
      </section>

      <!-- RIGHT: Order Summary -->
      <aside class="bg-white p-6 rounded-lg shadow h-fit">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

        <!-- List of Items -->
        <div v-if="cartStore.cartCount > 0">
          <div
            v-for="item in cartStore.cart"
            :key="item.id"
            class="flex justify-between items-start border-b pb-3 mb-3"
          >
            <div>
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-sm text-gray-500">
                Qty: {{ item.quantity }} × ${{ item.price }}
              </p>
            </div>
            <p class="font-semibold">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>

        <p v-else class="text-gray-500 text-sm">
          Your cart is empty.
        </p>

        <!-- Totals -->
        <div v-if="cartStore.cartCount > 0" class="mt-4 space-y-2 text-sm border-t pt-4">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>

          <!-- Real values later -->
          <div class="flex justify-between text-gray-500">
            <span>Shipping (estimate)</span>
            <span>$0.00</span>
          </div>

          <div class="flex justify-between font-semibold text-lg pt-2 border-t mt-2">
            <span>Total</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>

          <button
            class="mt-4 w-full bg-black text-white py-2 rounded-md text-sm font-medium disabled:bg-gray-400 cursor-pointer"
            :disabled="cartStore.cartCount === 0 || !isFormValid"
            @click="handlePlaceOrder"
          >
            Place Order
          </button>

          <p v-if="showErrors && !isFormValid" class="text-xs text-red-500 mt-2">
            Please fill in your name, a valid email, and phone before placing the order.
          </p>
        </div>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useCartStore } from '~/stores/cartStore'

const cartStore = useCartStore()
cartStore.loadToCart()

// Customer info state
const customer = reactive({
  firstName: '',
  lastName:'',
  email: '',
  phone: '',
  address:''
})

const showErrors = ref(false)

const isValidEmail = (email) => {
  if (!email) return false
  // Super simple email check (good enough for frontend)
  return /\S+@\S+\.\S+/.test(email)
}

const isFormValid = computed(() => {
  return (
    customer.firstName.trim().length > 0 &&
    customer.lastName.trim().length >0 &&
    isValidEmail(customer.email) &&
    customer.phone.trim().length > 0 &&
    customer.address.trim().length >0
  )
})

const handlePlaceOrder = () => {
  showErrors.value = true

  if (!isFormValid.value) {
    // stop here, show validation errors
    return
  }
  alert("The order has been placed")
  cartStore.clearCart()
}
</script>
