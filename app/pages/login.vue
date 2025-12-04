<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Login Form Container -->
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
          </div>

          <!-- Password -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="********"
              class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
          </div>

          <!-- Error Message (If any) -->
          <p v-if="error" class="text-sm text-red-500 text-center mb-4">{{ error }}</p>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Login
          </button>
        </form>

        <!-- Forgot Password and Sign Up Links -->
        <div class="mt-4 flex justify-between text-sm">
          <NuxtLink to="/forgot-password" class="text-blue-500 hover:underline">Forgot Password?</NuxtLink>
          <NuxtLink to="/signup" class="text-blue-500 hover:underline">Sign Up</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import Vue's reactive function
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = () => {
  // Placeholder for actual login logic
  if (email.value === 'test@example.com' && password.value === 'password') {
    // Redirect on successful login
    router.push('/')
  } else {
    error.value = 'Invalid email or password'
  }
}
</script>

<style scoped>
/* Custom Styles */
body {
  font-family: 'Inter', sans-serif;
}
</style>
