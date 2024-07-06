<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbSelect } from "flowbite-vue";

const store = useStore();
const router = useRouter();

const motherGrowthData = ref({
  checkDate: "",
  height: null,
  weight: null,
  kbtype: "",
  pregnantStatus: false,
  wombAge: null,
  numbChild: null,
  groupFase: "",
  circumStomach: null,
  circumHand: null,
  mother: "",
});

const handleSubmit = async () => {
  try {
    await store.dispatch("createMotherGrowth", motherGrowthData.value);
    console.log("Mother growth record created");
    router.push({ name: "dashboardAdminPerkembanganIbu" });
  } catch (error) {
    console.error("Error creating mother growth:", error);
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

const groupFase = [
  { value: "0-1", name: "0-1" },
  { value: "1-3", name: "1-3" },
  { value: "3-6", name: "3-6" },
  { value: "9-12", name: "9-12" },
  { value: "12-18", name: "12-18" },
  { value: "18-24", name: "18-24" },
];

onMounted(()=>{
  fetchMothers()
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <p>Pregnant Status</p>
        <div class="flex items-center gap-4 py-2">
          <fwb-input
            type="checkbox"
            v-model="motherGrowthData.pregnantStatus"
            class="w-4"
          />
          <span class="text-sm">Jika hamil, ceklis</span>
        </div>
      </div>
      <div>
        <fwb-input
          type="date"
          v-model="motherGrowthData.checkDate"
          label="Check Date"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.height"
          label="Height"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.weight"
          label="Weight"
          required
        />
      </div>
      <div>
        <fwb-input
          type="text"
          v-model="motherGrowthData.kbtype"
          label="KB Type"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.wombAge"
          label="Womb Age"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.numbChild"
          label="Number of Children"
        />
      </div>
      <div>
        <fwb-select
          v-model="motherGrowthData.groupFase"
          :options="groupFase"
          label="Group Fase"
          required
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.circumStomach"
          label="Circumference of Stomach"
        />
      </div>
      <div>
        <fwb-input
          type="number"
          v-model.number="motherGrowthData.circumHand"
          label="Circumference of Hand"
        />
      </div>
      <div>
        <fwb-select
          v-model="motherGrowthData.mother"
          :options="mothers"
          label="Mother"
          required
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Save</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminPerkembanganIbu' })"
      >
        Cancel
      </fwb-button>
    </div>
  </form>
</template>
