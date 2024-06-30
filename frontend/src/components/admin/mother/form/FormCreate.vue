<script setup>
import { ref } from "vue";
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
  KS: "",
  RT: null,
  RW: null,
  amountChild: 0,
});

const handleSubmit = async () => {
  try {
    await store.dispatch("createMother", data.value);
    alert("New data added");
    router.push({ name: "mother" }); // Redirect to mothers list after action
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
        <fwb-input v-model="data.nik" label="NIK" required />
      </div>
      <div>
        <fwb-input v-model="data.kk" label="KK" required />
      </div>
      <div>
        <fwb-input v-model="data.husband" label="Nama Suami" required />
      </div>
      <div>
        <fwb-input v-model="data.husbandnik" label="NIK Suami" required />
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
        <fwb-select v-model="data.KS" :options="kss" label="Select KS" />
      </div>
      <div>
        <fwb-input v-model="data.RT" type="number" label="RT" />
      </div>
      <div>
        <fwb-input v-model="data.RW" type="number" label="RW" />
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
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
