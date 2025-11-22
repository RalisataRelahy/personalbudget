<script setup>
import { useExpenseStore } from '../stores/expenseStore';
import { useGemini } from '../composables/useGemini';

const expenseStore = useExpenseStore();
const { 
  isLoading, 
  error, 
  response, 
  analyzeExpenses, 
  getFinancialAdvice,
  clearResponse 
} = useGemini();

const userQuestion = ref('');

const handleExpenseAnalysis = () => {
  analyzeExpenses(expenseStore.expenses, userQuestion.value);
};

const handleFinancialAdvice = () => {
  getFinancialAdvice(expenseStore.expenses);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(response.value);
    alert('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
</script>

<template>
  <div class="ai-analysis">
    <h3>🤖 AI Expense Analysis</h3>
    
    <div class="ai-controls">
      <div class="input-group">
        <input 
          v-model="userQuestion"
          type="text" 
          placeholder="Ask a specific question about your expenses..."
          class="question-input"
        >
        <button 
          @click="handleExpenseAnalysis" 
          :disabled="isLoading || expenseStore.expenses.length === 0"
          class="btn-primary"
        >
          {{ isLoading ? 'Analyzing...' : 'Analyze Expenses' }}
        </button>
      </div>
      
      <button 
        @click="handleFinancialAdvice"
        :disabled="isLoading || expenseStore.expenses.length === 0"
        class="btn-secondary"
      >
        Get Financial Advice
      </button>
      
      <button 
        @click="clearResponse" 
        v-if="response"
        class="btn-clear"
      >
        Clear
      </button>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="error-message">
      ❌ {{ error }}
    </div>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>AI is analyzing your expenses...</p>
    </div>

    <!-- Response Display -->
    <div v-if="response && !isLoading" class="ai-response">
      <div class="response-header">
        <h4>AI Insights</h4>
        <button @click="copyToClipboard" class="btn-copy">📋 Copy</button>
      </div>
      <div class="response-content">
        {{ response }}
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!response && !isLoading && expenseStore.expenses.length === 0" class="empty-state">
      <p>Add some expenses to get AI analysis!</p>
    </div>
  </div>
</template>

<style scoped>
.ai-analysis {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin: 2rem 0;
}

.ai-analysis h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007BFF;
  padding-bottom: 0.5rem;
}

.ai-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.question-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
}

.btn-primary, .btn-secondary, .btn-clear, .btn-copy {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #007BFF;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-secondary {
  background: #28a745;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #1e7e34;
}

.btn-clear {
  background: #6c757d;
  color: white;
}

.btn-copy {
  background: #17a2b8;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ai-response {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.response-header {
  background: #f8f9fa;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.response-header h4 {
  margin: 0;
  color: #333;
}

.response-content {
  padding: 1.5rem;
  white-space: pre-wrap;
  line-height: 1.6;
  background: #fafafa;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  
  .ai-controls {
    gap: 0.5rem;
  }
}
</style>