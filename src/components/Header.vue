<template>
  <header>
    <nav class="nav">
      <router-link to="/" class="logo">To Do</router-link>
      <router-link to="/practice" class="logo">Practice</router-link>
      <router-link to="/settings"
        ><img src="../assets//setting-icon.svg" alt="Settings"
      /></router-link>
    </nav>
  </header>
</template>

<script></script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 36px;
  font-weight: bold;
}
</style>
