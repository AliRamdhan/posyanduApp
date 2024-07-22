<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["page-change"]);

const totalPages = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.limit)
);

const visiblePageNumbers = computed(() => {
  const currentPage = props.pagination.page;
  const lastPage = totalPages.value;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(lastPage, startPage + 4);

  if (endPage - startPage < 4 && startPage > 1) {
    startPage = Math.max(1, endPage - 4);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});

const previousPage = () => {
  if (props.pagination.page > 1) {
    emit("page-change", props.pagination.page - 1);
  }
};

const nextPage = () => {
  if (props.pagination.page < totalPages.value) {
    emit("page-change", props.pagination.page + 1);
  }
};

const changePage = (pageNumber) => {
  if (pageNumber !== props.pagination.page) {
    emit("page-change", pageNumber);
  }
};
</script>

<template>
  <div class="flex justify-between items-center py-3 px-20">
    <button
      @click="previousPage"
      :disabled="pagination.page === 1"
      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
    >
      Previous
    </button>
    <div class="flex gap-2">
      <button
        v-for="pageNumber in visiblePageNumbers"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-lg',
          pageNumber === pagination.page
            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100',
        ]"
      >
        {{ pageNumber }}
      </button>
    </div>
    <button
      @click="nextPage"
      :disabled="pagination.page === totalPages.value"
      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
    >
      Next
    </button>
  </div>
</template>
