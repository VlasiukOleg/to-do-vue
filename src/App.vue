<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div class="wrap">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.wrap {
  min-width: 390px;
  padding: 13px 20px;
  border-radius: 30px;
  background-color: #222;
}
</style>
