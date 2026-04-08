<template>
  <div class="card shadow-sm border-0">
    <div class="card-body">
      <h4 class="mb-4">Selecciona tu entrada</h4>
      
      <div class="mb-3">
        <label class="form-label fw-bold">Zona</label>
        <select class="form-select" v-model="localSelectedTicket" :disabled="loading">
          <option value="" disabled>-- Elige una zona --</option>
          <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">
            <!-- fallback to remaining if available is not present yet -->
            {{ ticket.zone }} - {{ ticket.price }}€ (Disponibles: {{ ticket.available ?? ticket.remaining }})
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label fw-bold">Cantidad</label>
        <input type="number" class="form-control" v-model="localQuantity" min="1" max="10" :disabled="loading" />
      </div>

      <button 
        class="btn btn-primary w-100 py-2 fw-bold" 
        :disabled="!localSelectedTicket || loading"
        @click="handleReserve"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ loading ? "Reservando..." : "Reservar" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['reserve']);

const localSelectedTicket = ref('');
const localQuantity = ref(1);

const handleReserve = () => {
  emit('reserve', {
    ticket_type_id: localSelectedTicket.value,
    quantity: localQuantity.value
  });
};
</script>
