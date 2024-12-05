<script setup>
import { Icon } from "@iconify/vue";
import { RouterLink, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { auth } from "../firebase";

const authStore = useAuthStore();
const router = useRouter();
const mobileMenuOpen = ref(false);
let timeout;

// Handle mobile menu toggle with debounce
const toggleMenu = () => {
  // Clear any previous timeouts to prevent conflicting transitions
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }, 150); // Debounce delay (150ms is a good start, adjust if needed)
};

const handleLogout = () => {
  authStore.logout();
  mobileMenuOpen.value = false
  router.push("/login");
};
</script>

<template>
  <div
    :class="`w-full text-white z-[4] font-semibold fixed h-[70px] bg-[#212121]`"
  >
    <div
      class="lg:px-[24px] relative z-[4] px-[16px] h-full w-full flex items-center justify-between"
    >
      <RouterLink @click="() => (mobileMenuOpen = false)" to="/"
        ><h1 class="font-semibold text-xl">Jake's Budget App</h1></RouterLink
      >
      <div class="hidden font-semibold text-[18px] lg:flex h-full items-center">
        <RouterLink @click="() => (mobileMenuOpen = false)" class="pr-5" to="/"
          >Home</RouterLink
        >
        <RouterLink
          @click="() => (mobileMenuOpen = false)"
          class="pr-5"
          to="/history"
          >History</RouterLink
        >
        <RouterLink
          v-if="!authStore.authStatus"
          @click="() => (mobileMenuOpen = false)"
          class="pr-5"
          to="/login"
          >Login</RouterLink
        >
        <RouterLink
          v-if="!authStore.authStatus"
          @click="() => (mobileMenuOpen = false)"
          to="/register"
          >Register</RouterLink
        >
        <button v-if="authStore.authStatus" @click="() => handleLogout()">
          Logout
        </button>
      </div>
      <button
        @click="() => toggleMenu()"
        class="text-white text-[45px] lg:hidden"
      >
        <Icon icon="eva:menu-fill" />
      </button>
    </div>
  </div>

  <div
    :class="`${
      mobileMenuOpen ? 'translate-y-[28%]' : 'translate-y-[-72%]'
    } fixed text-xl h-[250px] gap-2 bg-[#20946b] right-0 z-[3] font-semibold duration-[200ms] ease-in-out flex justify-start flex-col transition-all lg:hidden text-white w-full`"
  >
    <RouterLink
      class="px-5 flex items-center h-full border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      @click="() => (mobileMenuOpen = false)"
      to="/"
      >Home</RouterLink
    >
    <RouterLink
      class="px-5 flex items-center h-full border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      @click="() => (mobileMenuOpen = false)"
      to="/history"
      >History</RouterLink
    >
    <RouterLink
      v-if="!authStore.authStatus"
      @click="() => (mobileMenuOpen = false)"
      class="px-5 flex items-center h-full border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      to="/login"
      >Login</RouterLink
    >
    <RouterLink
      class="px-5 flex items-center h-full w-full text-left border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      v-if="!authStore.authStatus"
      @click="() => (mobileMenuOpen = false)"
      to="/register"
      >Register</RouterLink
    >
    <button
      class="px-5 flex items-center h-full w-full text-left border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      v-if="authStore.authStatus"
      @click="() => handleLogout()"
    >
      Logout
    </button>
  </div>
</template>
