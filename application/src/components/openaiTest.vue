<template>
    <div class="
    openaiTest
    border-solid border-2 border-gray-400
    p-4 m-4
    ">
        <h1>OpenAI Test</h1>
        <button @click="test(message)">Test</button>
        <p>{{ response }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { openaiTest } from '../services/openai/test';

const message = "Test";
const response = ref("");

const test = async (message) => {
    const res = await openaiTest(message);
    response.value = res;
};
</script>