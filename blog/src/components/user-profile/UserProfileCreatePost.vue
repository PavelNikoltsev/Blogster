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
      <label for="tags">Tags IDs:</label>
      <select name="tags" multiple>
        <option v-for="t in tags" :key="t.id" :value="t.id">
          #{{ t.id }} {{ t.name }}
        </option>
      </select>
      <!-- <input type="text" name="tags" v-model="tagsReq" required /> -->
      <!-- <label for="category">Category ID:</label> -->
      <!-- <input type="text" name="category" v-model="categoryReq" required /> -->
      <input type="submit" value="Create post" />
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { posts } from "../../models/Post";
import { categories } from "../../models/Category";
import { tags } from "../../models/Tag";
import { fetcher } from "../../utils/fetcher";
import CForm from "../custom/CForm/CForm.vue";
import type { NewPost } from "../../models/Post";
import type { User } from "../../models/User";
const props = defineProps<{
  user: User;
}>();
const tagsReq = ref("");
const categoryReq = ref("");
const post = ref<NewPost>({
  title: "",
  description: "",
  author: props.user.name,
  content: "",
  slug: "",
  status: "draft",
  link: "",
  tags: [],
  category: null,
});

async function createPost() {
  //   const dbPost = posts.find((p) => p.title === post.value.title);
  //   if (dbPost) {
  //     alert("A post with that title already exists");
  //     return;
  //   }
  //   const tags = tagsReq.value.split(",").map(Number);
  //   if (tags.some((t) => isNaN(t))) {
  //     alert("Tags can only have a numeric value");
  //     return;
  //   }
  //   const category = Number(categoryReq.value);
  //   if (isNaN(category)) {
  //     alert("Category can only have a single numeric value");
  //     return;
  //   }
  //   post.value.tags = tags;
  //   post.value.category = category;
  //   console.log(post.value);
}
</script>
