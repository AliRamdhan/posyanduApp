<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import {
  validateNomorHp,
  handleNumericInput,
} from "../../../../utils/Validate";
import formatTime from "../../../../utils/FormatTime";
const store = useStore();
const router = useRouter();

const userData = ref({
  username: "",
  email: "",
  numberHp: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    const isNumberValid = validateNomorHp(userData.value.numberHp);
    if (isNumberValid) {
      await store.dispatch("register", userData.value);
    } else {
      let errorMessage = "";
      if (!isNumberValid) errorMessage += "Nomor HP tidak valid.\n";
      alert(errorMessage);
    }
    alert("Berhasil menambahkan data user");
    router.push({ name: "dashboardAdminUser" });
  } catch (error) {
    console.error("Error adding user:", error);
    alert(error.message);
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
    name: `${mother.name} - ${formatTime(mother.dob)}`,
  }))
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="userData.username" label="Username" required />
      </div>
      <div>
        <fwb-input
          v-model="userData.email"
          label="Email"
          required
          type="email"
        />
      </div>
      <div>
        <fwb-input
          v-model="userData.numberHp"
          label="Nomor Handphone"
          required
          @input="(event) => handleNumericInput(event, 'numberHp')"
        />
      </div>
      <div>
        <fwb-input
          v-model="userData.password"
          label="Password"
          required
          type="password"
        />
      </div>

      <div>
        <fwb-select
          v-model="userData.mother"
          :options="mothers"
          label="Select Ibu"
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        @click="router.push({ name: 'dashboardAdminUser' })"
        type="button"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
