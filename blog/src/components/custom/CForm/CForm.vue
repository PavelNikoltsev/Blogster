<template>
  <div class="custom-form">
    <form :name="props.name" :id="id" @submit.prevent="event">
      <slot />
    </form>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  name: string;
  id?: string;
  event?: () => void;
}>();
</script>
<style lang="postcss">
.custom-form {
  max-width: 600px;
  margin: 30px auto;
  > form {
    display: grid;
    gap: 20px;
    > textarea {
      resize: none;
    }
  }
}
</style>
