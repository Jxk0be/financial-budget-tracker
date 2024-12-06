import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
  state: () => ({
    isMobileMenuOpen: false,
  }),
  // Functions/methods
  actions: {
    setNavStatus(status) {
      this.isMobileMenuOpen = status;
    },
  },
  // computed() will update reactively
  getters: {},
});
