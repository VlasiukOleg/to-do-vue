<script>
import { ref } from "vue";
import { computed } from "vue";

export default {
  setup() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formatDate = (date) => date.toISOString().split("T")[0];

    const newTask = ref("");
    const newDate = ref(formatDate(today));
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
        newDate.value = formatDate(today);
      }
    };

    const toggleVisibility = (date) => {
      visibleDates.value[date] = !visibleDates.value[date];
    };

    const formatLabel = (date) => {
      if (date === formatDate(tomorrow)) {
        return "Tomorrow";
      }
      return date;
    };

    return {
      tasks,
      newTask,
      newDate,
      addTask,
      groupedTasks,
      visibleDates,
      toggleVisibility,
      formatLabel,
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
      <span class="dropdown-btn-text">{{ formatLabel(date) }} Tasks</span>
      <q-icon
        name="expand_circle_down"
        :class="{ 'icon-rotate': visibleDates[date] }"
      />
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
.dropdown-btn {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 14px 33px;

  width: 100%;
  font-size: 24px;
  font-weight: 600;
  background-color: #282828;
  border-radius: 25px;
  color: inherit;
  box-shadow: 16px 16px 20px 0px rgba(0, 0, 0, 0.15),
    -8px -8px 20px 0px rgba(255, 255, 255, 0.05);
}

.dropdown-btn-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-btn::before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  content: "";
  display: inline-block;
  width: 5px;
  height: 40px;
  border-radius: 3px;
  background-color: #a9a9a9;
}

.icon-rotate {
  transform: rotate(180deg);
}
</style>
