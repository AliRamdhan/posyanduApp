<template>
  <div>
    <div v-for="mother in mothers" :key="mother._id">
      <div class="child-header flex gap-4 mb-4">
        <p>{{ mother.name }} ({{ mother.dob }})</p>
      </div>
      <button
        @click="showModal(mother._id)"
        class="view-button border-2 border-black"
      >
        {{
          selectedMotherId === mother._id
            ? "Hide Growth Data"
            : "View Growth Data"
        }}
      </button>
    </div>

    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">
          Mother Details {{ selectedMotherId }}
        </div>
      </template>
      <template #body>
        <ModalChart v-if="selectedMotherId" :mother-id="selectedMotherId" />
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

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalChart from "./Chart6.vue";

const store = useStore();
const selectedMotherId = ref(null);
const isShowModal = ref(false);

const mothers = computed(() => store.getters.mothers);

const selectChild = (id) => {
  alert(id);
  selectedMotherId.value = selectedMotherId.value === id ? null : id;
};

const closeModal = () => {
  isShowModal.value = false;
  selectedMotherId.value = null;
};

const showModal = (motherId) => {
  selectedMotherId.value = motherId;
  isShowModal.value = true;
};

onMounted(() => {
  store.dispatch("fetchMothers"); // Ensure this fetches all mothers
});
</script>
