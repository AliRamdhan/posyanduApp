<script setup>
import StatsCard from "./StatsCard.vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import ModalDetailsStatsAnak from "./ModalDetailsStatsAnak.vue";
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

const fetchChildrenGrowth = async () => {
  try {
    await store.dispatch("fetchChildrenBadutas");
  } catch (error) {
    console.error(error);
  }
};

const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren");
    await store.dispatch("fetchChildrenAll");
  } catch (error) {
    console.error("Error fetching children in component:", error);
  }
};

onMounted(() => {
  fetchChildren();
  fetchChildrenGrowth();
});

const childrenIsBaduta = computed(() =>
  children.value.filter((child) => child.isBaduta)
);
const childrenIsBalita = computed(() =>
  children.value.filter((child) => child.isBalita)
);

const HBIsBalita = computed(() =>
  childrenGrowth.value.filter(
    (child) => child.heightBody && child.childrens.isBalita
  )
);
const WBIsBalita = computed(() =>
  childrenGrowth.value.filter(
    (child) => child.weightBody && child.childrens.isBalita
  )
);

const HBIsBaduta = computed(() =>
  childrenGrowth.value.filter(
    (child) => child.heightBody && child.childrens.isBaduta
  )
);
const WBIsBaduta = computed(() =>
  childrenGrowth.value.filter(
    (child) => child.weightBody && child.childrens.isBaduta
  )
);

// BADUTA WB HB AGE
const averageAgeBaduta = computed(() => averageAge(childrenIsBaduta.value));
const averageWBBaduta = computed(() => averageWeightBody(WBIsBaduta.value));
const averageHBBaduta = computed(() => averageHeigtBody(HBIsBaduta.value));

// BALITA WB HB AGE
const averageAgeBalita = computed(() => averageAge(childrenIsBalita.value));
const averageWBBalita = computed(() => averageWeightBody(WBIsBalita.value));
const averageHBBalita = computed(() => averageHeigtBody(HBIsBalita.value));

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
    <div class="grid gap-10 sm:grid-cols-1 lg:grid-cols-3">
      <StatsCard
        statsName="Balita Dua Tahun (Baduta)"
        :statsNumber="children?.filter((child) => child.isBaduta).length || 0"
        statsDescription="Jumlah Anak Baduta di RW 10"
        statsIcon="fa-solid fa-person-pregnant"
        @click="showModal('baduta')"
        :isModal="true"
      />
      <StatsCard
        statsName="Balita Lima Tahun (Balita)"
        :statsNumber="children?.filter((child) => child.isBalita).length || 0"
        statsDescription="Jumlah Anak Balita di RW 10"
        statsIcon="fa-solid fa-person-breastfeeding"
        :isModal="true"
        @click="showModal('balita')"
      />
      <StatsCard
        statsName="Total Anak"
        :statsNumber="children.length || 0"
        statsDescription="Total jumlah anak di RW 10"
        statsIcon="fa-solid fa-child-dress"
        :isModal="false"
      />
    </div>
    <fwb-modal v-if="isShowModal" @close="closeModal" size="5xl">
      <template #header>
        <div class="flex items-center text-2xl font-semibold">
          Statistik
          {{
            modalType === "baduta"
              ? "Bayi Usia Dua Tahun"
              : "Bayi Usia Lima Tahun"
          }}
        </div>
      </template>
      <template #body>
        <div v-if="modalType === 'baduta'">
          <ModalDetailsStatsAnak
            statsName="Baduta"
            :statsNumberLK="
              children?.filter(
                (child) => child.isBaduta && child.gender === 'Male'
              ).length || 0
            "
            :statsNumberPR="
              children?.filter(
                (child) => child.isBaduta && child.gender === 'Female'
              ).length || 0
            "
            :statsNumberUsia="averageAgeBaduta"
            :statsNumberTB="averageHBBaduta"
            :statsNumberBB="averageWBBaduta"
          />
        </div>
        <div v-if="modalType === 'balita'">
          <ModalDetailsStatsAnak
            statsName="Balita"
            :statsNumberLK="
              children?.filter(
                (child) => child.isBalita && child.gender === 'Male'
              ).length || 0
            "
            :statsNumberPR="
              children?.filter(
                (child) => child.isBalita && child.gender === 'Female'
              ).length || 0
            "
            :statsNumberUsia="averageAgeBalita"
            :statsNumberBB="averageHBBalita"
            :statsNumberTB="averageWBBalita"
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
