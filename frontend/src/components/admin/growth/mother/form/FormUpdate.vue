<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const motherGrowthData = ref({
  checkDate: "",
  height: null,
  weight: null,
  kbtype: "",
  pregnantStatus: false, // Initial value set to false
  wombAge: null,
  numbChild: null,
  groupFase: "",
  circumStomach: null,
  circumHand: null,
  mother: "",
});

const handleSubmit = async () => {
  try {
    await store.dispatch("updateMotherGrowth", {
      id: route.params.id,
      motherGrowthData: motherGrowthData.value,
    });
    console.log("Mother growth record updated");
    alert(`Mother growth record with ID ${route.params.id} updated`);
    router.push({ name: "dashboardAdminPerkembanganIbu" });
  } catch (error) {
    console.error("Error updating mother growth:", error);
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

const fetchMotherGrowth = async (id) => {
  try {
    const data = await store.dispatch("fetchMotherGrowth", id);
    motherGrowthData.value = {
      checkDate: data.checkDate
        ? new Date(data.checkDate).toISOString().split("T")[0]
        : "",
      height: data.height,
      weight: data.weight,
      kbtype: data.kbtype,
      pregnantStatus: data.pregnantStatus,
      wombAge: data.wombAge,
      numbChild: data.numbChild,
      groupFase: data.groupFase,
      circumStomach: data.circumStomach,
      circumHand: data.circumHand,
      mother: data.mother._id,
    };
  } catch (error) {
    console.error("Error fetching mother growth:", error);
  }
};

const mothers = computed(() =>
  store.getters.mothers.map((mother) => ({
    value: mother._id,
    name: mother.name,
  }))
);

const groupFase = [
  { value: "0-1", name: "0-1" },
  { value: "1-3", name: "1-3" },
  { value: "3-6", name: "3-6" },
  { value: "9-12", name: "9-12" },
  { value: "12-18", name: "12-18" },
  { value: "18-24", name: "18-24" },
];

const pregnantStatus = [
  { value: "true", name: "Hamil" },
  { value: "false", name: "Tidak Hamil" },
];

const kbTypes = [
  { value: "Tidak Pakai", name: "Tidak Pakai" },
  { value: "Suntik", name: "KB Suntik" },
  { value: "Implan", name: "KB Implan" },
  { value: "Pil", name: "KB Pil" },
  { value: "IUD", name: "KB IUD" },
  { value: "Alami", name: "KB Alami" },
];

onMounted(async () => {
  await fetchMothers();
  await fetchMotherGrowth(route.params.id);
});
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <div class="flex items-center gap-4 py-2">
          <fwb-select
            v-model="motherGrowthData.pregnantStatus"
            :options="pregnantStatus"
            label="Hamil/Tidak"
            required
          />
        </div>
      </div>
      <div>
        <fwb-input
          type="date"
          v-model="motherGrowthData.checkDate"
          label="Tanggal Periksa"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.height"
          label="Tinggi Badan (cm)"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.weight"
          label="Berat Badan (kg)"
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
          v-model.number="motherGrowthData.wombAge"
          label="Usia Kandungan (bulan)"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.numbChild"
          label="Anak ke-berapa"
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
          label="Lingkaran Perut"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.circumHand"
          label="Lingkaran Tangan"
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
