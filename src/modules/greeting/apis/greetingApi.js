import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/greetings/';

export const getGreetingMessage = (name) => {
  return axios.get(apiUrl, {
    params: { name },
    headers: {
      apiKey: 'v1.0'
    }
  });
};
