<!-- src/views/Accueil.vue -->
<template>
  <div class="accueil-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>{{t("home.heroTitle")}},{{ user?.user_metadata.full_name }}</h1>
        <p>{{t("home.heroSubtitle")}}</p>
        <router-link to="/dashboard" class="btn-primary">{{t("home.heroCta")}}</router-link>
      </div>
      <div class="hero-image">
        <img src="@/assets/finance-hero.png" alt="Finance illustration" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>{{ t("home.featuresTitle") }}</h2>
      <div class="feature-cards">
        <div class="card">
          <img src="../assets/spending.png" alt="Expenses Icon" />
          <h3>{{ t("home.feature1Title") }}</h3>
          <p>{{ t("home.feature1Desc") }}</p>
        </div>
        <div class="card">
          <img src="../assets/money-bag.png" alt="Budget Icon" />
          <h3>{{ t("home.feature2Title") }}</h3>
          <p>{{ t("home.feature2Desc") }}</p>
        </div>
        <div class="card">
          <img src="../assets/bar-chart.png" alt="Stats Icon" />
          <h3>{{ t("home.feature3Title") }}</h3>
          <p>{{ t("home.feature3Desc") }}</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta">
      <h2>{{ t("home.ctaTitle") }}</h2>
      <router-link to="/signup" class="btn-secondary">Get Started</router-link>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted } from 'vue';
import { supabase } from '../services/supabase';
const user = ref(null);
onMounted(async () => {
  const { data: { user: currentUser }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Erreur récupération user :", error);
  } else {
    user.value = currentUser;
    console.log("Utilisateur connecté :", user.value);
  }
});
const { t, locale } = useI18n();
</script>

<style scoped>
/* Accueil Container */
.accueil-container {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  /* max-width: 1400px; */
  margin: 0 auto;
  padding: 5rem 5rem 2rem;
  min-height: 85vh;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.334) 0%, rgba(118, 75, 162, 0.05) 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 15s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: fadeInLeft 0.8s ease-out;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #2d3748;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-content p {
  font-size: 1.25rem;
  color: #000309;
  margin-bottom: 2.5rem;
  line-height: 1.8;
  /* font-weight: 500; */
}

.hero-image {
  position: relative;
  z-index: 2;
  animation: fadeInRight 0.8s ease-out;
}

.hero-image img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(102, 126, 234, 0.2));
  animation: floatImage 6s ease-in-out infinite;
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Buttons */
.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 1.125rem 3rem;
  border-radius: 14px;
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transition: left 0.4s ease;
  z-index: -1;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover::before {
  left: 0;
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 3px solid #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

/* Features Section */
.features {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
}

.features h2 {
  font-size: 2.75rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
}

.feature-cards .card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out backwards;
}

.feature-cards .card:nth-child(1) { animation-delay: 0.1s; }
.feature-cards .card:nth-child(2) { animation-delay: 0.2s; }
.feature-cards .card:nth-child(3) { animation-delay: 0.3s; }

.feature-cards .card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.feature-cards .card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.2);
}

.feature-cards .card:hover::before {
  transform: scaleX(1);
}

.feature-cards .card img {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  transition: transform 0.4s ease;
}

.feature-cards .card:hover img {
  transform: scale(1.1) rotate(5deg);
}

.feature-cards .card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
}

.feature-cards .card p {
  font-size: 1rem;
  color: #718096;
  line-height: 1.7;
  font-weight: 500;
}

/* Call to Action Section */
.cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 15s ease-in-out infinite;
}

.cta::after {
  content: '';
  position: absolute;
  bottom: -40%;
  right: -5%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 20s ease-in-out infinite reverse;
}

.cta h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.cta .btn-secondary {
  position: relative;
  z-index: 2;
}

/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tablet Styles */
@media (max-width: 1024px) {
  .hero {
    padding: 4rem 1.5rem;
    gap: 3rem;
    min-height: auto;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content p {
    font-size: 1.125rem;
  }

  .features {
    padding: 5rem 1.5rem;
  }

  .features h2 {
    font-size: 2.25rem;
  }

  .feature-cards {
    gap: 2rem;
  }

  .cta {
    padding: 5rem 1.5rem;
  }

  .cta h2 {
    font-size: 2rem;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 3rem 1.25rem;
    gap: 3rem;
    text-align: center;
  }

  .hero-content h1 {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }

  .hero-content p {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .hero-image {
    order: -1;
  }

  .hero-image img {
    max-width: 400px;
    margin: 0 auto;
  }

  .btn-primary,
  .btn-secondary {
    padding: 1rem 2.5rem;
    font-size: 1rem;
  }

  .features {
    padding: 4rem 1.25rem;
  }

  .features h2 {
    font-size: 1.875rem;
  }

  .feature-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 3rem;
  }

  .feature-cards .card {
    padding: 2.5rem 1.5rem;
  }

  .feature-cards .card img {
    width: 64px;
    height: 64px;
  }

  .feature-cards .card h3 {
    font-size: 1.25rem;
  }

  .feature-cards .card p {
    font-size: 0.938rem;
  }

  .cta {
    padding: 4rem 1.25rem;
  }

  .cta h2 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .hero {
    padding: 2rem 1rem;
    gap: 2rem;
  }

  .hero-content h1 {
    font-size: 1.875rem;
  }

  .hero-content p {
    font-size: 0.938rem;
    margin-bottom: 1.5rem;
  }

  .hero-image img {
    max-width: 300px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.875rem 2rem;
    font-size: 0.938rem;
    width: 100%;
    max-width: 300px;
  }

  .features {
    padding: 3rem 1rem;
  }

  .features h2 {
    font-size: 1.625rem;
  }

  .feature-cards {
    margin-top: 2.5rem;
  }

  .feature-cards .card {
    padding: 2rem 1.25rem;
    border-radius: 20px;
  }

  .feature-cards .card img {
    width: 56px;
    height: 56px;
    margin-bottom: 1.25rem;
  }

  .feature-cards .card h3 {
    font-size: 1.125rem;
  }

  .cta {
    padding: 3rem 1rem;
  }

  .cta h2 {
    font-size: 1.5rem;
    margin-bottom: 1.75rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Styles */
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 3px;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .hero {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  }

  .hero-content h1,
  .features h2 {
    color: #e2e8f0;
  }

  .hero-content p {
    color: #001328;
  }

  .feature-cards .card {
    background: #2d3748;
    border-color: #4a5568;
  }

  .feature-cards .card h3 {
    color: #e2e8f0;
  }

  .feature-cards .card p {
    color: #a0aec0;
  }
}

/* Print Styles */
@media print {
  .cta,
  .btn-primary,
  .btn-secondary {
    display: none;
  }

  .hero,
  .features {
    page-break-inside: avoid;
  }
}
</style>
