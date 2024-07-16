<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";

const store = useStore();
const router = useRouter();

const motherGrowthData = ref({
  checkDate: "",
  height: null,
  weight: null,
  kbtype: "",
  wombAge: null,
  numbChild: null,
  groupFase: "",
  circumStomach: null,
  circumHand: null,
  mother: "",
});

const handleSubmit = async () => {
  try {
    const data = await store.dispatch(
      "createMotherGrowth",
      motherGrowthData.value
    );
    console.log("Mother growth record created");
    console.log(data);
    // router.push({ name: "dashboardAdminPerkembanganIbu" });
  } catch (error) {
    console.error("Error creating mother growth:", error);
  }
};

const fetchMothers = async () => {
  try {
    await store.dispatch("fetchMothers");
  } catch (error) {
    console.error("Error fetching mothers in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const mothers = computed(() =>
  store.getters.mothers.map((mother) => ({
    value: mother._id,
    name: mother.name,
  }))
);

const groupFase = [
  { value: "Trimester 1", name: "Trimester 1" },
  { value: "Trimester 2", name: "Trimester 2" },
  { value: "Trimester 3", name: "Trimester 3" },
  { value: "None", name: "None" },
];
const kbTypes = [
  { value: "KB Suntik", name: "KB Suntik" },
  { value: "KB Implan", name: "KB Implan" },
  { value: "KB Pil", name: "KB Pil" },
  { value: "KB IUD", name: "KB IUD" },
  { value: "KB Alami", name: "KB Alami" },
];

onMounted(() => {
  fetchMothers();
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input
          type="date"
          v-model="motherGrowthData.checkDate"
          label="Tanggal Periksa"
          required
        />
      </div>
      <div>
        <fwb-select
          v-model="motherGrowthData.mother"
          :options="mothers"
          label="Ibu"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.height"
          label="Tinggi Badan"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.weight"
          label="Berat Badan"
          required
        />
      </div>
      <div>
        <fwb-select
          v-model="motherGrowthData.kbtype"
          :options="kbTypes"
          label="Tipe KB"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.numbChild"
          label="Anak ke- berapa"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.wombAge"
          label="Usia Kandungan"
        />
      </div>
      <div>
        <fwb-select
          v-model="motherGrowthData.groupFase"
          :options="groupFase"
          label="Fase Kehamilan"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.circumStomach"
          label="Circumference of Stomach"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.circumHand"
          label="Circumference of Hand"
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminPerkembanganIbu' })"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
