<template>
  <CTable>
    <template v-slot:thead>
      <td>ID</td>
      <td>Title</td>
      <td>Author</td>
      <td>Slug</td>
      <td>Status</td>
      <td>Link</td>
      <td>Tags</td>
      <td>Created</td>
      <td>Updated</td>
    </template>
    <template v-slot:tbody>
      <tr v-for="p in pages" :key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.title }}</td>
        <td>{{ p.author }}</td>
        <td>{{ p.slug }}</td>
        <td>{{ p.status }}</td>
        <td>
          <a :href="p.link">{{ p.link }}</a>
        </td>
        <td>{{ p.tags }}</td>
        <td>{{ p.created }}</td>
        <td>{{ p.updated }}</td>
        <td><button @click="deletePage(p.id)">Delete</button></td>
        <td>
          <button
            @click="
              currentPage = p.id;
              getValsToUpdate(
                p.title,
                p.description,
                p.content,
                p.slug,
                p.status,
                p.link,
                p.tags
              );
              modalOpen('page-update-modal');
            "
          >
            Update
          </button>
        </td>
      </tr>
    </template>
  </CTable>
  <CModalWindow id="page-update-modal">
    <CForm name="page-update-form" @submit.prevent="update(currentPage)">
      <label for="title">Title:</label>
      <input type="text" name="title" v-model="updatePage.title" required />
      <label for="description">Description:</label>
      <textarea
        name="description"
        v-model="updatePage.description"
        required
        rows="5"
      ></textarea>
      <label for="content">Content(HTML):</label>
      <textarea
        name="content"
        v-model="updatePage.content"
        required
        rows="10"
      ></textarea>
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="updatePage.slug" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="updatePage.link" required />
      <label for="tags">Tags IDs:</label>
      <div v-for="t in store.tags" :key="t.id">
        <input
          type="checkbox"
          :name="t.name"
          :value="t.id"
          v-model="pageTags"
        />
        <label :for="t.name">{{ t.name }}</label>
      </div>
      <input type="submit" value="Update page" />
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
import type { NewPage, Page } from "../../../models/page";
import { store } from "../../../models/store";
const props = defineProps<{
  author: string;
}>();
const pages = ref<Page[]>([]);

const pageTags = ref([]);
onMounted(() => {
  get();
});
async function get() {
  pages.value = await fetcher.get("/pages");
}
const updatePage: NewPage = reactive({
  title: "",
  description: "",
  author: props.author,
  content: "",
  slug: "",
  status: "draft",
  link: "",
  tags: "",
  category: null,
});
function getValsToUpdate(
  title: string,
  description: string,
  content: string,
  slug: string,
  status: "draft" | "published",
  link: string,
  tags: string
) {
  updatePage.title = title;
  updatePage.description = description;
  updatePage.content = content;
  updatePage.slug = slug;
  updatePage.status = status;
  updatePage.link = link;
  updatePage.tags = tags;
}
const currentPage = ref(0);
async function update(id: number) {
  updatePage.tags = `{${pageTags.value.join(",")}}`;
  const res = await fetcher.put(`/pages/update/${id}`, updatePage);
  if (res.status === 200) {
    alert("Page updated");
  }
  get();
}
async function deletePage(id: number) {
  const res = await fetcher.delete(`/pages/delete/${id}`);
  if (res.status === 200) {
    alert("Page deleted");
  }
  get();
}
</script>
