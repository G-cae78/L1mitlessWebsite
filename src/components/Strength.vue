<template>
    <div class="hybrid-training">
      <h1>Strength Training</h1>
      <div class="training-container">
        <!-- Training Plan Card -->
        <div class="training-card">
          <img :src="trainingPlan.image" :alt="trainingPlan.name" class="training-image" />
          <div class="training-details">
            <h2>{{ trainingPlan.name }}</h2>
            <p>{{ trainingPlan.description }}</p>
            <p class="training-goal">
              <strong>Goal:</strong> {{ trainingPlan.goal }}
            </p>
            <select v-model="trainingPlan.selectedOption" class="training-select">
              <option v-for="option in trainingPlan.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <button @click="addToCart(trainingPlan)" class="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'StrengthTraining',
    data() {
      return {
        trainingPlan: {
          id: 1,
          name: 'Limitless Strength Plan',
          description:
            'This is the exact strength training plan I personally used to transform my body over the past three years. Starting with a bench press of 135 lbs, I progressed to 225 lbs; my squat increased from 185 lbs to 315 lbs, and my deadlift skyrocketed from 225 lbs to 405 lbs. This plan is designed to help you build muscle, increase strength, and boost confidence in the gym. Whether you’re a beginner or an experienced lifter, this plan is tailored to help you achieve your goals efficiently. If you’re unsure about anything in the plan, feel free to reach out—I’m here to guide you every step of the way. Become LIMITLESS today.',
          image: require('@/assets/Muscle.png'), // Replace with your image
          options: ['1 Week'],
          selectedOption: '1 Month',
          goal: 'Build Muscle, Increase Strength, and Boost Confidence',
        },
      };
    },
    methods: {
      addToCart(plan: any) {
        alert(`Added ${plan.name} (${plan.selectedOption}) to cart!`);
        // You can replace this with actual cart logic (e.g., Vuex or a cart service)
      },
    },
  });
  </script>
  
  <style scoped>
  .hybrid-training {
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  .training-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .training-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .training-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .training-image {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  
  .training-details {
    padding: 20px;
    text-align: left;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
  }
  
  .training-goal {
    font-size: 1rem;
    color: #333;
    margin-bottom: 15px;
  }
  
  .training-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 1rem;
  }
  
  .add-to-cart-button {
    width: 100%;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-to-cart-button:hover {
    background-color: #555;
  }
  </style>