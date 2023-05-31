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
      <tr v-for="t in tags" :key="t.id">
        <td>{{ t.id }}</td>
        <td>{{ t.name }}</td>
        <td>{{ t.link }}</td>
        <td>{{ t.slug }}</td>
        <td>{{ t.created }}</td>
        <td>{{ t.updated }}</td>
        <td><button @click="deleteTag(t.id)">Delete</button></td>
        <td>
          <button
            @click="
              currentTag = t.id;
              getValsToUpdate(t.name, t.link, t.slug);
              modalOpen('tag-update-modal');
            "
          >
            Update
          </button>
        </td>
      </tr>
    </template>
  </CTable>
  <CModalWindow id="tag-update-modal">
    <CForm name="tag-update-form" @submit.prevent="update(currentTag)">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="updateTag.name" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="updateTag.link" required />
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="updateTag.slug" required />
      <input type="submit" value="Update tag" />
    </CForm>
  </CModalWindow>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import CModalWindow from "../../custom/CModalWindow/CModalWindow.vue";
import CTable from "../../custom/CTable/CTable.vue";
import { modalOpen } from "../../../utils";
import type { NewTag, Tag } from "../../../models/tag";
const tags = ref<Tag[]>([]);
onMounted(() => {
  get();
});
async function get() {
  tags.value = await fetcher.get("/tags");
}
const updateTag: NewTag = reactive({
  name: "123",
  link: "123",
  slug: "123",
});
function getValsToUpdate(name?: string, link?: string, slug?: string) {
  updateTag.name = name;
  updateTag.link = link;
  updateTag.slug = slug;
}
const currentTag = ref(0);
async function update(id: number) {
  const res = await fetcher.put(`/tags/${id}`, updateTag);
  if (res.status === 200) {
    alert("Tag updated");
  }
  get();
}
async function deleteTag(id: number) {
  const res = await fetcher.delete(`/tags/${id}`);
  if (res.status === 200) {
    alert("Tag deleted");
  }
  get();
}
</script>
