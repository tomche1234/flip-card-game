import { defineStore } from 'pinia'

export const useCheckWinnerStore = defineStore('winner', {
  state: () => ({
    isWin: false,
  }),
  actions: {
    isWinUpdate(isWin: boolean) {
      this.isWin = isWin
    },
  },
})