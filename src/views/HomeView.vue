<template>
  <div class = "text-container">
    <Home msg=""/>
    <BackgroundVideo />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Home from '@/components/Home.vue'; // @ is an alias to /src
import BackgroundVideo from '@/components/BackgroundVideo.vue';

@Options({
  components: {
    Home,
    BackgroundVideo,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>

.text-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* Adds spacing between text elements */
  margin-top: 200px; /* Space between logo and text */
}
</style>
