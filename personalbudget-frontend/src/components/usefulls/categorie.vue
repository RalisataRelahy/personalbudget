<script setup>
const props = defineProps({
  title: { type: String, required: true },
  formattedAmount: { type: String, required: true },
  icon: { type: String, default: "📊" },
  color: { type: String, default: "#000" },

  amount: { type: Number, required: true },

  trend: {
    type: String,
    default: null,
    validator: (value) => [null, "up", "down"].includes(value)
  },

  subtitle: { type: String, default: "" },

  loading: { type: Boolean, default: false }
});


// Enhanced color system with more options
const colorClasses = {
  blue: 'card-blue',
  green: 'card-green',
  red: 'card-red',
  purple: 'card-purple',
  orange: 'card-orange',
  teal: 'card-teal',
  pink: 'card-pink',
  gray: 'card-gray'
};

// Dynamic text color based on background brightness
const getTextColorClass = (color) => {
  const darkColors = ['blue', 'purple', 'red', 'green'];
  return darkColors.includes(color) ? 'text-light' : 'text-dark';
};

// Trend icons
const trendIcons = {
  up: '📈',
  down: '📉'
};
</script>

<template>
  <div 
    :class="['card', colorClasses[color], getTextColorClass(color)]"
    role="region"
    :aria-label="`${title}: ${formattedAmount}`"
  >
    <!-- Loading State -->
    <div v-if="loading" class="card-loading">
      <div class="loading-spinner"></div>
      <p>Chargement...</p>
    </div>

    <!-- Content -->
    <div v-else class="card-content">
      <!-- Header with icon and trend -->
      <div class="card-header">
        <div class="card-icon">{{ icon }}</div>
        <div v-if="trend" class="trend-indicator" :class="`trend-${trend}`">
          {{ trendIcons[trend] }}
        </div>
      </div>

      <!-- Title -->
      <p class="card-title">{{ title }}</p>

      <!-- Amount -->
      <div class="amount" :class="{ 'amount-large': formattedAmount.length < 10 }">
        {{ formattedAmount }}
      </div>

      <!-- Subtitle (optional) -->
      <div v-if="subtitle" class="card-subtitle">
        {{ subtitle }}
      </div>

      <!-- Additional info for amounts -->
      <div v-if="amount !== undefined" class="amount-details">
        <small v-if="amount > 1000" class="amount-formatted">
          {{ (amount / 1000).toFixed(1) }}K
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 1.5rem;
  border-radius: 18px;
  color: white;
  text-align: center;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.card:hover::before {
  left: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Color Variants */
.card-blue {
  background: linear-gradient(135deg, #007BFF, #4ba3ff);
}

.card-green {
  background: linear-gradient(135deg, #28a745, #5cd85c);
}

.card-red {
  background: linear-gradient(135deg, #dc3545, #ff6b7a);
}

.card-purple {
  background: linear-gradient(135deg, #6f42c1, #9d7de8);
}

.card-orange {
  background: linear-gradient(135deg, #fd7e14, #ffa94d);
}

.card-teal {
  background: linear-gradient(135deg, #20c997, #63e6be);
}

.card-pink {
  background: linear-gradient(135deg, #e83e8c, #f783ac);
}

.card-gray {
  background: linear-gradient(135deg, #6c757d, #adb5bd);
}

/* Text Colors */
.text-light {
  color: white;
}

.text-dark {
  color: #212529;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Trend Indicator */
.trend-indicator {
  font-size: 1.2rem;
  animation: pulse 2s infinite;
}

.trend-up {
  color: #d4edda;
}

.trend-down {
  color: #f8d7da;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Title */
.card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Amount */
.amount {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  word-break: break-word;
}

.amount-large {
  font-size: 1.8rem;
}

/* Subtitle */
.card-subtitle {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-top: 0.25rem;
  font-style: italic;
}

/* Amount Details */
.amount-details {
  margin-top: 0.5rem;
}

.amount-formatted {
  opacity: 0.8;
  font-weight: 500;
}

/* Loading State */
.card-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .card {
    padding: 1.2rem;
    min-height: 140px;
  }

  .card-icon {
    font-size: 1.8rem;
  }

  .amount {
    font-size: 1.3rem;
  }

  .amount-large {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 1rem;
    min-height: 120px;
  }

  .card-header {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .trend-indicator {
    order: -1;
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  
  .card::before {
    display: none;
  }
  
  .trend-indicator {
    animation: none;
  }
  
  .loading-spinner {
    animation-duration: 2s;
  }
}
</style>