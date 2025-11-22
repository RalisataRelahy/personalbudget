<!-- src/components/InfoModal.vue -->
<template>
  <div v-if="isOpen" class="info-backdrop">
    <div class="info-box">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>

      <div class="info-btn-wrapper">
        <button class="ok-btn" @click="close">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true }, // contrôle ouverture
  title: { type: String, default: "Information" },
  message: { type: String, default: "Voici votre information." }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(props.modelValue);

// synchroniser ouverture / fermeture
watch(() => props.modelValue, (v) => (isOpen.value = v));

const close = () => {
  emit("update:modelValue", false);
};
</script>

<style scoped>
.info-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.info-box {
  width: 330px;
  background: #fff;
  padding: 1.8rem;
  border-radius: 14px;
  text-align: center;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

.info-btn-wrapper {
  margin-top: 1.5rem;
}

.ok-btn {
  padding: 0.7rem 1.5rem;
  background: #3498db;
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.ok-btn:hover {
  background: #2980b9;
}
</style>
