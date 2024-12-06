<script setup>
import Chart from "chart.js/auto";
import { onMounted } from "vue";

const props = defineProps({
  entryView: {
    type: Boolean,
    default: true,
  },
});

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
