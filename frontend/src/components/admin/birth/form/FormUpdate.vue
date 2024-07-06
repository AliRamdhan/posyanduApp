<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const birthId = route.params.id;

const gender = [
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

const birthData = ref({
  dob: "",
  circumHead: null,
  heightBody: null,
  weightBody: null,
  children: "",
  mother: "",
});

const fetchBirth = async () => {
  try {
    const data = await store.dispatch("fetchBirth", birthId);
    // Ensure that the fetched data is assigned to birthData
    birthData.value = {
      dob: data.dob ? new Date(data.dob).toISOString().substring(0, 10) : "",
      circumHead: data.circumHead,
      heightBody: data.heightBody,
      weightBody: data.weightBody,
      children: data.children ? data.children._id : "",
      mother: data.mother ? data.mother._id : "",
    };
  } catch (error) {
    console.error("Error fetching birth:", error);
  }
};

const handleSubmit = async () => {
  try {
    await store.dispatch("updateBirth", { id: birthId, birthData: birthData.value });
    console.log("Birth record updated");
    router.push({ name: "dashboardAdminKelahiran" }); // Redirect to dashboardAdminKelahiran list after update
  } catch (error) {
    console.error("Error updating birth:", error);
  }
};

const fetchMothers = async () => {
  try {
    await store.dispatch("fetchMothers");
  } catch (error) {
    console.error("Error fetching mothers:", error);
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

const children = computed(() =>
  store.getters.children.map((child) => ({
    value: child._id,
    name: child.name,
  }))
);

onMounted(() => {
  fetchBirth();
  fetchMothers();
  fetchChildren();
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input type="date" v-model="birthData.dob" label="Tanggal Lahir" required />
      </div>
      <div>
        <fwb-input type="number" v-model.number="birthData.circumHead" label="Lingkar Kepala" />
      </div>
      <div>
        <fwb-input type="number" v-model.number="birthData.heightBody" label="Tinggi Badan" />
      </div>
      <div>
        <fwb-input type="number" v-model.number="birthData.weightBody" label="Berat Badan" />
      </div>
      <div>
        <fwb-select v-model="birthData.children" :options="children" label="Pilih Anak" />
      </div>
      <div>
        <fwb-select v-model="birthData.mother" :options="mothers" label="Pilih Ibu" />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Update</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminKelahiran' })"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
