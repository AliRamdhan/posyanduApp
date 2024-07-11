<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import Header from "../../components/HeaderDashboard.vue";
import ProfileBox from "../../components/user/ProfileBox.vue";
import Statistic from "../../components/user/StatistikUser.vue";
import ListChild from "../../components/user/ListChild.vue";

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.user);
const childrenMom = computed(() => store.getters.childrenMom);
const mother = computed(() => store.getters.mother);
console.log("user", user);
console.log("child", childrenMom.value);
console.log("mother", mother.value);

onMounted(async () => {
  await fetchChildrenMom(user.value.motherId);
  await fetchMom(user.value.motherId);
  await fetchProfile();
  console.log("Dashboard component mounted");
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
  <div>
    <!-- <Header :username="user.username" /> -->
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <!-- <h1>Dashboard</h1>
      <router-view></router-view> -->
      <div v-if="user" class="w-full">
        <Header :username="user.username" />
        <Statistic />
        <div class="px-4">
          <div class="my-8">
            <h2 class="text-2xl font-bold text-gray-700">Profile Data</h2>
            <ProfileBox :mother="mother" />
          </div>
          <h2 class="text-2xl font-bold text-gray-700">Table Data Anak</h2>
          <ListChild :children="childrenMom" />
        </div>
      </div>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>
