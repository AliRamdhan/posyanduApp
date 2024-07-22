<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalChart from "./Chart5.vue";

const store = useStore();
const selectedChildId = ref(null);
const isShowModal = ref(false);

const children = computed(() => store.getters.children);

const selectChild = (id) => {
  alert(id);
  selectedChildId.value = selectedChildId.value === id ? null : id;
};

const closeModal = () => {
  isShowModal.value = false;
  selectedChildId.value = null;
};

const showModal = (childId) => {
  selectedChildId.value = childId;
  isShowModal.value = true;
};

onMounted(() => {
  store.dispatch("fetchChildren"); // Ensure this fetches all children
});
</script>

<template>
  <div>
    <div v-for="child in children" :key="child._id" class="child-item">
      <div class="child-header flex gap-4 mb-4">
        <p>{{ child.name }} ({{ child.dob }})</p>
      </div>
      <button
        @click="showModal(child._id)"
        class="view-button border-2 border-black"
      >
        {{
          selectedChildId === child._id
            ? "Hide Growth Data"
            : "View Growth Data"
        }}
      </button>
    </div>

    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">
          Child Details
        </div>
      </template>
      <template #body>
        <ModalChart v-if="selectedChildId" :child-id="selectedChildId" />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="dark" class="px-16">
            Back
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </div>
</template>
