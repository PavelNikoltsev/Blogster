<template>
  <div v-if="user" class="user-info">
    <p>Hello, {{ user.name }}</p>
    <a href="/profile">Go to profile</a>
    <button @click="logout">Logout</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const res = localStorage.getItem("CurrentUser") || "";
const user = ref();
if (res) {
  user.value = JSON.parse(res);
}
function logout() {
  localStorage.setItem("CurrentUser", "");
  user.value = "";
  window.location.href = "/";
}
</script>
<style lang="postcss">
.user-info {
  display: flex;
  gap: 20px;
  align-items: center;
  > p,
  > a {
    color: #fff;
  }
}
</style>
