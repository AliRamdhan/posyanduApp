<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import { handleNumericInputDecimal } from "../../../../../utils/Validate";
import formatTime from "../../../../../utils/FormatTime";
const store = useStore();
const router = useRouter();
const today = new Date().toISOString().split('T')[0]; 

const childrenGrowthData = ref({
  checkDate: "",
  groupFase: "",
  childrens: "",
  heightBody: null,
  weightBody: null,
  imunisations: null,
});

const handleSubmit = async () => {
  if (!childrenGrowthData.value.childrens) {
    console.error("Children must be selected");
    return;
  }

  try {
    const child = store.getters.children.find(
      (child) => child._id === childrenGrowthData.value.childrens
    );

    if (child) {
      childrenGrowthData.value.groupFase = child.isBaduta ? "Baduta" : "Balita";
    }
    await store.dispatch("createChildBaduta", childrenGrowthData.value);
    alert("Data pertumbuhan anak berhasil ditambahkan");
    router.push({ name: "dashboardAdminPerkembanganAnak" });
  } catch (error) {
    console.error("Error creating children growth:", error);
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

const imunisations = computed(() =>
  store.getters.immunisations.map((immunisation) => ({
    value: immunisation._id,
    name: immunisation.name,
  }))
);

const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren");
    await store.dispatch("fetchChildrenAll");
  } catch (error) {
    console.error("Error fetching children in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const children = computed(() =>
  store.getters.childrens.map((child) => ({
    value: child._id,
    name: `${child.name} - ${formatTime(child.dob)}`,
  }))
);

const groupFase = [
  { value: "Baduta", name: "Baduta" },
  { value: "Balita", name: "Balita" },
];

onMounted(() => {
  fetchMothers();
  fetchChildren();
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input
          type="date"
          v-model="childrenGrowthData.checkDate"
          label="Tanggal Periksa"
          required
          :max="today"
        />
      </div>
      <div>
        <fwb-select
          v-model="childrenGrowthData.childrens"
          :options="children"
          label="Pilih Anak"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model.number="childrenGrowthData.heightBody"
          label="Tinggi Badan (cm)"
          @input="(event) => handleNumericInputDecimal(event, 'heightBody')"
        />
      </div>
      <div>
        <fwb-input
          v-model.number="childrenGrowthData.weightBody"
          label="Berat Badan (kg)"
          @input="(event) => handleNumericInputDecimal(event, 'weightBody')"
        />
      </div>
      <div>
        <fwb-select
          v-model="childrenGrowthData.imunisations"
          :options="imunisations"
          label="Pilih Imunisasi"
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminPerkembanganAnak' })"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
