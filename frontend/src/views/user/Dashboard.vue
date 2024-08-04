<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Header from "../../components/HeaderDashboard.vue";
import ProfileBox from "../../components/user/ProfileBox.vue";
import Statistic from "../../components/user/StatistikUser.vue";
import ListChild from "../../components/user/ListChild.vue";

import ChartUser from "../../components/admin/chart/Chart6.vue";

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.user);
const childrenMom = computed(() => store.getters.childrenMom);
const mother = computed(() => store.getters.mother);

onMounted(async () => {
  await fetchChildrenMom(user.value.motherId);
  await fetchMom(user.value.motherId);
  await fetchProfile();
});

const fetchChildrenMom = async (motherId) => {
  try {
    await store.dispatch("fetchChildrenMom", motherId);
  } catch (error) {
    console.error(error);
  }
};

const fetchMom = async (id) => {
  try {
    await store.dispatch("fetchMother", id);
  } catch (error) {
    console.error(error);
  }
};

const fetchProfile = async () => {
  try {
    await store.dispatch("fetchProfile");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div v-if="user" class="w-full">
        <Header :username="user.username ? user.username : null" />
        <Statistic />
        <div class="w-full flex flex-col justify-center items-center px-4">
          <div class="w-full my-8">
            <h2 class="text-2xl font-bold text-gray-700 text-center lg:text-left">Profile Data</h2>
            <ProfileBox :mother="mother" />
            <div class="w-full">
              <ChartUser :mother-id="user.motherId" />
            </div>
          </div>
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-700">Table Data Anak</h2>
          <ListChild :children="childrenMom" />
        </div>
      </div>
      <div v-else>
        <p>
          Please Signin first...
          <span class="text-lg font-bold"
            ><router-link to="/signin" class="text-blue-800"
              >Signin</router-link
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>
