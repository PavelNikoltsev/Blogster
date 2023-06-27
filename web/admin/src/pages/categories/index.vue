<template>
  <Suspense>
    <TableView model="categories" />
  </Suspense>
</template>

<script setup lang="ts">
import TableView from '@/components/custom/TableView.vue'
</script>
