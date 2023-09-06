import { computed, ref } from "vue";

let pagination = (data) => {
  const pageSize = 4;
  const currentPage = ref(1);

  const totalPages = computed(() => Math.ceil(data.value.length / pageSize));

  const displayDatas = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.value.slice(startIndex, endIndex);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  return {
    pageSize,
    currentPage,
    totalPages,
    displayDatas,
    nextPage,
    previousPage,
  };
};
export default pagination;
