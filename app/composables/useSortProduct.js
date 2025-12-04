

// composables/useSortProduct.js
export const useSortProduct = (products) => {
  const route = useRoute();
  const router = useRouter();

  // read initial sort from URL if you want
  const sortOrderValue = ref(route.query.sort || '');

  const sortedProducts = computed(() => {
    let items = products.value ? [...products.value] : [];

    // Price sorting
    if (sortOrderValue.value === 'lowToHigh') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortOrderValue.value === 'highToLow') {
      items.sort((a, b) => b.price - a.price);
    }
    // Name sorting
    else if (sortOrderValue.value === 'name') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Asc / Desc by ID
    else if (sortOrderValue.value === 'ascendingOrder') {
      items.sort((a, b) => a.id - b.id);
    } else if (sortOrderValue.value === 'descendingOrder') {
      items.sort((a, b) => b.id - a.id);
    }

    return items;
  });

  const sortLowToHigh = () => {
    sortOrderValue.value = 'lowToHigh';
    router.push({
      query: {
        ...route.query,
        sort: sortOrderValue.value,
        page:1
      
        
      },
    });
  };

  const sortHighToLow = () => {
    sortOrderValue.value = 'highToLow';
    router.push({
      query: {
        ...route.query,
        sort: sortOrderValue.value,
        page:1
        
      },
    });
  };

  const sortByname = () => {
    sortOrderValue.value = 'name';
    router.push({
      query: {
        ...route.query,
        sort: sortOrderValue.value,
        page:1
       
      },
    });
  };

  const sortAscendingOrder = () => {
    sortOrderValue.value = 'ascendingOrder';
    router.push({
      query: {
        ...route.query,
        sort: sortOrderValue.value,
        page:1
        
      },
    });
  };

  const sortDescendingOrder = () => {
    sortOrderValue.value = 'descendingOrder';
    router.push({
      query: {
        ...route.query,
        sort: sortOrderValue.value,
        page:1
        
      },
    });
  };

  const clearSort = () => {
    sortOrderValue.value = '';
    router.push({
      query: {
        ...route.query,
        sort: undefined,
        page: undefined,
      },
    });
  };

  return {
    sortedProducts,
    sortLowToHigh,
    sortHighToLow,
    sortByname,
    sortAscendingOrder,
    sortDescendingOrder,
    clearSort,
    sortOrderValue,
  };
};
