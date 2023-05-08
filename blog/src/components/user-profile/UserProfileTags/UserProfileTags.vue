<template>
  <h3>Tags</h3>
  <button @click="modalOpen('create-tag-modal')">Create tag</button>
  <button @click="modalOpen('tags-list')">Show tags</button>
  <CModalWindow id="create-tag-modal">
    <UserProfileCreateTag />
  </CModalWindow>
  <CModalWindow id="tags-list">
    <UserProfileTagsList />
  </CModalWindow>
</template>
<script lang="ts" setup>
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCreateTag from "./UserProfileCreateTag.vue";
import UserProfileTagsList from "./UserProfileTagsList.vue";
</script>
