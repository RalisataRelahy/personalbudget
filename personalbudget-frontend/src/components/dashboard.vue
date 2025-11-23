<script setup>
import { onMounted, computed, ref } from "vue";
import { useExpenseStore } from "../stores/expenseStore";
import Chart from "./usefulls/chart.vue";
import StatsCard from "./usefulls/categorie.vue";
import ChatAi from "./chatAi.vue";
import Budgettracker from "./budgettracker.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromStorage = (key, defaultValue = []) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const monthlyBudget = ref(loadFromStorage('monthlyBudget', 0));
const monthlyBudgetFormatted = computed(() => separatordemilier(monthlyBudget.value));

const setBudget = (amount) => {
  monthlyBudget.value = amount;
  saveToStorage('monthlyBudget', amount);
};

const separatordemilier = (n) => {
  const number = Number(n);
  if (isNaN(number)) {
    console.warn("Invalid number:", n);
    return "0";
  }
  return new Intl.NumberFormat("fr-FR").format(number);
};

const totalSpent = computed(() => {
  return expenseStore.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
});


const expenseStore = useExpenseStore();

onMounted(() => {
  expenseStore.fetchExpenses();
});

const totaleamoutmouth = computed(() => {
  return expenseStore.expenses.reduce((total, exp) => {
    return total + Number(exp.amount);
  }, 0);
});

const categories = computed(() => {
  const uniqueCategories = new Set();
  expenseStore.expenses.forEach(exp => {
    if (exp.category) {
      uniqueCategories.add(exp.category);
    }
  });
  return Array.from(uniqueCategories);
});

const totalThisMonth = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenseStore.expenses.reduce((total, exp) => {
    const rawDate = exp.date || exp.createdAt || exp.created_at;
    const expenseDate = new Date(rawDate);
    if (isNaN(expenseDate.getTime())) return total;

    const amount = Number(exp.amount);
    if (isNaN(amount)) return total;

    if (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    ) {
      return total + amount;
    }

    return total;
  }, 0);
});

const averageDailyExpense = computed(() => {
  if (expenseStore.expenses.length === 0) return 0;
  
  const expensesByDay = {};
  expenseStore.expenses.forEach(exp => {
    const date = new Date(exp.date || exp.createdAt).toDateString();
    if (!expensesByDay[date]) {
      expensesByDay[date] = 0;
    }
    expensesByDay[date] += Number(exp.amount);
  });
  
  const totalDays = Object.keys(expensesByDay).length;
  return totalDays > 0 ? totaleamoutmouth.value / totalDays : 0;
});

const getlastfiveexpense = computed(() => {
  if (expenseStore.expenses.length === 0) return [];
  return expenseStore.expenses.slice(-5).reverse();
});

const mostSpentCategory = computed(() => {
  if (expenseStore.expenses.length === 0) return "Aucune";
  
  const categories = {};
  expenseStore.expenses.forEach(exp => {
    if (!categories[exp.category]) {
      categories[exp.category] = 0;
    }
    categories[exp.category] += Number(exp.amount);
  });
  
  const maxCategory = Object.keys(categories).reduce((a, b) => 
    categories[a] > categories[b] ? a : b
  );
  
  return maxCategory;
});

const getTotalepercategorie = (categoryName) => {
  let total = 0;
  expenseStore.expenses.forEach(exp => {
    if (exp.category === categoryName) {
      total += Number(exp.amount);
    }
  });
  return total.toFixed(2);
};

const categoriesWithTotals = computed(() => {
  const categoryMap = {};
  
  expenseStore.expenses.forEach(exp => {
    if (!exp.category) return;
    
    if (!categoryMap[exp.category]) {
      categoryMap[exp.category] = 0;
    }
    categoryMap[exp.category] += Number(exp.amount);
  });
  
  return Object.entries(categoryMap).map(([name, total]) => ({
    name,
    total: total.toFixed(2),
    formatted: `${separatordemilier(total.toFixed(2))} Ar`
  }));
});

const formattedTotal = computed(() => separatordemilier(totaleamoutmouth.value.toFixed(2)));
const formattedMonthly = computed(() => separatordemilier(totalThisMonth.value.toFixed(2)));
const formattedDaily = computed(() => separatordemilier(averageDailyExpense.value.toFixed(2)));

const chartData = computed(() => {
  return expenseStore.expenses;
});

const getCategoryColor = (category) => {
  const colors = {
    'Food': 'green',
    'Transport': 'blue', 
    'Shopping': 'orange',
    'Entertainment': 'purple',
    'Bills': 'red',
    'Health': 'pink',
    'Other': 'gray'
  };
  return colors[category] || 'blue';
};
</script>

<template>
  <div id="dashboard-container">
    <h1>{{ t("dashboard.title") }}</h1>
    <h2>{{ t("dashboard.expenseStatistic") }}</h2>
    <div class="card-container">
      <div class="card">
        <p>{{ t("dashboard.totalSpent") }}</p>
        {{ formattedTotal }} Ar
      </div>
      <div class="card">
        <p>{{ t("dashboard.totalMonth") }}</p>
        {{ formattedMonthly }} Ar
      </div>
      <div class="card">
        <p>{{ t("dashboard.dailyAverage") }}</p>
        {{ formattedDaily }} Ar
      </div>
      <div class="card">
        <p>{{ t("dashboard.topCategory") }}</p>
        {{ mostSpentCategory }}
      </div>
    </div>

    <div class="cat-views" v-if="categoriesWithTotals.length > 0">
      <h2>{{ t("dashboard.expensePerCategory") }}</h2>
      <div class="category-cards">
        <StatsCard 
          v-for="cat in categoriesWithTotals"
          :key="cat.name"
          :title="cat.name"
          :formatted-amount="cat.formatted"   
          :amount="Number(cat.total)"
          icon="📊"
          :color="getCategoryColor(cat.name)"
        />
      </div>
    </div>

    <div class="views">
      <h2>{{ t("dashboard.expenseSpeculation") }}</h2>
      <Chart :expenses="chartData" />
    </div>

    <div class="recent-expenses">
      <h2>{{ t("dashboard.lastExpenses") }}</h2>
      <div v-if="getlastfiveexpense.length > 0" class="expense-grid">
        <div 
          v-for="exp in getlastfiveexpense" 
          :key="exp.id"
          class="expense-card"
        >
          <div class="expense-header">
            <span class="expense-name">{{ exp.name }}</span>
            <span class="expense-amount">{{ separatordemilier(Number(exp.amount).toFixed(2)) }} Ar</span>
          </div>
          <div class="expense-footer">
            <span class="expense-category">{{ exp.category }}</span>
            <span v-if="exp.date" class="expense-date">
              {{ new Date(exp.date).toLocaleDateString() }}
            </span>
          </div>
        </div>
      </div>
      <p v-else class="no-data">Aucune dépense récente</p>
    </div>


    <div class="AIHelpers">
      <h2>{{ t("dashboard.aiHelper") }}</h2>
      <div class="choice-ai-container">
        <ChatAi/>
      </div>
    </div>
    
    <div class="budget-tracker-section">
      <h2>{{ t("dashboard.monthlyTracker") }}</h2>
      <div class="budget-container">
        <Budgettracker 
          :monthlyBudget="monthlyBudget"
          :totalSpent="totalSpent"
          @set-budget="setBudget"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dashboard Container */
#dashboard-container {
  margin: 0 0;
  padding: 2rem 5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

#dashboard-container h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

#dashboard-container h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4a5568;
  margin: 2.5rem 0 1.5rem;
  position: relative;
  padding-left: 1rem;
}

#dashboard-container h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

/* Card Container - Stats Grid */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  padding: 1.75rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
}

.card:hover::before {
  transform: scaleX(1);
}

.card p {
  font-size: 0.875rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.card {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  line-height: 1.2;
}

/* Category Views */
.cat-views {
  margin: 3rem 0;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* Chart Section */
.views {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 3rem 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

/* Recent Expenses */
.recent-expenses {
  margin: 3rem 0;
}

.expense-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.expense-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
  position: relative;
  overflow: hidden;
}

.expense-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  transition: width 0.3s ease;
}

.expense-card:hover {
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.expense-card:hover::after {
  width: 100%;
}

.expense-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.expense-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d3748;
  flex: 1;
  line-height: 1.4;
}

.expense-amount {
  font-size: 1.25rem;
  font-weight: 800;
  color: #667eea;
  white-space: nowrap;
}

.expense-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.expense-category {
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  color: #667eea;
  font-size: 0.813rem;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid #667eea30;
}

.expense-date {
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
}

.no-data {
  text-align: center;
  padding: 3rem;
  color: #a0aec0;
  font-size: 1.125rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* AI Helpers Section */
.AIHelpers {
  margin: 3rem 0;
}

.choice-ai-container {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

/* Budget Tracker Section */
.budget-tracker-section {
  margin: 3rem 0;
}

.budget-container {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

/* Tablet Styles */
@media (max-width: 1024px) {
  #dashboard-container {
    padding: 1.5rem 1rem;
  }

  #dashboard-container h1 {
    font-size: 2rem;
  }

  #dashboard-container h2 {
    font-size: 1.25rem;
  }

  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .category-cards {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .expense-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  #dashboard-container {
    padding: 1rem;
  }

  #dashboard-container h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  #dashboard-container h2 {
    font-size: 1.125rem;
    margin: 2rem 0 1rem;
  }

  .card-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card {
    padding: 1.5rem;
  }

  .card {
    font-size: 1.75rem;
  }

  .category-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .views,
  .choice-ai-container,
  .budget-container {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .expense-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .expense-card {
    padding: 1.25rem;
  }

  .expense-name {
    font-size: 1rem;
  }

  .expense-amount {
    font-size: 1.125rem;
  }

  .expense-category {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }

  .expense-date {
    font-size: 0.813rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  #dashboard-container h1 {
    font-size: 1.5rem;
  }

  #dashboard-container h2 {
    font-size: 1rem;
    padding-left: 0.75rem;
  }

  .card {
    padding: 1.25rem;
  }

  .card {
    font-size: 1.5rem;
  }

  .expense-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .expense-amount {
    font-size: 1rem;
  }

  .expense-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Loading Animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.card.loading {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* Smooth Entrance Animations */
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

.card,
.expense-card {
  animation: fadeInUp 0.6s ease-out backwards;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }

.expense-card:nth-child(1) { animation-delay: 0.1s; }
.expense-card:nth-child(2) { animation-delay: 0.15s; }
.expense-card:nth-child(3) { animation-delay: 0.2s; }
.expense-card:nth-child(4) { animation-delay: 0.25s; }
.expense-card:nth-child(5) { animation-delay: 0.3s; }

/* Print Styles */
@media print {
  #dashboard-container {
    background: white;
  }

  .card,
  .expense-card,
  .views,
  .choice-ai-container,
  .budget-container {
    box-shadow: none;
    border: 1px solid #e2e8f0;
    break-inside: avoid;
  }

  .card:hover,
  .expense-card:hover {
    transform: none;
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
.expense-card:focus-within {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Dark Theme Support (optional) */
@media (prefers-color-scheme: dark) {
  #dashboard-container {
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  }

  #dashboard-container h1,
  #dashboard-container h2,
  .card,
  .expense-name {
    color: #e2e8f0;
  }

  .card,
  .expense-card,
  .views,
  .choice-ai-container,
  .budget-container,
  .no-data {
    background: #2d3748;
    border-color: #4a5568;
  }

  .expense-date {
    color: #a0aec0;
  }
}
</style>