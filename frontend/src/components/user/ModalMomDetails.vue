<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import formatTime from "../../utils/FormatTime";

const props = defineProps({
  motherId: {
    type: String,
    required: true,
  },
});

const store = useStore();

const mother = computed(() => store.getters.mother);
const motherGrowths = computed(() => store.getters.motherGrowths);

const fetchMother = async (id) => {
  try {
    await store.dispatch("fetchMother", id);
    await store.dispatch("fetchMotherGrowths", { motherId: id });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchMother(props.motherId);
});
</script>

<template>
  <div>
    <div v-if="mother" class="h-[60vh] overflow-y-auto modalScroll">
      <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div
            class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-gray-800"
          >
            <dt class="font-medium text-gray-100 text-xl">Profile Ibu</dt>
          </div>
          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Nama</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ mother.name }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">NIK</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ mother.nik }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">KK</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ mother.kk }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Husband</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ mother.husband }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Husband NIK</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ mother.husbandnik }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">TTL</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ formatTime(mother.dob) }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">BPJS</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ mother.bpjs ? "Yes" : "No" }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Tipe KS</dt>
            <dd class="text-gray-700 sm:col-span-2">{{ mother.ks }}</dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">RT / RW</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ mother.rt }} / {{ mother.rw }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">RW</dt>
            <dd class="text-gray-700 sm:col-span-2"></dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">
              Jumlah anak yang dimiliki :
            </dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ mother.amountChild }}
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
            <dt class="font-medium text-gray-100 text-xl">
              Data Perkembangan Ibu
            </dt>
          </div>
          <div v-if="motherGrowths && motherGrowths.length">
            <div
              v-for="growth in motherGrowths"
              :key="growth._id"
              class="my-4 p-2 border-2 rounded-lg"
            >
              <div class="flex flex-col lg:flex-row justify-around items-center sm:gap-4">
                <dt class="font-semibold text-gray-900 mb-4">
                  Perkembangan {{ mother.name }} -
                  {{ formatTime(growth.checkDate) }}
                </dt>
                <dd class="text-gray-700 sm:col-span-2">
                  <ul>
                    <li>Tinggi Badan: {{ growth.height }}</li>
                    <li>Berat Badan: {{ growth.weight }}</li>
                    <li>Tipe KB: {{ growth.kbtype }}</li>
                    <li>
                      Status Kehamilan saat ini :
                      {{ growth.pregnantStatus ? "Yes" : "No" }}
                    </li>
                    <li>Usia Kandungan: {{ growth.wombAge }}</li>
                    <li>
                      Jumlah anak yang dimiliki saat periksa:
                      {{ growth.numbChild }}
                    </li>
                    <li>Fase Kehamilan: {{ growth.groupFase }}</li>
                    <li>Linkar Perut: {{ growth.circumStomach }}</li>
                    <li>Lingkar Kepala: {{ growth.circumHand }}</li>
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
  </div>
</template>
