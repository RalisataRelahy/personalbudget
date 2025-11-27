<template>
    <div class="login-container">
        <HeaderLogSing />
        
        <div class="form-wrapper">
            <form @submit.prevent="login" class="login-form">
                <div class="form-header">
                    <div class="icon-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <h2>{{t('auth.title')}}</h2>
                    <p class="subtitle">{{ t('auth.subtitle') }}</p>
                </div>

                <div class="form-group">
                    <label for="identifier">{{t('auth.identifier')}}:</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input 
                            id="identifier"
                            type="text" 
                            v-model="identifier" 
                            :placeholder="t('auth.identifierPlaceholder')"
                            required
                            :disabled="loading"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">{{t('auth.password')}}:</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <input 
                            id="password"
                            type="password" 
                            v-model="password" 
                            :placeholder="t('auth.passwordPlaceholder')"
                            required
                            :disabled="loading"
                        />
                    </div>
                </div>

                <div class="error-message" v-if="error">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {{ error }}
                </div>

                <button type="submit" :disabled="loading" class="submit-btn">
                    <span v-if="!loading">{{t('auth.loginButton')}}</span>
                    <span v-else class="loading-spinner">
                        <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                        </svg>
                        Loading...
                    </span>
                </button>

                <div class="form-footer">
                    <p>{{t('auth.noAccount')}} <router-link to="/signup" class="link">{{t('auth.registerButton')}}</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../services/supabase';
import HeaderLogSing from '../components/usefulls/headerLogSing.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const identifier = ref(""); // champ formulaire
const password = ref("");
const loading = ref(false);
const error = ref("");

async function login() {
  loading.value = true;
  error.value = "";

  try {
    const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
      email: identifier.value, // utilise le v-model
      password: password.value
    });

    if (supabaseError) {
      error.value = supabaseError.message;
      return;
    }

    if (!data.user) {
      error.value = "Email not confirmed or invalid credentials";
      return;
    }

    // Sauvegarde local
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    console.log("Logged in user:", data.user);

    router.push("/"); // redirection

  } catch (err) {
    error.value = "Server unreachable. Please try again later.";
    console.error("Login error:", err);
  } finally {
    loading.value = false;
  }
}
</script>




<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.login-container {
    background-image: url("../assets/bgapp.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top:0px;
    padding: 0px 0px 40px;
}

.form-wrapper {
    width: 100%;
    max-width: 450px;
    animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-form {
    background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
    backdrop-filter: blur(10px); /* Apply blur effect */
    border: 1px solid rgba(255, 255, 255, 0.3); /* Light border */
    margin-top:40px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.form-header {
    text-align: center;
    margin-bottom: 30px;
}

.icon-circle {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.icon-circle svg {
    color: white;
}

.form-header h2 {
    font-size: 28px;
    color: #333;
    margin-bottom: 8px;
    font-weight: 700;
}

.subtitle {
    color: #666;
    font-size: 14px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    color: #333;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    pointer-events: none;
}

.input-wrapper input {
    width: 100%;
    padding: 14px 14px 14px 45px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.3s ease;
    background: white;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-wrapper input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.error-message {
    background: #fee;
    border: 1px solid #fcc;
    color: #c33;
    padding: 12px 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.submit-btn:active:not(:disabled) {
    transform: translateY(0);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.spinner {
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    100% { transform: rotate(360deg); }
}

.form-footer {
    text-align: center;
    margin-top: 25px;
}

.form-footer p {
    color: #666;
    font-size: 14px;
}

.link {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.link:hover {
    color: #764ba2;
    text-decoration: underline;
}

/* Responsive */
@media (max-width: 480px) {
    .login-form {
        padding: 30px 20px;
    }
    
    .form-header h2 {
        font-size: 24px;
    }
    
    .icon-circle {
        width: 60px;
        height: 60px;
    }
}
</style>