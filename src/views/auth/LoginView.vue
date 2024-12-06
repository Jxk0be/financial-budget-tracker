<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import { Icon } from "@iconify/vue";
import { useNavStore } from "../../stores/navStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();
const navStore = useNavStore();

const login = async (event) => {
  event?.preventDefault();
  const data = await authStore.login(email.value, password.value);
  if ("error" in data) {
    email.value = "";
    password.value = "";
    console.log(data?.error);
    return;
  }
  navStore.setNavStatus(false);
  router.push("/");
};

const signInWithGoogle = async () => {
  const data = await authStore.googleLogin();
  if ("error" in data) {
    email.value = "";
    password.value = "";
    console.log(data?.error);
    return;
  }
  navStore.setNavStatus(false);
  router.push("/");
};
</script>
<template>
  <div
    class="xl:px-0 lg:px-[24px] px-[16px] w-full min-w-[235px] h-screen flex flex-col justify-center items-center"
  >
    <form class="w-full md:w-[1/3] flex flex-col justify-center items-center">
      <h1 class="text-3xl font-semibold text-gray-700 mb-[12px]">
        Login to Account
      </h1>
      <input
        class="w-full mb-[3px] lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="w-full mb-[8px] lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <button
        class="w-full mb-[3px] lg:w-1/2 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        @click="login"
        type="submit"
      >
        Submit
      </button>
    </form>
    <button
      class="w-full flex justify-center items-center lg:w-1/2 py-3 bg-[#EA4335] text-white font-semibold rounded-lg hover:bg-[#c0372b] transition"
      @click="signInWithGoogle"
    >
      <Icon class="text-white text-[20px] mr-2" icon="ic:baseline-tag-faces" />

      Login With Google
    </button>
  </div>
</template>
