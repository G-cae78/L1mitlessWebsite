<template>
    <div class="cart-page">
      <h1>Your Cart</h1>
      <p class="subtitle">Review your items and proceed to checkout.</p>
  
      <!-- Cart Items -->
      <div v-if="cartItems.length > 0" class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h2>{{ item.name }}</h2>
            <p class="price">${{ item.price }}</p>
            <p v-if="item.selectedSize" class="size">Size: {{ item.selectedSize }}</p>
            <p v-if="item.selectedOption" class="option">Plan: {{ item.selectedOption }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-button">+</button>
            </div>
            <button @click="removeItem(item)" class="remove-button">Remove</button>
          </div>
        </div>
      </div>
  
      <!-- Empty Cart Message -->
      <div v-else class="empty-cart">
        <p>Your cart is empty. Start shopping now!</p>
      </div>
  
      <!-- Cart Summary -->
      <div v-if="cartItems.length > 0" class="cart-summary">
        <h3>Cart Summary</h3>
        <p class="total">Total: ${{ totalPrice.toFixed(2) }}</p>
        <button @click="checkout" class="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  selectedSize?: string;
  selectedOption?: string;
  quantity: number;
}
  export default defineComponent({
    name: 'CartPage',
    data() {
      return {
        cartItems: [
          // Example cart items (replace with dynamic data from a store or backend)
          {
            id: 1,
            name: 'L1MITLESS Cap',
            price: 25.99,
            image: require('@/assets/Cap1.png'), // Replace with your image
            selectedSize: 'M',
            quantity: 1,
          },
          {
            id: 2,
            name: 'Workout Plan',
            price: 49.99,
            image: require('@/assets/Running.png'), // Replace with your image
            selectedOption: '3 Months',
            quantity: 1,
          },
        ],
      };
    },
    computed: {
      totalPrice(): number {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    },
    methods: {
      increaseQuantity(item: any) {
        item.quantity++;
      },
      decreaseQuantity(item: any) {
        if (item.quantity > 1) {
          item.quantity--;
        }
      },
      removeItem(item: any): void {
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      },
      checkout() {
        alert('Proceeding to checkout!'); // Replace with actual checkout logic
      },
    },
  });
  </script>
  
  <style scoped>
  .cart-page {
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
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .cart-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .item-details {
    flex: 1;
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
  
  .size,
  .option {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .quantity-button {
    padding: 5px 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .quantity-button:hover {
    background-color: #555;
  }
  
  .quantity {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }
  
  .remove-button {
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .remove-button:hover {
    background-color: #ff1a1a;
  }
  
  .empty-cart {
    font-size: 1.1rem;
    color: #666;
    margin-top: 30px;
  }
  
  .cart-summary {
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
  }
  
  .total {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  .checkout-button {
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
  
  .checkout-button:hover {
    background-color: #555;
  }
  </style>