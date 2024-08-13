import { defineStore } from "pinia";
import { ref } from "vue";

import tasksData from "../data/tasks.json";

export const useTasksStore = defineStore("counter", () => {
  const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || tasksData);

  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  return { tasks };
});
