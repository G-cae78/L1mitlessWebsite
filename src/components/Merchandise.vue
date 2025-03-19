<template>
    <div class="merchandise-page">
        <br><br>
      <!-- <h1>L1MITLESS Merchandise</h1> -->
      <p class="subtitle">Shop our exclusive collection to support and represent the L1MITLESS lifestyle.</p>
  
      <div class="merch-container">
        <!-- Product Card for Caps -->
        <div class="product-card" v-for="cap in caps" :key="cap.id">
          <img :src="cap.image" :alt="cap.name" class="product-image" />
          <div class="product-details">
            <h2>{{ cap.name }}</h2>
            <p class="price">€{{ cap.price }}</p>
            <p class="description">{{ cap.description }}</p>
            <select v-model="cap.selectedSize" class="size-select" placeholder="One Size">
              <option v-for="size in cap.sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <button @click="addToCart(cap)" class="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'MerchandisePage',
    data() {
      return {
        caps: [
          {
            id: 1,
            name: 'L1MITLESS Trucker Cap',
            description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
            price: 25.99,
            image: require('@/assets/Cap1.png'), // Replace with your cap image
            // sizes: ['S', 'M', 'L', 'XL'],
            sizes: ['One Size'],
            selectedSize: 'M',
          },
          {
            id: 2,
            name: 'L1MITLESS Trucker Cap',
            description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
            price: 25.99,
            image: require('@/assets/Cap2.png'), // Replace with your cap image
            // sizes: ['S', 'M', 'L', 'XL'],
            sizes: ['One Size'],
            selectedSize: 'M',
          },
          {
            id: 3,
            name: 'L1MITLESS Trucker Cap',
            description: 'A sleek and stylish cap to represent the LIMITLESS lifestyle.',
            price: 25.99,
            image: require('@/assets/Cap3.png'), // Replace with your cap image
            // sizes: ['S', 'M', 'L', 'XL'],
            sizes: ['One Size'],
            selectedSize: 'M',
          },
          // Add more caps or products here as needed
        ],
      };
    },
    methods: {
      addToCart(product: any) {
        alert(`Added ${product.name} (Size: ${product.selectedSize}) to cart!`);
        // You can replace this with actual cart logic (e.g., Vuex or a cart service)
      },
    },
  });
  </script>
  
  <style scoped>
  .merchandise-page {
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
  }
  
  .merch-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .product-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .product-image {
    width: 110%;
    height: 300px;
    object-fit: cover;
  }
  
  .product-details {
    padding: 15px;
    text-align: left;
  }
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 15px;
  }
  
  .size-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 0.9rem;
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