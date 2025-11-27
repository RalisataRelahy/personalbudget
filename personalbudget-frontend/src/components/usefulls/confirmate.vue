<!-- src/components/ConfirmModal.vue -->
<template>
  <div v-if="isOpen" class="confirm-modal-overlay">
    <div class="confirm-modal-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>

      <slot name="input"></slot>

      <div class="confirm-modal-buttons">
        <button class="cancel-btn" @click="handleCancel">{{ cancelText }}</button>
        <button class="confirm-btn" @click="handleConfirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "Confirm Action" },
  message: { type: String, default: "Are you sure you want to continue?" },
  cancelText: { type: String, default: "Cancel" },
  confirmText: { type: String, default: "Confirm" },
  type: { type: String, default: "default" } // 'default', 'danger', 'warning', 'success'
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const isOpen = ref(props.modelValue);

// Empêcher le scroll du body quand le modal est ouvert
const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px'; // Compenser la barre de défilement
};

const enableBodyScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

// Gérer la touche Echap
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    handleCancel();
  }
};

// Sync when parent changes value
watch(
  () => props.modelValue,
  (val) => {
    isOpen.value = val;
    if (val) {
      disableBodyScroll();
      document.addEventListener('keydown', handleEscape);
    } else {
      enableBodyScroll();
      document.removeEventListener('keydown', handleEscape);
    }
  }
);

const close = () => {
  emit("update:modelValue", false);
  enableBodyScroll();
  document.removeEventListener('keydown', handleEscape);
};

const handleCancel = () => {
  emit("cancel");
  close();
};

const handleConfirm = () => {
  emit("confirm");
  close();
};

// Nettoyage quand le composant est démonté
onUnmounted(() => {
  enableBodyScroll();
  document.removeEventListener('keydown', handleEscape);
});
</script>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Z-index très élevé */
  backdrop-filter: blur(5px); /* Effet de flou sur l'arrière-plan */
  animation: fadeIn 0.2s ease-out;
}

.confirm-modal-content {
  background: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  text-align: center;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  animation: modalSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.confirm-modal-content h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.confirm-modal-content p {
  margin: 0 0 1.5rem 0;
  color: #64748b;
  line-height: 1.5;
  font-size: 1rem;
}

.confirm-modal-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.cancel-btn {
  padding: 0.875rem 1.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  flex: 1;
  font-weight: 600;
  color: #475569;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.cancel-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.confirm-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  flex: 1;
  font-weight: 600;
  color: white;
  transition: all 0.2s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.confirm-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Variantes de type */
.confirm-btn.danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.confirm-btn.danger:hover {
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

.confirm-btn.warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.confirm-btn.warning:hover {
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
}

.confirm-btn.success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.confirm-btn.success:hover {
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

/* Style pour le champ de mot de passe */
.password-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}

.password-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  from { 
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .confirm-modal-content {
    padding: 2rem 1.5rem;
    margin: 1rem;
    width: calc(100% - 2rem);
  }
  
  .confirm-modal-buttons {
    flex-direction: column;
  }
  
  .cancel-btn,
  .confirm-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .confirm-modal-content {
    padding: 1.5rem 1.25rem;
  }
  
  .confirm-modal-content h2 {
    font-size: 1.25rem;
  }
  
  .confirm-modal-content p {
    font-size: 0.9rem;
  }
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  .confirm-modal-overlay,
  .confirm-modal-content {
    animation: none;
  }
}

/* Focus visible pour l'accessibilité */
.cancel-btn:focus-visible,
.confirm-btn:focus-visible,
.password-input:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
</style>