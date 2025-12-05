// composables/usePagination.js
import { ref, computed } from "vue";

export const usePagination = ({
  initialPage = 1,
  initialPerPage = 10,
  totalItems,
  onPageChange,
}) => {
  const page = ref(initialPage);
  const perPage = ref(initialPerPage);

  const totalPages = computed(() => {
    const total = totalItems ? Number(totalItems.value) || 0 : 0;
    return total > 0 ? Math.ceil(total / perPage.value) : 1;
  });

  const canPrev = computed(() => page.value > 1);
  const canNext = computed(() => page.value < totalPages.value);

  // when page / perPage change, this runs
  const trigger = async () => {
    if (onPageChange) {
      const skip = (page.value - 1) * perPage.value;
      await onPageChange(perPage.value, skip); // behind this it fetches the products
    }
  };

  const goToFirst = async () => {
    page.value = 1;
    await trigger();
  };

  const goToLast = async () => {
    page.value = totalPages.value;
    await trigger();
  };

  const nextPage = async () => {
    if (!canNext.value) return;
    page.value++;
    await trigger();
  };

  const prevPage = async () => {
    if (!canPrev.value) return;
    page.value--;
    await trigger();
  };

  const setPerPage = async (newPerPage) => {
    perPage.value = newPerPage;
    page.value = 1;
    await trigger();
  };

  return {
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
  };
};
