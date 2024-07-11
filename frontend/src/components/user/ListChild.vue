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
  children: {
    type: Array,
    required: true,
  },
});

onMounted(() => {
  console.log(props.children);
});
</script>

<template>
  <section class="container px-4">
    <div class="flow-root grid grid-cols-1 lg:grid-cols-2 gap-x-4">
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
            {{ formatTime(child.dob) }}
          </dd>

          <dt class="font-medium text-gray-900">Immunizations</dt>
          <dd class="text-gray-700 sm:col-span-2">
            {{ child.amountImunisation }}
          </dd>

          <dt class="font-medium text-gray-900">Perkembangan Anak</dt>
          <dd class="text-gray-700 sm:col-span-2">Link</dd>
        </dl>
      </div>
    </div>
  </section>
</template>

<style></style>
