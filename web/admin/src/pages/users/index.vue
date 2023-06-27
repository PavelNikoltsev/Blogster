<template>
  <Suspense>
    <TableView model="users" />
  </Suspense>
</template>

<script setup lang="ts">
import TableView from '@/components/custom/TableView.vue'
</script>
