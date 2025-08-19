<template>
    <div class="about">
      <div class="about-content">
        <h1 class="title">About L1MITLESS</h1>
        <p class="intro">
          At <strong>L1MITLESS</strong>, we believe there are <strong>no ceilings</strong> to what you can achieve—whether you're lacing up your running shoes for the first time, striving to build strength, or pursuing the balance of a hybrid athlete. Founded by <strong>George Anayo-Ezikeoha</strong>, a hybrid athlete and intermediate-to-advanced runner with a 5k time just under 20 minutes, L1MITLESS is more than just a fitness brand; <strong>it’s a mindset</strong>.
        </p>
        <p class="story">
          I created L1MITLESS to bring a <strong>personalized and heartfelt touch</strong> to fitness, guiding those who feel stuck or believe they can’t reach their full potential. My journey has taught me that with discipline, faith, and the right support, <strong>anything is possible</strong>. When I first started running, I couldn’t even complete 2km—but through <strong>consistency</strong> and determination, I’ve now achieved a 5k time under 20 minutes. As someone who lifts, runs, and constantly learns, I’m here to share the lessons I’ve gained—and continue to gain—to help you break through your limits.
        </p>
        <p class="cooking">
          Oh, and I also <strong>cook really well</strong>—because fueling your body is just as important as training it!
        </p>
        <div class="offerings">
          <h2 class="subtitle">What We Offer:</h2>
          <ul class="offerings-list">
            <li><strong>Beginner Running Training:</strong> Start your running journey with confidence.</li>
            <li><strong>Strength Training:</strong> Build muscle, power, and endurance.</li>
            <li><strong>Hybrid Athlete Training:</strong> Combine strength and cardio for peak performance.</li>
            <li><strong>Personalized Meal Plans:</strong> Fuel your body to match your goals.</li>
            <li><strong>Weekly Check-Ins:</strong> Stay accountable and motivated with consistent support.</li>
          </ul>
        </div>
        <p class="lifestyle">
          But L1MITLESS is more than just training and meal plans—it’s a <strong>lifestyle</strong>. Through my social media, I share my love for fitness, fashion, and the daily grind, showing that fitness isn’t just about the gym or the track; it’s about living fully and authentically.
        </p>
        <p class="faith">
          Phillipian 4:11-13 <em>“I can do all things through Christ who strengthens me.”</em> This belief fuels my mission to help you realize that <strong>you are limitless</strong>, too. The only thing holding you back is the belief that you can’t.
        </p>
        <p class="call-to-action">
          Join me at L1MITLESS, and let’s shatter those ceilings together. Because here, there are <strong>no limits</strong>—only possibilities.
        </p>
        <p class="tagline">
          <strong>No Ceilings. </strong><br>
          <strong>Become L1MITLESS.</strong>
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'About',
  });
  </script>
  
  <style scoped>
  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: transparent;
    font-family: 'Arial', sans-serif;
    color: #020202;
  }
  
  .about-content {
    max-width: 800px;
    text-align: left;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #000;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .intro, .story, .cooking, .lifestyle, .faith, .call-to-action, .tagline {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  .subtitle {
    font-size: 1.8rem;
    font-weight: bold;
    color: #000;
    margin: 2rem 0 1rem;
  }
  
  .offerings-list {
    list-style-type: disc;
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .offerings-list li {
    margin-bottom: 0.5rem;
  }
  
  .tagline {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
    color: #000;
  }
  
  strong {
    color: #000;
    font-weight: bold;
  }
  
  em {
    font-style: italic;
  }
  </style>