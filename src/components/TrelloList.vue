<template>
  <div class="list">
      <div class="listheader">
          <p class="list-title">{{ title }}</p>
          <p class="list-counter">total: {{ totalCardInList }}</p>
          <div class="deletelist" @click="removeList">✖︎</div>
      </div>
      <draggable
        v-model="cards"
        group="cards"
        item-key="id"
      >
          <template #item="{ element, index }">
            <TrelloCard
              :key="element.id"
              :body="element.body"
              :cardIndex="index"
              :listIndex="listIndex"
            />
          </template>
      </draggable>
      <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import CardAdd from './CardAdd.vue'
import TrelloCard from './TrelloCard.vue';

export default {
  components: {
    CardAdd,
    TrelloCard,
    draggable
  },
  props: {
    title: {
      type: String,
      required: true
    },
    // cards: {
    //   type: Array,
    //   required: true
    // },
    listIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalCardInList: function () {
      return this.cards.length
    },
    cards: {
      get() {
        return this.$store.state.lists[this.listIndex].cards
      },
      set(value) {
        this.$store.commit('updateCards', { listIndex: this.listIndex, cards: value })
      }
    }
  },
  methods: {
    removeList: function () {
      if (confirm('本当にこのリストを削除しますか？')) {
        this.$store.dispatch('removelist', { listIndex: this.listIndex })
      }
    }
  }
}
</script>
