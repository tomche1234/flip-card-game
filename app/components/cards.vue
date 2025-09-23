<template>
    <div class="grid grid-cols-4 gap-4">
      <Card v-for="(card, index) in cards" :key="index" :suit="card.suit" :rank="card.rank"/>
    </div>
</template>
<script setup lang="ts">
import Card from "~/components/card.vue"
import { ref, onMounted } from 'vue';
const pairs = 4
interface CardDetail{
  suit: "hearts" | "spades" | "clubs" | "diamonds";
  rank: string
}
const cards = ref<CardDetail[]>([
]);

onMounted(()=>{
  const tempRanks = [... ranks.value]
  for(let i = 0; i < pairs; i++)
  {
    const maxRank = tempRanks.length - 1
    const randomRankIndex = randomIndex(0, maxRank)
    const rankValue = tempRanks.splice(randomRankIndex, 1)[0]
    const tempSuits = [... suits.value]
    const maxSuits = tempSuits.length - 1
    const randomSuitIndex1 = randomIndex(0, maxSuits)
    const suitValue1 = tempSuits.splice(randomSuitIndex1, 1)[0]
    const randomSuitIndex2 = randomIndex(0, maxSuits)
    const suitValue2 = tempSuits.splice(randomSuitIndex2, 1)[0]
    cards.value.push({
      suit:suitValue1,
      rank: rankValue
    },
    {
      suit:suitValue2,
      rank: rankValue
    }
   )
  }
  shuffleArray(cards.value)
})

const ranks = ref(Array.from(Array(13).keys()).map(x => {
  x = x + 1
  switch(x) {
    case 1: 
      return "A"
    case 11:
      return "J"
    case 12:
      return "Q"
    case 13:
      return "K"
    default:
      return x.toString()
  }
}))
const suits = ref([ "hearts" , "spades" , "clubs" , "diamonds"])

function randomIndex(min: number, max: number){
  return Math.floor(Math.random() * (max - min) + min)
}

function shuffleArray(array: []) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    // Using destructuring assignment for a concise swap
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
</script>