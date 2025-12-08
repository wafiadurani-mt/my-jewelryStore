// composables/useCategoryFilter.js
import { ref, watch } from "vue";
import { useRoute, useRouter } from "#imports";

export const useCategoryFilter = () => {
  const route = useRoute();
  const router = useRouter();

  const categories = ref([]);          // [{ slug, name, url }, ...]
  const selectedCategory = ref(route.query.category || ""); // slug string

  const fetchCategories = async () => {
    const data = await $fetch("https://dummyjson.com/products/categories");
    categories.value = Array.isArray(data) ? data : [];
  };

  const setCategory = (slug) => {
    selectedCategory.value = slug || "";
    router.push({
      query: {
        ...route.query,
        category: selectedCategory.value || undefined,
        page: 1,
      },
    });
  };

  const clearCategory = () => setCategory("");

  // keep in sync with URL
  watch(
    () => route.query.category,
    (val) => {
      selectedCategory.value = val || "";
    }
  );

  return {
    categories,
    selectedCategory,
    fetchCategories,
    setCategory,
    clearCategory,
  };
};
