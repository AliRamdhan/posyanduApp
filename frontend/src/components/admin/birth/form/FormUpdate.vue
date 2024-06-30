<script setup>
import { ref, onMounted } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const name = ref("");

const store = useStore();
const router = useRouter();
const route = useRoute();

const existData = ref({
  name: "",
  groupAge: "",
});

// Fetch child data on component mount
onMounted(async () => {
  await fetchImunisation(route.params.id);
});

const fetchImunisation = async (id) => {
  try {
    const data = await store.dispatch("fetchImmunisation", id);
    existData.value = {
      name: data.name,
      groupAge: data.groupAge,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleSubmit = async () => {
  try {
    await store.dispatch("updateImmunisation", {
      id: route.params.id,
      immunisationData: {
        name: existData.value.name,
        groupAge: existData.value.groupAge,
      },
    });
    alert(`Data with ID ${route.params.id} updated`);
    router.push({ name: "imunisasi" }); // Redirect to children list after action
  } catch (error) {
    console.error("Error updating child:", error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="existData.name" label="Nama Imunisasi" required />
      </div>
      <div>
        <fwb-input
          v-model="existData.groupAge"
          label="Kelompok Usia Imunisasi"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <router-link to="/imunisasi">
        <fwb-button
          type="button"
          class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          >Cancel</fwb-button
        >
      </router-link>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style></style>
