<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <section class="bg-white max-w-xl w-full rounded-xl shadow-lg p-8 text-center">

      <!-- Success Emoji -->
      <div class="text-6xl mb-4">✅</div>

      <!-- Heading -->
      <h1 class="text-2xl md:text-3xl font-semibold mb-2">
        Order placed successfully!
      </h1>

      <!-- Message -->
      <p class="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      <!-- Order details box -->
      <div class="bg-gray-50 w-full border border-gray-200 rounded-lg p-4 text-left mb-6">
        <h2 class="text-sm font-semibold text-gray-700 mb-2">Order Summary</h2>

        <!-- Show loading state -->
        <p v-if="loading" class="text-sm text-gray-500">
          Loading your order details...
        </p>

        <!-- Show error if something went wrong -->
        <p v-else-if="error" class="text-sm text-red-500">
          {{ error }}
        </p>

        <!-- Show real order details when loaded -->
        <div v-else-if="session">
          <p class="text-sm text-gray-600">
            <span class="font-medium">Order ID:</span>
            <span class="ml-1">{{ session.id }}</span>
          </p>

          <p class="text-sm text-gray-600 mt-1">
            <span class="font-medium">Status:</span>
            <span class="ml-1 text-green-600 font-medium">
              {{ session.payment_status === 'paid' ? 'Paid' : session.payment_status }}
            </span>
          </p>

          <p class="text-sm text-gray-600 mt-1">
            <span class="font-medium">Email:</span>
            <span class="ml-1">
              {{ session.customer_details?.email || 'N/A' }}
            </span>
          </p>

          <p class="text-sm text-gray-600 mt-1">
            <span class="font-medium">Total:</span>
            <span class="ml-1">
              £{{ (session.amount_total / 100).toFixed(2) }}
            </span>
          </p>

          <div class="mt-3">
            <h3 class="text-sm font-semibold text-gray-700 mb-1">Items</h3>
            <ul class="text-sm text-gray-600 list-disc list-inside">
              <li
                v-for="item in session.line_items?.data || []"
                :key="item.id"
              >
                {{ item.description }} × {{ item.quantity }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <NuxtLink
          to="/"
          class="inline-block px-4 py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-900 transition"
        >
          Continue shopping
        </NuxtLink>
      </div>

    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cartStore'

const cart = useCartStore()
const route = useRoute()

const session = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  // Clear cart locally
  cart.clearCart()

  const sessionId = route.query.session_id

  if (!sessionId) {
    loading.value = false
    error.value = 'No session ID found in URL.'
    return
  }

  try {
    session.value = await $fetch('/api/session', {
      query: { session_id: sessionId }
    })
  } catch (err) {
    console.error(err)
    error.value = 'Could not load your order details.'
  } finally {
    loading.value = false
  }
})
</script>
