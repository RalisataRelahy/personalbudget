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

<style scooped>
/* Header Styles */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  z-index: 1001;
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
}

/* Navigation */
.nav-container {
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
}

.nav-link:hover svg {
  transform: scale(1.1);
}

/* Logout Button */
.logout-btn {
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
  z-index: 1001;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.logout-btn:active {
  transform: translateY(0);
}

/* Burger Button */
.burger-button {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
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

/* Menu Overlay */
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
}

.menu-overlay.active {
  opacity: 1;
}

/* Tablet Styles */
@media (max-width: 1024px) {
  .nav-link span {
    font-size: 0.9rem;
  }

  .nav-link {
    padding: 0.65rem 1rem;
  }

  .logout-text {
    display: none;
  }

  .logout-btn {
    padding: 0.75rem;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
  }

  .burger-button {
    display: flex;
  }

  .nav-container {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 280px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
    transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    padding: 5rem 0 2rem;
    overflow-y: auto;
  }

  .nav-container.open {
    right: 0;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1.5rem;
  }

  .nav-link {
    padding: 1rem 1.25rem;
    width: 100%;
    justify-content: flex-start;
  }

  .nav-link span {
    font-size: 1rem;
  }

  .menu-overlay {
    display: block;
  }

  .logout-btn {
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    padding: 0.875rem;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .logout-text {
    display: none;
  }

  .logo-text {
    font-size: 1.25rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .nav-container {
    width: 260px;
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
}

/* Smooth Scrolling for Mobile Menu */
@media (max-width: 768px) {
  .nav-container::-webkit-scrollbar {
    width: 6px;
  }

  .nav-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  .nav-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  .nav-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Styles */
.nav-link:focus-visible,
.logout-btn:focus-visible,
.burger-button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Loading Animation for Active States */
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

.nav-container.open .nav-links li {
  animation: slideIn 0.3s ease forwards;
}

.nav-container.open .nav-links li:nth-child(1) { animation-delay: 0.1s; }
.nav-container.open .nav-links li:nth-child(2) { animation-delay: 0.15s; }
.nav-container.open .nav-links li:nth-child(3) { animation-delay: 0.2s; }
.nav-container.open .nav-links li:nth-child(4) { animation-delay: 0.25s; }
.nav-container.open .nav-links li:nth-child(5) { animation-delay: 0.3s; }
</style>