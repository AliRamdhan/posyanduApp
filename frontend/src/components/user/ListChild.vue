<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../utils/FormatTime";
import ModalChildDetails from "../../components/user/ModalChildDetails.vue";
import { FwbButton, FwbModal } from "flowbite-vue";

const store = useStore();
const router = useRouter();

const props = defineProps({
  children: {
    type: Array,
    required: true,
  },
});

const isShowModal = ref(false);
const selectedChildId = ref(null);

function closeModal() {
  isShowModal.value = false;
  selectedChildId.value = null;
}

function showModal(childId) {
  selectedChildId.value = childId;
  isShowModal.value = true;
}
</script>

<template>
  <section class="container lg:px-4">
    <div v-if="children.length > 0">
      <div class="flow-root grid grid-cols-1 lg:grid-cols-2 lg:gap-x-4">
        <div
          v-for="child in children"
          :key="child._id"
          class="my-4 p-4 border-2 rounded-lg"
        >
          <dl class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Name</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ child.name }}</dd>

            <dt class="font-medium text-gray-900">NIK</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ child.nik }}</dd>

            <dt class="font-medium text-gray-900">Gender</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ child.gender }}</dd>

            <dt class="font-medium text-gray-900">Date of Birth</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ child.dob ? formatTime(child.dob) : null }}
            </dd>

            <dt class="font-medium text-gray-900">Immunizations</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ child.amountImunisation }}
            </dd>

            <dt class="font-medium text-gray-900">Perkembangan Anak</dt>
            <dd class="text-gray-700 sm:col-span-2">
              <button
                @click="showModal(child._id)"
                class="text-sm text-blue-900 font-bold"
              >
                Lihat Perkembangan
              </button>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full p-8 flex justify-center items-center">
        <p class="text-xl">Tidak ada data anak</p>
      </div>
    </div>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">
          Child Details
        </div>
      </template>
      <template #body>
        <ModalChildDetails :childId="selectedChildId" />
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
