<template>
    <div class="meal-plans">
        <br>
      <h1>Meal Plans</h1>
      <br>
      <div class="meal-plans-container">
        <!-- Meal Plan Cards -->
        <div class="meal-plan-card" v-for="plan in mealPlans" :key="plan.id">
          <img :src="plan.image" :alt="plan.name" class="meal-plan-image" />
          <div class="meal-plan-details">
            <h2>{{ plan.name }}</h2>
            <p>{{ plan.description }}</p>
            <select v-model="plan.selectedOption" class="meal-plan-select">
              <option v-for="option in plan.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <button @click="addToCart(plan)" class="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'MealPlans',
    data() {
      return {
        mealPlans: [
          {
            id: 1,
            name: 'Eat Healthy',
            description: 'A balanced meal plan to maintain your fitness and energy levels.',
            image: require('@/assets/Breakfast.png'), // Replace with your image
            options: ['1 Week', '2 Weeks', '1 Month'],
            selectedOption: '1 Week',
          },
          {
            id: 2,
            name: 'Muscle Building',
            description: 'High-protein meals to help you build muscle and strength.',
            image: require('@/assets/MexicanRice.png'), // Replace with your image
            options: ['1 Week', '2 Weeks', '1 Month'],
            selectedOption: '1 Week',
          },
  
          {
            id: 4,
            name: 'Lose Weight',
            description: 'Targeted meal plan to reduce body fat while maintaining muscle mass.',
            image: require('@/assets/StirFry.png'), // Replace with your image
            options: ['1 Week', '2 Weeks', '1 Month'],
            selectedOption: '1 Week',
          },
        ],
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
  .meal-plans {
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  .meal-plans-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .meal-plan-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .meal-plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .meal-plan-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .meal-plan-details {
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
  
  .meal-plan-select {
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