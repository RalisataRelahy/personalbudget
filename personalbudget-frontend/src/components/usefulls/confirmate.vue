<!-- src/components/ConfirmModal.vue -->
<template>
  <div v-if="isOpen" class="confirmate">
    <div class="confirmate-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>

      <div class="confirmate-buttons">
        <button class="cancel-btn" @click="handleCancel">{{ cancelText }}</button>
        <button class="delete-btn" @click="handleDelete">{{ deleteText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, required: true }, // controls open/close
  title: { type: String, default: "Confirm Action" },
  message: { type: String, default: "Are you sure you want to continue?" },
  cancelText: { type: String, default: "Cancel" },
  deleteText: { type: String, default: "Delete" }
});

const emit = defineEmits(["update:modelValue", "cancel", "delete"]);

const isOpen = ref(props.modelValue);

// Sync when parent changes value
watch(
  () => props.modelValue,
  (val) => (isOpen.value = val)
);

const close = () => emit("update:modelValue", false);

const handleCancel = () => {
  emit("cancel");
  close();
};

const handleDelete = () => {
  emit("delete");
  close();
};
</script>

<style scoped>
.confirmate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmate-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 350px;
  text-align: center;
  animation: pop 0.2s ease-out;
}

@keyframes pop {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.confirmate-buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.cancel-btn {
  padding: 0.7rem 1.2rem;
  background: #eee;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
}

.delete-btn {
  padding: 0.7rem 1.2rem;
  background: #e74c3c;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
}
</style>
