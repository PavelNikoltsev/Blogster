<template>
  <h3>Pages</h3>
  <button @click="modalOpen('create-page-modal')">Create page</button>
  <button @click="modalOpen('pages-list')">Show pages</button>
  <CModalWindow id="create-page-modal">
    <UserProfileCreatePage :user="props.user" />
  </CModalWindow>
  <CModalWindow id="pages-list">
    <UserProfilePagesList :user="props.user" />
  </CModalWindow>
</template>
<script lang="ts" setup>
import type { User } from "../../../models/user";
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCreatePage from "./UserProfileCreatePage.vue";
import UserProfilePagesList from "./UserProfilePagesList.vue";
const props = defineProps<{
  user: User;
}>();
</script>
