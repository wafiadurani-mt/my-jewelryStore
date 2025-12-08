<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <section class="bg-white max-w-lg w-full rounded-xl shadow-lg p-8 text-center">

      <!-- Emoji Icon -->
      <div class="text-6xl mb-4">⚠️</div>

      <!-- Main Heading -->
      <h1 class="text-2xl md:text-3xl font-semibold mb-2 text-red-600">
        Payment Cancelled
      </h1>

      <!-- Message -->
      <p class="text-gray-600 mb-6">
        Your payment was cancelled. If this was a mistake, you can try again anytime.
        Your items are still in your cart.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        
        <NuxtLink
          to="/checkout"
          class="inline-block px-4 py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-900 transition"
        >
          Try Again
        </NuxtLink>

        <NuxtLink
          to="/"
          class="inline-block px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Continue Shopping
        </NuxtLink>

      </div>

    </section>
  </main>
</template>
