<template>
  <v-app>
    <v-app-bar dark app :color="appBarColor">
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  computed: {
    appTitle() {
      return process.env.VUE_APP_TITLE;
    },
    appBarColor() {
      return process.env.VUE_APP_TESTING === 'true' ? '#F44336' : '#353535';
    },
  },
});
</script>
