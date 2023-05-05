<template>
  <h3>Categories</h3>
  <button @click="modalOpen('create-category-modal')">Create category</button>
  <button @click="modalOpen('categories-list')">Show categories</button>
  <CModalWindow id="create-category-modal">
    <UserProfileCreateCategory />
  </CModalWindow>
  <CModalWindow id="categories-list">
    <UserProfileCategoriesList />
  </CModalWindow>
</template>
<script lang="ts" setup>
import UserProfileCreateCategory from "./UserProfileCreateCategory.vue";
import { modalOpen } from "../../../utils/index";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import UserProfileCategoriesList from "./UserProfileCategoriesList.vue";
</script>
