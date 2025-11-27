<script setup>
import { ref, onMounted } from "vue";
import { useExpenseStore } from "../stores/expenseStore";
import InfoModal from "@/components/usefulls/info.vue";
import { useI18n } from "vue-i18n";
import { supabase } from '../services/supabase';

const { t } = useI18n();
const showInfo = ref(false);
const expenseStore = useExpenseStore();

const name = ref("");
const amount = ref(0);
const category = ref("Food");

const user = ref(null);

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Erreur récupération utilisateur :", error);
  } else {
    user.value = data.user;
  }
});

const addExpenseItem = async () => {
  if (!user.value) {
    console.error("Utilisateur non connecté !");
    return;
  }

  if (!name.value || amount.value <= 0) return;

  const { data, error } = await supabase.from('expenses').insert([{
    user_id: user.value.id,
    title: name.value,
    amount: amount.value,
    category: category.value,
  }]);

  if (error) {
    console.error("Erreur insertion :", error);
    return;
  }

  showInfo.value = true;

  name.value = "";
  amount.value = 0;
  category.value = "Food";
};
</script>


<template>
  <div class="content">
    <div class="form-content">
      <InfoModal
        v-model="showInfo"
        :title="t('expenses.registeredTitle')"
        :message="t('expenses.registeredSubtitle')"
      />
      <h2>{{ t("expenses.addTitle") }}</h2>
      <input 
        v-model="name" 
        :placeholder="t('expenses.namePlaceholder')" 
      />
      <input 
        v-model.number="amount" 
        :placeholder="t('expenses.amountPlaceholder')" 
        type="number" 
      />
      <select v-model="category">
        <option>{{ t("expenses.categories.Food") }}</option>
        <option>{{ t("expenses.categories.Transport") }}</option>
        <option>{{ t("expenses.categories.Housing") }}</option>
        <option>{{ t("expenses.categories.Health") }}</option>
        <option>{{ t("expenses.categories.Education") }}</option>
        <option>{{ t("expenses.categories.Entertainment") }}</option>
        <option>{{ t("expenses.categories.Savings / Investments") }}</option>
        <option>{{ t("expenses.categories.Shopping") }}</option>
        <option>{{ t("expenses.categories.Work / Business") }}</option>
        <option>{{ t("expenses.categories.Other") }}</option>
      </select>
      <button @click="addExpenseItem">Add Expense</button>
    </div>
  </div>
</template>

<style scoped>
/* Reset et Base */
* {
  box-sizing: border-box;
}

/* Content Container - Responsive */
.content {
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 30rem);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* Form Content */
.form-content {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: clamp(16px, 3vw, 24px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  overflow: hidden;
}

.form-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: clamp(4px, 1vw, 6px);
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

/* Title */
.form-content h2 {
  font-size: clamp(1.375rem, 4vw, 2rem);
  font-weight: 800;
  color: #2d3748;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  padding-bottom: 1rem;
}

.form-content h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(50px, 10vw, 60px);
  height: clamp(3px, 0.5vw, 4px);
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* Input Fields - Fully Responsive */
.form-content input,
.form-content select {
  width: 100%;
  padding: clamp(0.875rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.5rem);
  margin-bottom: clamp(0.875rem, 2vw, 1.25rem);
  border: 2px solid #e2e8f0;
  border-radius: clamp(12px, 2vw, 14px);
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 500;
  color: #2d3748;
  background: #f7fafc;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  font-family: inherit;
}

.form-content input::placeholder {
  color: #a0aec0;
}

.form-content input:focus,
.form-content select:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

/* Remove Number Spinner */
.form-content input[type="number"]::-webkit-outer-spin-button,
.form-content input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* .form-content input[type="number"] {
  -moz-appearance: textfield;
} */

/* Select Dropdown */
.form-content select {
  cursor: pointer;
  padding-right: clamp(2.5rem, 5vw, 3rem);
}

.form-content select option {
  padding: 1rem;
  background: white;
  color: #2d3748;
}

/* Submit Button - Responsive */
.form-content button {
  width: 100%;
  padding: clamp(0.938rem, 2vw, 1.125rem) clamp(1.25rem, 3vw, 2rem);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: clamp(12px, 2vw, 14px);
  font-size: clamp(0.938rem, 2vw, 1.125rem);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  margin-top: clamp(0.5rem, 1vw, 0.75rem);
  position: relative;
  overflow: hidden;
}

.form-content button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.form-content button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.form-content button:hover::before {
  left: 100%;
}

.form-content button:active {
  transform: translateY(-1px);
}

.form-content button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Animations */
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

.form-content {
  animation: fadeInUp 0.6s ease-out;
}

.form-content input,
.form-content select,
.form-content button {
  animation: fadeInUp 0.5s ease-out backwards;
}

.form-content h2 { animation-delay: 0.1s; }
.form-content input:nth-of-type(1) { animation-delay: 0.15s; }
.form-content input:nth-of-type(2) { animation-delay: 0.2s; }
.form-content select { animation-delay: 0.25s; }
.form-content button { animation-delay: 0.3s; }

/* Breakpoints spécifiques */

/* Large Desktop */
@media (min-width: 1920px) {
  .content {
    padding: 2rem 35rem;
  }
}

/* Desktop */
@media (max-width: 1440px) {
  .content {
    padding: 1.5rem 20rem;
  }
}

/* Laptop */
@media (max-width: 1280px) {
  .content {
    padding: 1.5rem 15rem;
  }
}

/* Tablet Large */
@media (max-width: 1024px) {
  .content {
    padding: 1.5rem 8rem;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .content {
    padding: 1.5rem 2rem;
    align-items: flex-start;
    padding-top: 2rem;
  }
}

/* Mobile Large */
@media (max-width: 640px) {
  .content {
    padding: 1rem;
    padding-top: 1.5rem;
  }
  
  .form-content button:hover {
    transform: none;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .content {
    padding: 0.75rem;
    padding-top: 1rem;
  }
}

/* Mobile Small */
@media (max-width: 360px) {
  .content {
    padding: 0.5rem;
    padding-top: 1rem;
  }
}

/* Touch Devices - Amélioration UX */
@media (hover: none) and (pointer: coarse) {
  .form-content input,
  .form-content select,
  .form-content button {
    font-size: 16px; /* Évite le zoom automatique sur iOS */
  }
  
  .form-content button:active {
    transform: scale(0.98);
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .content {
    padding: 1rem;
    align-items: flex-start;
  }
  
  .form-content {
    padding: 1.5rem;
  }
  
  .form-content h2 {
    margin-bottom: 1rem;
  }
  
  .form-content input,
  .form-content select {
    margin-bottom: 0.75rem;
  }
}

/* Accessibilité */
.form-content input:focus-visible,
.form-content select:focus-visible,
.form-content button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Loading State */
.form-content button.loading {
  pointer-events: none;
}

.form-content button.loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin-left: -10px;
  margin-top: -10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.form-content input.error {
  border-color: #f56565;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .form-content {
    background: #2d3748;
    border-color: #4a5568;
  }

  .form-content h2 {
    color: #e2e8f0;
  }

  .form-content input,
  .form-content select {
    background: #1a202c;
    border-color: #4a5568;
    color: #e2e8f0;
  }

  .form-content input:focus,
  .form-content select:focus {
    background: #2d3748;
  }

  .form-content select option {
    background: #2d3748;
    color: #e2e8f0;
  }
}
</style>