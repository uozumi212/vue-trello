<template>
  <div id="app">
    <Board />
  </div>
</template>

<script>
import Board from './components/TrelloBoard.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>
