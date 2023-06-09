<template>
  <CTable>
    <template v-slot:thead>
      <td>ID</td>
      <td>Name</td>
      <td>Link</td>
      <td>Slug</td>
      <td>Created</td>
      <td>Updated</td>
    </template>
    <template v-slot:tbody>
      <tr v-for="c in categories" :key="c.id">
        <td>{{ c.id }}</td>
        <td>{{ c.name }}</td>
        <td>
          <a :href="c.link">{{ c.link }}</a>
        </td>
        <td>{{ c.slug }}</td>
        <td>{{ c.created }}</td>
        <td>{{ c.updated }}</td>
        <td><button @click="deleteCategory(c.id)">Delete</button></td>
        <td>
          <button
            @click="
              currentCategory = c.id;
              getValsToUpdate(c.name, c.link, c.slug);
              modalOpen('category-update-modal');
            "
          >
            Update
          </button>
        </td>
      </tr>
    </template>
  </CTable>
  <CModalWindow id="category-update-modal">
    <CForm
      name="category-update-form"
      @submit.prevent="update(currentCategory)"
    >
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="updateCategory.name" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="updateCategory.link" required />
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="updateCategory.slug" required />
      <input type="submit" value="Update category" />
    </CForm>
  </CModalWindow>
</template>
<script lang="ts" setup>
import type { Category, NewCategory } from "../../../models/category";
import { onMounted, reactive, ref } from "vue";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import CTable from "../../custom/CTable/CTable.vue";
import { modalOpen } from "../../../utils";
import type { User } from "../../../models/user";
const props = defineProps<{
  user: User;
}>();
const categories = ref<Category[]>([]);
onMounted(() => {
  get();
});
async function get() {
  categories.value = await fetcher.get("/categories");
}
function getValsToUpdate(name?: string, link?: string, slug?: string) {
  updateCategory.name = name;
  updateCategory.link = link;
  updateCategory.slug = slug;
}
const updateCategory: NewCategory = reactive({});
const currentCategory = ref(0);
async function update(id: number) {
  const res = await fetcher.put(
    `/categories/${id}`,
    updateCategory,
    props.user.id
  );
  if (res.status === 200) {
    alert("Category updated");
  }
  get();
}
async function deleteCategory(id: number) {
  const res = await fetcher.delete(`/categories/${id}`, props.user.id);
  if (res.status === 200) {
    alert("Category deleted");
  }
  get();
}
</script>
