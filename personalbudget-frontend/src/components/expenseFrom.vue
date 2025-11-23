<script setup>
import { ref } from "vue";
import { useExpenseStore } from "../stores/expenseStore";
import InfoModal from "@/components/usefulls/info.vue";
// import ConfirmModal from "@/components/usefulls/confirmate.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const showInfo = ref(false);
const expenseStore = useExpenseStore();

const name = ref("");
const amount = ref(0);
const category = ref("Food");

const addExpenseItem = async () => {
  showInfo.value = true;
  if (!name.value || amount.value <= 0) return;
  await expenseStore.addExpense({ name: name.value, amount: amount.value, category: category.value });
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
    <input v-model="name" :placeholder="t('expenses.namePlaceholder')" />
    <input v-model.number="amount" :placeholder="t('expenses.amountPlaceholder')" type="number" />
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
/* Content Container */
.content {
  /* max-width: 600px; */
  /* margin: 0 auto; */
  padding: 1rem 30rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Form Content */
.form-content {
  width: 100%;
  background: white;
  padding: 3rem;
  border-radius: 24px;
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
  height: 6px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

/* Title */
.form-content h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.form-content h2::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* Input Fields */
.form-content input,
.form-content select {
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 1rem;
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

/* Number Input - Remove Spinner */
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
  /* appearance: none; */
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); */
  /* background-repeat: no-repeat; */
  /* background-position: right 1rem center; */
  /* background-size: 20px; */
  padding-right: 3rem;
}

.form-content select option {
  padding: 1rem;
  background: white;
  color: #2d3748;
}

/* Submit Button */
.form-content button {
  width: 100%;
  padding: 1.125rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  margin-top: 0.75rem;
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

/* Input Icons (optional enhancement) */
.form-content input:valid {
  border-color: #48bb78;
}

.form-content input:invalid:not(:placeholder-shown) {
  border-color: #f56565;
}

/* Entrance Animation */
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

/* Tablet Styles */
@media (max-width: 1024px) {
  .content {
    padding: 1.5rem 1rem;
  }

  .form-content {
    padding: 2.5rem;
  }

  .form-content h2 {
    font-size: 1.75rem;
  }

  .form-content input,
  .form-content select {
    padding: 0.938rem 1.25rem;
    font-size: 0.938rem;
  }

  .form-content button {
    padding: 1rem 1.75rem;
    font-size: 1rem;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .content {
    padding: 1rem;
    align-items: flex-start;
    padding-top: 2rem;
  }

  .form-content {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  .form-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1.75rem;
  }

  .form-content input,
  .form-content select {
    padding: 0.875rem 1.125rem;
    margin-bottom: 1rem;
    font-size: 0.938rem;
  }

  .form-content select {
    background-position: right 0.875rem center;
    padding-right: 2.5rem;
  }

  .form-content button {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .content {
    padding: 0.75rem;
    padding-top: 1.5rem;
  }

  .form-content {
    padding: 1.75rem 1.25rem;
    border-radius: 16px;
  }

  .form-content h2 {
    font-size: 1.375rem;
    margin-bottom: 1.5rem;
  }

  .form-content h2::after {
    width: 50px;
    height: 3px;
  }

  .form-content input,
  .form-content select {
    padding: 0.875rem 1rem;
    margin-bottom: 0.875rem;
    font-size: 0.875rem;
    border-radius: 12px;
  }

  .form-content select {
    background-position: right 0.75rem center;
    background-size: 18px;
  }

  .form-content button {
    padding: 0.938rem 1.25rem;
    font-size: 0.938rem;
    border-radius: 12px;
  }
}

/* Focus Styles for Accessibility */
.form-content input:focus-visible,
.form-content select:focus-visible,
.form-content button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Loading State */
.form-content button.loading {
  pointer-events: none;
  position: relative;
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
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.form-content input.error {
  border-color: #f56565;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

/* Success State */
.form-content.success {
  animation: successPulse 0.6s ease;
}

@keyframes successPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
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

/* Dark Mode Support */
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

  /* .form-content select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  } */

  .form-content select option {
    background: #2d3748;
    color: #e2e8f0;
  }
}

/* Floating Label Effect (optional enhancement) */
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-group label {
  position: absolute;
  left: 1.5rem;
  top: 1rem;
  color: #a0aec0;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
}

.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  top: -0.5rem;
  left: 1rem;
  font-size: 0.75rem;
  color: #667eea;
  background: white;
  padding: 0 0.5rem;
}
</style>
