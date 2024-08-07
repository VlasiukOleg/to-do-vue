<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div class="wrap">
    <Header />
    <router-view />
  </div>
</template>

<style scoped>
.wrap {
  max-width: 390px;
  padding: 13px 20px;
  border-radius: 30px;
  background-color: gray;
}
</style>
