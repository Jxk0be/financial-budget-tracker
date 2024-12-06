<script setup>
import Doughnut from "../components/Doughnut.vue";
import { ref } from "vue";

const entryView = ref(true);
</script>
<template>
  <div
    class="md:pt-[70px] xl:px-0 lg:px-[24px] md:px-[16px] px-[16px] flex-col flex w-full h-screen"
  >
    <Doughnut :entryView />
    <div
      :class="`${
        entryView ? 'flex' : 'hidden'
      } bg-slate-700 mb-[16px] md:flex flex-1 md:h-[60vh] h-[100vh] items-center justify-center`"
    >
      Entry Form
    </div>
  </div>

  <button
    @click="() => (entryView = !entryView)"
    class="absolute md:hidden flex bottom-[45px] left-1/2 transform -translate-x-1/2 px-6 py-3 bg-[#7ccda9] text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#66b89d] focus:outline-none focus:ring-2 focus:ring-[#66b89d] transition-all duration-300"
  >
    {{ entryView ? "Visualize" : "Enter Data" }}
  </button>
</template>
