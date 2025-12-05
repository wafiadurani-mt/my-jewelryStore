// ~/stores/productStore.js
import { defineStore } from "pinia";

export const useProducts = defineStore("products", {
  state: () => ({
    products: [],
    isLoading: false,
    isError: null,
    total: 0,
  }),

  getters: {
    productsList(state) {
      return state.products;
    },
    loading(state) {
      return state.isLoading;
    },
  },

  actions: {
    async fetchProducts(limit, skip, category = "") {
      this.isLoading = true;
      this.isError = null;

      try {
        let baseUrl = "https://dummyjson.com/products";

        if (category) {
          baseUrl = `https://dummyjson.com/products/category/${category}`;
        }

        const data = await $fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);

        this.products = data?.products || [];
        this.total = data?.total || 0; // total for that category (or all products)
      } catch (e) {
        this.isError = e;
        console.error("Error fetching products:", e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
