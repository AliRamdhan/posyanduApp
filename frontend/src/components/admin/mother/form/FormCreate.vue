<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
const store = useStore();
const router = useRouter();

const selected = ref("");
const bpjs = [
  { value: true, name: "Punya BPJS" },
  { value: false, name: "Tidak Punya BPJS" },
];
const isStatus = [
  { value: "pregnant", name: "Hamil" },
  { value: "breastfeed", name: "Menyusui" },
];
const kss = [
  { value: "KS1", name: "KS 1" },
  { value: "KS2", name: "KS 2" },
  { value: "KS3", name: "KS 3" },
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
  isBreastfeed: null,
  ks: "",
  RT: null,
  RW: null,
  amountChild: 0,
});

const selectedStatus = ref(null); // new ref to track the selected status

watch(selectedStatus, (newValue) => {
  if (newValue === "pregnant") {
    data.value.isPregnant = true;
    data.value.isBreastfeed = false;
  } else if (newValue === "breastfeed") {
    data.value.isBreastfeed = true;
    data.value.isPregnant = false;
  } else {
    data.value.isPregnant = null;
    data.value.isBreastfeed = false;
  }
});

const handleSubmit = async () => {
  try {
    await store.dispatch("createMother", data.value);
    alert("New data added");
    console.log(data.value);
    // router.push({ name: "dashboardAdminIbu" }); // Redirect to mothers list after action
  } catch (error) {
    console.error("Error adding mother:", error);
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
          v-model="selectedStatus"
          :options="isStatus"
          label="Select Status"
        />
      </div>
      <div>
        <fwb-input v-model="data.nik" label="NIK" type="number" required />
      </div>
      <div>
        <fwb-input v-model="data.kk" label="KK" type="number" required />
      </div>
      <div>
        <fwb-input v-model="data.husband" label="Nama Suami" required />
      </div>
      <div>
        <fwb-input
          v-model="data.husbandnik"
          label="NIK Suami"
          type="number"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model="data.dob"
          type="date"
          label="Tanggal Lahir"
          required
        />
      </div>
      <div>
        <!-- <fwb-input v-model="data.bpjs" label="BPJS" /> -->
        <fwb-select v-model="data.bpjs" :options="bpjs" label="Select BPJS" />
      </div>
      <div>
        <fwb-select v-model="data.ks" :options="kss" label="Select KS" />
      </div>
      <div>
        <fwb-input v-model="data.rt" type="number" label="RT" />
      </div>
      <div>
        <fwb-input v-model="data.rw" type="number" label="RW" />
      </div>
      <div>
        <fwb-input
          v-model="data.amountChild"
          type="number"
          label="Jumlah Anak"
          required
        />
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
