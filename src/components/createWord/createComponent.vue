
<template>
  <v-dialog ref="dialog" v-model="modal" persistent width="1024px">
    <template v-slot:activator="{ on }">
      <v-btn label="Picker in dialog" readonly v-on="on">Create</v-btn>
    </template>
    <v-form ref="form" class="v-card theme--light" lazy-validation scrollable color="black">
      <v-card-title class="mt-2" label>Create Word</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-row>
        <v-col col="12">
          <v-text-field
            v-model="wordJson.word"
            :error-messages="wordJson_word_Errors"
            full-width
            hide-no-data
            hide-selected
            multiple
            single-line
            @input="$v.wordJson.word.$touch()"
            @blur="$v.wordJson.word.$touch()"
            label="Word"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-combobox
            v-model="wordJson.chinese"
            :error-messages="wordJson_chinese_Errors"
            hide-selected
            hint="Maximum of 5 tags"
            label="Chinese"
            multiple
            persistent-hint
            @input="$v.wordJson.chinese.$touch()"
            @blur="$v.wordJson.chinese.$touch()"
            small-chips
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="6">
          <v-subheader>Word Point</v-subheader>

          <v-rating :length="'3'" v-model="wordJson.point"></v-rating>
        </v-col>
        <v-col col="6">
          <partOfSpeech
            v-model="wordJson.partOfSpeech"
            :error-messages="wordJson_partOfSpeech_Errors"
            :partOfSpeechLabel="'Part Of Speech'"
            @change="$v.wordJson.partOfSpeech.$touch()"
            @blur="$v.wordJson.partOfSpeech.$touch()"
          ></partOfSpeech>
        </v-col>
      </v-row>
      <v-col col="12">
        <v-text-field
          v-model="wordJson.example.sentence"
          :error-messages="wordJson_example_sentence_Errors"
          full-width
          hide-no-data
          hide-selected
          multiple
          single-line
          label="Example"
          @input="$v.wordJson.example.sentence.$touch()"
          @blur="$v.wordJson.example.sentence.$touch()"
          required
        ></v-text-field>
      </v-col>
      <v-col col="12">
        <v-text-field
          v-model="wordJson.example.chinese"
          :error-messages="wordJson_example_chinese_Errors"
          full-width
          hide-no-data
          hide-selected
          multiple
          single-line
          label="Example chinese"
          @input="$v.wordJson.example.chinese.$touch()"
          @blur="$v.wordJson.example.chinese.$touch()"
          required
        ></v-text-field>
      </v-col>

      <v-card-title class="mt-2" label>
        Extend Words
        <v-icon v-if="formShow.extend" @click="formShow.extend=false">keyboard_arrow_down</v-icon>
        <v-icon v-else @click="formShow.extend=true">keyboard_arrow_up</v-icon>
      </v-card-title>
      <v-divider class="mx-4 mb-4"></v-divider>
      <v-row v-if="wordJson.extend.length!=0 && formShow.extend">
        <inputCard
          v-for="(extend,index) in wordJson.extend"
          :key="extend"
          :obj="extend"
          :labels="extendLebles"
          v-model="wordJson.extend[index-1]"
          @addCard="addCardList( wordJson.extend)"
          @removeCard="wordJson.extend.splice(index,1)"
        ></inputCard>
      </v-row>
      <v-row v-else-if="wordJson.extend.length>0"></v-row>
      <v-row v-else>
        <v-icon @click="addCardList( wordJson.extend)">add</v-icon>
      </v-row>

      <v-card-title class="mt-2" label>
        Complement
        <v-icon v-if="formShow.complement" @click="formShow.complement=false">keyboard_arrow_down</v-icon>
        <v-icon v-else @click="formShow.complement=true">keyboard_arrow_up</v-icon>
      </v-card-title>
      <v-divider class="mx-4 mb-4"></v-divider>
      <v-row v-if="wordJson.complement.length!=0 && formShow.complement">
        <inputCard
          v-for="(complement,index) in wordJson.complement"
          :key="complement"
          :obj="complement"
          :labels="complementLebles"
          v-model="wordJson.complement[index-1]"
          @addCard="addCardList( wordJson.complement,true)"
          @removeCard="wordJson.complement.splice(index,1)"
        ></inputCard>
      </v-row>
      <v-row v-else-if="wordJson.complement.length>0"></v-row>
      <v-row v-else>
        <v-icon @click="addCardList( wordJson.complement,true)">add</v-icon>
      </v-row>
      <v-card-title class="mt-2" label>
        add word
        <v-icon v-if="formShow.addWord" @click="formShow.addWord=false">keyboard_arrow_down</v-icon>
        <v-icon v-else @click="formShow.addWord=true">keyboard_arrow_up</v-icon>
      </v-card-title>
      <v-divider class="mx-4 mb-4"></v-divider>
      <v-row v-if="wordJson.addWord.length!=0 && formShow.addWord">
        <inputCard
          v-for="(addWord,index) in wordJson.addWord"
          :key="addWord"
          :obj="addWord"
          :labels="addWordLebles"
          v-model="wordJson.addWord[index-1]"
          @addCard="addCardList( wordJson.addWord,true)"
          @removeCard="wordJson.addWord.splice(index,1)"
        ></inputCard>
      </v-row>
      <v-row v-else-if="wordJson.addWord.length>0"></v-row>
      <v-row v-else>
        <v-icon @click="addCardList( wordJson.addWord,true)">add</v-icon>
      </v-row>
      <v-divider class="mt-4 mb-4"></v-divider>
      <v-select v-model="wordJsonDay" :items="dayItem" label="Day" required></v-select>

      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn text color="primary" @click="submitHandler">OK</v-btn>
    </v-form>
  </v-dialog>
</template>


<style src="./style.scss" lang="scss" scoped>
</style>


<script>
import inputCard from "../inputCard/inputCard";
import { mdiAccount } from "@mdi/js";
import axios from "axios";
import config from "../../config";
import partOfSpeech from "../partOfSpeech/partOfSpeech";

import validation from "../validation";

export default {
  name: "crate",
  props: ["initDay"],
  data() {
    return {
      extendLebles: {
        word: "Extend Word",
        chinese: "Extend Word Chinese"
      },
      complementLebles: {
        word: "Complement Word",
        chinese: "Complement Word Chinese"
      },
      addWordLebles: {
        word: "addWord Word",
        chinese: "addWord Word Chinese"
      },
      formShow: {
        extend: true,
        complement: true,
        addWord: true
      },

      icons: [mdiAccount],
      tempList: [],
      wordJson: {
        wordId: 0,
        word: "",
        chinese: [],
        partOfSpeech: "",
        point: 1,
        day: 1,
        extend: [],
        example: {
          sentence: "",
          chinese: ""
        },
        complement: [],
        addWord: []
      },
      wordJsonTemplate: {
        wordId: 0,
        word: "",
        chinese: [],
        partOfSpeech: "",
        point: 1,
        day: 1,
        extend: [],
        example: {
          sentence: "",
          chinese: ""
        },
        complement: [],
        addWord: []
      },
      dayItem: [],
      modal: false
    };
  },
  mixins: [validation],
  computed: {
    seList() {
      return this.selected.split(",");
    },
    wordJsonDay: {
      get: function() {
        return `DAY${this.wordJson.day}`;
      },
      set: function(val) {
        console.log(val);
        this.wordJson.day = parseInt(val.replace("DAY", ""));
      }
    }
  },
  methods: {
    getNextId: async function() {
      let nextId = 0;
      await axios.get(config.apiUrl + "getNextInsertId").then(res => {
        this.wordJson.wordId = res.data.wordId;
      });
      return nextId;
    },
    autocomlateInpitHandler: async function(list, event) {
      const vm = this;
      function pushOfList(s) {
        if (vm.tempList.indexOf(s) < 0) {
          vm.tempList.push(s);
        }
      }
      console.log(event.key);
      if (event.key == ",") {
        let str = await event.target.value.replace(",", "");
        await list.push(str);
        await pushOfList(str);
        event.target.value = "";
      }
    },
    keyBackspaceInpitHandler: function(list, event) {
      const vm = this;
      if (event.key == "Backspace" && event.target.value == "") {
        list.pop();
        vm.tempList.pop();
      }
    },
    addCardList: function(list, noPartOfSpeech = false) {
      let extend = {};

      if (noPartOfSpeech == false) {
        extend = {
          word: "",
          chinese: [],
          partOfSpeech: ""
        };
      } else {
        extend = {
          word: "",
          chinese: []
        };
      }

      list.push(extend);
    },
    submitHandler: async function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        axios
          .post(config.apiUrl + "insertWord", this.wordJson)
          .then(async res => {
            console.log(res);
            this.wordJson = this.wordJsonTemplate;
            await this.getNextId();
            await this.updateWordList();
            this.modal = false;
          });
      }
    },
    updateWordList() {
      this.$emit("insertData", this.wordJson);
    }
  },
  async mounted() {
    this.wordJson = this.wordJsonTemplate;
    await this.getNextId();
    this.dayItem = [...Array(30)].map((e, i) => `DAY${1 + i}`);
  },
  watch: {
    "wordJson.chinese": {
      handler: function(val) {
        if (val.length > 5) {
          this.$nextTick(() => this.wordJson.chinese.pop());
        }
      }
    },
    initDay: {
      handler: function() {
        this.wordJson.day = this.initDay;
      },
      immediate: true
    }
  },
  components: {
    inputCard,
    partOfSpeech
  }
};
</script>