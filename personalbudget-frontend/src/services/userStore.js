import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        budget: 0
    }),
    actions: {
        async fetchBudget() {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/users/budget", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.budget = res.data.budget;
            } catch (err) {
                console.error("Error fetching budget:", err);
            }
        },
        async updateBudget(newBudget) {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.put(
                    "http://localhost:3000/users/budget",
                    { budget: newBudget },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                this.budget = res.data.budget;
            } catch (err) {
                console.error("Error updating budget:", err);
            }
        }
    }
});
