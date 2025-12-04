// composables/useProducts.js
export const useProducts = () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch("https://dummyjson.com/products")
      const data = await response.json()
      console.log(data)  // Log API response to verify it’s being fetched correctly
      products.value = data?.products || []
      return data?.products ?? []
    } catch (e) {
      console.error('Fetch error:', e)
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
