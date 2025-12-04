// usePaginatedProducts.js
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProducts } from './useProducts'

export const usePaginatedProducts = (selectedCategory = ref(null)) => { // Default to ref(null)
  const router = useRouter()
  const route = useRoute()

  const page = ref(Number(route.query.page) || 1)  // current page
  const total = ref(1)  // total items (filtered products)
  const limit = ref(Number(route.query.limit) || 20)  // items per page
  
  const skip = computed(() => (page.value - 1) * limit.value)

  // Fetch products from the useProducts composable (filtered by category)
  const { products, fetchProducts } = useProducts(limit, skip, total, selectedCategory) // Pass selectedCategory directly

  const totalPage = computed(() => {
    return Math.ceil(total.value / limit.value)  // total pages = filtered products / limit
  })

  const pageNumber = computed(() => {
    const current = page.value
    const totalNumber = totalPage.value
    let start = current - Math.floor(5 / 2)
    let end = current + Math.floor(5 / 2)

    if (start < 1) {
      start = 1
      end = Math.min(5, totalNumber)
    }
    if (end > totalNumber) {
      end = totalNumber
      start = Math.max(1, totalNumber - (5 - 1))
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  })

  const updateUrlPage = () => {
    router.push({
      query: {
        ...route.query,
        page: page.value,
        limit: limit.value,
        category: selectedCategory.value || undefined,  // Update category in URL
      },
    })
  }

  // Watch for selected category changes and fetch products accordingly
  watch(selectedCategory, () => {
    page.value = 1  // Reset to first page when category changes
    fetchProducts()  // Re-fetch products based on selected category
    updateUrlPage()  // Update the URL with selected category
  })

  // Pagination functions
  const nextPage = async () => {
    if (page.value < totalPage.value) {
      page.value++
      updateUrlPage()
      await fetchProducts()  // Re-fetch products with the updated page
    }
  }

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--
      updateUrlPage()
      await fetchProducts()  // Re-fetch products with the updated page
    }
  }

  const firstPage = async () => {
    page.value = 1
    updateUrlPage()
    await fetchProducts()  // Re-fetch products for the first page
  }

  const lastPage = async () => {
    page.value = totalPage.value
    updateUrlPage()
    await fetchProducts()  // Re-fetch products for the last page
  }

  return {
    page,
    limit,
    totalPage,
    pageNumber,
    total,
    updateUrlPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    products
  }
}
