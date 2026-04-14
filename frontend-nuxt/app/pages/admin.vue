<template>
  <AdminPanel />
</template>

<script setup>
import AdminPanel from '~/components/AdminPanel.vue';

definePageMeta({
  middleware: 'auth'
});
</script>
