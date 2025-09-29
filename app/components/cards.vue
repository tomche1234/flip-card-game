<template>
    <div class="grid gap-4" :class="colsGrid">
      <Card v-for="(card, index) in cards"
        :key="index" 
        :index="index"
        :suit="card.suit" 
        :rank="card.rank" 
        :isFlipped="card.isFlipped" 
        @update-isFlipped="updateIsFlipped"/>
    </div>
</template>
<script setup lang="ts">
import Card from "~/components/card.vue"
import { ref, onMounted, computed } from 'vue';
import { useCheckWinnerStore } from '~/stores/checkWinner'

const props = defineProps<{
  pairs: number
}>();
interface CardDetail{
  suit: "hearts" | "spades" | "clubs" | "diamonds" | "joker";
  rank: string
  isFlipped: Boolean
}
const cards = ref<CardDetail[]>([
]);

onMounted(()=>{
  initialNewGame()
})

function initialNewGame()
// randomly choose cards and locate them on the game board
{
  let pairs = props.pairs
  const tempRanks = [... ranks.value]
  if (pairs > 28)
  {
    return
  }
  if (pairs == 28)
  {
    cards.value.push({
      suit:"joker",
      rank: "0",
      isFlipped: false
    },
    {
      suit:"joker",
      rank: "0",
      isFlipped: false
    })
    pairs -= 2
  }
  let extra = 0
  if (pairs > 13)
  {
    extra = pairs - 13
    pairs = 13
  }
  for(let i = 0; i < pairs; i++)
  {
    const maxRank = tempRanks.length - 1
    const randomRankIndex = randomIndex(0, maxRank)
    const rankValue = tempRanks.splice(randomRankIndex, 1)[0]
    const maxRepleat = extra > 0? 4:2
    const tempSuits = [... suits.value]
    for(let j = 0; j<maxRepleat; j++)
    {
      const maxSuits = tempSuits.length - 1
      const randomSuitIndex = randomIndex(0, maxSuits)
      const suitValue = tempSuits.splice(randomSuitIndex, 1)[0]
      cards.value.push({
        suit: suitValue,
        rank: rankValue,
        isFlipped: false
      })
    }
    extra --
  }
  shuffleArray(cards.value)
}

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

const colsGrid = computed(() => {
  switch(props.pairs) {
    case 2: 
      return "grid-cols-2"
    case 8:
      return "grid-cols-4"
    case 18:
      return "grid-cols-6"
    default:
      return "grid-cols-9"
  }
})

let flippedCards: CardDetail[]  = []
function updateIsFlipped(index:number, isFlipped:boolean){
  // console.log(JSON.stringify(cards))
  const card = cards.value[index]
  if (!!card)
  {
    if (flippedCards.length < 2 && !card.isFlipped){
      card.isFlipped = isFlipped
      flippedCards.push(card)
      reFlippedCard()
    }
  }
  
}
function reFlippedCard()
{
  if (flippedCards.length == 2)
  {
    if (!flippedCards.every(x => x.rank == flippedCards[0].rank))
    // if two cards are not match, then reflipped them after 1s
    {
      runAfterDelay()
    }
    else
    // otherwise reflipped now
    {
      flippedCards = []
     checkWinner()
    }
  }
}

const winnerStore = useCheckWinnerStore()
function checkWinner()
{
  const hasWinner = cards.value.every(x=> x.isFlipped === true)
  winnerStore.isWinUpdate(hasWinner)
}


function reFlippedUnmatchedCard()
{
  cards.value.map(c => {
    const index = flippedCards.findIndex(x => x.rank === c.rank && x.suit === c.suit)
    if (index>=0){
      c.isFlipped = false
    }
    return c
  })
  flippedCards = []
}

function runAfterDelay() {
  // reflipped wrong pair after 1s
  setTimeout(() => {
    reFlippedUnmatchedCard()
  }, 1000);
}
</script>