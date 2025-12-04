<template>
  <main id="main-content">
    <!-- Hero / Banner -->
    <section id="hero">
      <MyBanner />
    </section>

    <!-- Category Navigation -->
    <h1 class="font-bold text-2xl text-center md:text-left mt-10">Shop By Category</h1> 
   <nav 
    id="categories" 
    aria-label="Shop by category" 
    class="grid grid-cols-2 md:grid-cols-4 px-4 md:px-2 mt-10 md:mt-9 ">
    <!-- Category component goes here -->
    <NuxtLink 
      v-for="category in categories" 
      :key="category.id"
      :to="category.link"
      class="category-link"
    >
      <!--Category Items-->
      <div class="category-item text-center w-full h-60 md:h-50 flex flex-col justify-center items-center">
        <NuxtImg 
          :src="category.image" 
          alt="category.name" 
          class="category-image object-cover w-full h-full rounded-lg"
        />
        <p class="category-name mt-4 text-sm md:text-lg font-medium">
          {{ category.name }}
        </p>
      </div>
    </NuxtLink>
  </nav>

    <!-- Featured Products -->
    <section id="featured">
      <!-- Featured products component -->
    </section>

    <!-- About / Story -->
    <section id="about">
      <!-- About section -->
    </section>

    <!-- Testimonials / Reviews -->
    <section id="testimonials">
      <!-- Testimonials component -->
    </section>

    <!-- Newsletter Subscription -->
    <section id="newsletter">
      <!-- Newsletter signup form -->
    </section>

    <!-- FAQ Section -->
    <section id="faq">
      <!-- FAQ accordion -->
    </section>

    <!-- Contact Information -->
    <section id="contact">
      <!-- Contact form or details -->
    </section>

    <!-- Optional Promotions / Offers -->
    <aside id="promotions">
      <!-- Promo banners or discount info -->
    </aside>
  </main>
</template>

<script setup>
import MyBanner from '~/components/MyBanner.vue'

const categories = [
  { id: 1, name: 'Rings', link: '/ring', image: '/images/ring.jpg' },
  { id: 2, name: 'Necklace', link: '/necklace', image: '/images/necklace.jpg' },
  { id: 3, name: 'Bracelets', link: '/bracelets', image: '/images/bracelets.jpg' },
  { id: 4, name: 'Earrings', link: '/earrings', image: '/images/ring.jpg' }
]
</script>

<style scoped>

.category-link {
  display: block;
  text-decoration: none;
}

.category-name {
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.category-image {
  width: 20rem;
  height: 100%;
  
}

.category-item {
  padding: 1rem; /* Optional padding around images for spacing */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
</style>
