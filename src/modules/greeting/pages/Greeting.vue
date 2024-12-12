<script setup >

import { fetchGreetingMessage } from '../services/greetingService';

const { greetingMessage, loading } = fetchGreetingMessage('Mr.Duc');
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>

    <h2 v-else>{{ greetingMessage }}</h2>
  </div>
</template>