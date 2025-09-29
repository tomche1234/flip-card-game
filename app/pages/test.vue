<template>
  <div class="container">
    <h2>Canvas Confetti in Nuxt 3</h2>

    <button @click="fireFullscreen">
      Launch Fullscreen Confetti 🎉
    </button>

    <div class="canvas-container">
      <canvas ref="canvasEl"></canvas>
      <button @click="fireFromElement">
        Launch From Element 🎊
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';

// --- Example 1: Fullscreen Confetti ---
// This is the simplest usage. The library handles creating and removing the canvas.
const fireFullscreen = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  });
};


// --- Example 2: Targeted Confetti ---
// We need a ref to get a direct reference to our <canvas> element.
const canvasEl = ref<HTMLCanvasElement | null>(null);

// We'll store our confetti instance here.
// By creating an instance, we tie the confetti effect to our specific canvas.
let confettiInstance: confetti.CreateTypes | null = null;

// The onMounted hook ensures this code only runs on the client-side,
// after the component and its <canvas> element have been rendered.
onMounted(() => {
  if (canvasEl.value) {
    // Create the confetti instance, linking it to our canvas.
    confettiInstance = confetti.create(canvasEl.value, {
      resize: true, // Automatically resize the canvas to fit the container
      useWorker: true, // Use a web worker for better performance
    });
  }
});

const fireFromElement = () => {
  // Make sure the instance is ready before firing.
  if (confettiInstance) {
    // Fire the confetti!
    confettiInstance({
      particleCount: 200,
      spread: 70,
      origin: { y: 1.2, x: 0.5 } // Start slightly below the canvas
    });
  }
};
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

.canvas-container {
  position: relative;
  width: 300px;
  height: 200px;
  border: 2px dashed #00DC82;
  border-radius: 8px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.canvas-container button {
  /* Make sure the button is on top of the canvas */
  z-index: 1;
}
</style>