import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

import tasksData from "../data/tasks.json";
import { getRandomColor } from "../utils/getRandomColor";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || tasksData);

  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const addNewTask = (task) => {
    if (task.text.trim() && task.date.trim()) {
      tasks.value.push({
        id: Date.now(),
        text: task.text,
        completed: false,
        date: task.date,
        color: getRandomColor(),
      });
    }
  };

  return { tasks, addNewTask };
});
