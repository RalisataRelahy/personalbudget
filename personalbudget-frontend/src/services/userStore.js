import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        budget: 0,
        user: null
    }),
    actions: {
        async fetchUser() {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await axios.get("http://localhost:3000/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.user = res.data.user;
                this.budget = res.data.user.budget; // Sync budget from user data
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        },
        async changePassword(currentPassword, newPassword, confirmPassword) {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.put(
                    "http://localhost:3000/users/password",
                    { currentPassword, newPassword, confirmPassword },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                this.user = res.data.user;

                return {
                    success: true,
                    message: res.data.message || "Password updated successfully"
                };

            } catch (err) {
                console.error("Error changing password:", err);

                return {
                    success: false,
                    message: err.response?.data?.error || "Failed to update password"
                };
            }
        },

        async fetchBudget() {
            // fetchBudget is now redundant if fetchUser gets the budget, 
            // but we can keep it or alias it. 
            // For now, let's keep it as is but maybe prefer fetchUser.
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
