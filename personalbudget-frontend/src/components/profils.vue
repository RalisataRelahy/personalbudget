<template>
  <div class="profil-content">
    <div class="profil-header">
      <h2>{{ t("nav.profile") }}</h2>
      <p class="subtitle">{{ t("profil.manage_account") }}</p>
    </div>

    <div class="profil-grid">
      <!-- Card Informations Personnelles -->
      <div class="card profile-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h3>{{ t("profil.personal_info") }}</h3>
        </div>
        <div class="card-body">
          <div class="info-group">
            <label>{{ t("profil.username") }}</label>
            <p>{{ user?.username || '...' }}</p>
          </div>
          <div class="info-group">
            <label>{{ t("profil.email") }}</label>
            <p>{{ user?.email || '...' }}</p>
          </div>
          <div class="info-group">
            <label>{{ t("profil.member_since") }}</label>
            <p>{{ formatDate(user?.created_at) }}</p>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-secondary" @click="editProfile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            {{ t("profil.edit") }}
          </button>
        </div>
      </div>

      <!-- Card Paramètres de Langue -->
      <div class="card language-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <h3>{{ t("profil.language") }}</h3>
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
              <svg v-if="currentLocale === lang.code" class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Card Statistiques -->
      <div class="card stats-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
          <h3>{{ t("profil.statistics") }}</h3>
        </div>
        <div class="card-body">
          <div class="stat-item">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">{{ t("profil.total_expenses") }}</span>
              <span class="stat-value">{{ stats.totalExpenses }}</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">{{ t("profil.total_amount") }}</span>
              <span class="stat-value">{{ formatCurrency(stats.totalAmount) }}</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">{{ t("profil.this_month") }}</span>
              <span class="stat-value">{{ formatCurrency(stats.thisMonth) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Préférences -->
      <div class="card preferences-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m8.66-13a9 9 0 1 1-17.32 0"></path>
          </svg>
          <h3>{{ t("profil.preferences") }}</h3>
        </div>
        <div class="card-body">
          <div class="preference-item">
            <div class="preference-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span>{{ themeStore.current === 'light' ? t("profil.dark") : t("profil.light") }} Mode</span>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="darkMode" @change="toggleDarkMode">
              <span class="slider"></span>
            </label>
          </div>
          <div class="preference-item">
            <div class="preference-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
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
      <div class="card actions-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <h3>{{ t("profil.quick_actions") }}</h3>
        </div>
        <div class="card-body actions-body">
          <button class="action-btn" @click="changePassword">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            {{ t("profil.change_password") }}
          </button>
          <button class="action-btn" @click="exportData">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {{ t("profil.export_data") }}
          </button>
          <button class="action-btn danger" @click="deleteAccount">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            {{ t("profil.delete_account") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../services/userStore';
import { useI18n } from "vue-i18n";
import { useThemeStore } from '../stores/themeStore';

const themeStore = useThemeStore();
const { t, locale } = useI18n();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const currentLocale = computed(() => locale.value);

// Langues disponibles
const languages = ref([
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]);

// Préférences
const darkMode = ref(false);
const notifications = ref(true);
const twoFactor = ref(false);

// Statistiques (à remplacer par de vraies données)
const stats = ref({
  totalExpenses: 142,
  totalAmount: 45230,
  thisMonth: 8750
});

// Fonctions
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
    currency: 'EUR'
  }).format(amount);
};

const editProfile = () => {
  console.log('Edit profile');
};

const changePassword = () => {
  console.log('Change password');
};

const exportData = () => {
  console.log('Export data');
};

const deleteAccount = () => {
  if (confirm(t("profile.confirm_delete"))) {
    console.log('Delete account');
  }
};

const toggleDarkMode = () => {
  themeStore.toggle();
};

const toggleNotifications = () => {
  console.log('Toggle notifications:', notifications.value);
};

const toggleTwoFactor = () => {
  console.log('Toggle 2FA:', twoFactor.value);
};

onMounted(() => {
  userStore.fetchUser();
  
  // Charger la langue sauvegardée
  const savedLang = localStorage.getItem('userLanguage');
  if (savedLang) {
    locale.value = savedLang;
  }
});
</script>

<style scoped>
.profil-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.profil-header {
  margin-bottom: 2rem;
}

.profil-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1rem;
}

.profil-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

/* Cards */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-header svg {
  width: 24px;
  height: 24px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

/* Profile Card */
.info-group {
  margin-bottom: 1.25rem;
}

.info-group:last-child {
  margin-bottom: 0;
}

.info-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-group p {
  font-size: 1.05rem;
  color: #1a1a2e;
  font-weight: 500;
  margin: 0;
}

/* Language Card */
.language-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.language-btn:hover {
  background: #e9ecef;
  border-color: #667eea;
}

.language-btn.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-color: #667eea;
}

.flag {
  font-size: 1.8rem;
}

.lang-name {
  flex: 1;
  font-weight: 500;
  color: #1a1a2e;
  text-align: left;
}

.check-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

/* Stats Card */
.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.stat-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 1.25rem;
  color: #1a1a2e;
  font-weight: 700;
}

/* Preferences Card */
.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 0.75rem;
}

.preference-item:last-child {
  margin-bottom: 0;
}

.preference-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: #1a1a2e;
}

.preference-label svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

/* Toggle Switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
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
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Actions Card */
.actions-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-weight: 500;
  color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
  transform: translateX(4px);
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.action-btn.danger {
  border-color: #dc3545;
  color: #dc3545;
}

.action-btn.danger:hover {
  background: #dc3545;
  border-color: #dc3545;
  color: white;
}

/* Buttons */
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary svg {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 1024px) {
  .profil-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .profil-content {
    padding: 1rem;
  }

  .profil-grid {
    grid-template-columns: 1fr;
  }

  .profil-header h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .card-header {
    padding: 1rem;
  }

  .card-body {
    padding: 1rem;
  }

  .language-btn {
    padding: 0.75rem;
  }

  .stat-value {
    font-size: 1.1rem;
  }
}
</style>