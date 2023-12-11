<template>
        <h1>Table v1</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex placeat quasi! Ex perspiciatis numquam unde repudiandae velit fuga veniam, expedita inventore et officia quos dolore temporibus doloribus repellat! Dolor.</p>
        <input type="text" v-model="query" /><button @click="search">Search</button>
        <div class="table">
                <table>
                        <thead>
                                <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Books</th>
                                </tr>
                        </thead>
                        <tbody>
                                <tr v-for="result in results" :key="result.key">
                                        <td>{{ result.title }}</td>
                                        <td>{{ result.author_name[0] }}</td>
                                        <td>{{ result.first_publish_year }}</td>
                                </tr>
                        </tbody>
                </table>
        </div>
</template>
<script setup>
//https://openlibrary.org/search.json?q=$query

import { ref } from 'vue'
const query = ref('')
const results = ref([])

const search = () => {
    fetch(`https://openlibrary.org/search.json?q=${query.value}`).then(res => res.json()).then(data => {
        results.value = data.docs
        console.log(data)
        })
}
</script>
<style scoped>
table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;

}
</style>