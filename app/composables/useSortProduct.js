// composables/useSortProduct.js
import { ref, computed, watch } from "vue";

export const useSortProduct = (products) => {
  const route = useRoute();
  const router = useRouter();

  // initial sort from URL if present
  const sortOrderValue = ref(route.query.sort || "");

  // keep local sortOrderValue in sync with URL changes (back/forward, etc.)
  watch(
    () => route.query.sort,
    (newSort) => {
      sortOrderValue.value = newSort || "";
    }
  );

  const sortedProducts = computed(() => {
    const raw = products?.value;
    let items = Array.isArray(raw) ? [...raw] : [];

    if (sortOrderValue.value === "lowToHigh") {
      // Price: low → high
      items.sort((a, b) => a.price - b.price);
    } else if (sortOrderValue.value === "highToLow") {
      // Price: high → low
      items.sort((a, b) => b.price - a.price);
    } else if (sortOrderValue.value === "name") {
      // Name A → Z
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrderValue.value === "ascendingOrder") {
      // ID ascending
      items.sort((a, b) => a.id - b.id);
    } else if (sortOrderValue.value === "descendingOrder") {
      // ID descending
      items.sort((a, b) => b.id - a.id);
    }

    return items;
  });

  const pushSort = (sort) => {
    router.push({
      query: {
        ...route.query,
        sort,
        page: 1, // reset page when sorting changes
      },
    });
  };

  const sortLowToHigh = () => {
    sortOrderValue.value = "lowToHigh";
    pushSort("lowToHigh");
  };

  const sortHighToLow = () => {
    sortOrderValue.value = "highToLow";
    pushSort("highToLow");
  };

  const sortByName = () => {
    sortOrderValue.value = "name";
    pushSort("name");
  };

  const sortAscendingOrder = () => {
    sortOrderValue.value = "ascendingOrder";
    pushSort("ascendingOrder");
  };

  const sortDescendingOrder = () => {
    sortOrderValue.value = "descendingOrder";
    pushSort("descendingOrder");
  };

  const clearSort = () => {
    sortOrderValue.value = "";
    router.push({
      query: {
        ...route.query,
        sort: undefined,
        page: 1, // or undefined if you want to fully clear
      },
    });
  };

  return {
    sortedProducts,
    sortLowToHigh,
    sortHighToLow,
    sortByName,
    sortAscendingOrder,
    sortDescendingOrder,
    clearSort,
    sortOrderValue,
  };
};
