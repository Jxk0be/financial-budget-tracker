<script setup>
import { ref } from "vue";
import Income from "./Income.vue";
import Expense from "./Expense.vue";
import { useOptionStore } from "../stores/selectedOption";

const optionStore = useOptionStore();

const handleOptionSelect = (option) => {
  optionStore.setSelectedOption(option);
};
</script>

<template>
  <div
    class="bg-white z-2 min-w-[200px] md:mt-0 mt-[80px] mb-[50px] text-black md:rounded-lg shadow-2xl p-8 w-full max-w-[700px] flex flex-col space-y-6"
  >
    <div class="flex justify-center space-x-4">
      <button
        @click="handleOptionSelect('income')"
        :class="{
          'bg-green-600 text-white': optionStore.selectedOption === 'income',
          'bg-white border border-gray-300 text-black':
            optionStore.selectedOption !== 'income',
        }"
        class="w-1/2 py-3 font-medium rounded-lg shadow-md hover:text-white hover:bg-green-700 transition duration-300"
      >
        Income
      </button>
      <button
        @click="handleOptionSelect('expense')"
        :class="{
          'bg-red-600 text-white': optionStore.selectedOption === 'expense',
          'bg-white border border-gray-300 text-black':
            optionStore.selectedOption !== 'expense',
        }"
        class="w-1/2 py-3 font-medium rounded-lg shadow-md hover:text-white hover:bg-red-700 transition duration-300"
      >
        Expense
      </button>
    </div>

    <h2
      class="text-3xl font-semibold mb-6 capitalize text-center text-gray-800"
    >
      Enter {{ optionStore.selectedOption }}
    </h2>

    <Income v-if="optionStore.selectedOption === 'income'" />
    <Expense v-if="optionStore.selectedOption === 'expense'" />
  </div>
</template>
