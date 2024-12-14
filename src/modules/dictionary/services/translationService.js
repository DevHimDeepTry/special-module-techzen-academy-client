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
      if (err.response.data.message) {
        error.value = err.response.data.message;
      } else {
        error.value = 'An unexpected error occurred.';
      }
    } finally {
      loading.value = false;
    }
  };

  return { translationWord, loading, error, fetchTranslation };
};