import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authStatus: false,
    userInstance: {
      user: null,
      data: null,
    },
  }),
  // Functions/methods
  actions: {
    setAuthStatus(status) {
      this.authStatus = status;
    },
    setUserInstance(user) {
      this.userInstance = { ...user };
    },
    register: async (email, pass) => {
      try {
        const data = await createUserWithEmailAndPassword(auth, email, pass);
        return data;
      } catch (error) {
        let errorMsg = "";

        switch (error.code) {
          case "auth/invalid-email":
            errorMsg = "Invalid email";
            break;
          case "auth/email-already-in-use":
            errorMsg = "Email already exists";
            break;
          case "auth/operation-not-allowed":
            errorMsg = "Email and Password accounts disabled";
            break;
          case "auth/weak-password":
            errorMsg = "Weak password";
            break;
          default:
            errorMsg = "Email or Password was incorrect";
            break;
        }
        return {
          error: errorMsg,
        };
      }
    },
    googleLogin: async () => {
      try {
        const data = await signInWithPopup(auth, googleProvider);
        return data;
      } catch (error) {
        return null;
      }
    },
    login: async (email, pass) => {
      try {
        const data = await signInWithEmailAndPassword(auth, email, pass);
        return data;
      } catch (error) {
        let errorMsg = "";

        switch (error.code) {
          case "auth/wrong-password":
            errorMsg = "Password is invalid";
            break;
          case "auth/invalid-email":
            errorMsg = "Email does not exist";
            break;
          case "auth/invalid-credential":
            errorMsg = "Email or Password is invalid";
            break;
          case "auth/user-disabled":
            errorMsg = "Account is disabled";
            break;
          default:
            errorMsg = "Email or Password was incorrect";
            break;
        }
        return {
          error: errorMsg,
        };
      }
    },
    logout: async () => {
      try {
        const data = await signOut(auth);
        return data;
      } catch (error) {
        console.log("authStore logout() fail:\n", error);
        return null;
      }
    },
  },
  // computed() will update reactively
  getters: {},
});
