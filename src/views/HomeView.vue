<script setup>
import Doughnut from "../components/Doughnut.vue";
import IncomeEntry from "../components/Entry.vue";
import { ref } from "vue";

const entryView = ref(true);
let timeout;

const toggleView = () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    entryView.value = !entryView.value;
  }, 110);
};
</script>
<template>
  <div
    class="md:pt-[70px] h-auto xl:px-0 lg:px-[24px] px-[16px] flex-col flex w-full"
  >
    <Doughnut :entryView />
    <div
      :class="`${
        entryView ? 'flex' : 'hidden'
      } w-full justify-center items-center mb-[16px] md:flex flex-1 h-[100vh] md:items-start`"
    >
      <IncomeEntry />
    </div>
  </div>

  <button
    @click="() => toggleView()"
    class="absolute md:hidden flex bottom-[45px] left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#7ccda9] text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#66b89d] focus:outline-none focus:ring-2 focus:ring-[#66b89d] transition-all duration-300"
  >
    {{ entryView ? "Visualize" : "Enter Data" }}
  </button>
</template>
