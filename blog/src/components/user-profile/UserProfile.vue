<template>
  <h1>Hello, here is your profile {{ user.name }}</h1>
  <div>
    <div v-if="user?.role === 'client'">
      <p>Your role is a client. Here are your tools:</p>
    </div>
    <div v-else>
      <p>Your role is an admin. Here are your tools:</p>
      <!-- <UserProfileCreateCategory /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { User } from "../../models/User";
import UserProfileCreateCategory from "./UserProfileCreateCategory.vue";
const res = localStorage.getItem("CurrentUser") || "";
const user: User = JSON.parse(res);
</script>
