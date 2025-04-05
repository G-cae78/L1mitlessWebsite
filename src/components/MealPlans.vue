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
            <p class="merch-price"><strong>Price: </strong>€{{ plan.price.toFixed(2) }}</p>
            <button @click="addToCart(plan)" class="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { mapMutations } from 'vuex';
  import { loadStripe } from '@stripe/stripe-js';
  
  export default defineComponent({
    name: 'MealPlans',
    data() {
      return {
        mealPlans: [
          {
            id: 1,
            name: 'Healthy',
            description: 'A balanced meal plan to maintain your fitness and energy levels.',
            image: require('@/assets/Breakfast.png'), // Replace with your image
            options: ['1 Week', '2 Weeks', '1 Month'],
            price: 5.99,
            selectedOption: '1 Week',
          },
          {
            id: 2,
            name: 'Muscle Building',
            description: 'High-protein meals to help you build muscle and strength.',
            image: require('@/assets/MexicanRice.png'), // Replace with your image
            options: ['1 Week', '2 Weeks', '1 Month'],
            price: 5.99,
            selectedOption: '1 Week',
          },
  
          {
            id: 4,
            name: 'Lose Weight',
            description: 'Targeted meal plan to reduce body fat while maintaining muscle mass.',
            image: require('@/assets/StirFry.png'), // Replace with your image
            options: ['1 Week', '2 Weeks', '1 Month'],
            price: 5.99,
            selectedOption: '1 Week',
          },
        ],
      };
    },
    methods: {
      ...mapMutations(['ADD_TO_CART']),
    addToCart(item: any) {
      this.ADD_TO_CART({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        selectedSize: item.selectedSize,
        quantity: 1, // Default to 1 when adding a new item
      });
      alert(`${item.name} added to cart!`);
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

  .merch-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
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