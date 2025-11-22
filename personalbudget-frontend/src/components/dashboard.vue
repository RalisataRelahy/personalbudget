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

    <p v-if="expenseStore.expenses.length === 0">Aucune dépense pour le moment.</p>

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
/* Container principal */
#dashboard-container {
  width: 100%;
  /* margin: auto; */
  background-color: var(--card-bg);
  padding: 0.5rem 5rem;
  text-align: center;
}

#dashboard-container h1 {
  text-align: left;
  font-size: clamp(2rem, 5vw, 3.125rem);
  margin-bottom: 1rem;
}

#dashboard-container h2 {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  margin: 1.5rem 0 1rem;
}

/* Grid Cards - Stats principales */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.card {
  background: var(--card-bg-style);
  color: white;
  padding: 1.5rem;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card p {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: clamp(0.75rem, 1.8vw, 0.9rem);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

/* Catégories */
.cat-views {
  margin: 2rem 0;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 1rem;
}

/* Charts */
.views {
  margin: 2rem 0;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

/* Dépenses récentes */
.recent-expenses {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
}

.recent-expenses h2,
.recent-expenses h3 {
  margin-top: 0;
  color: var(--text-color);
  border-bottom: 2px solid #007BFF;
  padding-bottom: 0.5rem;
}

.expense-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.expense-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #007BFF;
  transition: transform 0.2s ease;
}

.expense-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.expense-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.expense-name {
  font-weight: bold;
  color: #333;
  word-break: break-word;
  flex: 1;
}

.expense-amount {
  font-weight: bold;
  color: #007BFF;
  white-space: nowrap;
}

.expense-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #666;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.expense-category {
  background: var(--card-bg-style);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.expense-date {
  font-style: italic;
}

.no-data {
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 2rem 0;
}

/* AI Helpers */
.AIHelpers {
  margin: 2rem 0;
  padding: 1.5rem;
  border-color:var(--border-color);
  background: var(--card-bg);
  border-radius: 12px;
}

.choice-ai-container {
  display: flex;
  background-color: var(--card-bg);
  flex-direction: column;
  gap: 1rem;
}

/* Budget Tracker */
.budget-tracker-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.budget-container {
  margin-top: 1rem;
}

/* Responsive - Tablettes */
@media (max-width: 768px) {
  #dashboard-container {
    padding: 0.5rem;
  }

  #dashboard-container h1 {
    font-size: 2rem;
  }

  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr));
    gap: 0.75rem;
  }

  .card {
    padding: 1rem;
    min-height: 80px;
  }

  .expense-grid {
    grid-template-columns: 1fr;
  }

  .views {
    padding: 1rem;
  }
}

/* Responsive - Mobile */
@media (max-width: 500px) {
  #dashboard-container {
    padding: 0.5rem 0.75rem;
  }

  #dashboard-container h1 {
    font-size: 1.75rem;
  }

  #dashboard-container h2 {
    font-size: 1.25rem;
  }

  .card-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .card {
    padding: 1rem;
    font-size: 0.9rem;
    min-height: auto;
  }

  .card p {
    font-size: 0.8rem;
  }

  .category-cards {
    grid-template-columns: 1fr;
  }

  .expense-grid {
    grid-template-columns: 1fr;
  }

  .expense-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .expense-amount {
    font-size: 1.1rem;
  }

  .recent-expenses,
  .AIHelpers,
  .budget-tracker-section {
    padding: 1rem;
  }

  .views {
    padding: 0.75rem;
    overflow-x: auto;
  }
}

/* Très petits écrans */
@media (max-width: 360px) {
  #dashboard-container h1 {
    font-size: 1.5rem;
  }

  .card {
    padding: 0.75rem;
  }

  .expense-card {
    padding: 0.75rem;
  }
}

/* Optimisation pour impression */
@media print {
  .AIHelpers,
  .budget-tracker-section {
    page-break-inside: avoid;
  }
  
  .card:hover,
  .expense-card:hover {
    transform: none;
  }
}
</style>