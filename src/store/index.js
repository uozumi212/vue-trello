import { createStore } from 'vuex'

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const normalizeCard = (card) => ({
  id: card.id || createId(),
  body: card.body || '',
})

const normalizeList = (list) => ({
  id: list.id || createId(),
  title: list.title || '',
  cards: Array.isArray(list.cards) ? list.cards.map(normalizeCard) : [],
})

const defaultLists = [
  {
    title: 'Backlog',
    cards: [
      { body: 'English' },
      { body: 'Mathematices' },
    ],
  },
  {
    title: 'Todo',
    cards: [
      { body: 'Science' },
    ],
  },
  {
    title: 'Doing',
    cards: [],
  },
]

const savedLists = localStorage.getItem('trello-lists')

const initialLists = savedLists
  ? JSON.parse(savedLists).map(normalizeList)
  : defaultLists.map(normalizeList)

const store = createStore({
  state: () => ({
    lists: initialLists,
  }),
  mutations: {
    addlist(state, payload) {
      state.lists.push({
        id: createId(),
        title: payload.title,
        cards: [],
      })
    },
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({
        id: createId(),
        body: payload.body,
      })
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateCards(state, payload) {
      state.lists[payload.listIndex].cards = payload.cards.map(normalizeCard)
    },
    updateList(state, payload) {
      state.lists = payload.lists.map(normalizeList)
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    updateCards(context, payload) {
      context.commit('updateCards', payload)
    },
    updateList(context, payload) {
      context.commit('updateList', payload)
    },
  },
  getters: {
    totalCardCount(state) {
      let count = 0

      state.lists.forEach((content) => {
        count += content.cards.length
      })

      return count
    },
  },
})

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
