<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </div>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/table1">Table v1</RouterLink>
        <RouterLink to="/table2">Table v2</RouterLink>
        <RouterLink to="/table3">Table v3</RouterLink>
      </nav>
  </header>
  <div class="content">
    <RouterView />
  </div>
  
</template>

<style scoped>
nav{
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f5f5f5;
}
nav > a:hover{
  color: #42b983;
}
.content{
  padding: 1rem 2rem;
}
</style>
