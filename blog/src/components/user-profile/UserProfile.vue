<template>
  <h1>Hello, here is your profile {{ user.name }}</h1>
  <div>
    <div v-if="user.role === 'client'">
      <p>Your role is a client. Here are your tools:</p>
    </div>
    <div v-else>
      <p>Your role is an admin. Here are your tools:</p>
      <UserProfileCategories />
      <UserProfileTags />
      <UserProfileUsers />
      <UserProfilePosts :author="user.name" />
      <UserProfilePages :author="user.name" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { User } from "../../models/user";
import UserProfileCategories from "./UserProfileCategories/UserProfileCategories.vue";

import { fetcher } from "../../utils/fetcher";
import UserProfileTags from "./UserProfileTags/UserProfileTags.vue";
import UserProfileUsers from "./UserProfileUsers/UserProfileUsers.vue";
import UserProfilePosts from "./UserProfilePosts/UserProfilePosts.vue";
import UserProfilePages from "./UserProfilePages/UserProfilePages.vue";
const reqBody = {
  token: localStorage.getItem("SessionToken"),
};
const res = await fetcher.post("/sessions/user", reqBody);
const user: User = res.user;
</script>
