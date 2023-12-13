<template>
        <h1>Table v1</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ex placeat quasi! Ex perspiciatis numquam unde repudiandae velit fuga veniam, expedita inventore et officia quos dolore temporibus doloribus repellat! Dolor.</p>
        <button @click="search">Fetch</button>
        <div class="filter_title">
                <input type="text" placeholder="Search by title" v-model="titleFilter" @keyup="updateTable" />
        </div>
        <div class="table">
                <table>
                        <thead>
                                <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                </tr>
                        </thead>
                        <tbody>
                                <tr v-for="result in filteredResults" :key="result.id">
                                        <td>{{ result.id }}</td>
                                        <td>{{ result.title }}</td>
                                        <td>{{ result.price }}</td>
                                        <td>{{ result.category }}</td>
                                </tr>
                        </tbody>
                </table>
        </div>
</template>
<script setup>
//https://openlibrary.org/search.json?q=$query

import { onMounted, ref, computed } from 'vue'

const results = ref([])
const titleFilter = ref('')

const filteredResults = computed(() => {
        return results.value.filter(result => {
                return result.title.toLowerCase().includes(titleFilter.value.toLowerCase())
        })
})

const search = () => {
    fetch("https://dummyjson.com/products").then(res => res.json()).then(data => {
        results.value = data.products
        })
}


</script>
<style scoped>
table{
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #ddd;

}
th{
        padding: 0.5rem;
        border: 1px solid #ddd;
        background-color: #f5f5f5;
}
</style>