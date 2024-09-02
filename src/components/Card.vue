<template>
  <div class="card">
    <div class="header"><slot name="header">DefaultHeader</slot></div>
    <div class="content"><slot></slot></div>
    <div class="footer"><slot name="footer">DefaultFooter</slot></div>
  </div>
</template>

<script setup></script>

<style></style>
