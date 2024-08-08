<script setup>
import { ref, computed } from "vue";

const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);

const count = computed(() => {
  return tasks.value.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },
    { active: 0, completed: 0 }
  );
});
</script>

<template>
  <section>
    <p>Active - {{ count.active }}</p>
    <p>Completed - {{ count.completed }}</p>
  </section>
</template>

<style scoped></style>
