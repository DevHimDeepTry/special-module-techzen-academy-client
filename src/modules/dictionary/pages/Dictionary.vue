<template>
    <div>
        <h2>Dictionary</h2>
        <input v-model="word" type="text" placeholder="Enter word" />
        <button @click="fetchTranslation">Translate</button>

        <div>
        <div v-if="loading">Loading...</div>
        <h2 v-else>{{ translationWord }}</h2>
        <div v-if="error" class="error">{{ error }}</div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { fetchtranslationWord } from '../services/translationService';

    const word = ref('');
    const { translationWord, loading, error, fetchTranslation } = fetchtranslationWord(word);
</script>

<style scoped>
    .error {
        color: red;
        font-size: 1.2em;
    }
</style>  