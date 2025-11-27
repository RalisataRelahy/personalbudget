<script setup>
import Header from './usefulls/header.vue';
import { useRouter } from 'vue-router';
import { supabase } from '../services/supabase';

const router = useRouter();

function logout() {
  supabase.auth.signOut();  // supprime la session Supabase
  localStorage.removeItem("token");
  router.push("/login");
}
</script>

<template>
  <div>
    <Header :onLogout="logout" /> <!-- Header avec bouton logout -->
    <router-view /> <!-- Toutes les pages enfants seront rendues ici -->
  </div>
</template>

<style scoped>
router-view {
  display: block;
  padding: 2rem;
  background-color: var(--card-bg);
}
</style>
