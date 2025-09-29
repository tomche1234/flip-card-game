<template>
  <div>
    <!-- Joker Card -->
    <div v-if="suit === 'joker'" class="flex justify-center items-center h-full">
      <svg
        class="w-12 h-12 text-black"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 297 297"
      >
        <path
          d="M273.272,90.3c-12.094,0-22.097,9.107-23.543,20.829c-25.794,2.513-42.23,13.708-51.792,23.287
          c-2.884,2.888-5.309,5.773-7.331,8.501c-15.265-27.26-25.156-57.277-29.468-71.831c7.008-4.133,11.723-11.763,11.723-20.48
          c0-13.097-10.639-23.752-23.716-23.752c-13.09,0-23.739,10.655-23.739,23.752c0,8.721,4.724,16.354,11.741,20.484
          c-4.319,14.559-14.22,44.571-29.484,71.827c-2.021-2.729-4.447-5.613-7.331-8.501c-9.721-9.737-26.542-21.141-53.075-23.402
          C45.758,99.347,35.782,90.3,23.73,90.3C10.646,90.3,0,100.957,0,114.056c0,13.099,10.646,23.754,23.73,23.754
          c3.641,0,7.092-0.827,10.178-2.301c12.41,27.988,31.357,80.649,22.324,107.796c-1.171,3.517-0.256,7.393,2.363,10.016
          c2.808,2.81,20.362,16.826,90.549,16.826c70.165,0,87.715-14.018,90.521-16.828c2.618-2.622,3.532-6.497,2.362-10.013
          c-8.968-26.955,9.717-79.203,22.123-107.323c2.81,1.176,5.89,1.827,9.12,1.827c13.084,0,23.728-10.655,23.728-23.754
          C297,100.957,286.355,90.3,273.272,90.3z"
        />
      </svg>
    </div>

    <!-- Standard Card -->
    <template v-else>
      <!-- Top-left -->
      <div class="text-left">
        <span :class="colorClass" class="font-bold text-lg">{{ rank }}</span>
        <span :class="colorClass">{{ suitSymbol }}</span>
      </div>

      <!-- Center -->
      <div class="flex-grow flex justify-center items-center text-4xl" :class="colorClass">
        {{ suitSymbol }}
      </div>

      <!-- Bottom-right (rotated) -->
      <div class="text-right rotate-180">
        <span :class="colorClass" class="font-bold text-lg">{{ rank }}</span>
        <span :class="colorClass">{{ suitSymbol }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  suit: "hearts" | "spades" | "clubs" | "diamonds" | "joker";
  rank: string;
}>();

// convert suit string to suit icon
const suitSymbol = computed(() => {
  switch (props.suit) {
    case "hearts": return "♥";
    case "spades": return "♠";
    case "clubs": return "♣";
    case "diamonds": return "♦";
  }
});

// assign cards colour
const colorClass = computed(() =>
  props.suit === "hearts" || props.suit === "diamonds"
    ? "text-red-600"
    : "text-black"
);
</script>