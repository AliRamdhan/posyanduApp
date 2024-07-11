<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import formatTime from "../../utils/FormatTime";
import ModalChildDetails from "../../components/user/ModalChildDetails.vue";
const store = useStore();
const router = useRouter();

// const children = computed(() => store.getters["children"]); // Directly access the getter
// // Define props for the main component
const props = defineProps({
  mother: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  console.log("dQWDQ", props.mother);
});
</script>

<template>
  <section class="container px-4">
    <div class="flow-root grid grid-cols-1 lg:grid-cols-2 gap-x-4">
      <div class="my-4 p-4 border-2 rounded-lg">
        <dl class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Name</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother.name }}</dd>

          <dt class="font-medium text-gray-900">Suami</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother.husband }}</dd>

          <dt class="font-medium text-gray-900">Jumlah Anak</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother.amountChild }}</dd>

          <dt class="font-medium text-gray-900">Date of Birth</dt>
          <dd class="text-gray-700 sm:col-span-2">
            {{ formatTime(mother.dob) }}
          </dd>
          <dt class="font-medium text-gray-900">BPJS</dt>
          <dd class="text-gray-700 sm:col-span-2">
            {{ mother.bpjs ? "Punya BPJS" : "Non BPJS" }}
          </dd>
        </dl>
      </div>
      <div class="my-4 p-4 border-2 rounded-lg">
        <dl class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
          <dt class="font-medium text-gray-900">Tipe KS</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother.ks }}</dd>

          <dt class="font-medium text-gray-900">RT</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother.rt }}</dd>

          <dt class="font-medium text-gray-900">RW</dt>
          <dd class="text-gray-700 sm:col-span-2">{{ mother.rw }}</dd>

          <dt class="font-medium text-gray-900">Perkembangan Ibu</dt>
          <dd class="text-gray-700 sm:col-span-2">Link</dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<style></style>
