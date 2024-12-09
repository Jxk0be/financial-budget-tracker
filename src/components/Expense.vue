<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const expenseVal = ref("");
const descVal = ref("");
const amountVal = ref(null);
const authStore = useAuthStore();

const clearFields = () => {
  expenseVal.value = "";
  descVal.value = "";
  amountVal.value = null;
};

const isValidAmount = (amount) => {
  let regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(amount);
};

const handleExpense = async () => {
  if (
    expenseVal.value === "" ||
    descVal.value === "" ||
    amountVal.value === null
  )
    return;

  if (!isValidAmount(amountVal.value)) {
    console.log("Invalid amount value");
    return;
  }

  const currentDate = new Date().toString();

  let expenseData = {
    category: expenseVal.value,
    amount: amountVal.value,
    description: descVal.value,
    date: currentDate,
  };

  try {
    const userRef = doc(db, "users", authStore.userInstance?.user?.uid);
    const docSnap = await getDoc(userRef);
    const userData = docSnap.data();
    let expenses = userData?.income || [];
    await setDoc(
      userRef,
      {
        expenses: [...expenses, expenseData],
      },
      { merge: true }
    );
  } catch (error) {
    console.log("handleExpense():", error);
  }
  clearFields();
};
</script>

<template>
  <form @submit.prevent="handleExpense">
    <div class="mb-6">
      <label for="type" class="block text-sm font-medium text-gray-700"
        >Type</label
      >
      <select
        id="type"
        v-model="expenseVal"
        class="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Select Type</option>
        <option value="car_insurance">Car Insurance</option>
        <option value="car_payment">Car Payment</option>
        <option value="phone">Phone</option>
        <option value="gas">Gas</option>
        <option value="entertainment">Entertainment</option>
        <option value="utilities">Utilities</option>
        <option value="internet">Internet</option>
        <option value="mortgage">Mortgage</option>
        <option value="rent">Rent</option>
        <option value="food">Food</option>
        <option value="supplies">Supplies</option>
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
        class="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
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
        class="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
      />
    </div>

    <div class="flex justify-center">
      <button
        type="submit"
        class="w-full py-3 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Add Expense
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
