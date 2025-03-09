<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="button-container">
      <button>
        <img :src="require('@/assets/Pasta.png')" alt="pasta">
        <div class="overlay">
          <div class="text">Meal Plans</div>
        </div>
      </button>
      <button>
        <img :src="require('@/assets/Running.png')" alt="running">
        <div class="overlay">
          <div class="text">Hybrid Training</div>
        </div>
      </button>
      <button>
        <img :src="require('@/assets/calfraises.png')" alt="calf raises">
        <div class="overlay">
          <div class="text">Strength Training</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 30px;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

a:hover {
  color: #2c3e50;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Reduced gap for a cleaner look */
  margin: 20px 0;
  flex-wrap: wrap; /* Ensure responsiveness */
}

button {
  position: relative;
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px; /* Fixed width for consistency */
  height: 400px; /* Reduced height for better proportions */
  overflow: hidden;
  border-radius: 10px; /* Rounded corners for a modern look */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
}

.button-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* Center the image */
  border-radius: 10px; /* Match button border radius */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Darker overlay for better contrast */
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px; /* Match button border radius */
}

button:hover .overlay {
  opacity: 1;
}

.text {
  color: white;
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-weight: bold;
}

.footer {
  font-size: 1.5rem;
  color:black;
  text-decoration: none;
  transition: color 0.3s ease;
}
</style>