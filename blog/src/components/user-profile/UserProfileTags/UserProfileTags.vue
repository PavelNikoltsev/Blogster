<template>
  <h3>Tags</h3>
  <button @click="modalOpen('create-tag-modal')">Create tag</button>
  <button @click="modalOpen('tags-list')">Show tags</button>
  <CModalWindow id="create-tag-modal">
    <UserProfileCreateTag :user="props.user" />
  </CModalWindow>
  <CModalWindow id="tags-list">
    <UserProfileTagsList :user="props.user" />
  </CModalWindow>
</template>
<script lang="ts" setup>
const props = defineProps<{
  user: User;
}>();
import type { User } from "../../../models/user";
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCreateTag from "./UserProfileCreateTag.vue";
import UserProfileTagsList from "./UserProfileTagsList.vue";
</script>
