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
/* Simple Chat Container */
.simple-chat {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

/* Choice Buttons Section */
.choice {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.choice button {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 0.938rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.choice button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.choice button span,
.choice button::after {
  position: relative;
  z-index: 1;
}

.choice button:hover {
  color: white;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.choice button:hover::before {
  opacity: 1;
}

.choice button:active {
  transform: translateY(0);
}

/* Chat Input Section */
.chat-input {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.chat-input .input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
  background: #f7fafc;
  transition: all 0.3s ease;
  outline: none;
}

.chat-input .input:focus {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.chat-input .input::placeholder {
  color: #a0aec0;
}

.chat-input .btn {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  min-width: 100px;
}

.chat-input .btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
}

.chat-input .btn:active:not(:disabled) {
  transform: translateY(0);
}

.chat-input .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
}

/* Response Section */
.response {
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  animation: slideInUp 0.4s ease-out;
  position: relative;
  overflow: hidden;
}

.response::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
}

.response p {
  margin: 0;
  color: #2d3748;
  line-height: 1.7;
  font-size: 1rem;
}

.response strong {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-right: 0.75rem;
  letter-spacing: 0.5px;
}

/* Loading Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.chat-input .btn:disabled {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Slide In Animation */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Choice Button Entrance Animation */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.choice button {
  animation: fadeInScale 0.3s ease-out backwards;
}

.choice button:nth-child(1) { animation-delay: 0.05s; }
.choice button:nth-child(2) { animation-delay: 0.1s; }
.choice button:nth-child(3) { animation-delay: 0.15s; }
.choice button:nth-child(4) { animation-delay: 0.2s; }
.choice button:nth-child(5) { animation-delay: 0.25s; }

/* Tablet Styles */
@media (max-width: 1024px) {
  .simple-chat {
    gap: 1.25rem;
  }

  .choice {
    padding: 0.875rem;
    gap: 0.625rem;
  }

  .choice button {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }

  .chat-input .input {
    padding: 0.875rem 1.25rem;
    font-size: 0.938rem;
  }

  .chat-input .btn {
    padding: 0.875rem 2rem;
    font-size: 0.938rem;
  }

  .response {
    padding: 1.25rem;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .simple-chat {
    gap: 1rem;
  }

  .choice {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .choice button {
    padding: 0.625rem 1rem;
    font-size: 0.813rem;
    flex: 1 1 calc(50% - 0.25rem);
    min-width: 120px;
  }

  .chat-input {
    flex-direction: column;
    gap: 0.75rem;
  }

  .chat-input .input {
    width: 100%;
    padding: 1rem 1.25rem;
  }

  .chat-input .btn {
    width: 100%;
    padding: 1rem;
    min-width: unset;
  }

  .response {
    padding: 1rem;
  }

  .response p {
    font-size: 0.938rem;
  }

  .response strong {
    display: block;
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .choice button {
    flex: 1 1 100%;
    min-width: unset;
    padding: 0.75rem 1rem;
  }

  .chat-input .input {
    padding: 0.875rem 1rem;
    font-size: 0.938rem;
  }

  .chat-input .btn {
    padding: 0.875rem;
    font-size: 0.938rem;
  }

  .response {
    padding: 0.875rem;
    border-radius: 12px;
  }

  .response p {
    font-size: 0.875rem;
  }

  .response strong {
    font-size: 0.813rem;
    padding: 0.25rem 0.5rem;
  }
}

/* Focus Styles */
.chat-input .input:focus-visible,
.chat-input .btn:focus-visible,
.choice button:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Empty State */
.response:empty {
  display: none;
}

/* Typing Indicator (optional enhancement) */
.response.typing::after {
  content: '●●●';
  display: inline-block;
  animation: typing 1.4s infinite;
  letter-spacing: 2px;
  margin-left: 0.5rem;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .choice {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.2);
  }

  .choice button {
    background: #2d3748;
    color: #667eea;
    border-color: #667eea;
  }

  .choice button:hover {
    color: white;
  }

  .chat-input .input {
    background: #1a202c;
    border-color: #4a5568;
    color: #e2e8f0;
  }

  .chat-input .input:focus {
    background: #2d3748;
  }

  .response {
    background: #2d3748;
    border-left-color: #667eea;
  }

  .response p {
    color: #e2e8f0;
  }
}

/* Smooth Scrolling */
.simple-chat {
  scroll-behavior: smooth;
}

/* Button Ripple Effect (optional enhancement) */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.choice button:active::after,
.chat-input .btn:active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple 0.6s ease-out;
}
</style>