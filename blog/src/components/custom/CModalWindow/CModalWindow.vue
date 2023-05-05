<template>
  <div class="modal-window" :id="props.id">
    <div class="modal-window-content">
      <span class="modal-window-content-close-btn" @click="modalClose(props.id)"
        >&times;</span
      >
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { modalClose } from "../../../utils";
const props = defineProps<{
  id: string;
}>();
</script>
<style lang="postcss">
.modal-window {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: none;

  &-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

    &-close-btn {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      &:hover,
      &:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
}
</style>
