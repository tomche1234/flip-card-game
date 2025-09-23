<template>
  <div  class="flex flex-col items-center min-h-screen bg-green-700">
    <!-- title -->
    <h1 class="text-4xl font-bold text-white py-8">
      Welcome to my cards Games 🎉
    </h1>
    <div class="flex items-center justify-center">
      <Cards/>
    </div>
  </div>
</template>
<script lang="ts">
import Cards from "~/components/cards.vue"
</script>