<script setup>
import StatsCard from "./Statistik.vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalDetailsStatsAnak from "../../components/datapublik/ModalDetailsStatsAnak.vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  averageAge,
  averageHeigtBody,
  averageWeightBody,
} from "../../utils/CalcurateAvg";

const store = useStore();
const router = useRouter();

const children = computed(() => store.getters.childrens);
const childrenGrowth = computed(() => store.getters.childrensGrowth);
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

const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren");
  } catch (error) {
    console.error("Error fetching children in component:", error);
  }
};

onMounted(() => {
  fetchMothers();
  fetchMothersGrowth();
  fetchChildren();
});
</script>

<template>
  <section
    class="w-full py-8 flex flex-col justify-center items-center"
  >
    <div class="grid gap-10 sm:grid-cols-1 lg:grid-cols-4">
      <StatsCard
        statsName="Balita Dua Tahun (Baduta)"
        :statsNumber="children?.filter((child) => child.isBaduta).length || 0"
        statsDescription="Jumlah Anak Baduta di RW 10"
        statsIcon="fa-solid fa-person-pregnant"
        @click="showModal('baduta')"
        :isModal="false"
      />
      <StatsCard
        statsName="Ibu Hamil"
        :statsNumber="
          mothers?.filter((mother) => mother.isPregnant).length || 0
        "
        statsDescription="Jumlah Ibu Hamil di RW 10"
        statsIcon="fa-solid fa-person-pregnant"
        @click="showModal('ibuHamil')"
        :isModal="false"
      />
      <StatsCard
        statsName="Balita Lima Tahun (Balita)"
        :statsNumber="children?.filter((child) => child.isBalita).length || 0"
        statsDescription="Jumlah Anak Balita di RW 10"
        statsIcon="fa-solid fa-person-breastfeeding"
        :isModal="false"
        @click="showModal('balita')"
      />
      <StatsCard
        statsName="Total Ibu"
        :statsNumber="mothers?.length || 0"
        statsDescription="Total jumlah Ibu di RW 10"
        statsIcon="fa-solid fa-child-dress"
        :isModal="false"
      />
    </div>
  </section>
</template>
