<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbButton, FwbInput, FwbSelect } from "flowbite-vue";

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
  isBreastfeed: null,
  ks: "",
  rt: null,
  rw: null,
  amountChild: 0,
});

const isStatus = [
  { value: "pregnant", name: "Hamil" },
  { value: "breastfeed", name: "Menyusui" },
];

const selectedStatus = ref(null);

const bpjs = [
  { value: true, name: "Punya BPJS" },
  { value: false, name: "Tidak Punya BPJS" },
];

const kss = [
  { value: "KS1", name: "KS 1" },
  { value: "KS2", name: "KS 2" },
  { value: "KS3", name: "KS 3" },
];

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
      isBreastfeed: data.isBreastfeed,
      bpjs: data.bpjs,
      ks: data.ks,
      rt: data.rt,
      rw: data.rw,
      amountChild: data.amountChild,
    };
    if (data.isPregnant) {
      selectedStatus.value = "pregnant";
    } else if (data.isBreastfeed) {
      selectedStatus.value = "breastfeed";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch mother data on component mount
onMounted(async () => {
  await fetchMother(route.params.id);
});

watch(selectedStatus, (newValue) => {
  if (newValue === "pregnant") {
    existData.value.isPregnant = true;
    existData.value.isBreastfeed = false;
  } else if (newValue === "breastfeed") {
    existData.value.isBreastfeed = true;
    existData.value.isPregnant = false;
  } else {
    existData.value.isPregnant = false;
    existData.value.isBreastfeed = false;
  }
});

const handleSubmit = async () => {
  try {
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
        isBreastfeed: existData.value.isBreastfeed,
        ks: existData.value.ks,
        rt: existData.value.rt,
        rw: existData.value.rw,
        amountChild: existData.value.amountChild,
      },
    });
    alert(`Data with ID ${route.params.id} updated`, data);
    router.push({ name: "dashboardAdminIbu" }); // Redirect to mothers list after action
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
          v-model="selectedStatus"
          :options="isStatus"
          label="Select Status"
        />
      </div>
      <div>
        <fwb-input v-model="existData.nik" label="NIK" required />
      </div>
      <div>
        <fwb-input v-model="existData.kk" label="KK" required />
      </div>
      <div>
        <fwb-input v-model="existData.husband" label="Nama Suami" required />
      </div>
      <div>
        <fwb-input v-model="existData.husbandnik" label="NIK Suami" required />
      </div>
      <div>
        <fwb-input
          v-model="existData.dob"
          type="date"
          label="Tanggal Lahir"
          required
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
