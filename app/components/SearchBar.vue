<template>
  <div class="flex justify-center mt-5 w-full ">
    
    <input
      v-model="model"
      type="search"
      placeholder="Search rings..."
      class="w-full max-w-lg h-10 border rounded-full px-4 bg-white 
             focus:outline-none focus:ring-2 focus:ring-black/60 transition"
    />
  </div>
</template>

<script setup>
const model = defineModel({ type: String, default: '' })
</script>
