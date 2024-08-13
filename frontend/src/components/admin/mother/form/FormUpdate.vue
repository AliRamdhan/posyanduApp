<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbButton, FwbInput, FwbSelect } from "flowbite-vue";
import {
  validateNomorKKNIK,
  handleNumericInput,
} from "../../../../utils/Validate";

const store = useStore();
const router = useRouter();
const route = useRoute();

const existData = ref({
  name: "",
  nik: "",
  kk: "",
  husband: "",
  husbandnik: "",
  dob: "",
  bpjs: null,
  isPregnant: null,
  ks: "",
  rt: null,
  rw: null,
  amountChild: 0,
});

const bpjs = [
  { value: true, name: "Punya BPJS" },
  { value: false, name: "Tidak Punya BPJS" },
];

const kss = [
  { value: "KS1", name: "KS 1" },
  { value: "KS2", name: "KS 2" },
  { value: "KS3", name: "KS 3" },
];

const isStatus = [
  { value: true, name: "Hamil" },
  { value: false, name: "Tidak Hamil" },
];
const today = new Date().toISOString().split('T')[0]; 
const fetchMother = async (id) => {
  try {
    const data = await store.dispatch("fetchMother", id);
    existData.value = {
      name: data.name,
      nik: data.nik,
      kk: data.kk,
      husband: data.husband,
      husbandnik: data.husbandnik,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      isPregnant: data.isPregnant,
      bpjs: data.bpjs,
      ks: data.ks,
      rt: data.rt,
      rw: data.rw,
      amountChild: data.amountChild,
    };

    selectedStatus.value = isStatus.find(
      (status) => status.value === data.isPregnant
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch mother data on component mount
onMounted(async () => {
  await fetchMother(route.params.id);
});

const handleSubmit = async () => {
  try {
    const isNikValid = validateNomorKKNIK(existData.value.nik);
    const isKkValid = validateNomorKKNIK(existData.value.kk);
    const isNikSuamiValid = validateNomorKKNIK(existData.value.husbandnik);

    if (isNikValid && isKkValid && isNikSuamiValid) {
      const data = await store.dispatch("updateMother", {
        id: route.params.id,
        motherData: {
          name: existData.value.name,
          nik: existData.value.nik,
          kk: existData.value.kk,
          husband: existData.value.husband,
          husbandnik: existData.value.husbandnik,
          dob: existData.value.dob,
          bpjs: existData.value.bpjs,
          isPregnant: existData.value.isPregnant,
          ks: existData.value.ks,
          rt: existData.value.rt,
          rw: existData.value.rw,
          amountChild: existData.value.amountChild,
        },
      });
      alert(`Berhasil update data ibu`);
      router.push({ name: "dashboardAdminIbu" });
    } else {
      let errorMessage = "";
      if (!isNikValid) errorMessage += "Nomor NIK tidak valid.\n";
      if (!isKkValid) errorMessage += "Nomor KK tidak valid.\n";
      if (!isNikSuamiValid) errorMessage += "Nomor NIK Suami tidak valid.\n";
      alert(errorMessage);
    }
  } catch (error) {
    console.error("Error updating mother:", error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="existData.name" label="Nama" required />
      </div>
      <div>
        <fwb-select
          v-model="existData.isPregnant"
          :options="isStatus"
          label="Select Status"
        />
      </div>
      <div>
        <fwb-input
          v-model="existData.nik"
          label="NIK"
          @input="(event) => handleNumericInput(event, 'nik')"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model="existData.kk"
          label="KK"
          @input="(event) => handleNumericInput(event, 'kk')"
          required
        />
      </div>
      <div>
        <fwb-input v-model="existData.husband" label="Nama Suami" required />
      </div>
      <div>
        <fwb-input
          v-model="existData.husbandnik"
          @input="(event) => handleNumericInput(event, 'husbandnik')"
          label="NIK Suami"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model="existData.dob"
          type="date"
          label="Tanggal Lahir"
          required
          :max="today"
        />
      </div>
      <div>
        <fwb-select
          v-model="existData.bpjs"
          :options="bpjs"
          label="Select BPJS"
        />
      </div>
      <div>
        <fwb-select v-model="existData.ks" :options="kss" label="Select KS" />
      </div>
      <div>
        <fwb-input v-model="existData.rt" label="RT" />
      </div>
      <div>
        <fwb-input v-model="existData.rw" label="RW" />
      </div>
      <div>
        <fwb-input
          v-model="existData.amountChild"
          type="number"
          label="Jumlah Anak"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <router-link to="/mother">
        <fwb-button
          type="button"
          class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        >
          Cancel
        </fwb-button>
      </router-link>
    </div>
  </form>
</template>
