<script>
import { ref, computed, watchEffect } from "vue";
import { format, isToday, isTomorrow } from "date-fns";
import { Notify } from "quasar";

import tasksData from "../data/tasks.json";

import { getRandomColor } from "../utils/getRandomColor";

import TaskForm from "./TaskForm.vue";

export default {
  components: {
    TaskForm,
  },
  setup() {
    const today = new Date();

    const formatDate = (date) => format(date, "yyyy-MM-dd");

    const toggle = ref(false);
    const checkbox = ref(false);
    const newTask = ref("");
    const newDate = ref(formatDate(today));
    const visibleDates = ref({});
    const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || tasksData);

    const groupedTasks = computed(() => {
      const filteredTasks = checkbox.value
        ? tasks.value.filter((task) => task.date !== formatDate(today))
        : tasks.value;

      const grouped = filteredTasks.reduce((groups, task) => {
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
      return tasks.value.filter((task) => isToday(new Date(task.date)));
    });

    const addTask = (task) => {
      if (task.text.trim() && task.date.trim()) {
        tasks.value.push({
          id: Date.now(),
          text: task.text,
          completed: false,
          date: task.date,
          color: getRandomColor(),
        });
        Notify.create({
          type: "positive",
          message: "Task added successfully!",
          position: "top-right",
          timeout: 2000,
        });
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
      const dateObject = new Date(date);
      if (isTomorrow(dateObject)) {
        return "Tomorrow";
      }
      return format(dateObject, "dd/MM");
    };

    watchEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks.value));
    });

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
      todayTasks,
      toggleTaskCompletion,
      formatDate,
    };
  },
};
</script>

<template>
  <section>
    <TaskForm :initialDate="formatDate(new Date())" @add-task="addTask" />

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
      <button
        type="button"
        @click="toggleVisibility(date)"
        class="dropdown-btn"
      >
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
  </section>
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
