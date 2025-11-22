import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000/expenses";

export const useExpenseStore = defineStore("expenseStore", {
    state: () => ({
        expenses: [],
    }),
    actions: {
        async fetchExpenses() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- send token
                    },
                });
                this.expenses = res.data;
                console.log(this.expenses);
            } catch (err) {
                console.error("Error fetching expenses:", err);
            }
        },
        async deleteExpense(id) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${url}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- send token
                    },
                });
                this.expenses = this.expenses.filter((expense) => expense.id !== id);
            } catch (err) {
                console.error("Error deleting expense:", err);
            }
        },
        async addExpense(expense) {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post(url, expense, {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- send token
                    },
                });
                this.expenses.push(res.data);
            } catch (err) {
                console.error("Error adding expense:", err);
            }
        },
    },
});
