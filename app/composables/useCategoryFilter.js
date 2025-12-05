// composables/useCategoryList.js


export const useCategoryFilter = () => {
  
  const route=useRoute()
  const router=useRouter()

  const categories=ref([]) // array for storing categories
  const selectedCategories=ref(route.query.category || "" )

  const fetchCategories=async () =>{
    try{
      const data = await $fetch("https://dummyjson.com/products/categories")
      categories.value=Array.isArray(data) ? data : []

    } catch(e){
      console.error("Error fetching categories:", e);
      categories.value=[]
    }
  }


  // detect change in route
  watch(()=>route.query.category,
  (val) =>{
    selectedCategories.value=val || "";
  }
)
  //for setting Category
  const setCategory=(category) =>{
    selectedCategories.value=category
    router.push({
      query:{
        ...route.query,
        category:category || undefined,
        page:1
      }
    })
  }

  const clearCategory=()=>{
    setCategory('');
  }

  return {
    categories,
    selectedCategories,
    fetchCategories,
    setCategory,
    clearCategory,
  }
}
