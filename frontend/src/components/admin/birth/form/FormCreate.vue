<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import { handleNumericInput } from "../../../../utils/Validate";
const store = useStore();
const router = useRouter();

const gender = [
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

const birthData = ref({
  name: "",
  nik: "",
  gender: "",
  dob: "",
  circumHead: null,
  heightBody: null,
  weightBody: null,
  mother: "",
});

const handleSubmit = async () => {
  try {
    await store.dispatch("createBirth", birthData.value);
    console.log("New birth added");
    alert("Success created data");
    router.push({ name: "dashboardAdminKelahiran" }); // Redirect to births list after action
  } catch (error) {
    console.error("Error adding birth:", error);
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
  fetchMothers();
  fetchChildren();
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="birthData.name" label="Nama Anak" required />
      </div>
      <div>
        <fwb-input
          v-model="birthData.nik"
          label="NIK Anak"
          required
          @input="(event) => handleNumericInput(event, 'nik')"
        />
      </div>
      <div>
        <fwb-select
          v-model="birthData.gender"
          :options="gender"
          label="Jenis Kelamin"
          required
        />
      </div>
      <div>
        <fwb-input
          type="date"
          v-model="birthData.dob"
          label="Tanggal Lahir"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="birthData.circumHead"
          label="Lingkar Kepala"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="birthData.heightBody"
          label="Tinggi Badan"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="birthData.weightBody"
          label="Berat Badan"
        />
      </div>
      <div>
        <fwb-select
          v-model="birthData.mother"
          :options="mothers"
          label="Pilih Ibu"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Simpan</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminKelahiran' })"
      >
        Batal
      </fwb-button>
    </div>
  </form>
</template>
