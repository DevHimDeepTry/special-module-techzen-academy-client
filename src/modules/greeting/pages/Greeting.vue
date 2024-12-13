<script setup>
import { onMounted, ref, watch } from 'vue';
import { getGreetingMessage } from '../apis/greetingApi';  
import { debounce } from 'lodash';

const greetingMessage = ref('');
const loading = ref(false);
const name = ref('');

const fetchGreetingMessage = async (name) => {
  
  try {
    loading.value = true;
    const response = await getGreetingMessage(name);  
    const fullMessage = response.data.data;
    typeGreeting(fullMessage);
  } catch (error) {
    console.error('Có lỗi khi gọi API:', error);
    greetingMessage.value = 'Có lỗi khi lấy dữ liệu.';
  } finally {
    loading.value = false;
  }
};


const typeGreeting = (message) => {
  greetingMessage.value = ''; 
  let index = 0;

  const typeInterval = setInterval(() => {
    if (index < message.length) {
      greetingMessage.value += message.charAt(index);
      index++;
    } else {
      clearInterval(typeInterval);
    }
  }, 50);
};

const debouncedFetchGreetingMessage = debounce((name) => {
  fetchGreetingMessage(name);
}, 500);

onMounted(() => {
  fetchGreetingMessage("");
});

watch(name, (newName) => {
  debouncedFetchGreetingMessage(newName);
});
</script>

<template>
  <div>
    <h2 id="message">{{ greetingMessage }}</h2>
    <input v-model="name" type="text" placeholder="Enter your name" style="margin-bottom: 20px;" />
  </div>
</template>

<style scoped>
  #message {
    height: 20px;
  }
</style>