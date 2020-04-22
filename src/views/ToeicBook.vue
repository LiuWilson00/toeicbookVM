<template>
  <div class="toeic-book">
    <h2>DAY {{day}}</h2>
    <CreateComponent @insertData="insertWord" :initDay="day" ref="createComponent" />
    <WordList :day="day" ref="wordList" />
  </div>
</template>

<script>
// @ is an alias to /src

import WordList from "@/components/wordList/wordListComponent.vue";
import CreateComponent from "@/components/createWord/createComponent.vue";

export default {
  data() {
    return {};
  },
  name: "toeicbook",
  props: ["day"],
  methods: {
    insertWord(word) {
      console.log(word, this.$refs);
      this.$refs.wordList.insertData(word);
    }
  },
  components: {
    WordList,
    CreateComponent
  }
};
</script>

