<!-- listmother.vue -->
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Husband</th>
          <th>Date of Birth</th>
          <th>KS</th>
          <th>BPJS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mother in mothers" :key="mother._id">
          <td>{{ mother.name }}</td>
          <td>{{ mother.husband }}</td>
          <td>{{ formatDate(mother.dob) }}</td>
          <td>{{ mother.KS }}</td>
          <td>{{ mother.bpjs ? "Yes" : "No" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const mothers = computed(() => store.state.mother.mothers);

const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(() => {
  store.dispatch("mother/fetchMothers");
});
</script>
