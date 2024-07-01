<template>
  <div>
    <input type="month" v-model="selectedMonth" @change="updateMonth" />
    <button @click="exportData">Export Data</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
const selectedMonth = ref(`${currentYear}-${currentMonth}`);
import { useStore } from "vuex";
const store = useStore();

const updateMonth = () => {
  // Handle the selected month change if needed
  // For example, you might want to format or process the selectedMonth value here
};
const exportData = () => {
  store.dispatch('exportData', selectedMonth.value);
};
// const exportData = async () => {
//   try {
//     const month = selectedMonth.value; // Use selectedMonth value here
//     const response = await axios.get(
//       `http://localhost:9000/api/v1/mother/export/excel?month=${month}`,
//       {
//         responseType: "blob", // Ensure response is treated as binary data (for file download)
//       }
//     );
//     console.log(response.data.size);
//     // Check if the response data is empty
//     if (response.data.size === 0) {
//       console.error("No data found for the selected month");
//       alert("No data found for the selected month"); // Show an alert to the user
//       return;
//     }

//     // Create a blob object from the response data
//     const blob = new Blob([response.data], { type: "text/csv" });

//     // Create a URL for the blob object
//     const url = window.URL.createObjectURL(blob);

//     // Create an anchor element to trigger the download
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `mothers_${month}.csv`;
//     document.body.appendChild(a);
//     a.click(); // Trigger the click event programmatically
//     document.body.removeChild(a); // Clean up: remove the anchor element

//     // Release the allocated resources
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Error exporting data:", error);
//     alert("Error exporting data. Please try again later."); // Show an alert for any error
//     // Handle error (e.g., show error message to user)
//   }
// };
</script>

