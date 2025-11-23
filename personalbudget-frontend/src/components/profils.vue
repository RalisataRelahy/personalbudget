<template>
  <div class="profil-content">
    <div class="profil-header">
      <div class="header-glow"></div>
      <h2 class="main-title">{{ t("nav.profile") }}</h2>
      <p class="subtitle">{{ t("profil.manage_account") }}</p>
    </div>

    <div class="profil-grid">
      <!-- Card Informations Personnelles -->
      <div class="card profile-card card-large">
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="icon-wrapper icon-primary">
            <UserIcon />
            <span class="status-badge"></span>
          </div>
          <div>
            <h3>{{ t("profil.personal_info") }}</h3>
            <p class="card-subtitle">Vos données de compte</p>
          </div>
        </div>
        <div class="card-body">
          <div class="info-grid">
            <div class="info-group">
              <label>{{ t("profil.username") }}</label>
              <p class="user-data">{{ user?.username || '...' }}</p>
            </div>
            <div class="info-group">
              <label>{{ t("profil.email") }}</label>
              <p class="user-data">{{ user?.email || '...' }}</p>
            </div>
          </div>
          <div class="info-group info-full">
            <label>{{ t("profil.member_since") }}</label>
            <p class="user-data">{{ formatDate(user?.created_at) }}</p>
          </div>
        </div>
        <div class="card-footer" style="width:200px ; height:100px; margin:20px 0px 0px ">
          <button class="btn btn-primary" @click="editProfile">
            <EditIcon />
            {{ t("profil.edit") }}
          </button>
        </div>
      </div>

      <!-- Card Paramètres de Langue -->
      <div class="card language-card">
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="icon-wrapper icon-blue">
            <GlobeIcon />
          </div>
          <div>
            <h3>{{ t("profil.language") }}</h3>
            <p class="card-subtitle">Interface</p>
          </div>
        </div>
        <div class="card-body">
          <div class="language-options">
            <button 
              v-for="lang in languages" 
              :key="lang.code"
              :class="['language-btn', { active: currentLocale === lang.code }]"
              @click="changeLanguage(lang.code)"
            >
              <span class="flag">{{ lang.flag }}</span>
              <span class="lang-name">{{ lang.name }}</span>
              <CheckIcon v-if="currentLocale === lang.code" class="check-icon" />
            </button>
          </div>
        </div>
      </div>

      <!-- Card Statistiques Améliorée -->
      <div class="card stats-card card-large">
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="icon-wrapper icon-success">
            <BarChartIcon />
          </div>
          <div>
            <h3>{{ t("profil.statistics") }}</h3>
            <p class="card-subtitle">Aperçu de vos dépenses</p>
          </div>
        </div>
        <div class="card-body">
          <div class="stats-grid">
            <div class="stat-card stat-primary">
              <div class="stat-bg-circle"></div>
              <CreditCardIcon class="stat-icon-large" />
              <span class="stat-label">{{ t("profil.total_expenses") }}</span>
              <span class="stat-value-large">{{ nbrExpenses }}</span>
            </div>
            
            <div class="stat-card stat-success">
              <div class="stat-bg-circle"></div>
              <DollarSignIcon class="stat-icon-large" />
              <span class="stat-label">{{ t("profil.total_amount") }}</span>
              <span class="stat-value-large">{{ formatCurrency(totalSpent) }}</span>
            </div>
            
            <div class="stat-card stat-warning">
              <div class="stat-bg-circle"></div>
              <CalendarIcon class="stat-icon-large" />
              <span class="stat-label">{{ t("profil.this_month") }}</span>
              <span class="stat-value-large">{{ formatCurrency(totalThisMonth) }}</span>
            </div>

            <div class="stat-card stat-info">
              <div class="stat-bg-circle"></div>
              <TrendingUpIcon class="stat-icon-large" />
              <span class="stat-label">Moyenne/Mois</span>
              <span class="stat-value-large">{{ formatCurrency(avgPerMonth) }}</span>
            </div>

            <div class="stat-card stat-danger">
              <div class="stat-bg-circle"></div>
              <AwardIcon class="stat-icon-large" />
              <span class="stat-label">Plus Grande</span>
              <span class="stat-value-large">{{ formatCurrency(highestExpense) }}</span>
            </div>

            <div class="stat-card stat-cyan">
              <div class="stat-bg-circle"></div>
              <TargetIcon class="stat-icon-large" />
              <span class="stat-label">Épargne</span>
              <span class="stat-value-large">23%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Préférences -->
      <div class="card preferences-card">
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="icon-wrapper icon-orange">
            <SettingsIcon />
          </div>
          <div>
            <h3>{{ t("profil.preferences") }}</h3>
            <p class="card-subtitle">Paramètres</p>
          </div>
        </div>
        <div class="card-body">
          <div class="preference-item">
            <div class="preference-label">
              <BellIcon />
              <span>{{ t("profil.notifications") }}</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="notifications" @change="toggleNotifications">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Card Actions Rapides -->
      <div class="card actions-card card-full">
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="icon-wrapper icon-pink">
            <ZapIcon />
          </div>
          <div>
            <h3>{{ t("profil.quick_actions") }}</h3>
            <p class="card-subtitle">Gérez votre compte</p>
          </div>
        </div>
        <div class="card-body actions-body">
          <button class="action-btn action-blue" @click="showChangePassword = true">
            <div class="action-icon">
              <LockIcon />
            </div>
            <span>{{ t("profil.change_password") }}</span>
          </button>
          <button class="action-btn action-green" @click="exportPDF">
            <div class="action-icon">
              <DownloadIcon />
            </div>
            <span>{{ t("profil.export_data") }}</span>
          </button>
          <button class="action-btn action-danger" @click="showDeleteModal = true">
            <div class="action-icon">
              <Trash2Icon />
            </div>
            <span>{{ t("profil.delete_account") }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <Teleport to="body">
      <ChangingPassword v-model="showChangePassword" />
    </Teleport>

    <ConfirmModal 
      v-model="showDeleteModal"
      :title="t('profil.delete_account')" 
      :message="t('profil.delete_confirm')" 
      :cancel-text="t('confirm.cancel')" 
      :confirm-text="t('profil.delete_account')"
      type="danger"
      @confirm="deleteAccount"
    >
      <template #input>
        <input 
          type="password" 
          v-model="passwordConfirm" 
          :placeholder="t('profil.enter_password')"
          class="password-input"
        />
      </template>
    </ConfirmModal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, h } from 'vue';
import axios from 'axios';
import { useUserStore } from '../services/userStore';
import { useI18n } from "vue-i18n";
import { useExpenseStore } from "../stores/expenseStore";
import ChangingPassword from "./usefulls/changingpassword.vue";
import ConfirmModal from "./usefulls/confirmate.vue";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Icons Components
const UserIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('path', { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
  h('circle', { cx: "12", cy: "7", r: "4" })
]);

const EditIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('path', { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
  h('path', { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
]);

const GlobeIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('circle', { cx: "12", cy: "12", r: "10" }),
  h('line', { x1: "2", y1: "12", x2: "22", y2: "12" }),
  h('path', { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
]);

const CheckIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3" }, [
  h('polyline', { points: "20 6 9 17 4 12" })
]);

const BarChartIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('line', { x1: "12", y1: "20", x2: "12", y2: "10" }),
  h('line', { x1: "18", y1: "20", x2: "18", y2: "4" }),
  h('line', { x1: "6", y1: "20", x2: "6", y2: "16" })
]);

const CreditCardIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('rect', { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" }),
  h('line', { x1: "1", y1: "10", x2: "23", y2: "10" })
]);

const DollarSignIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('line', { x1: "12", y1: "1", x2: "12", y2: "23" }),
  h('path', { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })
]);

const CalendarIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('rect', { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
  h('line', { x1: "16", y1: "2", x2: "16", y2: "6" }),
  h('line', { x1: "8", y1: "2", x2: "8", y2: "6" }),
  h('line', { x1: "3", y1: "10", x2: "21", y2: "10" })
]);

const SettingsIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('circle', { cx: "12", cy: "12", r: "3" }),
  h('path', { d: "M12 1v6m0 6v6m9-9h-6m-6 0H3" })
]);

const BellIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('path', { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }),
  h('path', { d: "M13.73 21a2 2 0 0 1-3.46 0" })
]);

const ZapIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('polygon', { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
]);

const LockIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('rect', { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
  h('path', { d: "M7 11V7a5 5 0 0 1 10 0v4" })
]);

const DownloadIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('path', { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
  h('polyline', { points: "7 10 12 15 17 10" }),
  h('line', { x1: "12", y1: "15", x2: "12", y2: "3" })
]);

const Trash2Icon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('polyline', { points: "3 6 5 6 21 6" }),
  h('path', { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
  h('line', { x1: "10", y1: "11", x2: "10", y2: "17" }),
  h('line', { x1: "14", y1: "11", x2: "14", y2: "17" })
]);

const TrendingUpIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('polyline', { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
  h('polyline', { points: "17 6 23 6 23 12" })
]);

const AwardIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('circle', { cx: "12", cy: "8", r: "7" }),
  h('polyline', { points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88" })
]);

const TargetIcon = () => h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, [
  h('circle', { cx: "12", cy: "12", r: "10" }),
  h('circle', { cx: "12", cy: "12", r: "6" }),
  h('circle', { cx: "12", cy: "12", r: "2" })
]);

// Composables
const { t, locale } = useI18n();
const userStore = useUserStore();
const expenseStore = useExpenseStore();

// Refs
const showDeleteModal = ref(false);
const showChangePassword = ref(false);
const passwordConfirm = ref('');
const notifications = ref(true);

// Computed
const user = computed(() => userStore.user);
const currentLocale = computed(() => locale.value);
const totalSpent = computed(() => {
  return expenseStore.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
});
const nbrExpenses = computed(() => expenseStore.expenses.length);
const totalThisMonth = computed(() => {
  const now = new Date();
  return expenseStore.expenses.reduce((total, exp) => {
    const expenseDate = new Date(exp.date || exp.createdAt || exp.created_at);
    if (isNaN(expenseDate.getTime())) return total;
    const amount = Number(exp.amount || 0);
    if (isNaN(amount)) return total;
    if (expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()) {
      return total + amount;
    }
    return total;
  }, 0);
});

const avgPerMonth = computed(() => {
  if (!expenseStore.expenses.length) return 0;
  const oldest = expenseStore.expenses.reduce((min, exp) => {
    const date = new Date(exp.date || exp.createdAt || exp.created_at);
    return date < min ? date : min;
  }, new Date());
  const months = Math.max(1, Math.ceil((Date.now() - oldest.getTime()) / (1000 * 60 * 60 * 24 * 30)));
  return totalSpent.value / months;
});

const highestExpense = computed(() => {
  if (!expenseStore.expenses.length) return 0;
  return Math.max(...expenseStore.expenses.map(exp => Number(exp.amount || 0)));
});

// Data
const languages = ref([
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]);

// Methods
const changeLanguage = (langCode) => {
  locale.value = langCode;
  localStorage.setItem('userLanguage', langCode);
};

const formatDate = (date) => {
  if (!date) return '...';
  return new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'MGA',
    minimumFractionDigits: 0
  }).format(amount);
};

const editProfile = () => {
  console.log('Edit profile');
};

const exportPDF = async () => {
  try {
    await expenseStore.fetchExpenses();
    if (!expenseStore.expenses.length) {
      alert(t('profil.no_expenses'));
      return;
    }
    const doc = new jsPDF();
    doc.text(t('profil.expense_report'), 14, 20);
    const tableColumn = ["Date", "Description", "Amount", "Category"];
    const tableRows = expenseStore.expenses.map(exp => [
      new Date(exp.date || exp.createdAt).toLocaleDateString(),
      exp.description || '-',
      formatCurrency(exp.amount || 0),
      exp.category || '-'
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [102, 126, 234] }
    });
    doc.save("expenses_report.pdf");
  } catch (error) {
    console.error('Export failed:', error);
    alert(t('profil.export_error'));
  }
};

const deleteAccount = async () => {
  if (!passwordConfirm.value) {
    alert(t('profil.enter_password'));
    return;
  }
  try {
    const token = localStorage.getItem("token");
    await axios.delete("http://localhost:3000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
      data: { password: passwordConfirm.value }
    });
    localStorage.removeItem("token");
    userStore.$reset();
    alert(t('profil.account_deleted'));
    window.location.href = "/login";
  } catch (err) {
    console.error("Delete account failed:", err);
    alert(err.response?.data?.error || t('profil.delete_error'));
  } finally {
    passwordConfirm.value = '';
    showDeleteModal.value = false;
  }
};

const toggleNotifications = () => {
  console.log('Notifications:', notifications.value);
};

// Lifecycle
onMounted(() => {
  userStore.fetchUser();
  expenseStore.fetchExpenses();
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang) {
    locale.value = savedLang;
  }
});
</script>

<style scoped>
.profil-content {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 50%, #dce4ee 100%);
  position: relative;
}

.profil-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.header-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 200px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

.subtitle {
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 600;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.profil-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(102, 126, 234, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: cardSlideIn 0.6s ease-out backwards;
}

@keyframes cardSlideIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  transform: scaleX(0);
  transition: transform 0.4s ease;
  transform-origin: left;
}

.card:hover::before {
  transform: scaleX(1);
}

.card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 
    0 25px 60px rgba(102, 126, 234, 0.2),
    0 0 0 1px rgba(102, 126, 234, 0.1);
}

.card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.card:hover .card-glow {
  opacity: 1;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.card-large {
  grid-column: span 2;
}

.card-full {
  grid-column: span 3;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
.card:nth-child(5) { animation-delay: 0.5s; }

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card:hover .icon-wrapper {
  transform: rotate(5deg) scale(1.1);
}

.icon-wrapper svg {
  width: 28px;
  height: 28px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.icon-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.icon-blue { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.icon-success { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.icon-orange { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.icon-pink { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }

.status-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  background: #10b981;
  border: 3px solid white;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 0.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-full {
  grid-column: span 2;
}

.info-group {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.info-group:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  transform: translateX(6px);
  border-left-width: 6px;
}

.info-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.75rem;
}

.user-data {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.language-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 700;
  color: #475569;
}

.language-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.language-btn.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.flag {
  font-size: 2rem;
}

.lang-name {
  flex: 1;
  text-align: left;
}

.check-icon {
  width: 22px;
  height: 22px;
  color: #667eea;
  animation: checkBounce 0.6s ease;
}

@keyframes checkBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.stat-card {
  position: relative;
  padding: 1.75rem;
  border-radius: 20px;
  color: white;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
}

.stat-bg-circle {
  position: absolute;
  top: -30%;
  right: -20%;
  width: 180px;
  height: 180px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  pointer-events: none;
}

.stat-icon-large {
  width: 32px;
  height: 32px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.95;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.stat-value-large {
  font-size: 1.75rem;
  font-weight: 900;
  position: relative;
  z-index: 1;
  letter-spacing: -0.5px;
}

.stat-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.stat-success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.stat-warning { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.stat-info { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.stat-danger { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.stat-cyan { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }

.preference-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.preference-item:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  transform: scale(1.02);
}

.preference-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
}

.preference-label svg {
  width: 22px;
  height: 22px;
  color: #667eea;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 64px;
  height: 36px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #cbd5e1;
  transition: 0.4s;
  border-radius: 36px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider:before {
  position: absolute;
  content: "";
  height: 28px;
  width: 28px;
  left: 4px;
  bottom: 4px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.toggle input:checked + .slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
}

.toggle input:checked + .slider:before {
  transform: translateX(28px);
}

.actions-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  border: 2px solid;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  background: white;
}

.action-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.action-blue {
  border-color: #dbeafe;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.action-blue .action-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.action-blue:hover {
  border-color: #3b82f6;
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(59, 130, 246, 0.25);
}

.action-blue:hover .action-icon {
  transform: rotate(12deg) scale(1.1);
}

.action-green {
  border-color: #d1fae5;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

.action-green .action-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

.action-green:hover {
  border-color: #10b981;
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(16, 185, 129, 0.25);
}

.action-green:hover .action-icon {
  transform: rotate(12deg) scale(1.1);
}

.action-danger {
  border-color: #fecaca;
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
}

.action-danger .action-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.action-danger:hover {
  border-color: #ef4444;
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.25);
}

.action-danger:hover .action-icon {
  transform: rotate(12deg) scale(1.1);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 14px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
}

.btn-primary svg {
  transition: transform 0.3s ease;
}

.btn-primary:hover svg {
  transform: rotate(15deg) scale(1.1);
}

.password-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.password-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
}

@media (max-width: 1200px) {
  .profil-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .card-large {
    grid-column: span 2;
  }
  
  .card-full {
    grid-column: span 2;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .profil-content {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .profil-grid {
    grid-template-columns: 1fr;
  }
  
  .card-large,
  .card-full {
    grid-column: span 1;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .info-full {
    grid-column: span 1;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .icon-wrapper {
    width: 48px;
    height: 48px;
  }
  
  .icon-wrapper svg {
    width: 24px;
    height: 24px;
  }
  
  .card-header h3 {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

button:focus-visible,
input:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 3px;
}
</style>