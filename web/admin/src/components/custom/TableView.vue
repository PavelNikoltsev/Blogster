<template>
  <div class="table-view">
    <div class="table-view-actions">
      <input type="text" v-model="searchQuery" placeholder="Search..." />
    </div>
    <Table>
      <template v-slot:thead>
        <tr>
          <th v-for="(value, key) in displayedItems[0]" :key="key" @click="getSorted(key)">
            {{ key }}
            <i
              v-if="currentSortDir === 'asc' && currentSort === String(key)"
              class="fa-solid fa-arrow-down"
            ></i>
            <i v-else class="fa-solid fa-arrow-up"></i>
          </th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="(m, index) in displayedItems" :key="index">
          <td v-for="(value, key) in m" :key="key">{{ value }}</td>
        </tr>
      </template>
    </Table>
    <div class="table-view-pagination">
      <p>Items per page:</p>
      <select v-model="perPage">
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Table from './Table.vue'
import { fetcher } from '@/utils/fetcher'
const props = defineProps<{
  model: 'categories' | 'pages' | 'posts' | 'tags' | 'users' | 'comments' | 'logs'
}>()

const model = await fetcher.get(`/${props.model}`)
const searchQuery = ref('')
const filteredItems = ref(model)
watch(searchQuery, (s) => {
  s === ''
    ? (filteredItems.value = model)
    : (filteredItems.value = model.filter(
        (md: any) => Object.values(md).join('').indexOf(s) !== -1
      ))
})

const currentPage = ref(1)
const perPage = ref(5)
const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value
  const endIndex = startIndex + perPage.value
  return filteredItems.value.slice(startIndex, endIndex)
})
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / perPage.value)
})
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const currentSort = ref('')
const currentSortDir = ref('asc')
function getSorted(s: any) {
  if (s === currentSort.value) {
    currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc'
  }
  currentSort.value = s
  filteredItems.value = filteredItems.value.sort((a: any, b: any) => {
    let modifier = 1
    if (currentSortDir.value === 'desc') modifier = -1
    if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier
    if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier
    return 0
  })
}
</script>

<style lang="scss">
.table-view {
  .c-table {
    th {
      white-space: nowrap;
    }
  }
  &-pagination {
    * {
      margin: 0;
    }
    display: flex;
    gap: var(--s-2);
    align-items: center;
  }
}
</style>
