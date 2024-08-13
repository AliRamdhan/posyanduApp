<script setup>
import { ref } from "vue";
import { FwbInput, FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const name = ref("");

const store = useStore();
const router = useRouter();

const data = ref({
  name: "",
  groupAge: 0,
  descriptionPrevented: "",
});

const handleSubmit = async () => {
  try {
    await store.dispatch("createImmunisation", data.value);
    alert("Data berhasil ditambahkan");
    router.push({ name: "dashboardAdminImunisasi" }); // Redirect to children list after action
  } catch (error) {
    console.error("Error adding child:", error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input
          v-model="data.name"
          id="name"
          label="Nama Imunisasi"
          placeholder="Input Name Imunisasi"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model="data.groupAge"
          id="groupAge"
          type="number"
          label="Kelompok Usia Imunisasi"
          placeholder="Input Kelompok Usia Manusia"
          required
        />
      </div>
      <div>
        <fwb-input
          v-model="data.descriptionPrevented"
          id="descriptionPrevented"
          label="Description Prevented"
          placeholder="Input Description"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <fwb-button
        @click="router.push({ name: 'dashboardAdminImunisasi' })"
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        >Cancel</fwb-button
      >
    </div>
  </form>
</template>
