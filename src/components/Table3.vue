<template>
    <h1>Table v3</h1>
    <p>Ejemplo ordenación y filtro en tablas.</p>
    <div class="vars">
        <span>Variables de ordenación:</span>
        <span :class="{ 'filtro_activo': orderby_id !== 0 }">orderby_id: {{ orderby_id }}</span>
        <span :class="{ 'filtro_activo': orderby_title !== 0 }">orderby_title: {{ orderby_title }}</span>
        <span :class="{ 'filtro_activo': orderby_price !== 0 }">orderby_price: {{ orderby_price }}</span>
        <span :class="{ 'filtro_activo': orderby_category !== 0 }">orderby_category: {{ orderby_category }}</span>
        <input type="text" placeholder="Filter by title" v-model="titleFilter" @keyup="filter" />
    </div>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th @click="orderby('id')">ID <span>{{ icons[orderby_id] }}</span></th>
                    <th @click="orderby('title')">Title <span>{{ icons[orderby_title] }}</span></th>
                    <th @click="orderby('price')">Price <span>{{ icons[orderby_price] }}</span></th>
                    <th @click="orderby('category')">Category <span>{{ icons[orderby_category] }}</span></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="result in orderedResults" :key="result.id">
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
import { ref, onMounted } from 'vue'

const results = ref([]) // resultados originales de la búsqueda
const orderedResults = ref([]) // copia de los resultados para ordenarlos
const orderby_id = ref(0) // 0: no ordenado, 1: ascendente, 2: descendente (por defecto 0)
const orderby_title = ref(0)
const orderby_price = ref(0)
const orderby_category = ref(0)
const icons = ['-', '↑', '↓'];
const titleFilter = ref('')

const search = () => {
    fetch("https://dummyjson.com/products").then(res => res.json()).then(data => {
        results.value = data.products
        orderedResults.value = data.products
    })
}

//filter orderedResults by titleFilter
const filter = () => {
    orderedResults.value = results.value.filter(result => {
        return result.title.toLowerCase().includes(titleFilter.value.toLowerCase())
    })
}

onMounted(() => {
    search()
})

const orderby = (field) => {
    orderedResults.value = results.value.slice() // copia sin vincular de los resultados para dejar el orden original. Si no, se ordena el array original
    filter()
    if (field == 'id') {
        orderby_id.value = (orderby_id.value + 1) % 3; 
        orderby_category.value = orderby_price.value = orderby_title.value = 0
        if (orderby_id.value == 1) {
            orderedResults.value.sort((a, b) => a.id - b.id) // ordena de menor a mayor
        } else if (orderby_id.value == 2) {
            orderedResults.value.sort((a, b) => b.id - a.id) // ordena de mayor a menor
        }
    } else if (field == 'price') {
        orderby_price.value = (orderby_price.value + 1) % 3;
        orderby_category.value = orderby_id.value = orderby_title.value = 0
        if (orderby_price.value == 1) {
            orderedResults.value.sort((a, b) => a.price - b.price)
        } else if (orderby_price.value == 2) {
            orderedResults.value.sort((a, b) => b.price - a.price)
        }
    } else if (field == 'title') {
        orderby_title.value = (orderby_title.value + 1) % 3;
        orderby_category.value = orderby_price.value = orderby_id.value = 0
        if (orderby_title.value == 1) {
            orderedResults.value.sort((a, b) => a.title.localeCompare(b.title))
        } else if (orderby_title.value == 2) {
            orderedResults.value.sort((a, b) => b.title.localeCompare(a.title))
        }
    } else if (field == 'category') {
        orderby_category.value = (orderby_category.value + 1) % 3;
        orderby_title.value = orderby_price.value = orderby_id.value = 0
        if (orderby_category.value == 1) {
            orderedResults.value.sort((a, b) => a.category.localeCompare(b.category))
        } else if (orderby_category.value == 2) {
            orderedResults.value.sort((a, b) => b.category.localeCompare(a.category))
        }
    }
}

</script>
<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 2rem;

}

th {
    padding: 0.5rem;
    border: 1px solid #ddd;
    background-color: #f5f5f5;
}

.vars {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0;

    border: 1px solid #ddd;
}

.vars>span {
    padding: 1rem;
}
.vars > span:first-child {
    font-weight: bold;
}
.filtro_activo {
    color: red;

    background-color: hsla(160, 100%, 37%, 0.2);
}</style>