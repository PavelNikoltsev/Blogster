<template>
  <CForm name="create-comment" @submit.prevent="createComment">
    <h3>Leave a comment:</h3>
    <textarea
      name="content"
      v-model="comment.content"
      required
      rows="5"
    ></textarea>
    <label for="rating">Rating:</label>
    <select name="rating" v-model="comment.rating">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
      <option :value="4">4</option>
      <option :value="5">5</option>
    </select>
    <input type="submit" value="Post comment" />
  </CForm>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import type { NewComment } from "../../models/comment";
import type { Post } from "../../models/post";
import CForm from "../custom/CForm/CForm.vue";
import { fetcher } from "../../utils/fetcher";
import type { User } from "../../models/user";

const props = defineProps<{
  post: Post;
}>();
const reqBody = {
  token: localStorage.getItem("SessionToken"),
};

const res = await fetcher.post("/sessions/user", reqBody);
const user: User = res.user;
const comment: NewComment = reactive({
  author: user.id,
  content: "",
  rating: null,
  parent: null,
  post: props.post.id,
  reply: undefined,
});
async function createComment() {
  const res = await fetcher.post("/comments", comment);
  if (res.status === 200) {
    alert("Comment created");
    return;
  } else {
    alert("Something went wrong");
    return;
  }
}
</script>
