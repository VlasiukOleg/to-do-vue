<template>
  <h1>Practice</h1>
  <button @click="handleIncrement">{{ count }}</button>
  <div>{{ message("Hello") }}</div>
  <span v-html="rawHtml"></span>
  <q-btn
    color="primary"
    icon="check"
    label="disabled"
    @click="handleIncrement"
    :disabled="isButtonDisabled"
  />

  <a href="url">Link Google</a>
  <p class="text-grey-7">
    {{ author.name }} має книги: {{ publishedBooksMessage }}
  </p>
  <p>{{ fullName }}</p>

  <q-btn
    color="secondary"
    icon="check"
    label="Switch if elst"
    @click="show = !show"
  />
  <p v-if="show">Ти мене бачиш</p>
  <p v-show="show">Це v-show</p>
  <q-list dark bordered separator>
    <q-item
      clickable
      v-ripple
      v-for="({ message }, index) in items"
      :key="index"
    >
      <q-item-section avatar>
        <q-icon color="primary" name="bluetooth" />
      </q-item-section>
      <q-item-section>{{ message }} - {{ index }}</q-item-section>
    </q-item>
  </q-list>
  <q-list bordered>
    <q-item clickable v-ripple v-for="number in evenNumbers" :key="index">
      <q-item-section avatar>
        <q-icon color="primary" name="bluetooth" />
      </q-item-section>
      <q-item-section>It's even number - {{ number }}</q-item-section>
    </q-item>
  </q-list>
  <q-btn color="primary" icon="check" label="Привітати" @click="event" />
  <p>Текст інпуту: {{ text }}</p>
  <q-input v-model="text" type="text" label="Label" dark outlined />

  <q-checkbox left-label v-model="orange" label="orange" />
  <div>{{ orange }}</div>

  <div>Вибрані імена: {{ checkedNames }}</div>

  <input type="checkbox" id="olha" value="Ольга" v-model="checkedNames" />
  <label for="olha">Ольга</label>

  <input type="checkbox" id="dariia" value="Дарія" v-model="checkedNames" />
  <label for="dariia">Дарія</label>

  <input
    type="checkbox"
    id="victoria"
    value="Вікторія"
    v-model="checkedNames"
  />
  <label for="victoria">Вікторія</label>

  <q-radio v-model="picked" val="Один" label="Один" />
  <q-radio v-model="picked" val="Два" label="Два" />
  <p>{{ picked }}</p>
</template>
<script setup>
import { onMounted, ref, reactive, computed } from "vue";

const author = reactive({
  name: "Тарас Шевченко",
  books: ["1840 — Кобзар", "1851 — Тополя", "1859 — Заповіт"],
});

const items = ref([{ message: "Леся" }, { message: "Тарас" }]);
const numbers = ref([1, 2, 3, 4, 5]);
const count = ref(0);
const show = ref(true);
const firstName = ref("Oleg");
const lastName = ref("Vlasiuk");
const name = ref("Vue.js");
const text = ref("");
const orange = ref(false);
const checkedNames = ref([]);
const picked = ref("Один");

const evenNumbers = computed(() =>
  numbers.value.filter((number) => number % 2 === 0)
);

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // Примітка: ми використовуємо так званий деструктуризований синтаксис при присвоєнні.
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});

fullName.value = "Тарас Шевченко";

const message = (text) => text.toLowerCase();

const rawHtml = "<span class='span'>rawHtml</span>";
const isButtonDisabled = true;
const url = "/settings";

const handleIncrement = () => {
  count.value += 1;
};

const publishedBooksMessage = computed(() => {
  author.books.length > 0 ? "Так" : "Ні";
});

const event = (event) => {
  alert(`Hello ${name.value}`);

  if (event) {
    alert(event.target.tagName);
  }
};

onMounted(() => {
  console.log(count.value);
});
</script>
<style>
.span {
  color: red;
  font-size: 18px;
}
</style>
