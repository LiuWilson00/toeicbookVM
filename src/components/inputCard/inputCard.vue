<template>
  <v-card>
    <v-col col="6">
      <v-text-field v-model="localObj.word" :label="labels.word" :required="required"></v-text-field>
    </v-col>
    <v-col col="6">
      <v-combobox
        v-model="localObj.chinese"
        hide-selected
        hint="Maximum of 5 tags"
        :label="labels.chinese"
        multiple
        persistent-hint
        small-chips
      ></v-combobox>
    </v-col>
    <v-col v-if="localObj.partOfSpeech!=undefined" col="6">
      <partOfSpeech v-model="localObj.partOfSpeech" :partOfSpeechLabel="'Part Of Speech'"></partOfSpeech>
    </v-col>
    <v-icon @click="addHandler">add</v-icon>
    <v-icon @click="removeHander">remove</v-icon>
  </v-card>
</template>

<script>
import partOfSpeech from "../partOfSpeech/partOfSpeech";
export default {
  name: "inputCard",
  data() {
    return { localObj: {} };
  },
  props: {
    obj: {
      type: Object
    },
    labels: {
      type: Object,
      required: true
    },

    required: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    obj: {
      handler: function(newObj) {
        this.localObj = newObj;
        
      },
      immediate: true
    },
    localObj: {
      handler: function(newObj) {
        this.$emit("input", newObj);
      }
    },

    "localObj.chinese": {
      handler: function(val) {
        if (val.length > 5) {
          this.$nextTick(() => this.localObj.chinese.pop());
        }
      }
    }
  },
  methods: {
    addHandler() {
      this.$emit("addCard");
    },
    removeHander() {
      this.$emit("removeCard");
    }
  },
  mounted(){
  
  },
  components: {
    partOfSpeech
  }
};
</script>