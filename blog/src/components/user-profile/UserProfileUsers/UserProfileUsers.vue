<template>
  <h3>Users</h3>
  <button @click="modalOpen('create-user-modal')">Create user</button>
  <button @click="modalOpen('users-list')">Show users</button>
  <CModalWindow id="create-user-modal">
    <UserProfileCreateUser :user="props.user" />
  </CModalWindow>
  <CModalWindow id="users-list">
    <UserProfileUsersList :user="props.user" />
  </CModalWindow>
</template>
<script lang="ts" setup>
const props = defineProps<{
  user: User;
}>();
import type { User } from "../../../models/user";
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCreateUser from "./UserProfileCreateUser.vue";
import UserProfileUsersList from "./UserProfileUsersList.vue";
</script>
