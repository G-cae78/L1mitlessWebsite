<template>
    <div class="success-page">
      <div class="confetti-container">
        <h1>🎉 Payment Successful! 🎉</h1>
        <p class="subtitle">Thank you for your purchase! Your order has been confirmed.</p>
        <p class="order-details">A confirmation email has been sent to your inbox.</p>
        <button @click="goToHome" class="home-button">Continue Shopping</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import confetti from 'canvas-confetti';
  
  const router = useRouter();
  
  // Trigger confetti animation when the page loads
  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
  
  launchConfetti();
  
  // Navigate back to the homepage
  const goToHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .success-page {
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
    animation: bounce 1s infinite;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .order-details {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .home-button {
    padding: 15px 30px;
    font-size: 1.2rem;
    color: #fff;
    background-color: #ff6f61;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .home-button:hover {
    background-color: #ff3b2f;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
  </style>