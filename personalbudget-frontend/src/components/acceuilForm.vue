<!-- src/views/Accueil.vue -->
<template>
  <div class="accueil-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>{{t("home.heroTitle")}}💰</h1>
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

const { t, locale } = useI18n();
</script>

<style scoped>
/* Container */
.accueil-container {
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

/* Hero Section */
.hero {
  display: flex;
  height: 90vh;
  flex-direction: column-reverse;
  align-items: center;
  gap: 2rem;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: #fff;
  color: #2575fc;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: bold;
  transition: 0.3s;
}

.btn-primary:hover {
  background: #f0f0f0;
  color: #2575fc;
}

.hero-image img {
  max-width: 400px;
}

/* Features Section */
.features {
    background-color: var(--bg-body);
    height: 100vh;
  padding: 4rem 1rem;
  text-align: center;
}

.features h2 {
  font-size: 5rem;
  margin-bottom: 2rem;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem 1rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.card img {
  width: 60px;
  margin-bottom: 1rem;
}

.card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

/* CTA Section */
.cta {
  padding: 3rem 1rem;
  background: var(--primary);
  color: var(--text-color);
  text-align: center;
}

.btn-secondary {
  background: var(--card-bg);
  color: var(--primary);
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: bold;
  transition: 0.3s;
}

.btn-secondary:hover {
  background: var(--card-bg);
  color: var(--primary);
}

/* Responsive */
@media (min-width: 768px) {
  .hero {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    padding: 4rem 6%;
  }
}
</style>
