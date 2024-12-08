<script setup>
import { ref } from "vue";
import Income from "./Income.vue";
import Expense from "./Expense.vue";

const selectedOption = ref("income");
const handleOptionSelect = (option) => {
  selectedOption.value = option;
};
</script>

<template>
  <div
    class="bg-white min-w-[200px] text-black md:rounded-lg shadow-2xl p-8 w-full max-w-[700px] flex flex-col space-y-6"
  >
    <div class="flex justify-center space-x-4">
      <button
        @click="handleOptionSelect('income')"
        :class="{
          'bg-green-600 text-white': selectedOption === 'income',
          'bg-white border border-gray-300 text-black':
            selectedOption !== 'income',
        }"
        class="w-1/2 py-3 font-medium rounded-lg shadow-md hover:text-white hover:bg-green-700 transition duration-300"
      >
        Income
      </button>
      <button
        @click="handleOptionSelect('expense')"
        :class="{
          'bg-red-600 text-white': selectedOption === 'expense',
          'bg-white border border-gray-300 text-black':
            selectedOption !== 'expense',
        }"
        class="w-1/2 py-3 font-medium rounded-lg shadow-md hover:text-white hover:bg-red-700 transition duration-300"
      >
        Expense
      </button>
    </div>

    <h2
      class="text-3xl font-semibold mb-6 capitalize text-center text-gray-800"
    >
      Enter {{ selectedOption }}
    </h2>

    <Income v-if="selectedOption === 'income'" />
    <Expense v-if="selectedOption === 'expense'" />
  </div>
</template>
