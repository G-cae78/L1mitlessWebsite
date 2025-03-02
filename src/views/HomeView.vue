<template>
  <div class="topnav">
    <span class="left-text">L1MITLESS</span>
      <img class="logo" alt="logo" src="../assets/TransparentLogo.png">
      <span class="right-text">NO CEILINGS.</span>
  </div>
  <div class = "text-container">
    <Home msg=""/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Home from '@/components/Home.vue'; // @ is an alias to /src

@Options({
  components: {
    Home,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
.topnav {
  display: flex;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Align everything to the top */
  height: 3vh; /* Make the container take the full viewport height */
}

.logo {
  height: 100px; /* Adjust as needed */
  width: 100px;
}

.text-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* Adds spacing between text elements */
  margin-top: 100px; /* Space between logo and text */
}

.left-text, .right-text {
  font-size: 24px;
  font-weight: bold;
  color: black;
}

</style>
