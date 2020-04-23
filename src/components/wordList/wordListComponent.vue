<template>
  <div class="word">
    <v-container>
      <v-row>
        <v-col v-for="(word,index) in wordList" :key="word._id" cols="12">
          <word-component @deleteData="deleteData" :wordJson="word" :listIndex="index" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped>
</style>


<script>
import WordComponent from "../word/wordComponent";

export default {
  name: "wordList",
  data() {
    return {
      wordList: []
    };
  },
  methods: {
    async initData() {
      await this.$store.dispatch("getWordList");
      this.wordList = this.$store.state.wordList;
    },
    deleteData(index) {
      this.wordList.splice(index, 1);
    },
    insertData: function(word) {
      this.wordList.push(word);
    },
    updateWord(word) {
      let targetId = word.wordId;
      let targetIndex = this.wordList.fundIndex(el => el.wordId == targetId);
      this.wordList[targetIndex] = word;
    }
  },
  computed: {},
  mounted() {
    this.initData();
  },
  created() {
    const vm = this;
    vm.$bus.$on("updateData", word => {
      vm.updateWord(word);
    });
  },
  components: {
    "word-component": WordComponent
  }
};
</script>