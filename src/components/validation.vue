<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "validation",
  validations: {
    wordJson: {
      word: { required },
      chinese: { required },
      partOfSpeech: { required },
      example: {
        sentence: { required },
        chinese: { required }
      }
    }
  },
  computed: {
    wordJson_word_Errors() {
      const errors = [];
      if (!this.$v.wordJson.word.$dirty) return errors;
      !this.$v.wordJson.word.required && errors.push("Word is required!");
      return errors;
    },
    wordJson_chinese_Errors() {
      const errors = [];
      if (!this.$v.wordJson.chinese.$dirty) return errors;
      !this.$v.wordJson.chinese.required && errors.push("Chinese is required!");
      return errors;
    },
    wordJson_partOfSpeech_Errors() {
      const errors = [];
      if (!this.$v.wordJson.partOfSpeech.$dirty) return errors;
      !this.$v.wordJson.partOfSpeech.required &&
        errors.push("Part of speech is required!");
      return errors;
    },
    wordJson_example_sentence_Errors() {
      const errors = [];
      if (!this.$v.wordJson.example.sentence.$dirty) return errors;
      !this.$v.wordJson.example.sentence.required &&
        errors.push("Example Sentence is required!");
      return errors;
    },
    wordJson_example_chinese_Errors() {
      const errors = [];
      if (!this.$v.wordJson.example.chinese.$dirty) return errors;
      !this.$v.wordJson.example.chinese.required &&
        errors.push("Example chinese is required!");
      return errors;
    }
  }
};
</script>