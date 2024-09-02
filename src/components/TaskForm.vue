<script>
import { computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";

export default {
  props: ["initialDate"],

  setup(props, { emit }) {
    const taskText = ref("");
    const taskDate = ref(props.initialDate);
    const requiredTaskLength = ref("5");

    const rules = {
      taskText: {
        required: helpers.withMessage("This field is required.", required),
        minLength: helpers.withMessage(
          "Minimum 5 characters required.",
          minLength(5)
        ),
      },
    };

    const addTask = () => {
      v$.value.$touch();
      if (!v$.value.$invalid) {
        emit("add-task", {
          text: taskText.value,
          date: taskDate.value,
        });
        taskText.value = "";
        taskDate.value = props.initialDate;
        v$.value.$reset();
      }
    };

    const v$ = useVuelidate(rules, { taskText });

    return {
      taskText,
      taskDate,
      addTask,
      requiredTaskLength,
      v$,
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
    <div
      class="input-errors text-red-500"
      v-if="v$.taskText.$error && v$.taskText.$dirty"
    >
      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
        <span class="font-medium">Oops!</span> {{ error.$message }}
      </p>
    </div>
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
