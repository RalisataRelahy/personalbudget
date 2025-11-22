<script setup>
import { ref } from "vue";
import { useExpenseStore } from "../stores/expenseStore";

const expenseStore = useExpenseStore();

const name = ref("");
const amount = ref(0);
const category = ref("Food");

const addExpenseItem = async () => {
  if (!name.value || amount.value <= 0) return;
  await expenseStore.addExpense({ name: name.value, amount: amount.value, category: category.value });
  name.value = "";
  amount.value = 0;
  category.value = "Food";
};
</script>

<template>
  <div class="form-content">
    <h2>Add Expense</h2>
    <input v-model="name" placeholder="Expense Name" />
    <input v-model.number="amount" placeholder="Amount" type="number" />
    <select v-model="category">
      <option>Food</option>
      <option>Transport</option>
      <option>Other</option>
    </select>
    <button @click="addExpenseItem">Add Expense</button>
  </div>
</template>

<style scoped>
.form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f5f5f5; /* light gray background */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
}

input, select {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.2s;
}

input:focus, select:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0,123,255,0.3);
}

button {
  width: 100%;
  padding: 0.7rem 0;
  border: none;
  border-radius: 8px;
  background-color: #007BFF;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(1px);
}
</style>
