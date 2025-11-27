import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import './assets/style.css';
import { createI18n } from 'vue-i18n';

import fr from './locales/fr.json';
import en from './locales/en.json';
// i18n setup
const i18n = createI18n({
    legacy: false,        // IMPORTANT
    locale: 'fr',         // langue par défaut
    fallbackLocale: 'en',
    messages: { fr, en },
});
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(i18n);
// main.js (après app.use(i18n))
import { supabase } from './services/supabase';

// version async avec v2
const { data: { user }, error } = await supabase.auth.getUser();

if (error) {
  console.error("Error fetching user:", error);
} else {
  console.log("Current user:", user);
}


app.mount("#app"); // ← THIS MUST MATCH <div id="app"></div> in index.html
