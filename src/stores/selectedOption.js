import { defineStore } from "pinia";

export const useOptionStore = defineStore("option", {
  state: () => ({
    selectedOption: "income",
  }),
  // Functions/methods
  actions: {
    setSelectedOption(option) {
      this.selectedOption = option;
    },
  },
  // computed() will update reactively
  getters: {},
});
