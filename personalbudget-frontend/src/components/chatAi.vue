<script setup>
import { ref } from 'vue';
import { sendMessage } from '../services/geminiservice.js';

const userInput = ref('');
const response = ref('');
const isLoading = ref(false);
const prompt=[
    ""
]
const formatResponse = (text) => {
  // Convert **bold** to <strong>bold</strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>italic</em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert line breaks to <br>
  formatted = formatted.replace(/\n/g, '<br>');
  
  // Convert numbered lists
  formatted = formatted.replace(/(\d+\.\s)/g, '<br>$1');
  
  return formatted;
};
const handleSend = async () => {
  if (!userInput.value.trim()) return;
  
  isLoading.value = true;
  response.value = '';
  
  try {
    const aiResponse = await sendMessage(userInput.value);
    response.value = formatResponse(aiResponse);
  } catch (error) {
    response.value = "Error: Could not get response";
  } finally {
    isLoading.value = false;
    userInput.value = '';
  }
};
const choix = ref([
  "Summarize my spending last month.",
  "What's my biggest expense category?",
  "Help me create a budget for groceries.",
  "How much did I spend on entertainment in Q1?",
  "Suggest ways to save money on utilities."
]);
</script>

<template>
  <div class="simple-chat">
    <div class="choice">
        <button v-for="c in choix" :key="c" @click="userInput = c; handleSend()">{{ c }}</button>
    </div>
    <div class="chat-input">
      <input 
        v-model="userInput"
        placeholder="Type your message..."
        @keyup.enter="handleSend"
        class="input"
      >
      <button @click="handleSend" :disabled="isLoading" class="btn">
        {{ isLoading ? '...' : 'Send' }}
      </button>
    </div>

    <div v-if="response" class="response">
      <p><strong>AI:</strong> {{ response }}</p>
    </div>
  </div>
</template>

<style scoped>
.simple-chat {
  background-color: var(--card-bg);
  border-bottom: 2px solid var(--border-color);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(233, 233, 233, 0.1);
  margin: 1rem 0;
}
.choice {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1.5rem auto;
  max-width: 600px;
  padding: 0 1rem;
}

.choice button {
  padding: 0.9rem 1rem;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* Hover effect */
.choice button:hover {
  background: #005fcc;
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
}

/* Active click effect */
.choice button:active {
  transform: scale(0.96);
}

/* Responsive small screens */
@media (max-width: 450px) {
  .choice {
    grid-template-columns: 1fr;
  }
  .choice button {
    width: 100%;
    font-size: 0.95rem;
  }
}

.simple-chat h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.response {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #007BFF;
}
</style>