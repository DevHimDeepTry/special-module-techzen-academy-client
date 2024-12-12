<script setup>
import { onMounted, ref } from 'vue';
import { getGreetingMessage } from '../apis/greetingApi';  

const greetingMessage = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;  
    const response = await getGreetingMessage('Mr.Duc');
    greetingMessage.value = response.data.data;  
  } catch (error) {
    console.error('Có lỗi khi gọi API:', error);
    greetingMessage.value = 'Có lỗi khi lấy dữ liệu.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <h2 v-else>{{ greetingMessage }}</h2>
  </div>
</template>