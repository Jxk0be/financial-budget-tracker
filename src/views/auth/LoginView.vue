<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  const data = await authStore.login(email.value, password.value);
  if ("error" in data) {
    email.value = "";
    password.value = "";
    console.log(data?.error);
    return;
  }
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
  router.push("/");
};
</script>
<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div
      class="w-full h-full md:w-[1/3] md:h-[500px] flex flex-col justify-center items-center"
    >
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
      >
        Submit
      </button>
      <button
        class="w-full lg:w-1/2 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        @click="signInWithGoogle"
      >
        Sign In With Google
      </button>
    </div>
  </div>
</template>
