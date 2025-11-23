<!-- src/components/BudgetTracker.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../services/userStore';
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const userStore = useUserStore();

// Pour saisir le nouveau budget
const newBudget = ref(0);

// Fonction pour mettre à jour le budget
const update = async () => {
  if (newBudget.value > 0) {
    await userStore.updateBudget(newBudget.value);
    newBudget.value = 0;
  }
};

// Charger le budget au montage
onMounted(async () => {
  await userStore.fetchBudget();
});

// Computed pour lier le store
const budget = computed(() => userStore.budget);

// Props si tu veux passer des infos sur les dépenses
const props = defineProps({
  monthlyBudget: Number,
  totalSpent: Number,
});

const emit = defineEmits(['set-budget']);

// Gestion input budget via props/emit (optionnel)
const budgetInput = ref('');
const setBudget = () => {
  if (budgetInput.value) {
    emit('set-budget', Number(budgetInput.value));
    budgetInput.value = '';
  }
};

// Calculs pour affichage
const budgetUsage = computed(() => {
  if (!budget.value) return 0;
  return (props.totalSpent / budget.value) * 100;
});

const separatordemilier = (n) => {
  const number = Number(n);
  if (isNaN(number)) return "0";
  return new Intl.NumberFormat("fr-FR").format(number);
};


const remainingBudget = computed(() => budget.value - props.totalSpent);

const monthlyBudgetFormatted = computed(() => separatordemilier(budget.value));

const totalSpentFormatted = computed(() => separatordemilier(props.totalSpent));

const remainingBudgetFormatted = computed(() => separatordemilier(remainingBudget.value));

const isOverBudget = computed(() => remainingBudget.value < 0);
const budgetStatus = computed(() => isOverBudget.value ? 'over-budget' : 'under-budget');
const consumptionPercentage = computed(() => {
  if (!props.monthlyBudget) return 0;
  return ((props.totalSpent / budget.value) * 100).toFixed(1);
});
</script>

<template>
  <div class="budget-tracker">
    <div class="budget-card" :class="budgetStatus">
      
      <div class="budget-form">
        <input type="number" v-model.number="newBudget" placeholder="Set new budget" />
        <button @click="update" class="btn">{{ t("budget.setNewBudget") }}</button>
      </div>

      <div class="budget-info">
        <div class="budget-item">
          <span>{{ t("budget.title") }}:  </span>
          <strong>{{ monthlyBudgetFormatted || 0 }} Ar</strong>
        </div>
        <div class="budget-item">
          <span>{{ t("budget.spentLabel") }}</span>
          <strong>{{ totalSpentFormatted }} Ar</strong>
        </div>
        <div class="budget-item" :class="{ 'over-budget-text': isOverBudget }">
          <span>{{ t("budget.remainingLabel") }}</span>
          <strong>{{ remainingBudgetFormatted }} Ar</strong>
        </div>

        <div v-if="monthlyBudget > 0" class="consumption-info">
          <div class="budget-item">
            <span>{{ t("budget.usageLabel") }}</span>
            <strong :class="{ 'text-red': budgetUsage > 80, 'text-orange': budgetUsage > 50 && budgetUsage <= 80, 'text-green': budgetUsage <= 50 }">
              {{ consumptionPercentage }}%
            </strong>
          </div>
          <div class="progress-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :class="{ 'progress-danger': budgetUsage > 80, 'progress-warning': budgetUsage > 50 && budgetUsage <= 80, 'progress-safe': budgetUsage <= 50 }"
                :style="{ width: `${Math.min(budgetUsage, 100)}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div v-if="monthlyBudget === 0" class="no-budget-message">
          <p>{{ t("budget.emptyState") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Budget Tracker Container */
.budget-tracker {
  width: 100%;
}

.budget-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.budget-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.budget-card:hover::before {
  transform: scaleX(1);
}

/* Budget Status Colors */
.budget-card.safe {
  border-color: rgba(72, 187, 120, 0.3);
  background: linear-gradient(135deg, rgba(72, 187, 120, 0.02) 0%, rgba(255, 255, 255, 1) 100%);
}

.budget-card.warning {
  border-color: rgba(237, 137, 54, 0.3);
  background: linear-gradient(135deg, rgba(237, 137, 54, 0.02) 0%, rgba(255, 255, 255, 1) 100%);
}

.budget-card.danger {
  border-color: rgba(245, 101, 101, 0.3);
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.02) 0%, rgba(255, 255, 255, 1) 100%);
}

/* Budget Form */
.budget-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.budget-form input {
  flex: 1;
  min-width: 200px;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
  background: #f7fafc;
  transition: all 0.3s ease;
  outline: none;
}

.budget-form input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.budget-form input::placeholder {
  color: #a0aec0;
}

.budget-form .btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.budget-form .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
}

.budget-form .btn:active {
  transform: translateY(0);
}

/* Budget Info Section */
.budget-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.budget-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f7fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.budget-item:hover {
  background: #edf2f7;
  transform: translateX(4px);
}

.budget-item span {
  font-size: 1rem;
  color: #718096;
  font-weight: 600;
}

.budget-item strong {
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 800;
  letter-spacing: -0.5px;
}

/* Over Budget Text */
.over-budget-text {
  background: rgba(245, 101, 101, 0.1);
  border-left: 4px solid #f56565;
}

.over-budget-text strong {
  color: #c53030;
}

/* Consumption Info */
.consumption-info {
  margin-top: 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.consumption-info .budget-item {
  background: transparent;
  padding: 0.5rem 0;
}

.consumption-info .budget-item:hover {
  background: transparent;
  transform: none;
}

/* Text Colors */
.text-red {
  color: #c53030 !important;
}

.text-orange {
  color: #dd6b20 !important;
}

.text-green {
  color: #2f855a !important;
}

/* Progress Container */
.progress-container {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.progress-fill {
  height: 100%;
  border-radius: 20px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-safe {
  background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
  box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);
}

.progress-warning {
  background: linear-gradient(90deg, #ed8936 0%, #dd6b20 100%);
  box-shadow: 0 2px 8px rgba(237, 137, 54, 0.3);
}

.progress-danger {
  background: linear-gradient(90deg, #f56565 0%, #e53e3e 100%);
  box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);
}

/* No Budget Message */
.no-budget-message {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 16px;
  border: 2px dashed #cbd5e0;
  margin-top: 1rem;
}

.no-budget-message p {
  font-size: 1.125rem;
  color: #718096;
  font-weight: 600;
  margin: 0;
  line-height: 1.6;
}

/* Tablet Styles */
@media (max-width: 1024px) {
  .budget-card {
    padding: 1.75rem;
  }

  .budget-form {
    gap: 0.875rem;
  }

  .budget-form input {
    min-width: 180px;
    padding: 0.875rem 1rem;
  }

  .budget-form .btn {
    padding: 0.875rem 1.75rem;
  }

  .budget-item strong {
    font-size: 1.125rem;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .budget-card {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .budget-form {
    flex-direction: column;
    gap: 1rem;
  }

  .budget-form input {
    width: 100%;
    min-width: unset;
  }

  .budget-form .btn {
    width: 100%;
    padding: 1rem;
  }

  .budget-info {
    gap: 1rem;
  }

  .budget-item {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .budget-item span {
    font-size: 0.875rem;
  }

  .budget-item strong {
    font-size: 1.25rem;
  }

  .consumption-info {
    padding: 1.25rem;
  }

  .no-budget-message {
    padding: 2rem 1.5rem;
  }

  .no-budget-message p {
    font-size: 1rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .budget-card {
    padding: 1.25rem;
  }

  .budget-form input {
    padding: 0.875rem 1rem;
    font-size: 0.938rem;
  }

  .budget-form .btn {
    padding: 0.875rem;
    font-size: 0.938rem;
  }

  .budget-item {
    padding: 0.875rem;
  }

  .budget-item span {
    font-size: 0.813rem;
  }

  .budget-item strong {
    font-size: 1.125rem;
  }

  .consumption-info {
    padding: 1rem;
  }

  .progress-bar {
    height: 10px;
  }
}

/* Entrance Animation */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.budget-card {
  animation: fadeInScale 0.5s ease-out;
}

.budget-item {
  animation: fadeInScale 0.4s ease-out backwards;
}

.budget-item:nth-child(1) { animation-delay: 0.1s; }
.budget-item:nth-child(2) { animation-delay: 0.15s; }
.budget-item:nth-child(3) { animation-delay: 0.2s; }

/* Focus Styles */
.budget-form input:focus-visible,
.budget-form .btn:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
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
  .budget-card {
    background: #2d3748;
    border-color: #4a5568;
  }

  .budget-form input {
    background: #1a202c;
    border-color: #4a5568;
    color: #e2e8f0;
  }

  .budget-form input:focus {
    background: #2d3748;
  }

  .budget-item {
    background: #1a202c;
  }

  .budget-item:hover {
    background: #2d3748;
  }

  .budget-item span {
    color: #a0aec0;
  }

  .budget-item strong {
    color: #e2e8f0;
  }

  .consumption-info {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.2);
  }

  .no-budget-message {
    background: rgba(102, 126, 234, 0.1);
    border-color: #4a5568;
  }

  .no-budget-message p {
    color: #cbd5e0;
  }

  .progress-bar {
    background: #1a202c;
  }
}
</style>