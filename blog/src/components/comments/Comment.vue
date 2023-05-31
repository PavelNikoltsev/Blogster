<template>
  <div :class="{ reply: props.comment.reply }">
    <p>Author: {{ author?.name }}</p>
    <p v-if="props.comment.reply">Reply to {{ props.parentAuthor }}</p>
    <p>{{ props.comment.content }}</p>
    <p>Rating: {{ props.comment.rating }}</p>
    <button @click="modalOpen(`create-reply-${props.comment.id}`)">
      Reply
    </button>
    <button v-if="canDelete" @click="deleteComment">Delete</button>
    <Comment
      v-for="r in replies"
      :key="r.id"
      :comment="r"
      :parent-author="author?.name"
      :comments="props.comments"
    />
    <CModalWindow :id="'create-reply-' + props.comment.id">
      <CForm name="create-reply" @submit.prevent="sendReply">
        <h3>Reply:</h3>
        <textarea
          name="content"
          v-model="reply.content"
          required
          rows="5"
        ></textarea>
        <label for="rating">Rating:</label>
        <select name="rating" v-model="reply.rating">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
          <option :value="5">5</option>
        </select>
        <input type="submit" value="Send reply" />
      </CForm>
    </CModalWindow>
  </div>
</template>
<script setup lang="ts">
import type { Comment, NewComment } from "../../models/comment";
import { store } from "../../models/store";
import { modalOpen } from "../../utils";
import CModalWindow from "../../components/custom/CModalWindow/CModalWindow.vue";
import CForm from "../custom/CForm/CForm.vue";
import { reactive } from "vue";
import { fetcher } from "../../utils/fetcher";
import type { User } from "../../models/user";
const props = defineProps<{
  comment: Comment;
  comments: Comment[];
  parentAuthor?: string;
}>();
const replies = props.comments.filter(
  (c) => Number(c.parent) === props.comment.id
);
const author = store.users.find((u) => u.id === props.comment.author);
const reqBody = {
  token: localStorage.getItem("SessionToken"),
};
const res = await fetcher.post("/sessions/user", reqBody);
const user: User = res.user;
let canDelete = user.id === props.comment.author || user.role === "admin";
const reply: NewComment = reactive({
  author: user?.id,
  content: "",
  rating: null,
  parent: props.comment.id,
  post: props.comment.post,
  reply: true,
});

async function sendReply() {
  const replyData = {
    reply: reply,
    parent: props.comment,
  };
  const res = await fetcher.post(
    `/comments/${props.comment.id}/reply`,
    replyData
  );
  if (res.status === 200) {
    alert("Reply sent");
    return;
  } else {
    alert("Something went wrong");
    return;
  }
}
async function deleteComment() {
  const res = await fetcher.delete(`/comments/${props.comment.id}`);
  if (res.status === 200) {
    alert("Comment deleted");
    return;
  } else {
    alert("Something went wrong");
    return;
  }
}
</script>
<style lang="postcss">
.reply {
  margin-left: 10px;
}
</style>
