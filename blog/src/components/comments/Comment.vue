<template>
  <div>
    <p>{}</p>
  </div>
</template>
<script setup lang="ts">
import type { Comment } from "../../models/comment";
import { store } from "../../models/store";
const props = defineProps<{
  comment: Comment;
}>();
</script>
