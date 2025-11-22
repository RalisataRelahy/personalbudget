<template>
    <header class="header-section">
        <div class="header-content">
            <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
            </div>
            <h1>Personal Budget</h1>
        </div>
        <div class="header-gradient"></div>
    </header>
</template>

<style scoped>
.header-section {
    position: relative;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* For Safari support */
    color: #fff;
    padding: 1rem 1rem;
    text-align: center;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.header-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    backdrop-filter: blur(10px);
    animation: pulse 2s ease-in-out infinite;
}

.icon-wrapper svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.header-section h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .header-section {
        padding: 1.5rem 1rem;
    }
    
    .header-section h1 {
        font-size: 2rem;
    }
    
    .icon-wrapper {
        width: 50px;
        height: 50px;
    }
    
    .icon-wrapper svg {
        width: 30px;
        height: 30px;
    }
}

@media (max-width: 480px) {
    .header-content {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .header-section h1 {
        font-size: 1.75rem;
    }
}</style>