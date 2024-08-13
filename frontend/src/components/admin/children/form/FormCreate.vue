<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import {
  isBalita,
  handleNumericInput,
  validateNomorKKNIK,
} from "../../../../utils/Validate";
import formatTime from "../../../../utils/FormatTime";
const store = useStore();
const router = useRouter();

const gender = [
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

const isStatus = [
  { value: "baduta", name: "Bayi Usia Dua Tahun" },
  { value: "balita", name: "Bayi Usia Lima Tahun" },
];

const mothersAll = store.getters.mothersAll;
const today = new Date().toISOString().split('T')[0]; 

const childData = ref({
  name: "",
  nik: "",
  gender: "",
  dob: "",
  amountImunisation: 0,
  mother: "",
});
const error = ref(null);
const handleSubmit = async () => {
  try {
    const isNikValid = validateNomorKKNIK(childData.value.nik);
    if (isNikValid) {
      await store.dispatch("createChild", childData.value);
      alert("Data berhasil ditambahkan");
      router.push({ name: "dashboardAdminAnak" });
    } else {
      let errorMessage = "";
      if (!isNikValid) errorMessage += "Nomor NIK tidak valid.\n";
      alert(errorMessage);
    }
  } catch (err) {
    if (err.message === "NIK telah digunakan") {
      alert("NIK telah digunakan. Mohon gunakan NIK lain.");
    } else {
      alert("Terjadi kesalahan saat menambahkan data.");
    }
    console.error("Error adding child:", err);
  }
};

const fetchMothersSelect = async () => {
  try {
    await store.dispatch("fetchMothersAll");
  } catch (error) {
    console.error("Error fetching mothers in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const mothers = computed(() =>
  store.getters.mothersAll.map((mother) => ({
    value: mother._id,
    name: `${mother.name} - ${formatTime(mother.dob)}`,
  }))
);

onMounted(() => {
  fetchMothersSelect();
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="childData.name" label="Nama" required />
      </div>
      <div>
        <fwb-input
          v-model="childData.nik"
          label="NIK"
          required
          @input="(event) => handleNumericInput(event, 'nik')"
        />
      </div>
      <div>
        <fwb-select
          v-model="childData.gender"
          :options="gender"
          label="Select Gender"
        />
      </div>
      <div>
        <fwb-input
          type="date"
          v-model="childData.dob"
          label="Tanggal Lahir"
          required
          :max="today"
        />
      </div>
      <div>
        <fwb-select
          v-model="childData.mother"
          :options="mothers"
          label="Select Ibu Anak"
        />
      </div>
      <div v-if="error" class="w-full">
        <div class="absolute top-24 right-8">
          <fwb-alert icon type="danger">
            <span className="font-medium">Info alert!</span> {{ error }}
          </fwb-alert>
        </div>
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        @click="router.push({ name: 'dashboardAdminAnak' })"
        type="button"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
