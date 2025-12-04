<template>
  <div>
    
    <div class="container mx-auto px-4">
      <div class="hidden md:flex justify-around bg-black text-white text-sm">
        <p>Free domestic order</p>
        <p>Book Virtual Appointment</p>
        <p>Customise Order</p>
        <p>Easy Payment</p>
      </div>
      <MyHeader />
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import MyHeader from '~/components/MyHeader.vue';
</script>

<style scoped>
/* You can adjust max-width if you want more control */
.container {
  max-width: 1600px; 
  margin-left: auto;
  margin-right: auto;
}
</style>
