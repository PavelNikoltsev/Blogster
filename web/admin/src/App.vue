<template>
  <body>
    <TheHeader />
    <main>
      <div class="wrap">
        <RouterView />
      </div>
    </main>
    <TheFooter />
  </body>
</template>
<script setup lang="ts">
import TheHeader from './components/global/TheHeader/TheHeader.vue'
import TheFooter from './components/global/TheFooter/TheFooter.vue'
</script>
<style lang="postcss">
@import '@/styles/main.postcss';
</style>
