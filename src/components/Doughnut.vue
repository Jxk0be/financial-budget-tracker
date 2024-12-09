<script setup>
import Chart from "chart.js/auto";
import { onMounted } from "vue";

const props = defineProps({
  entryView: {
    type: Boolean,
    default: true,
  },
});

// TODO: Write logic for showing empty data (use this fake data here)
// TODO: Write logic to show expense or income chart based on what's already selected (refactor state to pinia store)
// TODO: Write logic for mobile view to show a toggle button for ease-of-use

const data = {
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

onMounted(() => {
  let ctx = document.getElementById("doughnut");
  const myChart = new Chart(ctx, config);
});
</script>
<template>
  <div
    :class="`${
      entryView ? 'hidden' : 'flex'
    } w-full md:flex md:h-[40vh] h-screen`"
  >
    <canvas id="doughnut"></canvas>
  </div>
</template>
