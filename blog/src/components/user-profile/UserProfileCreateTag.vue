<template>
  <div class="profile-create-tag">
    <h3>Create tag:</h3>
    <CForm name="create-tag" @submit.prevent="createTag">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="tag.name" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="tag.link" required />
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="tag.slug" required />
      <input type="submit" value="Create tag" />
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { tags } from "../../models/Tag";
import { fetcher } from "../../utils/fetcher";
import CForm from "../custom/CForm/CForm.vue";
import type { NewTag } from "../../models/Tag";
const tag = ref<NewTag>({
  name: "",
  link: "",
  slug: "",
});

async function createTag() {
  const dbTag = tags.find((t) => t.name === tag.value.name);
  if (dbTag) {
    alert("A tag with that name already exists");
  } else {
    await fetcher.post("/tags", tag.value);
    alert("The tag was created successfully");
  }
}
</script>
