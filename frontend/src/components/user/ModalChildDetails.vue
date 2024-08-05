<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import formatTime from "../../utils/FormatTime";
import { FwbCheckbox } from "flowbite-vue";
import ChartAnak from "../admin/chart/Chart5.vue";
const props = defineProps({
  childId: {
    type: String,
    required: true,
  },
});

const store = useStore();

const child = computed(() => store.getters.child);
const childGrowth = computed(() => store.getters.childGrowth);

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
            <dd class="text-gray-700 sm:col-span-2">
              {{ child.name ? child.name : "Anak" }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">TTL</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ child.dob ? formatTime(child.dob) : null }}
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
          <div class="w-full" v-if="child && childGrowth && childGrowth.length > 0">
            <div
              v-for="growth in childGrowth"
              :key="growth._id"
              class="my-4 p-2 border-2 rounded-lg"
            >
              <div
                class="flex flex-col lg:flex-row justify-around items-center sm:gap-4"
              >
                <dt class="font-semibold text-gray-900 mb-4">
                  <p>Perkembangan {{ growth?.childrens?.name || 'N/A' }}</p>
                  <p>
                    {{ growth.checkDate ? formatTime(growth.checkDate) : null }}
                  </p>
                </dt>
                <dd class="text-gray-700 sm:col-span-2">
                  <ul>
                    <li>
                      Fase Umur :
                      {{ growth.groupFase ? growth.groupFase : null }}
                    </li>
                    <li>
                      Tinggi Badan :
                      {{ growth.heightBody ? growth.heightBody : null }}
                    </li>
                    <li>
                      Berat Badan :
                      {{ growth.weightBody ? growth.weightBody : null }}
                    </li>
                    <li>
                      Imunisasi yg diberikan :
                      {{
                        growth.imunisations == null
                          ? growth.imunisations.name
                          : "Tidak Imunisasi"
                      }}
                    </li>
                  </ul>
                </dd>
              </div>
            </div>
            <div class="w-full">
              <div v-if="childId">
                <ChartAnak :child-id="childId" />
              </div>
              <div v-else>Loading...</div>
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
