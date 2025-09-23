<template>
  <div
  >
    <!-- Optional pattern -->
    <div class="w-24 h-36 bg-blue-500 rounded-lg grid grid-cols-4 grid-rows-4 gap-1 p-1">
      <div v-for="n in 16" :key="n" class="bg-blue-300 rounded-full"></div>
    </div>
  </div>
</template>