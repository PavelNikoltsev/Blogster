<template>
  <div v-if="user" class="user-info">
    <p>Hello, {{ user.name }}</p>
    <a href="/profile">Go to profile</a>
    <button @click="logout">Logout</button>
  </div>
</template>
<script lang="ts" setup>
import type { User } from "../../../models/user";
import { fetcher } from "../../../utils/fetcher";

const reqBody = {
  token: localStorage.getItem("SessionToken"),
};
const res = await fetcher.post("/sessions/user", reqBody);
const user: User = res.user;
console.log(user);
function logout() {
  localStorage.setItem("SessionToken", "");
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
