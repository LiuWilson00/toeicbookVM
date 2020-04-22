<template>
  <div class="word">
    <UpdateComponent ref="update" :initJson="wordJson" />
    <v-card class="mx-auto" max-width="1024" outlined>
      <v-list-item>
        <v-list-item-content>
          <div class="overline mb-4 word-chinese">{{chineseArrToStr(wordJson.chinese)}}</div>
          <v-list-item-title class="headline mb-2 word-font">
            {{wordJson.word}}
            <span class="word-speech">{{wordJson.partOfSpeech}}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="mb-2">
            <v-chip
              class="word-extend ml-1"
              v-for="extend in wordJson.extend"
              :key="extend.word"
            >{{`${extend.word} ${extend.partOfSpeech} ${chineseArrToStr(extend.chinese)}`}}</v-chip>
          </v-list-item-subtitle>

          <v-list-item-subtitle class="word-sentence ml-2">{{wordJson.example.sentence}}</v-list-item-subtitle>
          <v-list-item-subtitle class="ml-2">{{wordJson.example.chinese}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mx-4"></v-divider>
      <v-list-item>
        <v-card-text color="orange">
          <p
            tile
            size="auto"
            color="teal lighten-5"
            v-for="complement in wordJson.complement"
            :key="complement.word"
          >{{`${complement.word } ${chineseArrToStr(complement.chinese)}`}}</p>
        </v-card-text>
      </v-list-item>
      <v-card-actions class="jusify-end">
        <v-btn text @click="updateHandler">Edit</v-btn>
        <v-btn text @click="deleteHandler">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style src="./style.scss" lang="scss" scoped>
</style>


<script>
import axios from "axios";
import config from "../../config";
import UpdateComponent from "@/components/updateWord/updateComponent.vue";
export default {
  name: "word",
  props: ["wordJson", "listIndex"],
  data() {
    return {
      list: []
    };
  },
  methods: {
    chineseArrToStr(chineseArr) {
      let chineseStr = chineseArr.join(",");
      return chineseStr;
    },
    deleteHandler() {
      axios.delete(`${config.apiUrl}deleteWordById/${this.wordJson.wordId}`);
      this.$emit("deleteData", this.listIndex);
    },
    updateHandler() {
      this.$refs.update.modal = true;
    }
  },

  computed: {},
  mounted() {},
  components: {
    UpdateComponent
  }
};
</script>