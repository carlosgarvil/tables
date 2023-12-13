<template>
        <h1>Table v1</h1>
        <p>Ejemplo de propiedad computada y filtro en tablas.</p>
        <button @click="search">Fetch</button>
        <div class="filter_title">
                <input type="text" placeholder="Search by title" v-model="titleFilter" />
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

import { ref, computed } from 'vue'

const results = ref([])
const titleFilter = ref('')

const filteredResults = computed(() => { // propiedad computada para filtrar los resultados
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