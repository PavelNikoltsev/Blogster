<template>
  <section id="comments">
    <Suspense>
      <CommentsCreateComment :post="props.post" />
    </Suspense>
    <h3>Comments:</h3>
    <Suspense>
      <Comment
        v-for="c in commentsWithoutReply"
        :key="c.id"
        :comment="c"
        :comments="comments"
      />
    </Suspense>
  </section>
</template>
<script setup lang="ts">
import Comment from "./Comment.vue";
import type { Post } from "../../models/post";
import { store } from "../../models/store";
import CommentsCreateComment from "./CommentsCreateComment.vue";
const props = defineProps<{
  post: Post;
}>();
const commentsWithoutReply = store.comments.filter(
  (c) => c.post === props.post.id && !c.reply
);
const comments = store.comments.filter((c) => c.post === props.post.id);
</script>
