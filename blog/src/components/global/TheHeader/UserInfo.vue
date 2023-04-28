<template>
  <div v-if="user" class="user-info">
    <p>Hello, {{ user.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const res = localStorage.getItem("CurrentUser") || "";
const user = ref();
user.value = JSON.parse(res);
function logout() {
  localStorage.setItem("CurrentUser", "");
  user.value = "";
}
</script>
<style lang="postcss">
.user-info {
  display: flex;
  gap: 20px;
  > p {
    color: #fff;
  }
}
</style>
