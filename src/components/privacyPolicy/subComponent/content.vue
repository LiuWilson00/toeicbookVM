<template>
  <v-list class="content" dense>
    <div class="content-item" v-for="directory in directoryList" :key="directory.name">
      <h3 :id="directory.anchor">{{directory.title}}</h3>
      <component
        v-for="(content,index) in directory.contents"
        :key="index"
        :is="getItemComponentByType(content.type)"
        :item="content"
      ></component>
    </div>
  </v-list>
</template>
<script>
import itemList from "./contentItemList";
import itemText from "./contentItemText";
export default {
  name: "content",
  props: ["directoryList"],
  methods: {
    getItemComponentByType(type) {
      if (type == "list") {
        return itemList;
      } else {
        return itemText;
      }
    }
  },
  components: {
    itemList,
    itemText
  }
};
</script>