<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import {
  validateNomorKKNIK,
  handleNumericInput,
} from "../../../../utils/Validate";

const store = useStore();
const router = useRouter();

const selected = ref("");
const bpjs = [
  { value: true, name: "Punya BPJS" },
  { value: false, name: "Tidak Punya BPJS" },
];
const isStatus = [
  { value: true, name: "Hamil" },
  { value: false, name: "Tidak Hamil" },
];
const kss = [
  { value: "KS1", name: "Kesejahteraan Sosial 1" },
  { value: "KS2", name: "Kesejahteraan Sosial 2" },
  { value: "KS3", name: "Kesejahteraan Sosial 3" },
];
const data = ref({
  name: "",
  nik: "",
  kk: "",
  husband: "",
  husbandnik: "",
  dob: "",
  bpjs: null,
  isPregnant: null,
  ks: "",
  RT: null,
  RW: null,
  amountChild: 0,
});
const error = ref(null);
const today = new Date().toISOString().split('T')[0]; 
const selectedStatus = ref(null);

const handleSubmit = async () => {
  try {
    const isNikValid = validateNomorKKNIK(data.value.nik);
    const isKkValid = validateNomorKKNIK(data.value.kk);
    const isNikSuamiValid = validateNomorKKNIK(data.value.husbandnik);

    if (isNikValid && isKkValid && isNikSuamiValid) {
      await store.dispatch("createMother", data.value);
      alert("Data berhasil ditambahkan");
      router.push({ name: "dashboardAdminIbu" });
    } else {
      let errorMessage = "";
      if (!isNikValid) errorMessage += "Nomor NIK tidak valid.\n";
      if (!isKkValid) errorMessage += "Nomor KK tidak valid.\n";
      if (!isNikSuamiValid) errorMessage += "Nomor NIK Suami tidak valid.\n";
      alert(errorMessage);
    }
  } catch (err) {
    console.error("Error adding mother:", err);
    alert(err);
    error.value = err;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="data.name" label="Nama" required />
      </div>
      <div>
        <fwb-select
          v-model="data.isPregnant"
          :options="isStatus"
          label="Select Status"
        />
      </div>
      <div>
        <fwb-input
          v-model="data.nik"
          label="NIK"
          required
          @input="(event) => handleNumericInput(event, 'nik')"
        />
      </div>
      <div>
        <fwb-input
          v-model="data.kk"
          label="KK"
          required
          @input="(event) => handleNumericInput(event, 'kk')"
        />
      </div>
      <div>
        <fwb-input v-model="data.husband" label="Nama Suami" required />
      </div>
      <div>
        <fwb-input
          v-model="data.husbandnik"
          label="NIK Suami"
          required
          @input="(event) => handleNumericInput(event, 'husbandnik')"
        />
      </div>
      <div>
        <fwb-input
          v-model="data.dob"
          type="date"
          label="Tanggal Lahir"
          required
          :max="today"
        />
      </div>
      <div>
        <fwb-select v-model="data.bpjs" :options="bpjs" label="BPJS" />
      </div>
      <div>
        <fwb-select
          v-model="data.ks"
          :options="kss"
          label="Kesejahteraan Sosial"
        />
      </div>
      <div>
        <fwb-input v-model="data.rt" type="number" label="RT" min="0"/>
      </div>
      <div>
        <fwb-input v-model="data.rw" type="number" label="RW" min="0"/>
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
      <router-link to="/dashboard/admin/ibu">
        <fwb-button
          class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          type="button"
        >
          Cancel
        </fwb-button>
      </router-link>
    </div>
  </form>
</template>
