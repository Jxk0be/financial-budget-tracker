<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import { useNavStore } from "../../stores/navStore";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const authStore = useAuthStore();
const navStore = useNavStore();

const register = async (event) => {
  event?.preventDefault();
  const data = await authStore.register(email.value, password.value);
  if ("error" in data) {
    email.value = "";
    password.value = "";
    console.log(data?.error);
    return;
  }
  navStore.setNavStatus(false);
  router.push("/");
};

const passwordMatch = computed(() => {
  return password.value === confirmPassword.value;
});
</script>
<template>
  <div
    class="xl:px-0 lg:px-[24px] px-[16px] w-full h-screen flex justify-center items-center"
  >
    <form
      class="w-full h-full md:w-[1/3] md:h-[500px] flex flex-col justify-center items-center"
    >
      <h1 class="text-3xl font-semibold text-gray-700 mb-[12px]">
        Register an Account
      </h1>
      <input
        class="w-full mb-[3px] lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="w-full mb-[3px] lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <input
        :class="`w-full ${
          passwordMatch ? 'mb-[8px]' : 'mb-[3px]'
        }  lg:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`"
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <p class="mb-[8px] text-red-500 font-medium" v-if="!passwordMatch">
        Passwords do not match
      </p>
      <button
        type="submit"
        class="w-full mb-[3px] lg:w-1/2 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        @click="register"
      >
        Submit
      </button>
    </form>
  </div>
</template>
