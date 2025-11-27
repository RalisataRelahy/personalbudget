import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/main.vue";
import Dashboard from "../components/dashboard.vue";
import ExpenseForm from "../components/expenseFrom.vue";
import ExpenseList from "../components/expenseList.vue";
import Login from "../views/login.vue";
import Signup from "../views/signup.vue";
import Accueil from "../components/acceuilForm.vue";
import Profile from "../components/profils.vue";
import BudgetForm from "../components/budgetForm.vue";
import { supabase } from "../services/supabase";

// Auth Guard basé sur Supabase
async function authGuard(to, from, next) {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (session?.user) next();
    else next("/login");
}


const routes = [
    { path: "/login", name: "Login", component: Login },
    { path: "/signup", name: "Signup", component: Signup },
    {
        path: "/",
        component: Main,
        beforeEnter: authGuard,
        children: [
            { path: "", redirect: "/acceuil" },
            { path: "acceuil", name: "Accueil", component: Accueil },
            { path: "dashboard", name: "Dashboard", component: Dashboard },
            { path: "add-expense", name: "AddExpense", component: ExpenseForm },
            { path: "list-expense", name: "ExpenseList", component: ExpenseList },
            { path: "profile", name: "Profile", component: Profile },
            { path: "set-budget", name: "BudgetForm", component: BudgetForm },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
