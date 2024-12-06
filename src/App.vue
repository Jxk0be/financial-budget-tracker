<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const authStore = useAuthStore();

onMounted(() => {
  /* This function */
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      authStore.setAuthStatus(true);
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      let userData = {
        email: user?.email,
        expenses: [],
        income: [],
      };

      if (!docSnap.exists()) {
        const userRef = doc(db, "users", user?.uid);
        await setDoc(userRef, userData, { merge: true });

        authStore.setUserInstance({
          user: user,
          data: userData,
        });
      } else {
        const userData = docSnap.data();
        authStore.setUserInstance({
          user: user,
          data: userData,
        });
      }
      console.log("User logged in.");
    } else {
      authStore.setAuthStatus(false);
      authStore.setUserInstance({
        user: null,
        data: null,
      });
      console.log("User logged out.");
    }
  });

  /* Returning in onMounted() means this will run when the component unMounts.
		   Essentially, I'm saying to stop listening for auth changes when we close out of the app.
		*/
  return unsubscribe;
});
</script>

<template>
  <Navbar />
  <div class="mx-auto w-full max-h-screen max-w-[1200px]">
    <RouterView />
  </div>
</template>
