<template>
  <div class="profile-create-category">
    <form name="create-category" @submit.prevent="createCategory">
      <label for="cname">Category name:</label><br />
      <input type="text" name="cname" v-model="category?.name" /><br />
      <label for="link">Category link:</label><br />
      <input type="text" name="link" v-model="category?.link" />
      <label for="slug">Category slug:</label><br />
      <input type="text" name="slug" v-model="category?.slug" />
      <input type="submit" value="Create category" />
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { Category } from "../../models/Category";
import { categories } from "../../models/Category";
import { compareObjects } from "../../utils/index";
import { fetcher } from "../../utils/fetcher";
const category = ref<Category | null>(null);

async function createCategory() {
  const dbCategory = categories.find((c) => {
    if (compareObjects(c, category)) {
      return c;
    } else {
      return undefined;
    }
  });
  if (dbCategory) {
    alert("A category with one of the entered parameters already exists");
  } else {
    await fetcher.post("/categories", category);
    alert("The category was created successfully");
  }
}
</script>
