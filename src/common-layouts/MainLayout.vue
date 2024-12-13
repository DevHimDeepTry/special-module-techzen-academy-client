<script setup>
import V1Navbar from '../common-components/Headers/V1Navbar.vue';
import Greeting from '../modules/greeting/pages/Greeting.vue';
</script>

<template>
  <div class="default-layout">
    <V1Navbar />
    
    <div class="main-content">
      <Greeting/>
      <div class="page-content">
        <router-view />
      </div>
    </div>
    
    <footer class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 95vh; 
  min-width: 60vw;
  background: #494949bb;
}

.main-content {
  flex: 1; 
}

.page-content {
  background-color: #211b1b; 
  padding: 20px;
  box-shadow: 0 2px 4px rgb(63, 252, 0);
  border-radius: 4px;
  margin: 0px 5px 0 5px;
}

.footer {
  background-color: #00479d;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
}
</style>
