<template>
  <div v-if="isOpen" class="changing-password-overlay" @click.self="closePopup">
    <div class="changing-password-content">
      <button class="close-btn" @click="closePopup">×</button>

      <h2>{{ t("changingPassword.title") }}</h2>
      <p>{{ t("changingPassword.subtitle") }}</p>

      <form @submit.prevent="submitChange">
        
        <div class="form-group">
          <label for="currentPassword">{{ t("changingPassword.currentPassword") }}</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required />
        </div>

        <div class="form-group">
          <label for="newPassword">{{ t("changingPassword.newPassword") }}</label>
          <input type="password" id="newPassword" v-model="newPassword" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">{{ t("changingPassword.confirmPassword") }}</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>

        <button type="submit" class="submit-btn">
          {{ t("changingPassword.changePassword") }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../../services/userStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const userStore = useUserStore();

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  isOpen.value = val;
});

const closePopup = () => {
  emit("update:modelValue", false);
};

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const message = ref("");

const submitChange = async () => {
  error.value = "";
  message.value = "";

  const res = await userStore.changePassword(
    currentPassword.value,
    newPassword.value,
    confirmPassword.value
);

if (!res) {
  error.value = "Unexpected error";
  return;
}

if (res.success) {
    message.value = res.message;
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
} else {
    error.value = res.message;
}

};
</script>

<style scoped>
/* FULLSCREEN DARK OVERLAY */
.changing-password-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 16px;
  overflow-y: auto;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* POPUP CONTENT */
.changing-password-content {
  width: 100%;
  max-width: 440px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  position: relative;
  animation: popupFade 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin: auto;
  max-height: 90vh;
  z-index: 1000;
  overflow-y: auto;
}

/* CLOSE BUTTON */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  font-size: 28px;
  border: none;
  background: #f7fafc;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: #718096;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #edf2f7;
  color: #2d3748;
  transform: rotate(90deg);
}

/* TITLES */
h2 {
  margin: 0 0 8px 0;
  padding-right: 40px;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  margin: 0 0 24px 0;
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* FORM */
.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 16px;
  box-sizing: border-box;
  color: #2d3748;
  background: #f7fafc;
}

input:focus {
  border-color: #667eea;
  outline: none;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input::placeholder {
  color: #a0aec0;
}

/* SUBMIT BUTTON */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* ERRORS & SUCCESS */
.error {
  margin-top: 16px;
  padding: 12px 16px;
  color: #c53030;
  background: #fff5f5;
  border-left: 4px solid #fc8181;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

.message {
  margin-top: 16px;
  padding: 12px 16px;
  color: #2a9d8f;
  background: #e6f7f5;
  border-left: 4px solid #48bb78;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* POPUP ANIMATION */
@keyframes popupFade {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* RESPONSIVE - MOBILE */
@media (max-width: 480px) {
  .changing-password-overlay {
    padding: 12px;
    align-items: flex-start;
    padding-top: 60px;
  }

  .changing-password-content {
    padding: 24px 18px;
    border-radius: 12px;
    max-height: calc(100vh - 80px);
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 6px;
    padding-right: 35px;
  }

  p {
    font-size: 0.875rem;
    margin-bottom: 20px;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    font-size: 24px;
    top: 8px;
    right: 8px;
  }

  .form-group {
    margin-bottom: 14px;
  }

  label {
    font-size: 0.875rem;
    margin-bottom: 6px;
  }

  input {
    padding: 11px 12px;
    font-size: 16px;
  }

  .submit-btn {
    padding: 13px;
    font-size: 0.95rem;
  }

  .error,
  .message {
    padding: 10px 12px;
    font-size: 0.85rem;
    margin-top: 14px;
  }
}

/* RESPONSIVE - TRÈS PETITS ÉCRANS */
@media (max-width: 360px) {
  .changing-password-content {
    padding: 20px 14px;
  }

  h2 {
    font-size: 1.25rem;
  }

  .form-group {
    margin-bottom: 12px;
  }

  input {
    padding: 10px;
  }

  .submit-btn {
    padding: 12px;
  }
}

/* RESPONSIVE - PAYSAGE MOBILE */
@media (max-height: 600px) and (orientation: landscape) {
  .changing-password-overlay {
    align-items: flex-start;
    padding: 10px;
  }

  .changing-password-content {
    margin: 0 auto;
    padding: 18px;
    max-height: calc(100vh - 20px);
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.85rem;
    margin-bottom: 12px;
  }

  .form-group {
    margin-bottom: 10px;
  }

  input {
    padding: 9px 12px;
  }

  .submit-btn {
    padding: 10px;
    margin-top: 6px;
  }

  .error,
  .message {
    padding: 8px 10px;
    margin-top: 10px;
  }
}

/* SCROLLBAR CUSTOMIZATION */
.changing-password-content::-webkit-scrollbar {
  width: 6px;
}

.changing-password-content::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 10px;
}

.changing-password-content::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}

.changing-password-content::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>