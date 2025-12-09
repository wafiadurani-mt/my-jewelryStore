<template>
  <header class="header-container bg-white text-black">
    <!-- Website Title -->
    <h1 class="logo text-2xl font-semibold">
      <NuxtLink to="/">Jewels</NuxtLink>
    </h1>
    <i class="fa fa-bars menu-btn" @click="toggleMenu"/>
    <!-- Navigation Links and Action Buttons (Visible on all screen sizes) -->
    <nav :class="['nav-bar', isMenuOpen ? 'active' : '']">
      <ul class="nav-link">
        <li class="nav-link-list nav-link-option">
          
          <NuxtLink to="/" class=" hover:text-yellow-500">Home</NuxtLink>
          <NuxtLink to="/category" class=" hover:text-yellow-500">Category</NuxtLink>

          <NuxtLink to="/contact" class=" hover:text-yellow-500">Contact us</NuxtLink>
         
        
          <NuxtLink to="/about" class=" hover:text-yellow-500">About us </NuxtLink>
        </li>

        <!-- Action Buttons: Login, Cart, Profile, Search -->
        <li class="nav-link-list">
          <button 
            class="nav-btn w-20 border bg-white text-black text-center rounded-[1000px]" 
            
            @click="userLogin">
            Login
          </button>

        </li>

        <!-- Search Button and Input -->
        <li class="nav-link-list">
          <div class="relative nav-btn">
            <i 
              v-if="!isSearchVisible" 
              class="text-sm fa fa-search text-lg cursor-pointer" 
              @click="toggleSearchInput" />
            <input 
              v-if="isSearchVisible" 
              type="search" 
              placeholder="Search Jewelry" 
              class="text-sm p-1 rounded-lg bg-gray-200 text-black  focus:ring-2 " 
              @focus="isSearchVisible = true" 
              @blur="isSearchVisible = false" >
          </div>
        </li>

        <!-- Cart Button -->
        <li class="nav-link-list">
          <span
          class="absolute top-3 right-22" 
          >
          {{cartNumber }}
          </span>

          <button 
            class="nav-btn text-sm flex items-center text-black text-center rounded-lg hover:bg-yellow-500">
            <NuxtLink to="/cart"><i class="fa fa-shopping-cart" /></NuxtLink>
            
          </button>
        </li>

        <!-- Profile Button -->
        <li class="nav-link-list">
          <button class="nav-btn text-sm flex text-center text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
            <i class="fa fa-user" />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '~/stores/cartStore'
const cart=useCartStore()
const cartNumber=computed(()=>cart.cartCount)
// Reactive states
const isSearchVisible = ref(false);
const isMenuOpen= ref(false);


// Toggle search input visibility
const toggleSearchInput = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

//Toggle button Handler
const toggleMenu=()=>{
   isMenuOpen.value=!isMenuOpen.value
}

// Login redirection (replace with your logic)
const userLogin = async () => {
  await navigateTo('/login');
};
onMounted(()=>{
    cart.loadToCart()
})

</script>

<style scoped>
/** Header */
.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  position: sticky;
  top: 0;
}

/** Logo */
.logo {
  margin-left: 0; /* Align logo to the left */
}

/** Nav-bar */
/**Control the flow of the elements of navbar */
.nav-bar {
  display: flex;
  justify-content:end;
  flex-direction: row;
  width: 100%;
}

.nav-link {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 20px;

  
}

.nav-link-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
  


}

.nav-link-option {
  text-decoration: none;
  color: inherit;
  margin-right: 360px;
  margin-top: 10px;
  

}

.nav-link-option:hover {
  border-radius: 5px;
}

/** Action Buttons and Search */
.nav-btn {
  padding: 8px 12px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.nav-btn i {
  margin-right: 4px;
}

.menu-btn{
  display: none;
}



/** Mobile Responsiveness (for smaller screens) */
@media (min-width:376px) and (max-width:425px) {
  .menu-btn{
  display: block;
  position: absolute;
  top: 15px;
  right:400px; }
}
@media (max-width: 639px) {
  .menu-btn{
  display: block;
  position: absolute;
  top: 15px;
  left:280px;
  

}
  .header-container {
  flex-direction: column;
  padding:10px;
  position: relative;
  }
  .nav-bar{
  display:none;  
  justify-content:center;
  flex-direction: column;
  }
  .nav-bar.active{
    display: flex;
  }
  .nav-link {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content:center;
  gap: 5px;
}
.nav-link-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  }
  .nav-link-option { 
  margin-right: 10px;
  margin-top: 10px; 

}
.nav-btn {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
}
@media (min-width: 700px) and (max-width:1024px){
  .menu-btn{
  display: block;
  position: absolute;
  top: 15px;
  right: 20px;
  /*left:690px;**/
}
  .header-container {
  flex-direction: column;
  padding:10px;
  position: relative;
  }
  .nav-bar {
  display: none;
  align-items: center;
  flex-direction: column;
  }
  .nav-bar.active{
    display: flex;
  }
  .nav-link {
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap: 7px;
}
.nav-link-list {
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  }
 .nav-link-option { 
  margin-right: 10px;
  margin-top: 10px; 

}
.nav-btn {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

}

</style>
