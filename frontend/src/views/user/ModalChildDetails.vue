<script setup>
import { ref } from "vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import ListDetailsChild from "./ListDetailsChild.vue";
const isShowModal = ref(false);

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}
</script>

<template>
  <div>
    <fwb-button @click="showModal"> Open modal </fwb-button>

    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-lg">Terms of Service</div>
      </template>
      <template #body>
        <ListDetailsChild />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="dark" class="px-16">
            Back
          </fwb-button>
          <!-- <fwb-button @click="closeModal" color="green"> I accept </fwb-button> -->
        </div>
      </template>
    </fwb-modal>
  </div>
</template>
