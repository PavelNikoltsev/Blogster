<template>
  <h3>Posts</h3>
  <button @click="modalOpen('create-post-modal')">Create post</button>
  <button @click="modalOpen('posts-list')">Show posts</button>
  <CModalWindow id="create-post-modal">
    <UserProfileCreatePost :user="props.user" />
  </CModalWindow>
  <CModalWindow id="posts-list">
    <UserProfilePostsList :user="props.user" />
  </CModalWindow>
</template>
<script lang="ts" setup>
import type { User } from "../../../models/user";
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCreatePost from "./UserProfileCreatePost.vue";
import UserProfilePostsList from "./UserProfilePostsList.vue";
const props = defineProps<{
  user: User;
}>();
</script>
