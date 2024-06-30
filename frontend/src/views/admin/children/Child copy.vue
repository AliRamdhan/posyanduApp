<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import DataTable from "datatables.net-vue3";
import FormatTime from "../../../utils/FormatTime";

const store = useStore();
const router = useRouter();

const children = computed(() => store.getters["children"]); // Assuming this getter retrieves your children data correctly

const fetchChildren = async () => {
  try {
    await store.dispatch("fetchChildren"); // Assuming "fetchChildren" action fetches children data
  } catch (error) {
    console.error("Error fetching children:", error);
  }
};

const deleteChild = async (id) => {
  try {
    await store.dispatch("deleteChild", id); // Assuming "deleteChild" action deletes child by ID
    console.log(`Deleted child with id ${id}`);
  } catch (error) {
    console.error(`Error deleting child with id ${id}:`, error);
  }
};

const editChild = (id) => {
  router.push({ name: "children-update", params: { id } });
};

const addChild = () => {
  router.push({ name: "children-create" });
};

const removeChild = async (id) => {
  try {
    await deleteChild(id);
    await fetchChildren(); // Refresh children list after deletion
  } catch (error) {
    console.error(`Error removing child with id ${id}:`, error);
  }
};

onMounted(() => {
  fetchChildren(); // Fetch children data when component is mounted
});

const columns = [
  { data: "name", title: "Nama" },
  { data: "nik", title: "NIK" },
  { data: "gender", title: "Gender" },
  {
    data: "dob",
    title: "Date of Birth",
    render: function (data) {
      return FormatTime(data); // Assuming FormatTime handles valid Date objects
    },
  },
  { data: "amountImunisation", title: "Imunisasi" },
  { data: "mother", title: "Ibu" },
  {
    data: null,
    title: "",
    render: function (data) {
      return `
        <button class="edit-btn" data-id="${data._id}">Edit</button>
        <button class="delete-btn" data-id="${data._id}">Delete</button>
      `;
    },
  },
];

const attachEventListeners = () => {
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => editChild(button.dataset.id));
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => removeChild(button.dataset.id));
  });
};

onMounted(() => {
  fetchChildren().then(attachEventListeners); // Fetch children data when component is mounted and attach event listeners
});
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center">
    <h1>Children List</h1>
    <div class="border border-black">
      <!-- <DataTable :data="children" :columns="columns" /> -->
      <DataTable
        :data="children"
        :columns="columns"
        :options="{ pageLength: 10, lengthMenu: [5, 10, 25, 50, 100] }"
      />
    </div>
    <button @click="addChild">Add Child</button>
  </div>
</template>
