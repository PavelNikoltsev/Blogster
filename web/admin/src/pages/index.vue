<template>
  <Suspense>
    <SingleView :item="{ model: 'users', id: 1 }" />
  </Suspense>
</template>
<script setup lang="ts">
import SingleView from '@/components/custom/SingleView.vue'
</script>
