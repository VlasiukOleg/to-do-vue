<template>
  <header>
    <nav>
      <ul class="nav-content">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
}
.nav-content {
  display: flex;
  gap: 10px;
}
.logo-container a {
  font-weight: 600;
}

ul {
  list-style: none;
}
</style>
