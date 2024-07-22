<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import {
  isBalita,
  handleNumericInput,
  validateNomorKKNIK,
} from "../../../../utils/Validate";
const store = useStore();
const router = useRouter();
const route = useRoute();

const gender = [
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

// const isStatus = [
//   { value: "baduta", name: "Bayi Usia Dua Tahun" },
//   { value: "balita", name: "Bayi Usia Lima Tahun" },
// ];

// const selectedStatus = ref(null);

const childData = ref({
  name: "",
  nik: "",
  gender: "",
  dob: "",
  amountImunisation: 0,
  mother: "",
});

onMounted(async () => {
  await fetchMothers();
  await fetchChild(route.params.id);
});

// watch(selectedStatus, (newValue) => {
//   if (newValue === "baduta") {
//     childData.value.isBaduta = true;
//     childData.value.isBalita = false;
//   } else if (newValue === "balita") {
//     childData.value.isBalita = true;
//     childData.value.isBaduta = false;
//   } else {
//     childData.value.isBaduta = null;
//     childData.value.isBalita = false;
//   }
// });

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

const fetchChild = async (id) => {
  try {
    const data = await store.dispatch("fetchChild", id);
    childData.value = {
      name: data.name,
      nik: data.nik,
      gender: data.gender,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      amountImunisation: data.amountImunisation,
      mother: data.mother,
      isBaduta: data.isBaduta,
      isBalita: data.isBalita,
    };
    if (data.isBaduta) {
      selectedStatus.value = "baduta";
    } else if (data.isBalita) {
      selectedStatus.value = "balita";
    }
  } catch (error) {
    console.error("Error fetching child:", error);
  }
};

const handleSubmit = async () => {
  try {
    const isNikValid = validateNomorKKNIK(childData.value.nik);
    if (isNikValid) {
      await store.dispatch("updateChild", {
        id: route.params.id,
        childData: {
          name: childData.value.name,
          nik: childData.value.nik,
          gender: childData.value.gender,
          dob: childData.value.dob,
          amountImunisation: childData.value.amountImunisation,
          mother: childData.value.mother,
          isBaduta: childData.value.isBaduta,
          isBalita: childData.value.isBalita,
        },
      });
    } else {
      let errorMessage = "";
      if (!isNikValid) errorMessage += "Nomor NIK tidak valid.\n";
      alert(errorMessage);
    }
    alert(`Child with ID ${route.params.id} updated`);
    router.push({ name: "dashboardAdminAnak" }); // Redirect to children list after action
  } catch (error) {
    console.error("Error updating child:", error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="childData.name" label="Nama" required />
      </div>
      <!-- <div>
        <fwb-select
          v-model="selectedStatus"
          :options="isStatus"
          label="Select Status"
        />
      </div> -->
      <div>
        <fwb-input
          v-model="childData.nik"
          label="NIK"
          @input="(event) => handleNumericInput(event, 'nik')"
          required
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
        />
      </div>
      <div>
        <!-- <p>{{childData.mother}}</p> -->
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
        type="button"
        @click="router.push({ name: 'dashboardAdminAnak' })"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
