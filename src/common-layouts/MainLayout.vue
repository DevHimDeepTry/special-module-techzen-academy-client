<script setup >
import V1Navbar from '../common-components/Headers/V1Navbar.vue';
import Greeting from '../modules/greeting/pages/Greeting.vue';
</script>

<style scoped>
</style>

<template>
  <div class="default-layout">
    <V1Navbar />
    <div class="main-content">
      <Greeting />
      <div class="page-content">
        <router-view />
      </div>
    </div>
    Footer
  </div>
</template>
