<script>
import { ref } from "vue";

export default {
  props: ["initialDate"],

  setup(props, { emit }) {
    const taskText = ref("");
    const taskDate = ref(props.initialDate);

    const addTask = () => {
      if (taskText.value.trim() && taskDate.value.trim()) {
        emit("add-task", {
          text: taskText.value,
          date: taskDate.value,
        });
        taskText.value = "";
        taskDate.value = props.initialDate;
      }
    };

    return {
      taskText,
      taskDate,
      addTask,
    };
  },
};
</script>

<template>
  <div class="input-wrap">
    <q-input
      dark
      color="grey-3"
      label-color="orange"
      outlined
      v-model="taskText"
      label="Enter task..."
      @keyup.enter="addTask"
    />
    <q-input
      dark
      color="grey-3"
      label-color="orange"
      outlined
      v-model="taskDate"
      label="Choose date"
      type="date"
      @keyup.enter="addTask"
    />
  </div>
</template>

<style scoped>
.input-wrap {
  display: flex;
  gap: 10px;
}
</style>
