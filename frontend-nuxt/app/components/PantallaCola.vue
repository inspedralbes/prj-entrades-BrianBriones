<template>
  <div class="queue-screen d-flex flex-column min-vh-100 position-relative text-center align-items-center justify-content-between p-4">
    <!-- Background Gradient Effect (simulating the stadium depth) -->
    <div class="queue-bg position-absolute w-100 h-100 top-0 start-0 z-0"></div>

    <!-- Header -->
    <header class="queue-header position-relative z-1 w-100 pt-3">
      <h1 class="brand-text text-neon fw-bold mb-0">The Nocturnal Pitch</h1>
    </header>

    <!-- Main Content -->
    <main class="queue-main position-relative z-1 d-flex flex-column align-items-center justify-content-center flex-grow-1 w-100" style="max-width: 600px;">
      
      <!-- Loader Indicator -->
      <div class="queue-loader-container mb-5 position-relative d-flex justify-content-center align-items-center">
        <!-- SVG Ring -->
        <svg class="queue-spinner" width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" class="spinner-track" fill="none" stroke-width="3"></circle>
          <circle cx="80" cy="80" r="70" class="spinner-path" fill="none" stroke-width="4" stroke-linecap="round"></circle>
        </svg>
        
        <!-- Stadium/Ticket Icon Inside Loader -->
        <div class="position-absolute d-flex justify-content-center align-items-center text-neon">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12h20c0-5.52-4.48-10-10-10zm-5 7h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z" opacity="0.8"/>
            <path d="M2.5 13C3.33 13 4 13.67 4 14.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5c0-.83.67-1.5 1.5-1.5h.5v-1H2v1h.5zM9 14h6v2H9v-2z"/>
          </svg>
        </div>
      </div>

      <!-- Text Content -->
      <h2 class="fw-bold mb-3 subtitle-text text-white">Estàs en cua</h2>
      <p class="text-muted-custom mb-5" style="font-size: 1.1rem; max-width: 420px; line-height: 1.6;">
        Hem rebut la teva sol·licitud. Si us plau, mantén aquesta finestra oberta per no perdre el teu lloc.
      </p>

      <!-- Stats Cards -->
      <div class="row g-3 w-100 justify-content-center mb-5">
        <div class="col-6 col-sm-5">
          <div class="card card-dark h-100 text-center py-4 px-3 border-0 rounded-3 shadow-sm queue-card">
            <span class="text-neon fw-bold d-block mb-2 queue-card-label">POSICIÓ</span>
            <span class="fw-bold text-white d-block queue-card-value">{{ posicio }}</span>
          </div>
        </div>
        <div class="col-6 col-sm-5">
          <div class="card card-dark h-100 text-center py-4 px-3 border-0 rounded-3 shadow-sm queue-card">
            <span class="text-neon fw-bold d-block mb-2 queue-card-label">TEMPS ESTIMAT</span>
            <span class="fw-bold text-white d-block queue-card-value time-font">{{ tempsEstimat }}</span>
          </div>
        </div>
      </div>

      <!-- Instruction Badge -->
      <div class="badge rounded-pill bg-dark py-2 px-4 shadow d-flex align-items-center gap-2 info-badge position-relative z-1">
        <span class="info-icon d-flex align-items-center justify-content-center bg-neon text-dark rounded-circle flex-shrink-0 fw-bold">i</span>
        <span class="fw-normal text-white">Si us plau, no tanquis aquesta finestra</span>
      </div>
    </main>

    <!-- Footer -->
    <footer class="queue-footer position-relative z-1 w-100 d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 pb-2 px-md-5 text-muted-custom">
      <div class="mb-3 mb-md-0 d-none d-md-block">
        <span class="text-neon fw-bold text-decoration-none d-flex align-items-center brand-footer-text">The Nocturnal Pitch</span>
      </div>
      <div class="d-flex gap-4 mb-3 mb-md-0">
        <a href="#" class="text-muted-custom text-decoration-none hover-neon transition-all">Suport</a>
        <a href="#" class="text-muted-custom text-decoration-none hover-neon transition-all">Privacitat</a>
      </div>
      <div class="footer-copy">
        &copy; 2024 The Nocturnal Pitch. Tots els drets reservats.
      </div>
    </footer>
  </div>
</template>

<script setup>
// Props para poder hacer el componente dinámico en un futuro
defineProps({
  posicio: {
    type: [Number, String],
    default: 3
  },
  tempsEstimat: {
    type: String,
    default: "< 1 minut"
  }
});
</script>

<style scoped>
.queue-screen {
  background-color: var(--bg-color);
  font-family: var(--font-family);
  overflow-x: hidden;
}

.queue-bg {
  /* Creates a subtle vignette/depth effect */
  background: 
    radial-gradient(ellipse at 50% 120%, rgba(255, 255, 255, 0.05) 0%, transparent 60%),
    radial-gradient(circle at 50% -20%, rgba(44, 235, 112, 0.02) 0%, transparent 60%),
    var(--bg-color);
  pointer-events: none;
}

.brand-text {
  font-size: 1.4rem;
  letter-spacing: -0.5px;
}

.subtitle-text {
  font-size: 3.2rem; 
  letter-spacing: -1.5px;
}

/* Base Cards */
.queue-card {
  background-color: var(--card-bg-light) !important;
  /* subtle inner light */
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}

.queue-card-label {
  font-size: 0.75rem; 
  letter-spacing: 2px;
  color: var(--primary-neon); /* Assuming this is using the standard color */
}

.queue-card-value {
  font-size: 3rem; 
  line-height: 1;
}

.time-font {
  font-size: 1.7rem; /* Make the time text slightly smaller than the position number */
  padding-top: 0.6rem;
  padding-bottom: 0.3rem; 
}

/* Info badge */
.info-badge {
  background-color: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
}

.info-icon {
  width: 18px; 
  height: 18px; 
  font-size: 0.75rem; 
}

/* Footer details */
.queue-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.brand-footer-text {
  font-size: 1.1rem;
  letter-spacing: -0.5px;
}

.footer-copy {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Spinner Animation */
.queue-spinner {
  transform: rotate(-90deg);
  /* The rotation animation has been dropped for a smoother visual exactly like the design which looks static or slowly turning */
}

.spinner-track {
  stroke: rgba(255, 255, 255, 0.08);
}

.spinner-path {
  stroke: var(--primary-neon);
  stroke-dasharray: 440; 
  /* roughly 1/3 of the circle length (440 / 3 roughly 146) */
  stroke-dashoffset: 290; 
  animation: none; /* remove dash animation if we want it to look static like the image, or add slight rotation */
}

/* Custom utilities */
.hover-neon:hover {
  color: var(--primary-neon) !important;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Optional soft pulse effect for the icon */
.queue-loader-container svg:not(.queue-spinner) {
  animation: pulse 2.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}
</style>
