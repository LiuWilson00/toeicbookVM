<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app clipped>
        <v-list>
          <v-list-item v-for="i in 3" :key="i" :to="{path: '/ToeicBook/' + i}">
            <v-list-item-action>
              <v-icon>mdi-widgets</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Day {{ i }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-toolbar-title>Toeic 30 day</v-toolbar-title>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>

<script>
export default {};
</script>
