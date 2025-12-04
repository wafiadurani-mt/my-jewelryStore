<template>
  <main class="bg-white">
    <!-- Hero Section -->
    <section id="product-heading" class="bg-gradient-to-r from-black via-black/70 to-black/40 flex flex-col justify-center items-center gap-2 md:gap-5 w-full h-70 px-4 text-center">
      <h1 class="text-white font-sans font-bold text-3xl md:text-4xl">Rings</h1>
      <p class="text-white font-sans mt-3 max-w-2xl">Discover timeless elegance and craftsmanship in every curve</p>
      <SearchBar v-model="query" />
    </section>
   
    <!-- Sorting + Filters -->
    <section id="product-display">
      <div class="flex flex-col justify-center item-center gap-8 md:gap-10">
        <!-- Sort Option -->
        <div class="flex flex-col md:flex-row gap-2 w-full h-full md:h-auto md:w-auto">
          <select v-model="sortOption" class="w-full border md:w-50 p-2 rounded-full" @change="handleSortChange">
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="name">Product: Name</option>
          </select>
          <select v-model.number="limit" class="w-full border md:w-50 p-2 rounded-full" @change="filteredProducts">
            <option value="5">Show 5 Items</option>
            <option value="10">Show 10 Items</option>
            <option value="15">Show 15 Items</option>
            <option value="20">Show 20 Items</option>
            <option value="1000">Show all</option>
          </select>
        </div>

        <!-- Pagination Controls -->
        <div class="flex flex-col md:flex-row justify-center items-center gap-2">
          <button :disabled="page === 1" @click="firstPage">First</button>
          <button :disabled="page === 1" @click="prevPage">Prev</button>
          <button v-for="p in pageNumber" :key="p" :class="[p === page ? 'underline' : '']" @click="goTopage(p)">{{ p }}</button>
          <button :disabled="page === totalPage" @click="nextPage">Next</button>
          <button :disabled="page === totalPage" @click="lastPage">Last</button>
        </div>

        <!-- Product Grid -->
        <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center mb-20">
          <div v-for="product in finalProducts" :key="product.id" class="mt-5 border w-80 p-3 flex flex-col justify-center items-center gap-3">
            <NuxtImg :src="product.thumbnail" alt="Product image" class="w-30 md:w-50 lg:w-full object-contain" />
            <p>ID: {{ product.id }}</p>
            <h3 class="text-xl text-center">{{ product.title}}</h3>
            <p class="text-lg bold text-center">Price: ${{ product.price }}</p>
            <button class="w-full text-center border p-1 mt-4 bg-black text-white" @click="addToCart(product)">Add to cart</button>
          </div>
          <div v-if="finalProducts.length === 0">There are no items to display in this page</div>
        </div> -->

        <!-- Display Raw Product Data -->
        <div v-if="products.length > 0" >
          <h2 class="text-2xl font-bold mt-8">Raw Product Data</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center mb-20">
            <div v-for="product in products" :key="product.id" class="mt-5 border w-80 p-3 flex flex-col justify-center items-center gap-3">
              <NuxtImg :src="product.thumbnail" alt="Product image" class="w-30 md:w-50 lg:w-full object-contain" />
              <p>ID: {{ product.id }}</p>
              <h3 class="text-xl text-center">{{ product.title}}</h3>
              <p class="text-lg bold text-center">Price: ${{ product.price }}</p>
              <button class="w-full text-center border p-1 mt-4 bg-black text-white" @click="addToCart(product)">Add to cart</button>
            </div>  
        
        </div>
        
        <!-- Loading / Error State -->
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error loading products: {{ error }}</div>
      </div>

   

 </div>
    </section>
  </main>
</template>

<script setup>

import { useProducts } from '@/composables/useProducts'

const page = ref(1)
const limit = ref(5) // Default limit to 5
const totalPage = ref(0)
const total = ref(0)
const pageNumber = ref([])
const productsList = ref([])

const query = ref("")
const sortOption = ref("")

// Filtered products based on search query
const filteredProducts = computed(() => {
  let list = products.value
  if (query.value) {
    list = list.filter(p => p.title.toLowerCase().includes(query.value.toLowerCase()))
  }
  return list
})

// Sorting products based on the selected option
const sortedProducts = computed(() => {
  const sortedList = [...filteredProducts.value]

  if (sortOption.value === 'lowToHigh') {
    sortedList.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'highToLow') {
    sortedList.sort((a, b) => b.price - a.price)
  } else if (sortOption.value === 'name') {
    sortedList.sort((a, b) => a.title.localeCompare(b.title))
  }

  return sortedList
})

const { products, fetchProducts, loading, error } = useProducts()

// Handle pagination and final product list based on limit and page
const finalProducts = computed(() => {
  const list = sortedProducts.value
  const start = (page.value - 1) * limit.value
  const end = start + limit.value
  return list.slice(start, end)
})

// Handle sort option change
const handleSortChange = () => {
  // This will trigger a re-computation of `sortedProducts` when `sortOption` changes
}

// Paginate - First page
const firstPage = () => {
  page.value = 1
}

// Paginate - Previous page
const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1
  }
}

// Paginate - Next page
const nextPage = () => {
  if (page.value < totalPage.value) {
    page.value += 1
  }
}

// Paginate - Last page
const lastPage = () => {
  page.value = totalPage.value
}

// Go to a specific page
const goTopage = (pageNumber) => {
  page.value = pageNumber
}

onMounted(async() => {
  const response = await fetchProducts()
  productsList.value = response
  console.log('>>>>>response',response)
})
</script>
