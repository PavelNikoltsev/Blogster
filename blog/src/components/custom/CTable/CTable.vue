<template>
  <table class="c-table-vue">
    <thead>
      <slot name="thead" />
    </thead>
    <tbody>
      <slot name="tbody" />
    </tbody>
  </table>
</template>
<style lang="postcss">
.c-table-vue {
  border-collapse: separate;
  th,
  td {
    border: 1px solid #000;
    padding: 10px;
  }
}
</style>
