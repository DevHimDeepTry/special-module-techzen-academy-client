import { ref } from 'vue';
import { getGreetingMessage } from '../apis/greetingApi';

export const fetchGreetingMessage = (name) => {
  const greetingMessage = ref('');
  const loading = ref(true);

  getGreetingMessage(name)
    .then((response) => {
      greetingMessage.value = response.data.data; 
    })
    .catch((error) => {
      console.error('Có lỗi khi gọi API:', error);
      greetingMessage.value = 'Có lỗi khi lấy dữ liệu.'; 
    })
    .finally(() => {
      loading.value = false;
    });

  return { greetingMessage, loading };
};