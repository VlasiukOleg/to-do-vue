import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";

// Import Quasar css
import "quasar/dist/quasar.css";
import "./style.css";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

import Main from "./components/Main.vue";
import Settings from "./components/Settings.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const myApp = createApp(App);

myApp.use(router);
myApp.use(Quasar, {
  plugins: {},
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
