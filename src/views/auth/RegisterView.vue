<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
  const data = await authStore.register(email.value, password.value);
  if ("error" in data) {
    email.value = "";
    password.value = "";
    console.log(data?.error);
    return;
  }
  router.push("/");
};

const signInWithGoogle = () => {};
</script>
<template>
  <div class="pt-[70px] w-full h-screen flex justify-center items-center">
    <div
      class="w-full h-full md:w-[1/3] md:h-[500px] bg-red-500 flex flex-col justify-center items-center"
    >
      <h1>Create an Account</h1>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button @click="register">Submit</button>
      <button @click="signInWithGoogle">Sign In With Google</button>
    </div>
  </div>
</template>
