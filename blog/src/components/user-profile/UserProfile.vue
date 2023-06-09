<template>
  <section id="user-profile" class="wrap">
    <h1>Hello, here is your profile {{ user.name }}</h1>
    <div>
      <div v-if="user.role === 'client'">
        <p>Your role is a client.</p>
        <UserProfileUser :user="user" />
      </div>
      <div v-else>
        <p>Your role is an admin.</p>
        <UserProfileUser :user="user" />
        <UserProfileCategories :user="user" />
        <UserProfileTags :user="user" />
        <UserProfileUsers :user="user" />
        <UserProfilePosts :user="user" />
        <UserProfilePages :user="user" />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import type { User } from "../../models/user";
import UserProfileCategories from "./UserProfileCategories/UserProfileCategories.vue";

import { fetcher } from "../../utils/fetcher";
import UserProfileTags from "./UserProfileTags/UserProfileTags.vue";
import UserProfileUsers from "./UserProfileUsers/UserProfileUsers.vue";
import UserProfilePosts from "./UserProfilePosts/UserProfilePosts.vue";
import UserProfilePages from "./UserProfilePages/UserProfilePages.vue";
import UserProfileUser from "./UserProfileUser.vue";
const reqBody = {
  token: localStorage.getItem("SessionToken"),
};
const res = await fetcher.post("/sessions/user", reqBody);
const user: User = res.user;
</script>
