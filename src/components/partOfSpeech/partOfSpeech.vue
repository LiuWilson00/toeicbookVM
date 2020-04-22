<template>
  <v-select v-model="simpleJsonPartOfSpeech" :items="items" :label="partOfSpeechLabel">
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item)"
      >
        <v-avatar class="accent white--text" left v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
        {{ data.item }}
      </v-chip>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "partOfSpeech",
  data() {
    return {
      partOfSpeech: "",
      posList: [
        { fullName: "adjective", simpleName: "adj" },
        { fullName: "noun", simpleName: "n" },
        { fullName: "verb", simpleName: "v" },
        { fullName: "adverb", simpleName: "adv" },
        { fullName: "pronoun", simpleName: "pron" },
        { fullName: "preposition", simpleName: "prep" },
        { fullName: "conjunction", simpleName: "conj" },
        { fullName: "interjection", simpleName: "int" },
        { fullName: "conjunction", simpleName: "conj" },
        { fullName: "Object", simpleName: "o" }
      ]
    };
  },
  computed: {
    items() {
      return this.posList.map(el => {
        return el.fullName;
      });
    },
    simpleJsonPartOfSpeech: {
      get: function() {
        if (this.partOfSpeech == "") return "";
        return this.posList.find(el => {
          return el.simpleName == this.partOfSpeech;
        }).fullName;
      },
      set: function(val) {
        this.partOfSpeech = this.posList.find(el => {
          return el.fullName == val;
        }).simpleName;
      }
    }
  },
  mounted() {
    this.partOfSpeech = this.value;
  },
  props: ["partOfSpeechLabel", "value"],
  watch: {
    partOfSpeech: {
      handler: function(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>