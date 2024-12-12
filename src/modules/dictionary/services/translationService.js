import { ref } from 'vue';
import { getTranslationWord } from '../apis/dictionaryApi';

export const fetchtranslationWord = (word) => {
  const translationWord = ref('');
  const loading = ref(false);
  const error = ref('');

  const fetchTranslation = async () => {
    if (!word.value) {
      error.value = 'Please enter a word';
      return;
    }

    loading.value = true;
    error.value = '';

    try {
      const response = await getTranslationWord(word.value);
      translationWord.value = response.data.data; 
    } catch (err) {
      console.error('Có lỗi khi gọi API:', err);
      error.value = 'Có lỗi khi lấy dữ liệu.'; 
    } finally {
      loading.value = false;
    }
  };

  return { translationWord, loading, error, fetchTranslation };
};