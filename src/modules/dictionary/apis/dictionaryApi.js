import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/dictionaries/';

export const getTranslationWord = (word) => {
  return axios.get(apiUrl, {
    params: { word },
    headers: {
      apiKey: 'v1.0'
    }
  });
};