// stores/themeStore.js
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const current = ref(localStorage.getItem('theme') || 'light');

  const toggle = () => {
    current.value = current.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', current.value);
  };

  watch(current, (val) => {
    document.documentElement.setAttribute('data-theme', val);
  }, { immediate: true });

  return { current, toggle };
});
