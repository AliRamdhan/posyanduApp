<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import StatsCard from "./StatsCard.vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalDetailsStatsHamil from "./ModalDetailsStatsHamil.vue";
import ModalDetailsStatsMenyusui from "./ModalDetailsStatsMenyusui.vue";

const store = useStore();
const router = useRouter();

const mothersGrowth = computed(() => store.getters.motherGrowths);
const mothers = computed(() => store.getters.mothers);

const fetchMothersGrowth = async () => {
  try {
    await store.dispatch("fetchMotherGrowths");
  } catch (error) {
    console.error(error);
  }
};

const fetchMothers = async () => {
  try {
    await store.dispatch("fetchMothers");
  } catch (error) {
    console.error(error);
  }
};

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

const pregnantMothers = computed(() =>
  mothers.value.filter((mother) => mother.isPregnant)
);
const breastfeedingMothers = computed(() =>
  mothers.value.filter((mother) => mother.isBreastfeed)
);

const averageAge = (filteredMothers) => {
  if (filteredMothers.length === 0) return 0;
  const totalAge = filteredMothers.reduce(
    (sum, mother) => sum + calculateAge(mother.dob),
    0
  );
  return (totalAge / filteredMothers.length).toFixed(1);
};

const averageAgePregnant = computed(() => averageAge(pregnantMothers.value));
const averageAgeBreastfeeding = computed(() =>
  averageAge(breastfeedingMothers.value)
);

onMounted(() => {
  fetchMothers();
  fetchMothersGrowth();
});

const isShowModal = ref(false);
const modalType = ref(null);

function closeModal() {
  isShowModal.value = false;
  modalType.value = null;
}

function showModal(type) {
  isShowModal.value = true;
  modalType.value = type;
}
</script>

<template>
  <div class="py-8 flex flex-col justify-center items-center">
    <div class="grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
      <StatsCard
        statsName="Ibu Hamil"
        :statsNumber="
          mothers?.filter((mother) => mother.isPregnant).length || 0
        "
        statsDescription="Jumlah Ibu Hamil di RW 10"
        statsIcon="fa-solid fa-person-pregnant"
        @click="showModal('ibuHamil')"
        :isModal="true"
      />
      <StatsCard
        statsName="Total Ibu"
        :statsNumber="mothers?.length || 0"
        statsDescription="Total jumlah Ibu di RW 10"
        statsIcon="fa-solid fa-child-dress"
        :isModal="false"
      />
    </div>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">
          Statistik
          {{ modalType === "ibuHamil" ? "Ibu Hamil" : "Ibu Menyusui" }}
        </div>
      </template>
      <template #body>
        <div v-if="modalType === 'ibuHamil'">
          <ModalDetailsStatsHamil
            statsName="Ibu Hamil"
            :statsNumberTrimester1="
              mothersGrowth?.filter(
                (growth) => growth.groupFase === 'Trimester 1'
              ).length || 0
            "
            :statsNumberTrimester2="
              mothersGrowth?.filter(
                (growth) => growth.groupFase === 'Trimester 2'
              ).length || 0
            "
            :statsNumberTrimester3="
              mothersGrowth?.filter(
                (growth) => growth.groupFase === 'Trimester 3'
              ).length || 0
            "
            :statsNumberUsia="averageAgePregnant"
            :statsNumberTotal="
              mothers?.filter((mother) => mother.isPregnant).length || 0
            "
          />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <fwb-button @click="closeModal" color="dark" class="px-16">
            Back
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </div>
</template>
