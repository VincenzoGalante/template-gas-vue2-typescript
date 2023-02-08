<template>
  <v-container>
    <h1 class="text-h4">Welcome to Your Vue.js App {{ user.name }}</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { ExampleData } from '@/types/example';

export default Vue.extend({
  name: 'App',

  data: () => ({
    user: {
      name: '',
      age: 0,
    } as ExampleData,
  }),

  mounted() {
    this.$google.script.run
      .withSuccessHandler((response: string) => {
        this.user = JSON.parse(response);
      })
      .withFailureHandler((error: string) => {
        console.error(error);
      })
      .getUser();
  },
});
</script>
