<template>
  <div class="card shadow-sm border-0">
    <div class="card-body">
      <h4 class="mb-4">Selecciona tu entrada</h4>
      
      <div class="mb-3">
        <label class="form-label fw-bold">Zona</label>
        <select class="form-select" v-model="localSelectedTicket">
          <option value="" disabled>-- Elige una zona --</option>
          <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">
            {{ ticket.zone }} - {{ ticket.price }}€ (Disponibles: {{ ticket.remaining }})
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="form-label fw-bold">Cantidad</label>
        <input type="number" class="form-control" v-model="localQuantity" min="1" max="10" />
      </div>

      <button 
        class="btn btn-primary w-100 py-2 fw-bold" 
        :disabled="!localSelectedTicket"
        @click="handleReserve"
      >
        Reservar ahora
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  tickets: {
    type: Array,
    required: true
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
