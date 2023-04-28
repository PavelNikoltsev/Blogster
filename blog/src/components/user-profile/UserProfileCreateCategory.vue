<template>
  <div class="profile-create-category">
    <h3>Create category:</h3>
    <CForm name="create-category" @submit.prevent="createCategory">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="category.name" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="category.link" required />
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="category.slug" required />
      <input type="submit" value="Create category" />
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import type { NewCategory } from "../../models/Category";
import { categories } from "../../models/Category";
import { fetcher } from "../../utils/fetcher";
import CForm from "../custom/CForm/CForm.vue";
const category = reactive<NewCategory>({});

async function createCategory() {
  const dbCategory = categories.find((c) => c.name === category.name);
  if (dbCategory) {
    alert("A category with that name already exists");
  } else {
    await fetcher.post("/categories", category);
    alert("The category was created successfully");
  }
}
</script>
