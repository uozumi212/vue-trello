<template>
<form :class="classList" @submit.prevent="addCardToList">
    <input type="text"
            v-model="body"
            class="text-input"
            placeholder="Enter card body"
            @focusin="startEditing"
            @focusout="finishEditing"
    >
    <button type="submit"
            class="add-button"
            v-if="isEditing || bodyExists"
    >
        Add
    </button>
</form>
</template>
<script>
export default {
  props: {
    listIndex: {
      type: Number,
      required: true,
    }
  },

  computed: {
    classList: function () {
      const classList = ['addcard'];
      if (this.isEditing) {
        classList.push('active');
      }
      if (this.bodyExists) {
        classList.push('addable')
      }
      return classList;
    },
    bodyExists: function() {
      return this.body.trim().length > 0;
    },
  },

  data: function() {
    return {
      body: '',
      isEditing: false,
    };
  },
  methods: {
    addCardToList: function() {
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex });
      this.body = '';
    },
    startEditing: function() {
      this.isEditing = true;
    },
    finishEditing: function() {
      this.isEditing = false;
    },
  },
};
</script>
