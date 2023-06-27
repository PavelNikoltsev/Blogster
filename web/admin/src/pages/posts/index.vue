<template>
  <Suspense>
    <TableView model="posts" />
  </Suspense>
</template>

<script setup lang="ts">
import TableView from '@/components/custom/TableView.vue'
</script>
