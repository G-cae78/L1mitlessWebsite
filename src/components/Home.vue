<template>
  <div class="home-page">
    <h1 class="page-title animate__animated animate__fadeIn">{{ msg }}</h1>
    <div class="grid-container">
      <div 
        v-for="(item, index) in menuItems" 
        :key="index" 
        class="menu-card"
        @click="switchPage(item.route)"
        :style="{ '--animation-order': index }"
      >
        <div class="image-container">
          <img 
            :src="require(`@/assets/${item.image}`)" 
            :alt="item.text" 
            class="card-image"
            :class="{'merch-image': item.route === 'merch'}"
          >
        </div>
        <div class="card-overlay">
          <div class="card-text">{{ item.text }}</div>
        </div>
        <div class="card-hover-effect"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';

@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string

  menuItems = [
    { text: 'Hybrid Training', route: 'hybrid', image: 'Running.png' },
    { text: 'Strength Training', route: 'strength', image: 'calfraises.png' },
    { text: 'Meal Plans', route: 'meal-plans', image: 'Pasta.png' },
    { text: 'Merchandise', route: 'merch', image: 'shirtBack.png' }
  ]

  router = useRouter();

  switchPage = (page: string) => {
    this.router.push(`/${page}`);
  };
}
</script>

<style scoped>
/* Add animate.css for animations */
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.home-page {
  margin-top: 0;
  padding-top: 0;
}

.page-title {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
  text-align: center;
  font-size: 2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Card animations */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0 auto;
  max-width: 100%;
  width: calc(100% - 1rem);
}

.menu-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1/1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 0;
  transform: scale(0.95);
  opacity: 0;
  animation: cardEntrance 0.8s ease-out forwards;
  animation-delay: calc(var(--animation-order) * 0.1s);
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.menu-card:hover .card-image {
  transform: scale(1.1) rotate(2deg);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  opacity: 1;
  transition: all 0.3s ease;
}

.menu-card:hover .card-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.2) 100%);
}

.card-text {
  color: white;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  transform: translateY(10px);
  transition: all 0.3s ease;
  opacity: 0.9;
}

.menu-card:hover .card-text {
  transform: translateY(0);
  opacity: 1;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
}

/* Pulse hover effect */
.card-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  opacity: 0;
  transition: all 0.5s ease;
}

.menu-card:hover .card-hover-effect {
  opacity: 1;
  animation: pulseEffect 2s infinite;
}

@keyframes pulseEffect {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* Click animation */
.menu-card:active {
  transform: scale(0.98);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-container {
    gap: 0.75rem;
    width: calc(100% - 1rem);
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .menu-card {
    animation-delay: calc(var(--animation-order) * 0.05s);
    aspect-ratio: 3/4;
  }
}

@media (max-width: 480px) {
  .grid-container {
    gap: 0.5rem;
    width: calc(100% - 0.5rem);
  }
  
  .page-title {
    font-size: 1.2rem;
    margin-top: 0.25rem;
    margin-bottom: 0.2rem;
  }


  .menu-card {
    animation-delay: calc(var(--animation-order) * 0.05s);
    aspect-ratio: 3/4;
  }

}
</style>