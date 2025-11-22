<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <span class="logo-text">{{ t("app.name") }}</span>
      </div>

      <!-- Burger Button -->
      <button 
        class="burger-button" 
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ConfirmModal 
        v-model="show"
        :title="t('nav.logout')"
        :message="t('auth.logoutConfirm')"
        :cancelText="t('confirm.cancel')"
        :deleteText="t('nav.logout')"
        @delete="logout"
      />

      <!-- Navigation -->
      <nav class="nav-container" :class="{ open: isMenuOpen }">
        <ul class="nav-links">

          <li>
            <router-link to="/acceuil" class="nav-link" @click="closeMenu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>{{ t("nav.home") }}</span>
            </router-link>
          </li>

          <li>
            <router-link to="/dashboard" class="nav-link" @click="closeMenu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>{{ t("nav.dashboard") }}</span>
            </router-link>
          </li>

          <li>
            <router-link to="/add-expense" class="nav-link" @click="closeMenu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>{{ t("expenses.addTitle") }}</span>
            </router-link>
          </li>

          <li>
            <router-link to="/list-expense" class="nav-link" @click="closeMenu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span>{{ t("expenses.title") }}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="nav-link" @click="closeMenu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>{{ t("nav.profile") }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Logout Button -->
      <button @click="show = true" class="logout-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span class="logout-text">{{ t("nav.logout") }}</span>
      </button>
    </div>

    <!-- Overlay -->
    <div 
      class="menu-overlay" 
      :class="{ active: isMenuOpen }" 
      @click="closeMenu"
    ></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ConfirmModal from "./confirmate.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const show = ref(false);
const router = useRouter();
const isMenuOpen = ref(false);

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const handleEscape = (e) => {
  if (e.key === "Escape" && isMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.header {
  background: var(--header-color);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
  padding: 1rem 1.5rem;
  position: relative;
  overflow: visible;
}

.header-content {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  gap: 2rem;
}

.logo-section {
  margin-right: auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logo-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Burger Button */
.burger-button {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 20;
}

.burger-button span {
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.burger-button.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger-button.active span:nth-child(2) {
  opacity: 0;
}

.burger-button.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Navigation */
.nav-container {
  display: flex;
  align-items: center;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link svg {
  width: 20px;
  height: 20px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Logout Button */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #f05252 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
  white-space: nowrap;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
}

.logout-text {
  display: inline;
}

/* Overlay */
.menu-overlay {
  display: none;
}

/* RESPONSIVE - TABLET (≤ 768px) */
@media (max-width: 968px) {
  .header-content {
    gap: 1rem;
  }

  .nav-links {
    gap: 0.3rem;
  }

  .nav-link {
    padding: 0.6rem 0.9rem;
    font-size: 0.85rem;
  }

  .nav-link svg {
    width: 18px;
    height: 18px;
  }

  .logout-btn {
    padding: 8px 14px;
    font-size: 13px;
  }
}

/* RESPONSIVE - MOBILE (≤ 768px) */
@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1rem;
  }

  .burger-button {
    display: flex;
  }

  .menu-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 8;
  }

  .menu-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-container {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    backdrop-filter: blur(20px);
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
    padding: 5rem 1.5rem 2rem;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 9;
    overflow-y: auto;
  }

  .nav-container.open {
    right: 0;
  }

  .nav-links {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.15);
  }

  .nav-link:hover {
    transform: translateX(8px);
  }
}

/* RESPONSIVE - SMALL MOBILE (≤ 480px) */
@media (max-width: 480px) {
  .logo-text {
    font-size: 1.1rem;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .logo-icon svg {
    width: 20px;
    height: 20px;
  }

  .logout-btn {
    padding: 8px 12px;
    font-size: 14px;
  }

  .logout-btn svg {
    width: 16px;
    height: 16px;
  }

  .nav-container {
    width: 260px;
  }
}

/* RESPONSIVE - VERY SMALL (≤ 360px) */
@media (max-width: 360px) {
  .logo-text {
    font-size: 0.95rem;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .logout-text {
    display: none;
  }

  .logout-btn {
    padding: 8px;
  }

  .nav-container {
    width: 240px;
  }
}
</style>