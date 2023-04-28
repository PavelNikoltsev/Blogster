<template>
  <h1>Hello, here is your profile {{ user.name }}</h1>
  <div>
    <div v-if="user?.role === 'client'">
      <p>Your role is a client. Here are your tools:</p>
    </div>
    <div v-else>
      <p>Your role is an admin. Here are your tools:</p>
      <button @click="modalOpen('create-category-modal')">
        Create category
      </button>
      <CModalWindow id="create-category-modal">
        <UserProfileCreateCategory />
      </CModalWindow>
      <button @click="modalOpen('create-tag-modal')">Create tag</button>
      <CModalWindow id="create-tag-modal">
        <UserProfileCreateTag />
      </CModalWindow>
      <button @click="modalOpen('create-user-modal')">Create user</button>
      <CModalWindow id="create-user-modal">
        <UserProfileCreateUser />
      </CModalWindow>
      <!-- <button @click="modalOpen('create-post-modal')">Create post</button>
      <CModalWindow id="create-post-modal">
        <UserProfileCreatePost :user="user" />
      </CModalWindow> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { User } from "../../models/User";
import UserProfileCreateCategory from "./UserProfileCreateCategory.vue";
import UserProfileCreateTag from "./UserProfileCreateTag.vue";
import CModalWindow from "../custom/CModalWindow/CModalWindow.vue";
import { modalOpen } from "../../utils";
import UserProfileCreateUser from "./UserProfileCreateUser.vue";
import UserProfileCreatePost from "./UserProfileCreatePost.vue";
const res = localStorage.getItem("CurrentUser") || "";
const user: User = JSON.parse(res);
</script>
