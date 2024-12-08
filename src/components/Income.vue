<script setup>
import { ref } from "vue";

const optionVal = ref("");
const descVal = ref("");
const amountVal = ref(null);

const clearFields = () => {
  optionVal.value = "";
  descVal.value = "";
  amountVal.value = null;
};

const handleIncome = async () => {
  console.log("handle income");
  if (
    optionVal.value === "" ||
    descVal.value === "" ||
    amountVal.value === null
  )
    return;
  // Clean data
  // await Firestore logic
  clearFields();
};
</script>

<template>
  <form @submit.prevent="handleIncome">
    <div class="mb-6">
      <label for="type" class="block text-sm font-medium text-gray-700"
        >Type</label
      >
      <select
        id="type"
        v-model="optionVal"
        class="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
      >
        <option value="">Select Type</option>
        <option value="paycheck">Paycheck</option>
        <option value="gift">Gift</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="mb-6">
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <input
        id="description"
        type="text"
        maxlength="75"
        v-model="descVal"
        class="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
      />
    </div>

    <div class="mb-6">
      <label for="amount" class="block text-sm font-medium text-gray-700"
        >Amount</label
      >
      <input
        id="amount"
        type="number"
        step="0.01"
        v-model="amountVal"
        class="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
      />
    </div>

    <div class="flex justify-center">
      <button
        type="submit"
        class="w-full py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-300"
      >
        Add Income
      </button>
    </div>
  </form>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
