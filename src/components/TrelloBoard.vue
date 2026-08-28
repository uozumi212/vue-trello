<template>
<div>
    <header>
        my Trello
    </header>
    <main>
        <p class="info-line">All: {{ totalCardCount }} tasks</p>
        <draggable
          v-model="lists"
          class="list-index"
          item-key="id"
        >
            <template #item="{ element, index }">
              <TrelloList
                :key="element.id"
                :title="element.title"
                :listIndex="index"
              />
            </template>
        </draggable>
        <ListAdd />
    </main>
</div>

</template>

<script>
import draggable from 'vuedraggable';
import ListAdd from './ListAdd.vue';
import TrelloList from './TrelloList.vue';

export default {
  name: 'TrelloBoard',
  components: {
    ListAdd,
    TrelloList,
    draggable,
  },
  computed: {
    lists: {
      get() {
        return this.$store.state.lists
      },
      set(value) {
        this.$store.commit('updateList', { lists: value })
      },
    },
    totalCardCount() {
      return this.$store.getters.totalCardCount
    },
  },
}
</script>
