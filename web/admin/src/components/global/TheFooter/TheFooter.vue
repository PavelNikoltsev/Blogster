<template>
  <footer class="footer">
    <div class="wrap">
      <p>&copy; Pavel Nikoltsev,{{ new Date().getFullYear() }}</p>
      <p>Version:0.1.0</p>
    </div>
  </footer>
</template>
<style lang="postcss">
.footer {
  text-align: center;
  background-color: var(--c-bg-secondary);
  width: 100%;
  .wrap {
    display: flex;
    justify-content: space-between;
    padding-top: var(--s-4);
    padding-bottom: var(--s-4);
  }
}
</style>
