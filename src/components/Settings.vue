<script setup>
import { ref, computed } from "vue";

const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);

console.log(tasks);

const completedTasksCount = computed(
  () => tasks.value.filter((task) => task.completed).length
);

const incompleteTasksCount = computed(
  () => tasks.value.filter((task) => !task.completed).length
);
</script>

<template>
  <section>
    <p>Active - {{ completedTasksCount }}</p>
    <p>Completed - {{ incompleteTasksCount }}</p>
  </section>
</template>

<style scoped></style>
