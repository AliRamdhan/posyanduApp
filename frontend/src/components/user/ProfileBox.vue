<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../utils/FormatTime";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalMotherDetails from "../../components/user/ModalMomDetails.vue";
const store = useStore();
const router = useRouter();

// const children = computed(() => store.getters["children"]); // Directly access the getter
// // Define props for the main component
const isShowModal = ref(false);
const selectedMotherId = ref(null);

function closeModal() {
  isShowModal.value = false;
  selectedMotherId.value = null;
}

function showModal(childId) {
  selectedMotherId.value = childId;
  isShowModal.value = true;
}

const props = defineProps({
  mother: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="container lg:px-4">
    <div
      v-if="mother"
      class="flow-root grid grid-cols-1 lg:grid-cols-2 gap-x-4"
    >
      <div class="my-4 p-4 border-2 rounded-lg">
        <dl class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Name</dt>
          <dd class="text-gray-700 sm:col-span-2">
            {{ mother.name ? mother.name : "" }}
          </dd>

          <dt class="font-medium text-gray-900">Suami</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother?.husband }}</dd>

          <dt class="font-medium text-gray-900">Jumlah Anak</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother?.amountChild }}</dd>

          <dt class="font-medium text-gray-900">Date of Birth</dt>
          <dd class="text-gray-700 sm:col-span-2">
            {{ mother?.dob ? formatTime(mother?.dob) : mother?.dob }}
          </dd>
          <dt class="font-medium text-gray-900">BPJS</dt>
          <dd class="text-gray-700 sm:col-span-2">
            {{ mother?.bpjs ? "Punya BPJS" : "Non BPJS" }}
          </dd>
        </dl>
      </div>
      <div class="my-4 p-4 border-2 rounded-lg">
        <dl class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Tipe KS</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother?.ks }}</dd>

          <dt class="font-medium text-gray-900">RT</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother?.rt }}</dd>

          <dt class="font-medium text-gray-900">RW</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother?.rw }}</dd>

          <dt class="font-medium text-gray-900">Perkembangan Ibu</dt>
          <dd class="text-gray-700 sm:col-span-2">
            <button
              @click="showModal(mother?._id)"
              class="text-sm text-blue-900 font-bold"
            >
              Lihat Perkembangan
            </button>
          </dd>
        </dl>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">Data IBU</div>
      </template>
      <template #body>
        <ModalMotherDetails :motherId="selectedMotherId" />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="dark" class="px-16">
            Back
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </section>
</template>

<style></style>
