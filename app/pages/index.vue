<template>
  <div  class="flex flex-col items-center min-h-screen bg-green-700">
    <!-- title -->
    <h1 class="text-4xl font-bold text-white py-8">
      Welcome to my cards Games 🎉
    </h1>
    <div v-if="!isStart" class="flex flex-col items-center gap-4 py-6">
      <!-- Title -->
      <p class="text-2xl font-bold text-white text-center">
        Please select the level you want
      </p>

      <!-- Level Selector + Start Button -->
      <div class="flex items-center gap-3">
        <label for="level-select" class="sr-only">Select difficulty</label>
        <select
          id="level-select"
          v-model="pairs"
          class="px-3 py-2 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option :value="2">Easy (2×2)</option>
          <option :value="8">Normal (4×4)</option>
          <option :value="18">Hard (6×6)</option>
          <option :value="28">Hell (All cards)</option>
        </select>
        <button
          @click="isStart = true"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Start
        </button>
      </div>
    </div>

    <div v-else class="flex items-center justify-center">
      <Cards :pairs="pairs"/>
    </div>
    <Winning/>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Cards from "~/components/cards.vue"
import Winning from '~/components/winning.vue';
import { useCheckWinnerStore } from '~/stores/checkWinner'


const isStart = ref(false)
const pairs = ref(2)
const winnerStore = useCheckWinnerStore()

watch(
  () => winnerStore.isWin,
  (newVal) => {
    if (!newVal) {
      isStart.value = false
    }
  }
)
</script>