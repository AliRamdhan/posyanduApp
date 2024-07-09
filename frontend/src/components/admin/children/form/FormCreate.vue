<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";

const store = useStore();
const router = useRouter();

const gender = [
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

const childData = ref({
  name: "",
  nik: "",
  gender: "",
  dob: "",
  amountImunisation: 0,
  mother: "",
});

const handleSubmit = async () => {
  try {
    await store.dispatch("addChild", childData.value);
    console.log("New child added");
    router.push({ name: "dashboardAdminAnak" }); // Redirect to dashboardAdminAnak list after action
  } catch (error) {
    console.error("Error adding child:", error);
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
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="childData.name" label="Nama" required />
      </div>
      <div>
        <fwb-input v-model="childData.nik" label="NIK" required />
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
        />
      </div>
      <div>
        <fwb-input
          v-model.number="childData.amountImunisation"
          type="number"
          label="Jumlah Imunisasi"
          required
        />
      </div>
      <div>
        <fwb-select
          v-model="childData.mother"
          :options="mothers"
          label="Select Ibu Anak"
        />
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
