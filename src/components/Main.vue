<script>
import { ref } from "vue";
import { computed } from "vue";

export default {
  setup() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const formatDate = (date) => date.toISOString().split("T")[0];

    const toggle = ref(false);
    const checkbox = ref(false);
    const newTask = ref("");
    const newDate = ref(formatDate(today));
    const visibleDates = ref({});
    const tasks = ref([
      {
        id: 1,
        text: "Learn HTML and CSS",
        completed: true,
        date: "2024-08-14",
        color: "#FF5733",
      },
      {
        id: 2,
        text: "Master React",
        completed: true,
        date: "2024-08-14",
        color: "#33FF57",
      },
      {
        id: 3,
        text: "Build amazing apps",
        completed: true,
        date: "2024-08-15",
        color: "#3357FF",
      },
      {
        id: 4,
        text: "Clean the room",
        completed: false,
        date: "2024-08-15",
        color: "#F5F5F5",
      },
      {
        id: 5,
        text: "Build amazing apps",
        completed: true,
        date: "2024-08-08",
        color: "#3357FF",
      },
      {
        id: 6,
        text: "Clean the room",
        completed: false,
        date: "2024-08-08",
        color: "#F5F5F5",
      },
    ]);

    const groupedTasks = computed(() => {
      const grouped = tasks.value.reduce((groups, task) => {
        if (!groups[task.date]) {
          groups[task.date] = [];
        }
        groups[task.date].push(task);
        return groups;
      }, {});

      const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      return sortedDates.reduce((sortedGroups, date) => {
        sortedGroups[date] = grouped[date];
        return sortedGroups;
      }, {});
    });

    const todayTasks = computed(() => {
      return tasks.value.filter((task) => task.date === formatDate(today));
    });

    const addTask = () => {
      if (newTask.value.trim() && newDate.value.trim()) {
        tasks.value.push({
          id: Date.now(),
          text: newTask.value,
          completed: false,
          date: newDate.value,
          color: getRandomColor(),
        });
        console.log("Updated tasks:", tasks.value);
        newTask.value = "";
        newDate.value = formatDate(today);
      }
    };

    const toggleVisibility = (date) => {
      visibleDates.value[date] = !visibleDates.value[date];
    };

    const toggleTaskCompletion = (taskId) => {
      const task = tasks.value.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    };

    const formatLabel = (date) => {
      if (date === formatDate(tomorrow)) {
        return "Tomorrow";
      }
      return date;
    };

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    return {
      toggle,
      checkbox,
      tasks,
      newTask,
      newDate,
      addTask,
      groupedTasks,
      todayTasks,
      visibleDates,
      toggleVisibility,
      formatLabel,
      getRandomColor,
      todayTasks,
      toggleTaskCompletion,
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
      v-model="newTask"
      label="Enter task..."
      @keyup.enter="addTask"
    />
    <q-input
      dark
      color="grey-3"
      label-color="orange"
      outlined
      v-model="newDate"
      label="Choose date"
      type="date"
      @keyup.enter="addTask"
    />
  </div>

  <div class="text-left">
    <q-checkbox
      dark
      color="white"
      size="lg"
      v-model="checkbox"
      checked-icon="check_box"
      unchecked-icon="check_box_outline_blank"
      indeterminate-icon="help"
      label="Today Tasks:"
      class="custom-checkbox"
    />
  </div>
  <q-slide-transition>
    <div v-show="checkbox">
      <ul class="task-list" v-if="todayTasks.length > 0">
        <li
          v-for="task in todayTasks"
          :key="task.id"
          :style="{ '--task-color': task.color }"
          class="task-item"
        >
          {{ task.text }}
          <q-toggle
            v-model="task.completed"
            @change="toggleTaskCompletion(task.id)"
            checked-icon="check"
            unchecked-icon="clear"
            color="green"
          />
        </li>
      </ul>
      <p v-else>No tasks for today.</p>
    </div>
  </q-slide-transition>

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
        <ul class="task-list">
          <li
            v-for="task in taskGroup"
            :style="{ '--task-color': task.color }"
            :key="task.id"
            class="task-item"
          >
            {{ task.text }}
            <q-toggle
              v-model="task.completed"
              @change="toggleTaskCompletion(task.id)"
              checked-icon="check"
              unchecked-icon="clear"
              color="green"
            />
          </li>
        </ul>
      </div>
    </q-slide-transition>
  </div>
</template>

<style scoped>
.input-wrap {
  display: flex;

  gap: 10px;
}

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

.task-list {
  text-align: left;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  padding: 14px 33px;
  font-size: 24px;
  font-weight: 600;
}

.task-item::before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  content: "";
  display: inline-block;
  width: 5px;
  height: 40px;
  border-radius: 3px;
  background-color: var(--task-color);
}
</style>
