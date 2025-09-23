<template>
  <div>
    <div class="perspective-1000 cursor-pointer w-28 h-40" @click="isFlipped = !isFlipped">
      <div
        :class="[
          'relative w-full h-full transition-transform duration-500 transform-style-3d',
          isFlipped ? 'rotate-y-180' : ''
        ]"
      >
        <div class="absolute w-full h-full backface-hidden">
          <CardBack 
            class="w-full h-full border rounded-xl shadow-md flex flex-col justify-between p-2 bg-white"
          />
        </div>

        <div class="absolute w-full h-full rotate-y-180 backface-hidden">
          <CardFront 
            class="w-full h-full border rounded-xl shadow-md flex flex-col justify-between p-2 bg-white"
            :suit="suit"
            :rank="rank"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CardFront from './CardFront.vue'; 
import CardBack from './CardBack.vue';
const props = defineProps<{
  suit: "hearts" | "spades" | "clubs" | "diamonds";
  rank: string;
}>();

const isFlipped = ref(false);
</script>

<style>
/* This class creates the 3D space for the animation */
.perspective-1000 {
  perspective: 1000px;
}

/* This class ensures the children are positioned in 3D */
.transform-style-3d {
  transform-style: preserve-3d;
}

/* This is the class that gets toggled to perform the flip */
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* This class hides the back of a card face when it's not visible */
.backface-hidden {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
</style>