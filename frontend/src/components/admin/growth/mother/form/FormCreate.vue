<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import formatTime from "../../../../../utils/FormatTime";

const store = useStore();
const router = useRouter();
const today = new Date().toISOString().split('T')[0]; 

const motherGrowthData = ref({
  checkDate: "",
  height: null,
  weight: null,
  kbtype: "",
  wombAge: null,
  numbChild: null,
  groupFase: "None",
  circumStomach: null,
  circumHand: null,
  mother: "",
});

const handleSubmit = async () => {
  if (!motherGrowthData.value.mother) {
    console.error("Mother must be selected");
    return;
  }
  try {
    await store.dispatch("createMotherGrowth", motherGrowthData.value);
    alert("Data perkembangan ibu terbaru berhasil ditambahkan");
    router.push({ name: "dashboardAdminPerkembanganIbu" });
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

const fetchChildrenMom = async (motherId) => {
  try {
    await store.dispatch("fetchChildrenMom", motherId);
    const childrenCount = store.getters.childrenMom.length + 1;
    motherGrowthData.value.numbChild = childrenCount;
  } catch (error) {
    console.error(
      `Error fetching children for mother with id ${motherId}:`,
      error
    );
  }
};

const mothers = computed(() =>
  store.getters.mothers.map((mother) => ({
    value: mother._id,
    name: `${mother.name} - ${formatTime(mother.dob)}`,
  }))
);

const groupFase = [
  { value: "Trimester 1", name: "Trimester 1" },
  { value: "Trimester 2", name: "Trimester 2" },
  { value: "Trimester 3", name: "Trimester 3" },
  { value: "None", name: "None" },
];

const kbTypes = [
  { value: "Tidak Pakai", name: "Tidak Pakai" },
  { value: "Suntik", name: "KB Suntik" },
  { value: "Implan", name: "KB Implan" },
  { value: "Pil", name: "KB Pil" },
  { value: "IUD", name: "KB IUD" },
  { value: "Alami", name: "KB Alami" },
];

watch(
  () => motherGrowthData.value.mother,
  (newMotherId) => {
    if (newMotherId) {
      fetchChildrenMom(newMotherId);
    }
  }
);

watch(
  () => motherGrowthData.value.wombAge,
  (newWombAge) => {
    if (newWombAge === null || newWombAge === undefined || newWombAge === 0) {
      motherGrowthData.value.groupFase = "None";
    } else if (newWombAge >= 1 && newWombAge < 14) {
      motherGrowthData.value.groupFase = "Trimester 1";
    } else if (newWombAge >= 14 && newWombAge < 27) {
      motherGrowthData.value.groupFase = "Trimester 2";
    } else if (newWombAge >= 28 && newWombAge < 50) {
      motherGrowthData.value.groupFase = "Trimester 3";
    }
  }
);

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
          :max="today"
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
          v-model.number="motherGrowthData.height"
          label="Tinggi Badan (Cm)"
          @input="(event) => handleNumericInputDecimal(event, 'height')"
        />
      </div>
      <div>
        <fwb-input
          v-model.number="motherGrowthData.weight"
          label="Berat Badan (Kg)"
          @input="(event) => handleNumericInputDecimal(event, 'weight')"
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
          :disabled="true"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.wombAge"
          label="Usia Kandungan (minggu) / jika tidak hamil isi 0 atau lewati"
          min="0"
        />
      </div>
      <div>
        <fwb-select
          v-model="motherGrowthData.groupFase"
          :options="groupFase"
          label="Fase Kehamilan"
          :disabled="true"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model.number="motherGrowthData.circumStomach"
          label="Lingkar Perut (cm)"
          @input="(event) => handleNumericInputDecimal(event, 'circumStomach')"
        />
      </div>
      <div>
        <fwb-input
          v-model.number="motherGrowthData.circumHand"
          label="Lingkar Lengan (cm)"
          @input="(event) => handleNumericInputDecimal(event, 'circumHand')"
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
