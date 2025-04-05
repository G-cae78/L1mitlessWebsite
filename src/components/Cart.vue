<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <p class="subtitle">Review your items and proceed to checkout.</p>

    <div v-if="cartItems.length > 0" class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h2>{{ item.name }}</h2>
          <p class="price">€{{ item.price }}</p>
          <p v-if="item.selectedSize" class="size">Size: {{ item.selectedSize }}</p>
          <p v-if="item.selectedOption" class="option">Plan: {{ item.selectedOption }}</p>

          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.productId)" class="quantity-button">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.productId)" class="quantity-button">+</button>
          </div>
          <button @click="removeItem(item.productId)" class="remove-button">Remove</button>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty. Start shopping now!</p>
    </div>

    <div v-if="cartItems.length > 0" class="cart-summary">
      <h3>Cart Summary</h3>
      <p class="total">Total: €{{ totalPrice.toFixed(2) }}</p>
      <button @click="switchPage('delivery')" class="checkout-button">Proceed to Checkout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  name: 'CartPage',
  computed: {
    ...mapGetters(['cartItems', 'totalPrice']),
  },
  methods: {
    ...mapActions(['increaseQuantity', 'decreaseQuantity', 'removeItem']),
    switchPage(page: string) {
      this.$router.push({
        path: `/${page}`,
        query: {
          productId: this.cartItems.map((item: any) => item.id).join(','), // Pass all plan IDs
          name: this.cartItems.map((item: any) => item.name).join(','), // Pass names
          description: this.cartItems.map((item: any) => item.description).join(','), // Pass descriptions
          price: this.cartItems.map((item: any) => item.price).join(','), // Pass prices
          quantity: this.cartItems.map((item: any) => item.quantity).join(','), // Pass quantities
          total: this.totalPrice.toFixed(2), // Pass total price
        },
      });
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