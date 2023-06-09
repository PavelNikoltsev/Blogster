<template>
  <div class="profile-create-tag">
    <h3>Create category:</h3>
    <CForm name="create-category" @submit.prevent="createTag">
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
import { reactive } from "vue";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import type { NewTag } from "../../../models/tag";
import type { User } from "../../../models/user";
const props = defineProps<{
  user: User;
}>();
const tag = reactive<NewTag>({});

async function createTag() {
  const res = await fetcher.post("/tags", tag, props.user.id);
  if (res.status === 200) {
    alert("Tag created");
    return;
  }
  if (res.status === 404) {
    alert("Tag with one of provided parameters already exist");
    return;
  }
}
</script>
