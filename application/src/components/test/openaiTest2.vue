<template>
    <div class="
    openaiTest
    border-solid border-2 border-gray-400
    p-4 m-4
    ">
        <h1>Test des fonctions</h1>
        <form @submit.prevent="test(text)">
            <input v-model="text" type="text" />
            <button type="submit">Test</button>
        </form>
        <p>{{ response }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { testOpenaiFunctions } from '../../services/openai/test';

const text = ref("Faire le ménage demain");
const response = ref("N/A");

const test = async (text) => {
    let res = await testOpenaiFunctions(text);
    response.value = res;
};
</script>