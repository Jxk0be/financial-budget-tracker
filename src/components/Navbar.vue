<script setup>
import { Icon } from "@iconify/vue";
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useNavStore } from "../stores/navStore";

const authStore = useAuthStore();
const router = useRouter();
const navStore = useNavStore();
const navbarRef = ref(null); // Ref for the navbar

let timeout;

// Handle mobile menu toggle with debounce
const toggleMenu = () => {
  // Clear any previous timeouts to prevent conflicting transitions
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    navStore.setNavStatus(!navStore.isMobileMenuOpen);
  }, 150); // Debounce delay (150ms is a good start, adjust if needed)
};

const handleLogout = () => {
  authStore.logout();
  navStore.setNavStatus(false);
  router.push("/login");
};

// Close the mobile menu if clicked outside the navbar
const handleClickOutside = (event) => {
  if (navbarRef.value && !navbarRef.value.contains(event.target)) {
    navStore.setNavStatus(false);
  }
};

// Add event listener when the component is mounted
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Remove event listener when the component is unmounted
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    ref="navbarRef"
    :class="`w-full text-white z-[4] font-semibold fixed h-[70px] bg-[#212121]`"
  >
    <div
      class="lg:px-[24px] relative z-[4] px-[16px] h-full w-full flex items-center justify-between"
    >
      <RouterLink @click="() => navStore.setNavStatus(false)" to="/"
        ><h1 class="font-semibold text-xl">Jake's Budget App</h1></RouterLink
      >
      <div class="hidden font-semibold text-[18px] lg:flex h-full items-center">
        <RouterLink
          @click="() => navStore.setNavStatus(false)"
          class="pr-5"
          to="/"
          >Home</RouterLink
        >
        <RouterLink
          @click="() => navStore.setNavStatus(false)"
          class="pr-5"
          to="/history"
          >History</RouterLink
        >
        <RouterLink
          v-if="!authStore.authStatus"
          @click="() => navStore.setNavStatus(false)"
          class="pr-5"
          to="/login"
          >Login</RouterLink
        >
        <RouterLink
          v-if="!authStore.authStatus"
          @click="() => navStore.setNavStatus(false)"
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
      navStore.isMobileMenuOpen ? 'translate-y-[28%]' : 'translate-y-[-72%]'
    } fixed text-xl h-[250px] gap-2 bg-[#20946b] right-0 z-[3] font-semibold duration-[200ms] ease-in-out flex justify-start flex-col transition-all lg:hidden text-white w-full`"
  >
    <RouterLink
      class="px-5 flex items-center h-full border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      @click="() => navStore.setNavStatus(false)"
      to="/"
      >Home</RouterLink
    >
    <RouterLink
      class="px-5 flex items-center h-full border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      @click="() => navStore.setNavStatus(false)"
      to="/history"
      >History</RouterLink
    >
    <RouterLink
      v-if="!authStore.authStatus"
      @click="() => navStore.setNavStatus(false)"
      class="px-5 flex items-center h-full border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      to="/login"
      >Login</RouterLink
    >
    <RouterLink
      class="px-5 flex items-center h-full w-full text-left border-b border-[#7ccda9] duration-150 ease-in-out transition-all hover:text-[#7bfcb5]"
      v-if="!authStore.authStatus"
      @click="() => navStore.setNavStatus(false)"
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
