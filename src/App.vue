<template>
  <div class="app-container">
    <!-- Responsive Header -->
    <header class="main-header">
      <!-- <span class="header-text left-text">BECOME</span> -->
      <img class="logo" alt="logo" src="./assets/TransparentWhiteLogo.png" @click="goHome">
      <!-- <span class="header-text right-text">L1MITLESS</span><br> -->
    </header>
    
    <!-- Responsive Navigation -->
    <nav class="main-nav">
      <div class="nav-container">
        <router-link to="/" class="nav-button">Home</router-link> 
        <router-link to="/about" class="nav-button">About</router-link>
        <a href="https://linktr.ee/L1mtless" target="_blank" rel="noopener" class="nav-button">Contact</a>
        <router-link to="/cart" class="nav-button cart-link">
          Cart 
          <img :src="require('@/assets/cart.png')" alt="cart" class="cart-icon">
          <span v-if="totalCartItems > 0" class="cart-item-count">
             {{ totalCartItems }}
          </span>
        </router-link>
      </div>
    </nav>
    <div class="promo-banner">
        <strong>NEW CLOTHING DESIGNS COMING SOON</strong>.
      </div>

    <!-- Main Content -->
    <main class="main-content">
      <router-view/>
    </main>

    <!-- Footer -->
    <footer class="main-footer">
      <p>&copy; 2025 L1MITLESS. All rights reserved.</p>
    </footer>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useHead } from '@vueuse/head'; // Import head management

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const store = useStore();

    const totalCartItems = computed(() => store.getters.totalCartItems);

    const goHome = () => {
      router.push('/');
    };

    // Default SEO meta tags
    useHead({
      title: 'BECOME L1MITLESS – Hybrid Training, Fitness & Merchandise',
      meta: [
        {
          name: 'description',
          content: 'Hybrid training, strength programs, meal plans, and fitness merchandise. Use code L1M10 for 10% off!',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'canonical', href: 'https://becomel1mitless.com' },
      ],
    });

    return {
      goHome,
      totalCartItems,
    };
  },
  mounted() {
    const logo = document.querySelector('.logo') as HTMLElement;
    if (logo) {
      logo.classList.add('fly-up');
      logo.addEventListener('animationend', () => {
        logo.classList.remove('fly-up');
      });
    }
  },
});
</script>

<style>
/* Base Styles */
#app, .app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Navigation Styles */
.main-nav {
  width: 100%;
  padding: 0.5rem 0;
  /* background-color: white; */
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 0;
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

@keyframes banner-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

/* Promo Banner */
.promo-banner {
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.75rem 1rem;
  margin: 1rem auto;
  max-width: 95%;
  border-radius: 6px;
  background: #e63946;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  animation: banner-pulse 1.5s infinite;
}

.nav-button {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border-radius: 4px;
  white-space: nowrap;
}

.nav-button:hover {
  background-color: black;
  color: white;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
}

.cart-icon {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.cart-item-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid white;
  animation: pulse 1.5s infinite;
  transition: all 0.3s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Header Styles */
.main-header {
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  width: 100%; /* Full width */
  padding: 0.5rem 0; /* Vertical padding */
  background-color: transparent; /* Header background */
  position: relative; /* Ensure proper positioning */
  z-index: 100; /* Ensure it stays above other elements */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.app-container {
  width: 100%;
  margin: 0;
  padding: 0;
}

.main-header,
.main-footer {
  width: 100%; /* Ensure full width */
  margin: 0; /* Remove unnecessary margins */
  padding: 0.5rem 0; /* Keep vertical padding */
  background-color: transparent; /* Header background */
  position: relative; /* Ensure proper positioning */
  z-index: 100; /* Ensure it stays above other elements */
}

.header-text {
  font-size: 1.9rem;
  font-weight: bold;
  color: black;
  white-space: nowrap;
}

.logo {
  display: block;
  margin: 0 auto; 
  height: auto;
  width: clamp(140px, 15vw, 260px); /* scales between 120px and 260px based on viewport width */
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: transparent;
}

.logo-container {
  background-color: transparent; /* Ensure the parent container has no background */
}

/* Animation */
@keyframes fly-up {
  10% { transform: translateY(30px); }
  30% { transform: translateY(-90px); }
  100% { transform: translateY(0); }
}

.fly-up {
  animation: fly-up 2s ease-in-out;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 1rem;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  margin-top: 0;
}

.main-footer {
  background-color: transparent; /* Footer background */
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #020202;
  border-top: 1px solid #e0e0e0;
}


* {
  box-sizing: border-box;
}

/* Mobile Overrides Only */
@media (max-width: 768px) {
  .main-header {
    gap: 0.5rem; /* Reduced gap for tighter layout */
    padding: 0.5rem 0; /* Consistent vertical padding */
  }
  
  .header-text {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  .nav-container {
    gap: 0.5rem;
    padding: 0 0.5rem; /* Reduced right padding, removed left padding */
   /* Align buttons to left */
    margin-left: -5; /* Remove auto margin */
    max-width: 100%; /* Allow full width adjustment */
  }
  
  .logo {
    max-width: 250px;
    height: auto;
     width: 70vw;     
    max-height: 230px;
  }
}

/* Adjustments for very small phones */
@media (max-width: 480px) {
  .main-header {
    gap: 0.25rem;
    padding: 0.5rem 0.5rem; /* Added horizontal padding */
  }
  
  .header-text {
    font-size: 1.2rem;
  }

  .nav-container {
    gap: 0.25rem;
    padding: 0 0.25rem; /* Even tighter padding */
  }
  
  .logo {
    max-width: 190px;
    height: auto;
    width: 60vw;   
    max-height: 160px;
  }
  
  .nav-button {
    padding: 0.5rem 0.75rem; /* Slightly reduced button padding */
    font-size: 0.9rem; /* Smaller font for tight spaces */
  }
}
</style>