<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="flex flex-col max-w-md w-full items-center justify-center bg-gray-100">
      <h2 class="text-2xl font-semibold text-center text-gray-700 my-6">Sign Up</h2>

      <form class="mb-4" @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="fname" class="block text-sm font-medium text-gray-600">First Name</label>
          <input
            id="fname"
            v-model="fname"
            type="text"
            required
            placeholder="e.g , wafia"
            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
        </div>

        <div class="mb-4">
          <label for="lname" class="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            id="lname"
            v-model="lname"
            type="text"
            required
            placeholder="e.g , durrani"
            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="your@example.com"
            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input
            id="password"
            v-model="psw"
            type="password"
            required
            placeholder="*********"
            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
        </div>

        <div class="mb-4">
          <label for="confirm_password" class="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            id="confirm_password"
            v-model="cpsw"
            type="password"
            required
            placeholder="*********"
            class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
        </div>

        <p v-if="error" class="text-sm text-red-500 text-center mb-4">{{ error }}</p>

        <button
          type="submit"
          class="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const fname = ref('')
const lname = ref('')
const email = ref('')
const psw = ref('')
const cpsw = ref('')
const error = ref('')

const handleSignup = () => {
  if (psw.value !== cpsw.value) {
    error.value = 'Passwords do not match'
    return
  }

  error.value = ''
  // TODO: call your signup API here
}
</script>

<style scoped></style>
