<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import formatTime from "../../utils/FormatTime";
import { FwbCheckbox } from "flowbite-vue";

const props = defineProps({
  childId: {
    type: String,
    required: true,
  },
});

const store = useStore();

const child = computed(() => store.getters.child);
const childGrowth = computed(() => store.getters.childGrowth);
// console.log("c", child);
// console.log(childGrowth);
const fetchChild = async (id) => {
  try {
    await store.dispatch("fetchChild", id);
    await store.dispatch("fetchGrowthChildren", id);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchChild(props.childId);
});
</script>
<template>
  <div>
    <div v-if="child" class="h-[60vh] overflow-y-auto modalScroll">
      <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div
            class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-gray-800"
          >
            <dt class="font-medium text-gray-100 text-xl">Profile Anak</dt>
          </div>
          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Nama</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ child.name }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">TTL</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ formatTime(child.dob) }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Gender</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ child.gender == "Male" ? "Laki laki" : "Perempuan" }}
            </dd>
          </div>
        </dl>
      </div>
      <div
        class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm mt-8"
      >
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div
            class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-gray-800"
          >
            <dt class="font-medium text-gray-100 text-xl">Perkembangan Anak</dt>
          </div>
          <div v-if="childGrowth && childGrowth.length">
            <div
              v-for="growth in childGrowth"
              :key="growth._id"
              class="my-4 p-2 border-2 rounded-lg"
            >
              <div class="flex justify-around items-center sm:gap-4">
                <dt class="font-medium text-gray-900">
                  <p>Perkembangan {{ child.name }}</p>
                  <p>
                    {{ formatTime(growth.checkDate) }}
                  </p>
                </dt>
                <dd class="text-gray-700 sm:col-span-2">
                  <ul>
                    <li>Fase Umur : {{ growth.groupFase }}</li>
                    <li>Tinggi Badan : {{ growth.heightBody }}</li>
                    <li>Berat Badan : {{ growth.weightBody }}</li>
                    <li>
                      Imunisasi yg diberikan : {{ growth.imunisations.name }}
                    </li>
                  </ul>
                </dd>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="w-full p-4 flex justify-center items-center">
              <p>Belum ada data perkembangan...</p>
            </div>
          </div>
        </dl>
      </div>
    </div>
    <div v-else>
      <p>Loading....</p>
    </div>
    <!-- Display other child details here -->
  </div>
</template>
