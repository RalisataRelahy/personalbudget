<script setup>
import { onMounted, ref } from "vue";
import { useExpenseStore } from "../stores/expenseStore";
import ConfirmModal from "./usefulls/confirmate.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const expenseStore = useExpenseStore();
const selectedExpenseId = ref(null);

// === IMPORTANT ===
const show = ref(false);   // <- Accessible dans le template
// =================

onMounted(() => {
  expenseStore.fetchExpenses();
});

// Sélectionner une dépense
const selectExpense = (expenseId) => {
  selectedExpenseId.value = selectedExpenseId.value === expenseId ? null : expenseId;
};

// Action ouverte par le bouton "Supprimer"
const deleteSelectedExpense = () => {
  if (!selectedExpenseId.value) return;
  show.value = true; // -> Ouvre le popup
};

// Action exécutée APRES confirmation
const removeItem = async () => {
  try {
    await expenseStore.deleteExpense(selectedExpenseId.value);
    selectedExpenseId.value = null;
    show.value = false;
  } catch (error) {
    console.error("Erreur suppression:", error);
    alert("Erreur lors de la suppression");
  }
};

// Formatter montant
const separatordemilier = (n) => {
  const number = Number(n);
  return isNaN(number)
    ? "0"
    : new Intl.NumberFormat("fr-FR").format(number);
};

// Formatter date
const formatDate = (date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

// Badge couleur
const getCategoryColor = (category) => {
  const colors = {
    Food: "#28a745",
    Transport: "#007bff",
    Shopping: "#fd7e14",
    Entertainment: "#6f42c1",
    Bills: "#dc3545",
    Health: "#e83e8c",
    Other: "#6c757d"
  };
  return colors[category] || "#007bff";
};
</script>


<template>
  <div class="expense-list-container">
    <div class="header-section">
      <h2>{{ t("expenses.listTitle") }}</h2>
      <p class="subtitle" v-if="expenseStore.expenses.length > 0">
        {{ expenseStore.expenses.length }} {{ t("expenses.registeredText") }}
      </p>
    </div>
    <ConfirmModal
        v-model="show"
        :title="t('modals.deleteConfirmTitle')"
        :message="t('modals.deleteConfirmMsg')"
        :cancelText="t('modals.noCancel')"
        :deleteText="t('modals.ok')"
        @delete="removeItem"
      />
    <!-- Bouton de suppression -->
    <div class="action-bar" v-if="expenseStore.expenses.length > 0 && selectedExpenseId">
      <button 
        @click="deleteSelectedExpense" 
        :disabled="!selectedExpenseId"
        class="delete-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
        {{ t('expenses.actions.deleteSelected') }}
      </button>
      <span v-if="selectedExpenseId" class="selection-info">
        {{t('expenses.actions.selectedRow')}}
      </span>
    </div>

    <div class="table-wrapper" v-if="expenseStore.expenses.length > 0">
      <!-- Desktop Table View -->
      <div class="desktop-table">
        <table>
          <thead>
            <tr>
              <th>{{t('expenses.table.id')}}</th>
              <th>{{t('expenses.table.name')}}</th>
              <th>{{t('expenses.table.amount')}}</th>
              <th>{{t('expenses.table.category')}}</th>
              <th>{{t('expenses.table.date')}}</th>
            </tr>
          </thead>

          <tbody>
            <tr 
              v-for="expense in expenseStore.expenses" 
              :key="expense.id"
              @click="selectExpense(expense.id)"
              :class="{ 'selected': selectedExpenseId === expense.id }"
            >
              <td data-label="ID">
                <span class="id-badge">#{{ expense.id }}</span>
              </td>
              <td data-label="Nom">
                <strong>{{ expense.name }}</strong>
              </td>
              <td data-label="Montant">
                <span class="amount">{{ separatordemilier(expense.amount) }} Ar</span>
              </td>
              <td data-label="Catégorie">
                <span 
                  class="category-badge" 
                  :style="{ backgroundColor: getCategoryColor(expense.category) }"
                >
                  {{ expense.category }}
                </span>
              </td>
              <td data-label="Date">
                {{ formatDate(expense.created_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="mobile-cards">
        <div 
          v-for="expense in expenseStore.expenses" 
          :key="expense.id"
          class="expense-card"
          @click="selectExpense(expense.id)"
          :class="{ 'selected': selectedExpenseId === expense.id }"
        >
          <div class="card-header">
            <span class="card-id">#{{ expense.id }}</span>
            <span 
              class="card-category" 
              :style="{ backgroundColor: getCategoryColor(expense.category) }"
            >
              {{ expense.category }}
            </span>
          </div>
          
          <div class="card-body">
            <h3 class="card-name">{{ expense.name }}</h3>
            <p class="card-amount">{{ separatordemilier(expense.amount) }} Ar</p>
          </div>
          
          <div class="card-footer">
            <span class="card-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ formatDate(expense.created_at) }}
            </span>
            <button 
              v-if="selectedExpenseId === expense.id"
              @click.stop="deleteSelectedExpense"
              class="mobile-delete-btn"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3>Aucune dépense enregistrée</h3>
      <p>Commencez par ajouter votre première dépense</p>
    </div>
  </div>
</template>

<style scoped>
.expense-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.header-section h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.delete-btn:hover:not(:disabled) {
  background-color: #c82333;
  transform: translateY(-1px);
}

.delete-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

.selection-info {
  color: #007bff;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Desktop Table Styles */
.desktop-table {
  display: block;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.desktop-table table {
  width: 100%;
  border-collapse: collapse;
}

.desktop-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.desktop-table th {
  padding: 1rem;
  color: white;
  font-weight: 600;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.desktop-table tbody tr {
  border-bottom: 1px solid #e9ecef;
  transition: all 0.2s ease;
  cursor: pointer;
}

.desktop-table tbody tr:hover {
  background-color: #f8f9fa;
  transform: scale(1.01);
}

.desktop-table tbody tr.selected {
  background-color: #e3f2fd;
  border-left: 4px solid #007bff;
  position: relative;
}

.desktop-table tbody tr.selected::before {
  content: "✓";
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #007bff;
  font-weight: bold;
}

.desktop-table tbody tr:last-child {
  border-bottom: none;
}

.desktop-table td {
  padding: 1rem;
  color: #333;
  font-size: 0.95rem;
}

.id-badge {
  display: inline-block;
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.amount {
  font-weight: 700;
  color: #007bff;
  font-size: 1.05rem;
}

.category-badge {
  display: inline-block;
  color: white;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}

/* Mobile Card View - Hidden by default */
.mobile-cards {
  display: none;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  margin-bottom: 1.5rem;
  color: #ccc;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.empty-state p {
  color: #666;
  font-size: 1rem;
}

/* Mobile Styles */
@media (max-width: 640px) {
  .desktop-table {
    display: none;
  }

  .mobile-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .expense-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .expense-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .expense-card.selected {
    border-color: #007bff;
    background-color: #f8fbff;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-bottom: 2px solid #dee2e6;
  }

  .card-id {
    font-weight: 600;
    color: #495057;
    font-size: 0.9rem;
  }

  .card-category {
    color: white;
    padding: 0.35rem 0.85rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .card-body {
    padding: 1.25rem 1rem;
  }

  .card-name {
    font-size: 1.1rem;
    color: #333;
    margin: 0 0 0.75rem 0;
    font-weight: 600;
  }

  .card-amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: #007bff;
    margin: 0;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
  }

  .card-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6c757d;
    font-size: 0.875rem;
  }

  .card-date svg {
    color: #6c757d;
  }

  .mobile-delete-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .action-bar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .delete-btn {
    justify-content: center;
  }

  .selection-info {
    text-align: center;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .expense-list-container {
    padding: 0.75rem;
  }

  .desktop-table th,
  .desktop-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }

  .id-badge {
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
  }

  .amount {
    font-size: 0.95rem;
  }

  .category-badge {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
  }
}

/* Very Small Mobile */
@media (max-width: 360px) {
  .expense-list-container {
    padding: 0.5rem;
  }

  .header-section h2 {
    font-size: 1.5rem;
  }

  .card-body {
    padding: 1rem 0.75rem;
  }

  .card-name {
    font-size: 1rem;
  }

  .card-amount {
    font-size: 1.25rem;
  }

  .card-header,
  .card-footer {
    padding: 0.75rem;
  }
}
</style>