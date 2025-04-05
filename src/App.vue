<template>
  <div class="app-container">
    <!-- Responsive Header -->
    <header class="main-header">
      <span class="header-text left-text">BECOME</span>
      <img class="logo" alt="logo" src="./assets/TransparentLogo.png" @click="goHome">
      <span class="header-text right-text">L1MITLESS</span>
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

    <!-- Main Content -->
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const store = useStore();

    const totalCartItems = computed(() => store.getters.totalCartItems);

    const goHome = () => {
      router.push('/');
    };

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

<style scoped>
/* Base Styles */
#app, .app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation Styles */
.main-nav {
  width: 100%;
  padding: 0.5rem 0;
  background-color: white;
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
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  flex-wrap: wrap;
  background-color: white;
}

.header-text {
  font-size: 1.9rem;
  font-weight: bold;
  color: black;
  white-space: nowrap;
}

.logo {
  height: 90px;
  width: 90px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* Animation */
@keyframes fly-up {
  10% { transform: translateY(15px); }
  30% { transform: translateY(-70px); }
  100% { transform: translateY(0); }
}

.fly-up {
  animation: fly-up 2s ease-in-out;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 0;
}

* {
  box-sizing: border-box;
}

/* Mobile Overrides Only */
@media (max-width: 768px) {
  .main-header {
    gap: 1.5rem; /* More space between elements */
    padding: 0rem; /* More padding */
  }
  
  .header-text {
    font-size: 1.5rem; /* Larger text */
    font-weight: 800; /* Bolder */
    letter-spacing: 0.5px; /* Better spacing */
  }

  .nav-container {
    gap: 0.5rem; /* Reduce gap for smaller screens */
  }
  
  .logo {
    height: 100px; /* Larger logo */
    width: 100px;
  }
}

/* Adjustments for very small phones */
@media (max-width: 480px) {
  .main-header {
    gap: 1.20rem;
  }
  
  .header-text {
    font-size: 1.2rem; /* Slightly smaller but still big */
  }

  .nav-container {
    gap: 0.25rem; /* Further reduce gap for very small screens */
  }
  
  .logo {
    height: 90px;
    width: 90px;
  }
}
</style>