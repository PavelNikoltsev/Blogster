<template>
  <div class="profile-create-page">
    <h3>Create page:</h3>
    <CForm name="create-page" @submit.prevent="createPage">
      <label for="title">Title:</label>
      <input type="text" name="title" v-model="page.title" required />
      <label for="description">Description:</label>
      <textarea
        name="description"
        v-model="page.description"
        required
        rows="5"
      ></textarea>
      <label for="content">Content(HTML):</label>
      <textarea
        name="content"
        v-model="page.content"
        required
        rows="10"
      ></textarea>
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="page.slug" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="page.link" required />
      <label for="tags">Tags IDs:</label>
      <div v-for="t in store.tags" :key="t.id">
        <input
          type="checkbox"
          :name="t.name"
          :value="t.id"
          v-model="pageTags"
        />
        <label :for="t.name">{{ t.name }}</label>
      </div>
      <input type="submit" value="Create page" />
      {{ pageTags }}
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import type { NewPage } from "../../../models/page";
import { store } from "../../../models/store";
const props = defineProps<{
  author: string;
}>();
const pageTags = ref([]);
const page = reactive<NewPage>({
  title: "",
  description: "",
  author: props.author,
  content: "",
  slug: "",
  status: "draft",
  link: "",
  tags: "",
});

async function createPage() {
  page.link = `http://localhost:3000/page/${page.link}`;
  page.tags = `{${pageTags.value.join(",")}}`;
  const res = await fetcher.post("/pages/create", page);
  if (res.status === 200) {
    alert("page created");
    return;
  }
  if (res.status === 404) {
    alert("page with provided title already exist");
    return;
  }
}
</script>
