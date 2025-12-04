// composables/useCategoryList.js
export const useCategoryList = () => {
  const categoriesList = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch('https://dummyjson.com/products/categories')
      categoriesList.value = data || [] // Store categories
      console.log(categoriesList.value)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    categoriesList,
    fetchCategories,
    loading,
    error,
  }
}
