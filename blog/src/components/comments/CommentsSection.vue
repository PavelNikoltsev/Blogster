<template>
  <section id="comments">
    <Suspense>
      <CommentsCreateComment :post="props.post" />
    </Suspense>
  </section>
</template>
<script setup lang="ts">
import type { Post } from "../../models/post";
import CommentsCreateComment from "./CommentsCreateComment.vue";
const props = defineProps<{
  post: Post;
}>();
</script>
