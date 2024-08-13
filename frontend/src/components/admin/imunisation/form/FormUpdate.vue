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
  groupAge: 0,
  descriptionPrevented: "",
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
      descriptionPrevented: data.descriptionPrevented,
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
        descriptionPrevented: existData.value.descriptionPrevented,
      },
    });
    alert("Data imunisasi berhasil di update");
    router.push({ name: "dashboardAdminImunisasi" });
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
          type="number"
          label="Kelompok Usia Imunisasi"
          min="0"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model="existData.descriptionPrevented"
          label="Description Prevented"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>

      <fwb-button
        @click="router.push({ name: 'dashboardAdminImunisasi' })"
        type="button"
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        >Cancel</fwb-button
      >
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style></style>
