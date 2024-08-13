<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect, FwbCheckbox } from "flowbite-vue";
import formatTime from "../../../../../utils/FormatTime";

const store = useStore();
const router = useRouter();
const route = useRoute();
const childGrowthId = route.params.id;
const today = new Date().toISOString().split("T")[0];

const childrenGrowthData = ref({
  checkDate: "",
  groupFase: "",
  heightBody: null,
  weightBody: null,
  isBaduta: true,
  childrens: null,
  imunisations: null,
});

const fetchChildrenGrowth = async () => {
  if (childGrowthId) {
    try {
      const data = await store.dispatch("fetchChildBaduta", childGrowthId);
      childrenGrowthData.value = {
        checkDate: data.checkDate
          ? new Date(data.checkDate).toISOString().substring(0, 10)
          : "",
        groupFase: data.groupFase,
        heightBody: data.heightBody,
        weightBody: data.weightBody,
        isBaduta: data.isBaduta,
        childrens: data.childrens ? data.childrens._id : "",
        imunisations: data.imunisations ? data.imunisations._id : "",
      };
    } catch (error) {
      console.error("Error fetching children growth:", error);
    }
  }
};

const handleSubmit = async () => {
  try {
    await store.dispatch("updateChildBaduta", {
      id: childGrowthId,
      childData: childrenGrowthData.value,
    });
    alert("Berhasil update data pertumbuhan");
    router.push({ name: "dashboardAdminPerkembanganAnak" }); // Redirect to list after update
  } catch (error) {
    console.error("Error updating children growth:", error);
  }
};

const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren");
  } catch (error) {
    console.error("Error fetching children in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const fetchImmunisations = async () => {
  try {
    await store.dispatch("fetchImmunisations");
  } catch (error) {
    console.error("Error fetching immunisations in component:", error);
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

const children = computed(() =>
  store.getters.childrens.map((child) => ({
    value: child._id,
    name: `${child.name} - ${formatTime(child.dob)}`,
  }))
);

onMounted(() => {
  fetchChildrenGrowth();
  fetchChildren();
  fetchImmunisations();
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
      <fwb-button type="submit" color="default">Update</fwb-button>
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
