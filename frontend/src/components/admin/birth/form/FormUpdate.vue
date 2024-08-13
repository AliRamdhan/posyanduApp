<!-- UpdateBirthForm.vue -->
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";
import { handleNumericInput } from "../../../../utils/Validate";
import formatTime from "../../../../utils/FormatTime";

const store = useStore();
const router = useRouter();
const route = useRoute();
const today = new Date().toISOString().split("T")[0];

const birthData = ref({
  name: "",
  nik: "",
  gender: "",
  dob: "",
  circumHead: null,
  heightBody: null,
  weightBody: null,
  mother: "",
});

const gender = [
  { value: "Male", name: "Laki-laki" },
  { value: "Female", name: "Perempuan" },
];

const fetchBirthData = async () => {
  try {
    const data = await store.dispatch("fetchBirth", route.params.id);
    birthData.value = {
      name: data.children?.name,
      nik: data.children?.nik,
      gender: data.children?.gender,
      dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      circumHead: data.circumHead,
      heightBody: data.heightBody,
      weightBody: data.weightBody,
      mother: data.children?.mother?._id,
      children: data.children?._id,
    };
  } catch (error) {
    console.error("Error fetching birth data:", error);
  }
};

const handleUpdate = async () => {
  try {
    const data = await store.dispatch("updateBirth", {
      id: route.params.id,
      birthData: {
        name: birthData.value.name,
        nik: birthData.value.nik,
        gender: birthData.value.gender,
        dob: birthData.value.dob,
        circumHead: birthData.value.circumHead,
        heightBody: birthData.value.heightBody,
        weightBody: birthData.value.weightBody,
        mother: birthData.value.mother,
        children: birthData.value.children,
      },
    });
    alert("Berhasil update data kelahiran");
    router.push({ name: "dashboardAdminKelahiran" });
  } catch (error) {
    console.error("Error updating birth:", error);
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

const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren");
  } catch (error) {
    console.error("Error fetching children in component:", error);
    console.error(
      "Details:",
      error.response ? error.response.data : error.message
    );
  }
};

const children = computed(() =>
  store.getters.children.map((child) => ({
    value: child._id,
    name: child.name,
  }))
);

onMounted(() => {
  fetchBirthData();
  fetchMothers();
  fetchChildren();
});
</script>

<template>
  <form @submit.prevent="handleUpdate">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <fwb-input v-model="birthData.name" label="Nama Anak" required />
      </div>
      <div>
        <fwb-input
          v-model="birthData.nik"
          label="NIK Anak"
          required
          @input="(event) => handleNumericInput(event, 'nik')"
        />
      </div>
      <div>
        <fwb-select
          v-model="birthData.gender"
          :options="gender"
          label="Jenis Kelamin"
          required
        />
      </div>
      <div>
        <fwb-input
          type="date"
          v-model="birthData.dob"
          label="Tanggal Lahir"
          required
          :max="today"
        />
      </div>
      <div>
        <fwb-input
          v-model.number="birthData.circumHead"
          label="Lingkar Kepala (cm)"
          @input="(event) => handleNumericInputDecimal(event, 'circumHead')"
        />
      </div>
      <div>
        <fwb-input
          v-model.number="birthData.heightBody"
          label="Tinggi Badan (cm)"
          @input="(event) => handleNumericInputDecimal(event, 'heightBody')"
        />
      </div>
      <div>
        <fwb-input
          v-model.number="birthData.weightBody"
          label="Berat Badan (kg)"
          @input="(event) => handleNumericInputDecimal(event, 'weightBody')"
        />
      </div>
      <div>
        <fwb-select
          v-model="birthData.mother"
          :options="mothers"
          label="Pilih Ibu"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Simpan</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminKelahiran' })"
      >
        Batal
      </fwb-button>
    </div>
  </form>
</template>
