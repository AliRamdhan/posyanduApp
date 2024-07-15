<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";

const store = useStore();
const router = useRouter();

const childrenGrowthData = ref({
  checkDate: "",
  groupFase: "",
  heightBody: null,
  weightBody: null,
  isBaduta: true,
  childrens: null,
  imunisations: null,
});

const handleSubmit = async () => {
  if (!childrenGrowthData.value.childrens) {
    console.error("Children must be selected");
    return;
  }

  try {
    await store.dispatch("createChildBaduta", childrenGrowthData.value);
    console.log("Children growth record created");
    router.push({ name: "dashboardAdminPerkembanganAnak" }); // Uncomment to enable redirect after creation
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
    await store.dispatch("fetchChildrenBaduta");
  } catch (error) {
    console.error("Error fetching children in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};
// console.log(store.getters.childBaduta);
const children = computed(() =>
  store.getters.childBaduta.map((child) => ({
    value: child._id,
    name: child.name,
  }))
);

const groupFase = [
  { value: "Trimester 1", name: "Trimester 1" },
  { value: "Trimester 2", name: "Trimester 2" },
  { value: "Trimester 3", name: "Trimester 3" },
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
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="childrenGrowthData.heightBody"
          label="Tinggi Badan"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="childrenGrowthData.weightBody"
          label="Berat Badan"
        />
      </div>
      <div>
        <fwb-select
          v-model="childrenGrowthData.groupFase"
          :options="groupFase"
          label="Pilih Fase"
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
