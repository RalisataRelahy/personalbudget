import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur récupération user:", error);
        this.user = null;
      } else {
        this.user = user;
      }
    },
    logout() {
      supabase.auth.signOut();
      this.user = null;
    }
  }
});
