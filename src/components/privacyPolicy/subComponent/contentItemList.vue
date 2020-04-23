<template>
  <div class>
    <v-list-item v-for="(text,index) in item.content" :key="index">
      <v-list-item-content>
        <v-list-item-title dense>{{text}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  name: "list",
  props: ["item"]
};
</script>