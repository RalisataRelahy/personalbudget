<script setup>
import Header from './usefulls/header.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// logout function
function logout() {
  localStorage.removeItem("token");
  router.push("/login");
}
</script>

<template>
  <div>
    <Header :onLogout="logout" />  <!-- pass logout to header if needed -->
    <router-view /> <!-- This is where subpages render -->
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
