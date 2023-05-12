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
      <td>Comments</td>
      <td>Category</td>
      <td>Created</td>
      <td>Updated</td>
    </template>
    <template v-slot:tbody>
      <tr v-for="p in posts" :key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.title }}</td>
        <td>{{ p.author }}</td>
        <td>{{ p.slug }}</td>
        <td>{{ p.status }}</td>
        <td>
          <a :href="p.link">{{ p.link }}</a>
        </td>
        <td>{{ p.tags }}</td>
        <td>{{ p.comments }}</td>
        <td>{{ p.category }}</td>
        <td>{{ p.created }}</td>
        <td>{{ p.updated }}</td>
        <td><button @click="deletePost(p.id)">Delete</button></td>
        <td>
          <button
            @click="
              currentPost = p.id;
              getValsToUpdate(
                p.title,
                p.description,
                p.content,
                p.slug,
                p.status,
                p.link,
                p.tags,
                p.category
              );
              modalOpen('post-update-modal');
            "
          >
            Update
          </button>
        </td>
      </tr>
    </template>
  </CTable>
  <CModalWindow id="post-update-modal">
    <CForm name="post-update-form" @submit.prevent="update(currentPost)">
      <label for="title">Title:</label>
      <input type="text" name="title" v-model="updatePost.title" required />
      <label for="description">Description:</label>
      <textarea
        name="description"
        v-model="updatePost.description"
        required
        rows="5"
      ></textarea>
      <label for="content">Content(HTML):</label>
      <textarea
        name="content"
        v-model="updatePost.content"
        required
        rows="10"
      ></textarea>
      <label for="slug">Slug:</label>
      <input type="text" name="slug" v-model="updatePost.slug" required />
      <label for="link">Link:</label>
      <input type="text" name="link" v-model="updatePost.link" required />
      <label for="category">Category:</label>
      <select name="category" v-model="updatePost.category">
        <option :value="c.id" v-for="c in store.categories" :key="c.id">
          {{ c.name }}
        </option>
      </select>
      <label for="tags">Tags IDs:</label>
      <div v-for="t in store.tags" :key="t.id">
        <input
          type="checkbox"
          :name="t.name"
          :value="t.id"
          v-model="postTags"
        />
        <label :for="t.name">{{ t.name }}</label>
      </div>
      <input type="submit" value="Update post" />
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
import type { NewPost, Post } from "../../../models/post";
import { store } from "../../../models/store";
const props = defineProps<{
  author: string;
}>();
const posts = ref<Post[]>([]);
const postTags = ref([]);
onMounted(() => {
  get();
});
async function get() {
  posts.value = await fetcher.get("/posts");
}
const updatePost: NewPost = reactive({
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
  tags: string,
  category: number | null
) {
  updatePost.title = title;
  updatePost.description = description;
  updatePost.content = content;
  updatePost.slug = slug;
  updatePost.status = status;
  updatePost.link = link;
  updatePost.tags = tags;
  updatePost.category = category;
}
const currentPost = ref(0);
async function update(id: number) {
  updatePost.tags = `{${postTags.value.join(",")}}`;
  const res = await fetcher.put(`/posts/update/${id}`, updatePost);
  if (res.status === 200) {
    alert("post updated");
  }
  get();
}
async function deletePost(id: number) {
  const res = await fetcher.delete(`/posts/delete/${id}`);
  if (res.status === 200) {
    alert("post deleted");
  }
  get();
}
</script>
