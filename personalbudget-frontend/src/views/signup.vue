<template>
    <div class="signup-container">
        <HeaderLogSing />
        
        <div class="form-wrapper">
            <form @submit.prevent="signup" class="signup-form">
                <div class="form-header">
                    <div class="icon-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </div>
                    <h2>{{t('auth.registerTitle')}}</h2>
                    <p class="subtitle">{{ t('auth.registerSubtitle') }}</p>
                </div>

                <div class="form-group">
                    <label for="username">{{t('auth.username')}}</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input 
                            id="username"
                            type="text" 
                            v-model="username" 
                            :placeholder="t('auth.usernamePlaceholder')" 
                            required
                            :disabled="loading"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">{{t('auth.email')}}</label>
                    <div class="input-wrapper">
                        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <input 
                            id="email"
                            type="email" 
                            v-model="email" 
                            :placeholder="t('auth.emailPlaceholder')" 
                            required
                            :disabled="loading"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">{{t('auth.password')}}</label>
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

                <div class="success-message" v-if="success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {{ success }}
                </div>

                <button type="submit" :disabled="loading" class="submit-btn">
                    <span v-if="!loading">{{t('auth.registerButton')}}</span>
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
                    <p>{{t('auth.alreadyHaveAccount')}} <router-link to="/login" class="link">{{t('auth.loginButton')}}</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import HeaderLogSing from "@/components/usefulls/headerLogSing.vue";
import { useI18n } from 'vue-i18n';

export default {
  components: { HeaderLogSing },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
      error: "",
      success: "",
    };
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  methods: {
    async signup() {
      this.loading = true;
      this.error = "";
      this.success = "";

      try {
        const res = await fetch("http://localhost:3000/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          this.error = data.error || this.t("signup.failed"); // Use i18n
          return;
        }

        this.success = this.t("signup.success"); // Use i18n

        // Redirect after 1.5s
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);

      } catch (err) {
        this.error = this.t("signup.serverError");
        console.error("Signup error:", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.signup-container {
    background-image: url("../assets/bgapp.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* padding: 20px ; */
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

.signup-form {
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 40px;
    margin-top:20px;
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

.success-message {
    background: #efe;
    border: 1px solid #cfc;
    color: #3c3;
    padding: 12px 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideDown 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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
    .signup-form {
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