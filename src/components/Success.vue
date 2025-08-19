<template>
  <div class="success-page">
    <div class="overlay"></div>
    <div class="confetti-container">
      <h1>🎉 Appreciate You! 🎉</h1>
      <p class="subtitle">Thank you for your purchase! Your order has been confirmed.</p>
      <p class="order-details">A confirmation email has been sent to your inbox.</p>

      <button
        v-if="showDownloadButton"
        @click="downloadPlan"
        class="action-button"
      >
        Download Your Plan
      </button>

      <button @click="goToHome" class="action-button outline">Continue Shopping</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import confetti from 'canvas-confetti';

const router = useRouter();
const route = useRoute();

const showDownloadButton = ref(false);
const downloadUrl = ref('');

const getSessionDetails = async () => {
  const sessionId = route.query.session_id;
  if (!sessionId) return;

  try {
    const res = await axios.get(
      `https://getplanforsession-y65c5f7hba-ew.a.run.app?sessionId=${sessionId}`
    );
    if (res.data?.planUrl) {
      showDownloadButton.value = true;
      downloadUrl.value = res.data.planUrl;
    }
  } catch (err) {
    console.error("Error fetching session details:", err);
  }
};

const launchConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#00e6b8', '#ffffff', '#d1d1d1'],
  });
};

onMounted(() => {
  launchConfetti();
  getSessionDetails();
});

const downloadPlan = () => {
  window.open(downloadUrl.value, '_blank');
};

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.success-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url('/src/assets/birdsBackdrop.png') no-repeat center center/cover;
  color: #ffffff;
  padding: 2rem;
  font-family: 'Helvetica Neue', sans-serif;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.55); /* dark overlay for readability */
  z-index: 1;
}

.confetti-container {
  position: relative;
  z-index: 2;
  max-width: 600px;
  text-align: center;
}

h1 {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #e2e2e2;
}

.order-details {
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 2rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  margin: 0.5rem;
  border: none;
  background-color: #00e6b8;
  color: #0f0f0f;
}

.action-button:hover {
  background-color: #00cfa7;
}

.action-button.outline {
  background: transparent;
  border: 2px solid #00e6b8;
  color: #00e6b8;
}

.action-button.outline:hover {
  background-color: #00e6b8;
  color: #0f0f0f;
}
</style>
