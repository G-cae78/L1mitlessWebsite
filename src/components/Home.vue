<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="button-container">
      <button @click="switchPage('meal-plans')">
        <img :src="require('@/assets/Pasta.png')" alt="meal plans" class="button-image">
        <div class="overlay">
          <div class="text">Meal Plans</div>
        </div>
      </button>
      <button @click="switchPage('hybrid')">
        <img :src="require('@/assets/Running.png')" alt="hybrid training" class="button-image">
        <div class="overlay">
          <div class="text">Hybrid Training</div>
        </div>
      </button>
      <button @click="switchPage('strength')">
        <img :src="require('@/assets/calfraises.png')" alt="strength training" class="button-image">
        <div class="overlay">
          <div class="text">Strength Training</div>
        </div>
      </button>
      <button @click="switchPage('merch')">
        <img :src="require('@/assets/Cap1.png')" alt="merchandise" class="button-image merchandise-image">
        <div class="overlay">
          <div class="text">Merchandise</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string

  router = useRouter();

    switchPage = (page: string) => {
      this.router.push(`/${page}`);
    };

  }
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center; /* Center the heading */
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
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
  width: 300px;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.button-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.merchandise-image {
  object-position: 40% 50%; /* Adjust to zoom out the merchandise image */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px;
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
</style>