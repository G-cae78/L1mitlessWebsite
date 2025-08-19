<template>
    <video autoplay muted loop playsinline class="background-video">
      <source :src="require('@/assets/Background.mp4')" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </template>
  
  <style scoped>
  .background-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    opacity: 0.5;
    filter: brightness(0.7);
  }
  </style>
  