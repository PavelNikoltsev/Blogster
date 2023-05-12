<template>
  <div class="profile-create-post">
    <h3>Create post:</h3>
    <CForm name="create-post" @submit.prevent="createPost">
      <label for="title">Title:</label>
      <input type="text" name="title" v-model="post.title" required />
      <label for="description">Description:</label>
      <textarea
        name="description"
        v-model="post.description"
        required
        rows="5"
      ></textarea>
      <label for="content">Content(HTML):</label>
      <textarea
        name="content"
        v-model="post.content"
        required
        rows="10"
      ></textarea>
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="post.slug" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="post.link" required />
      <label for="category">Category:</label>
      <select name="category" v-model="post.category">
        <option :value="c.id" v-for="c in store.categories" :key="c.id">
          {{ c.name }}
        </option>
      </select>
      <label for="tags">Tags IDs:</label>
      <div v-for="t in store.tags" :key="t.id">
        <input
          type="checkbox"
          :name="t.name"
          :value="t.id"
          v-model="postTags"
        />
        <label :for="t.name">{{ t.name }}</label>
      </div>
      <input type="submit" value="Create post" />
      {{ postTags }}
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import type { NewPost } from "../../../models/post";
import { store } from "../../../models/store";
const props = defineProps<{
  author: string;
}>();
const postTags = ref([]);
const post = reactive<NewPost>({
  title: "",
  description: "",
  author: props.author,
  content: "",
  slug: "",
  status: "draft",
  link: "",
  tags: "",
  category: null,
});

async function createPost() {
  post.link = `http://localhost:3000/${post.link}`;
  post.tags = `{${postTags.value.join(",")}}`;
  const res = await fetcher.post("/posts/create", post);
  if (res.status === 200) {
    alert("Post created");
    return;
  }
  if (res.status === 404) {
    alert("Post with provided title already exist");
    return;
  }
}
</script>
