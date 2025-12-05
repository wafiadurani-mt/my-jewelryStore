<template>
  <main class="bg-white">
    <!-- Hero Section -->
    <section
      id="product-heading"
      class="bg-gradient-to-r from-black via-black/70 to-black/40 flex flex-col justify-center items-center gap-2 md:gap-5 w-full h-70 px-4 text-center"
    >
      <h1 class="text-white font-sans font-bold text-3xl md:text-4xl">Rings</h1>
      <p class="text-white font-sans mt-3 max-w-2xl">
        Discover timeless elegance and craftsmanship in every curve
      </p>
      <SearchBar v-model="query" />
    </section>

    <section id="product-display">
      <div class="flex justify-center items-center gap-8 my-15">
        <!-- Per-page dropdown -->
        <select
          class="border px-3 py-1 bg-black text-white hover:bg-white hover:text-black"
          :value="perPage"
          @change="setPerPage(Number($event.target.value))"
        >
          <option :value="4">Show 4 items</option>
          <option :value="8">Show 8 items</option>
          <option :value="12">Show 12 items</option>
          <option :value="20">Show 20 items</option>
        </select>

        <!-- Sort dropdown -->
        <select v-model="sortOrderValue" @change="handleSortChange">
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="name">Name (A → Z)</option>
          <option value="ascendingOrder">ID Ascending</option>
          <option value="descendingOrder">ID Descending</option>
        </select>

        <!-- Pagination buttons -->
        <button
          class="px-3 py-1 border bg-green-800 text-white font-semibold"
          :disabled="!canPrev"
          @click="goToFirst"
        >
          First
        </button>
        <button
          class="px-3 py-1 border bg-gray-800 text-white font-semibold"
          :disabled="!canPrev"
          @click="prevPage"
        >
          Prev
        </button>

        <span class="mt-2">Page {{ page }} of {{ totalPages }}</span>

        <button
          class="px-3 py-1 border bg-gray-800 text-white font-semibold"
          :disabled="!canNext"
          @click="nextPage"
        >
          Next
        </button>
        <button
          class="px-3 py-1 border bg-red-900 text-white font-semibold"
          :disabled="!canNext"
          @click="goToLast"
        >
          Last
        </button>


        <!--Category Dropdown-->
        <select
          class="border px-3 py-1"
          :value="selectedCategory"
          @change="onCategoryChange"
        >
          <option value="">All Categories</option>
          <option
            v-for="cat in categories"
            :key="cat.slug"
            :value="cat.slug"
          >
            {{ cat.name }}
          </option>
</select>

      </div>

      <!-- Products display -->
      <div class="flex flex-col justify-center items-center gap-8 md:gap-10">
        <div v-if="productStore.loading">
          <p class="text-center mt-8">Loading products...</p>
        </div>

        <div v-else>
          <div v-if="productStore.isError" class="text-center text-red-500">
            Error loading products.
          </div>

          <div
            v-if="sortedProducts.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center mb-20"
          >
            <div
              v-for="product in sortedProducts"
              :key="product.id"
              class="mt-5 border w-80 p-3 flex flex-col justify-center items-center gap-3"
            >
              <NuxtImg
                :src="product.thumbnail"
                alt="Product image"
                class="w-30 md:w-50 lg:w-full object-contain"
              />
              <p>ID: {{ product.id }}</p>
              <h3 class="text-xl text-center">{{ product.title }}</h3>
              <p class="text-lg bold text-center">Price: ${{ product.price }}</p>
              <button
                class="w-full text-center border p-1 mt-4 bg-black text-white"
                @click="addToCart(product)"
              >
                Add to cart
              </button>
            </div>
          </div>

          <div v-else class="text-center mt-8">
            There are no items to display.
          </div>
        </div>
      </div>
    </section>
  </main>
</template>



<script setup>
import { ref, computed, onMounted } from "vue";
import { useProducts } from "~/stores/productStore";
import { usePagination } from "~/composables/usePagination";
import { useSortProduct } from "~/composables/useSortProduct";
import { useCategoryFilter } from "~/composables/useCategoryFilter";

const productStore = useProducts();

// category composable
const {
  categories,         // array of { slug, name, url }
  selectedCategory,   // ref<string> holds slug, e.g. "smartphones"
  fetchCategories,
  setCategory,
 
} = useCategoryFilter();

// pagination composable
const {
  setPerPage,
  prevPage,
  nextPage,
  goToLast,
  goToFirst,
  page,
  perPage,
  totalPages,
  canPrev,
  canNext,
} = usePagination({
  initialPage: 1,
  initialPerPage: 8,
  totalItems: computed(() => productStore.total),
  onPageChange: async (limit, skip) => {
    await productStore.fetchProducts(limit, skip, selectedCategory.value);
  },
});

// search (for later)
const query = ref("");

// raw products from store
const productItems = computed(() => productStore.productsList);

// sorting composable
const {
  sortedProducts,
  sortLowToHigh,
  sortHighToLow,
  sortByName,
  sortAscendingOrder,
  sortDescendingOrder,
  clearSort,
  sortOrderValue,
} = useSortProduct(productItems);

const handleSortChange = () => {
  if (sortOrderValue.value === "lowToHigh") {
    sortLowToHigh();
  } else if (sortOrderValue.value === "highToLow") {
    sortHighToLow();
  } else if (sortOrderValue.value === "name") {
    sortByName();
  } else if (sortOrderValue.value === "ascendingOrder") {
    sortAscendingOrder();
  } else if (sortOrderValue.value === "descendingOrder") {
    sortDescendingOrder();
  } else {
    clearSort();
  }
};

// handle <select> change event for category
const onCategoryChange = async (event) => {
  const value = event.target.value; // slug or ""
  setCategory(value);
  await goToFirst();
};

const addToCart = (product) => {
  console.log("Add to cart:", product);
};

onMounted(async () => {
  await fetchCategories(); // load {slug, name, url}[]
  await goToFirst();       // load products for current category (from URL, if any)
});
</script>
