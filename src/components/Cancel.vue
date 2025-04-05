<template>
    <div class="failure-page">
      <div class="error-container">
        <h1>😢 Payment Failed</h1>
        <p class="subtitle">Oops! Something went wrong with your transaction.</p>
        <p class="error-details">Please try again or contact support if the issue persists.</p>
        <button @click="retryPayment" class="retry-button">Retry Payment</button>
        <button @click="goToHome" class="home-button">Go to Homepage</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Navigate to retry the payment
  const retryPayment = () => {
    router.push('/checkout'); // Replace with your checkout page route
  };
  
  // Navigate back to the homepage
  const goToHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .failure-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    text-align: center;
    color: #fff;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    animation: shake 0.5s ease-in-out;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .error-details {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .retry-button,
  .home-button {
    padding: 15px 30px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #ff6f61;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px;
  }
  
  .retry-button:hover,
  .home-button:hover {
    background-color: #ff3b2f;
  }
  
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    50% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-10px);
    }
  }
  </style>