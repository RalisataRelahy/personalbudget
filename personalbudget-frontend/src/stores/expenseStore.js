import { defineStore } from "pinia";
import { supabase } from "../services/supabase";

export const useExpenseStore = defineStore("expenseStore", {
    state: () => ({
        expenses: [],
    }),
    actions: {
        // Récupérer les dépenses de l'utilisateur connecté
        async fetchExpenses() {
            try {
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError || !userData.user) throw userError || new Error("User not found");

                const { data, error } = await supabase
                    .from("expenses")
                    .select("*")
                    .eq("user_id", userData.user.id)
                    .order("created_at", { ascending: false });

                if (error) throw error;
                this.expenses = data || [];
            } catch (err) {
                console.error("Error fetching expenses:", err);
            }
        },

        // Ajouter une dépense
        async addExpense(expense) {
            try {
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError || !userData.user) throw userError || new Error("User not found");

                const { data, error } = await supabase
                    .from("expenses")
                    .insert([
                        {
                            user_id: userData.user.id,
                            title: expense.title,
                            amount: expense.amount,
                            category: expense.category,
                        },
                    ])
                    .select()
                    .single();

                if (error) throw error;
                this.expenses.unshift(data);
            } catch (err) {
                console.error("Error adding expense:", err);
            }
        },

        // Supprimer une dépense
        async deleteExpense(id) {
            try {
                const { error } = await supabase.from("expenses").delete().eq("id", id);
                if (error) throw error;

                this.expenses = this.expenses.filter((e) => e.id !== id);
            } catch (err) {
                console.error("Error deleting expense:", err);
            }
        },
    },
});
