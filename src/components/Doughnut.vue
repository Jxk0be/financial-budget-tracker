<script setup>
import Chart from "chart.js/auto";
import { onSnapshot, doc } from "firebase/firestore";
import { onMounted, ref, computed, watch } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useOptionStore } from "../stores/selectedOption";

const optionStore = useOptionStore();
const props = defineProps({
  entryView: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => optionStore.selectedOption,
  (newSelectedOption, oldSelectedOption) => {
    if (newSelectedOption === "expense") {
      updateChart(expensesTracker);
    } else {
      updateChart(incomeTracker);
    }
    console.log(newSelectedOption, oldSelectedOption);
  }
);

let data = {};
let config = {};
let myChart = null;
let expenses = ref([]);
let income = ref([]);
let incomeTracker = {};
let expensesTracker = {};

let isExpenseEmpty = computed(() => {
  return optionStore.selectedOption !== "income" && expenses.value.length === 0;
});

let isIncomeEmpty = computed(() => {
  return optionStore.selectedOption === "income" && income.value.length === 0;
});

const updateChart = (data) => {
  if (myChart !== null) {
    myChart.destroy();
    myChart = null;
  }

  data = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "income",
        data: Object.values(data),
        hoverOffset: 4,
      },
    ],
  };

  config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      animation: {
        duration: 0, // Disable initial animation
      },
    },
  };

  let ctx = document.getElementById("doughnut");
  myChart = new Chart(ctx, config);
};

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user?.uid);

      const unsubSnapshot = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          expenses.value = userData?.expenses;
          income.value = userData?.income;
        }
        if (!isExpenseEmpty.value) {
          expenses.value = expenses.value.map((exp) => {
            return {
              category: exp.category,
              amount: exp.amount,
            };
          });

          expenses.value.forEach((exp) => {
            if (exp.category in expensesTracker)
              expensesTracker[exp.category] += exp.amount;
            else expensesTracker[exp.category] = exp.amount;
          });
        }

        if (!isIncomeEmpty.value) {
          income.value = income.value.map((inc) => {
            return {
              category: inc.category,
              amount: inc.amount,
            };
          });

          income.value.forEach((exp) => {
            if (exp.category in incomeTracker)
              incomeTracker[exp.category] += exp.amount;
            else incomeTracker[exp.category] = exp.amount;
          });
        }

        data = {
          labels: Object.keys(incomeTracker),
          datasets: [
            {
              label: "income",
              data: Object.values(incomeTracker),
              hoverOffset: 4,
            },
          ],
        };
        config = {
          type: "doughnut",
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            animation: {
              duration: 0, // Disable initial animation
            },
          },
        };

        if (myChart === null) {
          let ctx = document.getElementById("doughnut");
          myChart = new Chart(ctx, config);
        } else {
          if (optionStore.selectedOption === "income")
            updateChart(incomeTracker);
          else updateChart(expensesTracker);
        }
      });
      return () => {
        unsubSnapshot();
      };
    }
  });

  return () => {
    unsubscribe();
  };
});
</script>
<template>
  <div
    v-if="!entryView"
    class="absolute inset-0 pb-[40px] flex items-center w-full md:hidden h-[40vh] justify-center transition-opacity duration-[310ms] ease-in-out"
  >
    <span class="text-3xl capitalize font-semibold text-gray-800">
      {{
        optionStore.selectedOption === "expense"
          ? "Expenses"
          : optionStore.selectedOption
      }}
    </span>
  </div>

  <div
    :class="`${
      entryView ? 'hidden' : 'flex'
    } w-full md:flex flex-col text-black md:mb-[20px] md:mt-[20px] md:h-[40vh] h-screen`"
  >
    <canvas id="doughnut"></canvas>

    <!-- Overlay no income div -->
    <div
      v-if="entryView && isIncomeEmpty"
      class="absolute inset-0 flex items-center w-full md:flex pt-[70px] md:h-[40vh] h-screen justify-center bg-white bg-opacity-50 backdrop-blur-md"
    >
      <span class="text-xl font-semibold text-gray-800"
        >Enter data to see chart</span
      >
    </div>

    <!-- Overlay no expenses div -->
    <div
      v-if="entryView && isExpenseEmpty"
      class="absolute inset-0 flex items-center w-full md:flex pt-[70px] md:h-[40vh] h-screen justify-center bg-white bg-opacity-50 backdrop-blur-md"
    >
      <span class="text-xl font-semibold text-gray-800"
        >Enter data to see chart</span
      >
    </div>
  </div>
</template>
