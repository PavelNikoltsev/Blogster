<template>
  <div class="single-view">
    <div class="single-view-fields">
      <div v-for="(value, key) in itemData.rows[0]" :key="key">
        <p>{{ key }} :</p>
        <input
          type="text"
          v-model="itemEditable[key]"
          :disabled="
            String(key) === 'id' ||
            String(key) === 'created' ||
            String(key) === 'updated' ||
            isEditable === false
          "
        />
      </div>
    </div>
    <div class="single-view-controls">
      <button @click="edit">Edit</button>
      <button @click="update" :disabled="isEditable === false">Update</button>
      <button @click="deleteItem">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  item: {
    model: string
    id: number
  }
}>()
const url = `http://172.20.233.86:3001/${props.item.model}/${props.item.id}`
const itemRes = await fetch(url)
const itemData = await itemRes.json()

const itemEditable = ref(itemData.rows[0])
const isEditable = ref(false)
function edit() {
  isEditable.value = !isEditable.value
}

async function update() {
  const item = { ...itemEditable.value }
  for (const i in item) {
    if (i === 'id' || i === 'created' || i === 'updated') {
      delete item[i]
    }
  }
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
}

async function deleteItem() {
  await fetch(url, {
    method: 'DELETE'
  })
  // add routing
}
</script>

<style lang="postcss">
.single-view {
  &-fields {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--s-8);
    > div {
      display: flex;
      justify-content: space-between;

      > p {
        margin: 0;
      }
    }
  }
  &-controls {
    display: flex;
    justify-content: center;
    gap: var(--s-4);
    margin-top: var(--s-4);
  }
}
</style>
