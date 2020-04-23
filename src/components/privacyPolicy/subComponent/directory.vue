<template>
  <div class="directory">
    <v-list-item v-for="directory in directoryList" :key="directory.name">
      <v-list-item-content>
        <v-list-item-title>
          <a :href="`#${directory.anchor}`">{{directory.title}}</a>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
export default {
  name: "directory",
  props: ["directoryList"]
};
</script>