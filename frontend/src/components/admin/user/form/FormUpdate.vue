<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import {
  validateNomorHp,
  handleNumericInput,
} from "../../../../utils/Validate";
import formatTime from "../../../../utils/FormatTime";
const store = useStore();
const router = useRouter();
const route = useRoute();

const userData = ref({
  username: "",
  email: "",
  numberHp: "",
  password: "",
  mother: "",
  role: "",
});

onMounted(async () => {
  await fetchMothers();
  await fetchUser(route.params.id);
});

const fetchMothers = async () => {
  try {
    await store.dispatch("fetchMothers");
  } catch (error) {
    console.error("Error fetching mothers in component:", error);
    console.error("Details:", error.message);
  }
};

const mothers = computed(() =>
  store.getters.mothers.map((mother) => ({
    value: mother._id,
    name: `${mother.name} - ${formatTime(mother.dob)}`,
  }))
);

const fetchUser = async (id) => {
  try {
    const data = await store.dispatch("fetchUserOne", id);
    userData.value = {
      username: data.username,
      email: data.email,
      numberHp: data.numberHp,
      password: data.password,
      mother: data.mother._id || "",
      role: data.role,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const handleSubmit = async () => {
  try {
    const isNumberValid = validateNomorHp(userData.value.numberHp);
    if (isNumberValid) {
      await store.dispatch("updateUser", {
        id: route.params.id,
        userData: {
          username: userData.value.username,
          email: userData.value.email,
          numberHp: userData.value.numberHp,
          password: userData.value.password,
          mother: userData.value.mother,
          role: userData.value.role,
        },
      });
    } else {
      let errorMessage = "";
      if (!isNumberValid) errorMessage += "Nomor HP tidak valid.\n";
      alert(errorMessage);
    }
    alert(`Berhasil update data user`);
    router.push({ name: "dashboardAdminUser" });
  } catch (error) {
    console.error("Error updating user:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
  }
};
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
        <!-- <p>{{childData.mother}}</p> -->
        <fwb-select
          v-model="userData.mother"
          :options="mothers"
          label="Select Ibu Anak"
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
