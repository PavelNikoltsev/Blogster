<template>
  <h3>Categories</h3>
  <button @click="modalOpen('create-category-modal')">Create category</button>
  <button @click="modalOpen('categories-list')">Show categories</button>
  <CModalWindow id="create-category-modal">
    <UserProfileCreateCategory :user="props.user" />
  </CModalWindow>
  <CModalWindow id="categories-list">
    <UserProfileCategoriesList :user="props.user" />
  </CModalWindow>
</template>
<script lang="ts" setup>
const props = defineProps<{
  user: User;
}>();
import UserProfileCreateCategory from "./UserProfileCreateCategory.vue";
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCategoriesList from "./UserProfileCategoriesList.vue";
import type { User } from "../../../models/user";
</script>
