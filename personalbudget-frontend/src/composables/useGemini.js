import { ref } from 'vue';
import geminiService from '../services/geminiservice.js';

export function useGemini() {
  const isLoading = ref(false);
  const error = ref(null);
  const response = ref('');

  const generateContent = async (prompt) => {
    isLoading.value = true;
    error.value = null;
    response.value = '';
    
    try {
      response.value = await geminiService.generateContent(prompt);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const analyzeExpenses = async (expenses, userQuestion = '') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      response.value = await geminiService.analyzeExpenses(expenses, userQuestion);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const suggestCategory = async (expenseName, amount) => {
    try {
      return await geminiService.suggestCategory(expenseName, amount);
    } catch (err) {
      console.error('Category suggestion failed:', err);
      return 'Other';
    }
  };

  const getFinancialAdvice = async (expenses, monthlyIncome = null) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      response.value = await geminiService.getFinancialAdvice(expenses, monthlyIncome);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const clearResponse = () => {
    response.value = '';
    error.value = null;
  };

  return {
    isLoading,
    error,
    response,
    generateContent,
    analyzeExpenses,
    suggestCategory,
    getFinancialAdvice,
    clearResponse
  };
}