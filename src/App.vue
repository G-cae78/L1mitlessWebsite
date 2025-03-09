<template>
  <nav>
    <router-link to="/" class="navButton">Home</router-link> 
    <router-link to="/about" class="navButton">About</router-link>
    <a href="https://linktr.ee/L1mtless" target="_blank" rel="noopener" class ="navButton">Contact</a>
    <router-link to="/cart" class="navButton">Cart <img src=""></router-link>
  </nav>
  <div class="topnav">
    <span class="left-text">L1MITLESS</span>
      <img class="logo" alt="logo" src="./assets/TransparentLogo.png">
      <span class="right-text">NO CEILINGS.</span>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  mounted() {
    // Add the 'fly-up' class to the logo after the component mounts
    const logo = document.querySelector('.logo') as HTMLElement;
    if (logo) {
      logo.classList.add('fly-up');

      // Remove the class after the animation ends to reset the logo's position
      logo.addEventListener('animationend', () => {
        logo.classList.remove('fly-up');
      });
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  padding: 30px;
  margin-top: 20px;
}

.logo {
  height: 100px; /* Adjust as needed */
  width: 100px;
  transition: transform 5s ease-in-out; /* Smooth transition for the logo */
}

/* Fly Up Animation */
@keyframes fly-up {
  10% {
    transform: translateY(10px);
  }
  30% {
    transform: translateY(-100px); /* Fly up */
  }
  100% {
    transform: translateY(0); /* Come back down */
  }
}

.fly-up {
  animation: fly-up 2s ease-in-out; /* Apply the animation */
}

nav a {
  font-weight: bold;
  color: black;
}

nav a.router-link-exact-active {
  color: black;
}

.topnav {
  display: flex;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Align everything to the top */
  height: 0vh; /* Make the container take the full viewport height */
  margin-top: -50px;
}

.navButton {
  color: black;
  border: 2px solid black;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.navButton:hover {
  background-color: white;
  color: black;
}

.left-text, .right-text {
  font-size: 24px;
  font-weight: bold;
  color: black;
}
</style>