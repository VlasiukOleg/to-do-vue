<script>
import { ref } from "vue";
import { computed } from "vue";

export default {
  setup() {
    const today = new Date().toISOString().split("T")[0];
    const visible = ref(false);
    const newTask = ref("");
    const newDate = ref(today);
    const visibleDates = ref({});
    const tasks = ref([
      {
        id: 1,
        text: "Learn HTML and CSS",
        completed: true,
        date: "2024-07-14",
      },
      {
        id: 2,
        text: "Master React",
        completed: true,
        date: "2024-07-14",
      },
      {
        id: 3,
        text: "Build amazing apps",
        completed: true,
        date: "2024-07-15",
      },
      {
        id: 4,
        text: "Clean the room",
        completed: false,
        date: "2024-07-15",
      },
    ]);

    const groupedTasks = computed(() => {
      return tasks.value.reduce((groups, task) => {
        if (!groups[task.date]) {
          groups[task.date] = [];
        }
        groups[task.date].push(task);
        return groups;
      }, {});
    });

    const addTask = () => {
      if (newTask.value.trim() && newDate.value.trim()) {
        tasks.value.push({
          id: Date.now(),
          text: newTask.value,
          completed: false,
          date: newDate.value,
        });
        newTask.value = "";
        newDate.value = "";
      }
    };

    const toggleVisibility = (date) => {
      visibleDates.value[date] = !visibleDates.value[date];
    };

    return {
      tasks,
      newTask,
      newDate,
      addTask,
      groupedTasks,
      visibleDates,
      toggleVisibility,
    };
  },
};
</script>

<template>
  <div>
    <q-input
      dark
      color="grey-3"
      label-color="orange"
      outlined
      v-model="newTask"
      label="Enter tasks..."
      @keyup.enter="addTask"
    />
    <q-input
      dark
      color="grey-3"
      label-color="orange"
      outlined
      v-model="newDate"
      label="Enter date"
      type="date"
      @keyup.enter="addTask"
    />
  </div>
  <div v-for="(taskGroup, date) in groupedTasks" :key="date" class="q-mb-md">
    <button type="button" @click="toggleVisibility(date)" class="dropdown-btn">
      <span>{{ date }} Tasks</span>
      <q-icon :name="visibleDates[date] ? 'expand_less' : 'expand_more'" />
    </button>

    <q-slide-transition>
      <div v-show="visibleDates[date]">
        <ul>
          <li v-for="task in taskGroup" :key="task.id">{{ task.text }}</li>
        </ul>
      </div>
    </q-slide-transition>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
}

.dropdown-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  font-size: 24px;
  font-weight: 600;
  background-color: #282828;
  border-radius: 25px;
  color: inherit;
  box-shadow: 16px 16px 20px 0px rgba(0, 0, 0, 0.15),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.05);
}

.dropdown-btn::before {
  content: "";
}
</style>
