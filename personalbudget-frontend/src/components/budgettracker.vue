<!-- src/components/BudgetTracker.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../services/userStore';

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
        <button @click="update" class="btn">Set Budget</button>
      </div>

      <div class="budget-info">
        <div class="budget-item">
          <span>Budget:</span>
          <strong>{{ monthlyBudgetFormatted || 0 }} Ar</strong>
        </div>
        <div class="budget-item">
          <span>Spent:</span>
          <strong>{{ totalSpentFormatted }} Ar</strong>
        </div>
        <div class="budget-item" :class="{ 'over-budget-text': isOverBudget }">
          <span>Remaining:</span>
          <strong>{{ remainingBudgetFormatted }} Ar</strong>
        </div>

        <div v-if="monthlyBudget > 0" class="consumption-info">
          <div class="budget-item">
            <span>Budget Usage:</span>
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
          <p>💡 Set a monthly budget to track your spending!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.budget-tracker {
  margin-bottom: 2rem;
}

.budget-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.budget-card.over-budget {
  border-left: 6px solid #e74c3c;
  background: #ffebee;
}

.budget-card.under-budget {
  border-left: 6px solid #27ae60;
  background: #e8f5e8;
}

.budget-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.budget-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  background: #2980b9;
}

.budget-info {
  background: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 8px;
  position: relative;
}

.budget-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
}

.budget-item:last-child {
  margin-bottom: 0;
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
  font-size: 1.1rem;
}

/* Text colors */
.text-red { 
  color: #e74c3c; 
  font-weight: bold; 
}

.text-orange { 
  color: #f39c12; 
  font-weight: bold; 
}

.text-green { 
  color: #27ae60; 
  font-weight: bold; 
}

.over-budget-text {
  color: #e74c3c;
  font-weight: bold;
}

/* Consumption info */
.consumption-info {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

/* Progress bar */
.progress-container {
  margin-top: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-safe {
  background: #27ae60;
}

.progress-warning {
  background: #f39c12;
}

.progress-danger {
  background: #e74c3c;
}

.no-budget-message {
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  color: #856404;
}

.no-budget-message p {
  margin: 0;
  font-size: 0.9rem;
}
</style>