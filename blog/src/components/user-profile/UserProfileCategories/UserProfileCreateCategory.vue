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
import type { NewCategory } from "../../../models/category";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import type { User } from "../../../models/user";
const props = defineProps<{
  user: User;
}>();
const category = reactive<NewCategory>({});

async function createCategory() {
  category.link = `http://localhost:3000/category/${category.link}/page/1`;
  const res = await fetcher.post("/categories", category, props.user.id);
  if (res.status === 200) {
    alert("Category created");
    return;
  }
  if (res.status === 404) {
    alert("Category with one of provided parameters already exist");
    return;
  }
}
</script>
