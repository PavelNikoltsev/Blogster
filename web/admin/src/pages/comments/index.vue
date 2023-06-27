<template>
  <Suspense>
    <TableView model="comments" />
  </Suspense>
</template>

<script setup lang="ts">
import TableView from '@/components/custom/TableView.vue'
</script>
