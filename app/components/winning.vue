<template>
  <div class="container">
    <div
      v-if="isActive"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <!-- Semi-transparent dark background -->
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>

      <!-- The "child" celebration card -->
      <div
        class="relative bg-white p-6 rounded-2xl shadow-2xl z-50 animate-bounce"
      >
        <h2 class="text-3xl font-bold text-center">🎉 Congratulations! 🎉</h2>
        <p class="mt-2 text-center">You did it!</p>
        <button
          @click="close"
          class="mt-4 px-4 py-2 rounded"
        >
          play again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import confetti from 'canvas-confetti';
import { useCheckWinnerStore } from '~/stores/checkWinner'

const isActive = ref(false);
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
let interval = 0
function fireFullscreen() {
  // The duration of the confetti effect
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  
  // Add `useDevicePixelRatio: true` to the defaults
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 100, // Set a high z-index to appear over the dark overlay
    useDevicePixelRatio: true // This is the fix for the blurriness
  };

  interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Launch confetti from two different spots
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);

  isActive.value = true;
}

function close(){
  isActive.value = false
  winnerStore.isWinUpdate(false)
  clearInterval(interval)
}

const canvasEl = ref<HTMLCanvasElement | null>(null);

let confettiInstance: confetti.CreateTypes | null = null;

onMounted(() => {
  if (canvasEl.value) {
    confettiInstance = confetti.create(canvasEl.value, {
      resize: true,
      useWorker: true,
    });
  }
});

const winnerStore = useCheckWinnerStore()
watch(
  () => winnerStore.isWin,
  (newVal) => {
    if (newVal) {
      fireFullscreen()
    }
  }
)

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: sans-serif;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #e0e0e0;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>