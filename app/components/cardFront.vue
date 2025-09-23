<template>
  <div
  >
    <!-- Top-left rank + suit -->
    <div class="text-left">
      <span :class="colorClass" class="font-bold text-lg">{{ rank }}</span>
      <span :class="colorClass">{{ suitSymbol }}</span>
    </div>

    <!-- Center rank + suit -->
    <div class="flex justify-center items-center text-4xl" :class="colorClass">
      {{ suitSymbol }}
    </div>

    <!-- Bottom-right rank + suit -->
    <div class="text-right rotate-180">
      <span :class="colorClass" class="font-bold text-lg">{{ rank }}</span>
      <span :class="colorClass">{{ suitSymbol }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  suit: "hearts" | "spades" | "clubs" | "diamonds";
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