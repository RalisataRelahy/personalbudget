<template>
  <header class="header">
    <div class="header-content">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <span class="logo-text">{{ t("app.name") }}</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop">
        <ul class="nav-links">
          <li>
            <router-link to="/acceuil" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>{{ t("nav.home") }}</span>
            </router-link>
          </li>

          <li>
            <router-link to="/dashboard" class="nav-link">
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
            <router-link to="/add-expense" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>{{ t("expenses.addTitle") }}</span>
            </router-link>
          </li>

          <li>
            <router-link to="/list-expense" class="nav-link">
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
            <router-link to="/set-budget" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>{{ t("budget.title") }}</span>
            </router-link>
          </li> 
          <li>
            <router-link to="/profile" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{{ t("nav.profile") }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Desktop Logout Button -->
      <button @click="show = true" class="logout-btn desktop-logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span class="logout-text">{{ t("nav.logout") }}</span>
      </button>

      <!-- Mobile Burger Button -->
      <button 
        class="burger-button" 
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        aria-label="Toggle menu"
        aria-expanded="isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      class="menu-overlay" 
      :class="{ active: isMenuOpen }" 
      @click="closeMenu"
      aria-hidden="true"
    ></div>

    <!-- Mobile Navigation Sidebar -->
    <nav class="nav-mobile" :class="{ open: isMenuOpen }">
      <ul class="nav-links-mobile">
        <li>
          <router-link to="/acceuil" class="nav-link-mobile" @click="closeMenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>{{ t("nav.home") }}</span>
          </router-link>
        </li>

        <li>
          <router-link to="/dashboard" class="nav-link-mobile" @click="closeMenu">
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
          <router-link to="/add-expense" class="nav-link-mobile" @click="closeMenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>{{ t("expenses.addTitle") }}</span>
          </router-link>
        </li>

        <li>
          <router-link to="/list-expense" class="nav-link-mobile" @click="closeMenu">
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
          <router-link to="/profile" class="nav-link-mobile" @click="closeMenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{{ t("nav.profile") }}</span>
          </router-link>
        </li>

        <li class="mobile-logout-item">
          <button @click="handleMobileLogout" class="nav-link-mobile logout-mobile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>{{ t("nav.logout") }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Confirm Modal -->
    <ConfirmModal 
      v-model="show"
      :title="t('nav.logout')"
      :message="t('auth.logoutConfirm')"
      :cancelText="t('confirm.cancel')"
      :confirmText="t('nav.logout')"
      type="delete"
      @confirm="logout"
    />
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

const handleMobileLogout = () => {
  closeMenu();
  show.value = true;
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
/* ==================== BASE STYLES ==================== */
* {
  box-sizing: border-box;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* ==================== LOGO SECTION ==================== */
.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  z-index: 1002;
  cursor: pointer;
  flex-shrink: 0;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.logo-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(360deg);
}

.logo-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.logo-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

/* ==================== DESKTOP NAVIGATION ==================== */
.nav-desktop {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-links li {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  border-radius: 10px;
}

.nav-link:hover::before {
  transform: scaleX(1);
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-link svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.nav-link:hover svg {
  transform: scale(1.1);
}

/* ==================== DESKTOP LOGOUT BUTTON ==================== */
.desktop-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  z-index: 1002;
  white-space: nowrap;
  flex-shrink: 0;
}

.desktop-logout:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.desktop-logout:active {
  transform: translateY(0);
}

.desktop-logout svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* ==================== MOBILE BURGER BUTTON ==================== */
.burger-button {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1002;
  position: relative;
}

.burger-button span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.burger-button.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger-button.active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.burger-button.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* ==================== MOBILE MENU ==================== */
.nav-mobile {
  display: none;
}

.menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 999;
  pointer-events: none;
}

.menu-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

/* ==================== RESPONSIVE BREAKPOINTS ==================== */

/* Large Desktop (1200px to 1400px) */
@media (max-width: 1400px) {
  .header-content {
    padding: 1rem 2rem;
  }
}

/* Desktop (1024px to 1200px) */
@media (max-width: 1200px) {
  .header-content {
    padding: 1rem 1.5rem;
    gap: 1.5rem;
  }

  .nav-links {
    gap: 0.375rem;
  }

  .nav-link {
    padding: 0.625rem 1rem;
    font-size: 0.9rem;
  }

  .nav-link svg {
    width: 19px;
    height: 19px;
  }

  .desktop-logout {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
}

/* Tablet Large (900px to 1024px) */
@media (max-width: 1024px) {
  .header-content {
    gap: 1rem;
  }

  .logo-text {
    font-size: 1.375rem;
  }

  .nav-link {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  }

  .nav-link svg {
    width: 18px;
    height: 18px;
  }

  /* Hide logout text, keep icon only */
  .logout-text {
    display: none;
  }

  .desktop-logout {
    padding: 0.75rem;
    min-width: 44px;
    justify-content: center;
  }
}

/* Tablet (768px to 900px) - Transition zone */
@media (max-width: 900px) {
  .nav-links {
    gap: 0.25rem;
  }

  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
}

/* Mobile Menu Activation (768px and below) */
@media (max-width: 768px) {
  .header-content {
    padding: 0.875rem 1.25rem;
  }

  /* Hide Desktop Navigation */
  .nav-desktop {
    display: none;
  }

  .desktop-logout {
    display: none;
  }

  /* Show Burger Button */
  .burger-button {
    display: flex;
  }

  /* Show Mobile Menu */
  .nav-mobile {
    display: block;
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: min(320px, 80vw);
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
    transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    padding: 5rem 0 2rem;
    overflow-y: auto;
    z-index: 1001;
  }

  .nav-mobile.open {
    right: 0;
  }

  /* Mobile Menu Links */
  .nav-links-mobile {
    list-style: none;
    margin: 0;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link-mobile {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.3s ease;
    width: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
  }

  .nav-link-mobile:hover,
  .nav-link-mobile.router-link-active {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateX(4px);
  }

  .nav-link-mobile:active {
    transform: scale(0.98);
  }

  .nav-link-mobile svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }

  .nav-link-mobile span {
    flex: 1;
  }

  /* Mobile Logout Button */
  .mobile-logout-item {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .logout-mobile {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .logout-mobile:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Show Overlay */
  .menu-overlay {
    display: block;
  }

  /* Mobile Menu Animation */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .nav-mobile.open .nav-links-mobile li {
    animation: slideIn 0.3s ease forwards;
    opacity: 0;
  }

  .nav-mobile.open .nav-links-mobile li:nth-child(1) { animation-delay: 0.1s; }
  .nav-mobile.open .nav-links-mobile li:nth-child(2) { animation-delay: 0.15s; }
  .nav-mobile.open .nav-links-mobile li:nth-child(3) { animation-delay: 0.2s; }
  .nav-mobile.open .nav-links-mobile li:nth-child(4) { animation-delay: 0.25s; }
  .nav-mobile.open .nav-links-mobile li:nth-child(5) { animation-delay: 0.3s; }
  .nav-mobile.open .nav-links-mobile li:nth-child(6) { animation-delay: 0.35s; }
}

/* Small Mobile (480px to 640px) */
@media (max-width: 640px) {
  .header-content {
    padding: 0.75rem 1rem;
  }

  .logo-section {
    gap: 0.625rem;
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .logo-icon {
    width: 38px;
    height: 38px;
  }

  .logo-icon svg {
    width: 22px;
    height: 22px;
  }

  .nav-mobile {
    width: min(300px, 82vw);
  }
}

/* Extra Small Mobile (360px to 480px) */
@media (max-width: 480px) {
  .header-content {
    padding: 0.75rem 1rem;
  }

  .logo-section {
    gap: 0.5rem;
  }

  .logo-text {
    font-size: 1.125rem;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .logo-icon svg {
    width: 20px;
    height: 20px;
  }

  .nav-mobile {
    width: min(280px, 85vw);
    padding: 4.5rem 0 2rem;
  }

  .nav-links-mobile {
    padding: 0 1.25rem;
  }

  .nav-link-mobile {
    padding: 0.875rem 1rem;
    font-size: 0.938rem;
  }

  .nav-link-mobile svg {
    width: 20px;
    height: 20px;
  }

  .burger-button span {
    width: 23px;
  }
}

/* Very Small Mobile (below 360px) */
@media (max-width: 360px) {
  .header-content {
    padding: 0.625rem 0.875rem;
  }

  .logo-text {
    font-size: 1rem;
  }

  .logo-icon {
    width: 34px;
    height: 34px;
  }

  .logo-icon svg {
    width: 18px;
    height: 18px;
  }

  .nav-mobile {
    width: 90vw;
  }

  .nav-link-mobile {
    padding: 0.75rem 0.875rem;
    font-size: 0.9rem;
  }

  .burger-button span {
    width: 22px;
    height: 2.5px;
  }
}

/* ==================== LANDSCAPE MODE ==================== */
@media (max-height: 600px) and (orientation: landscape) {
  .nav-mobile {
    padding: 4rem 0 1.5rem;
  }

  .nav-links-mobile {
    gap: 0.375rem;
  }

  .nav-link-mobile {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .nav-mobile {
    padding: 3.5rem 0 1rem;
  }

  .nav-links-mobile {
    gap: 0.25rem;
  }

  .nav-link-mobile {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
  }

  .nav-link-mobile svg {
    width: 20px;
    height: 20px;
  }
}

/* ==================== CUSTOM SCROLLBAR ==================== */
.nav-mobile::-webkit-scrollbar {
  width: 6px;
}

.nav-mobile::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.nav-mobile::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.nav-mobile::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* Firefox Scrollbar */
.nav-mobile {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}

/* ==================== ACCESSIBILITY ==================== */
.nav-link:focus-visible,
.nav-link-mobile:focus-visible,
.desktop-logout:focus-visible,
.burger-button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #667eea;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .nav-link,
  .nav-link-mobile,
  .desktop-logout {
    border: 2px solid white;
  }

  .nav-link.router-link-active {
    background: rgba(255, 255, 255, 0.4);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ==================== TOUCH DEVICES ==================== */
@media (hover: none) and (pointer: coarse) {
  .nav-link:hover,
  .nav-link-mobile:hover,
  .desktop-logout:hover {
    transform: none;
  }

  .nav-link:active {
    transform: scale(0.98);
    background: rgba(255, 255, 255, 0.2);
  }

  .nav-link-mobile:active {
    transform: scale(0.98);
  }

  .desktop-logout:active {
    transform: scale(0.98);
  }

  /* Increase touch targets on mobile */
  .nav-link-mobile,
  .burger-button {
    min-height: 44px;
  }
}

/* ==================== PRINT STYLES ==================== */
@media print {
  .header {
    position: static;
    box-shadow: none;
    background: white;
    color: black;
  }

  .burger-button,
  .desktop-logout,
  .logout-mobile {
    display: none;
  }

  .nav-mobile {
    display: none;
  }

  .nav-desktop {
    display: flex;
  }

  .nav-link {
    color: black;
  }
}

/* ==================== DARK MODE SUPPORT ==================== */
@media (prefers-color-scheme: dark) {
  /* Already optimized for dark mode with gradient background */
  .menu-overlay {
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>