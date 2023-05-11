<template>
  <CTable>
    <template v-slot:tbody>
      <tr>
        <td>ID</td>
        <td>{{ props.user.id }}</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.user.name }}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ props.user.email }}</td>
      </tr>
      <tr>
        <td>Password</td>
        <td>{{ props.user.password }}</td>
      </tr>
      <tr>
        <td>Role</td>
        <td>{{ props.user.role }}</td>
      </tr>
      <tr>
        <td>Posts</td>
        <td>{{ props.user.posts }}</td>
      </tr>
      <tr>
        <td>Comments</td>
        <td>{{ props.user.comments }}</td>
      </tr>
      <tr>
        <td>Created</td>
        <td>{{ props.user.created }}</td>
      </tr>
      <tr>
        <td>Updated</td>
        <td>{{ props.user.updated }}</td>
      </tr>
    </template>
  </CTable>
  <button
    @click="
      getValsToUpdate();
      modalOpen('users-update-modal');
    "
  >
    Update user
  </button>
  <CModalWindow id="users-update-modal">
    <CForm name="user-update-form" @submit.prevent="update()">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="updateUser.name" required />
      <label for="email">Email:</label>
      <input type="text" name="email" v-model="updateUser.email" required />
      <label for="password">Password:</label>
      <input
        type="text"
        name="password"
        v-model="updateUser.password"
        required
      />
      <input type="submit" value="Update user" />
    </CForm>
  </CModalWindow>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import type { User } from "../../models/user";
import { modalOpen } from "../../utils";
import { fetcher } from "../../utils/fetcher";
import CTable from "../custom/CTable/CTable.vue";
import CModalWindow from "../custom/CModalWindow/CModalWindow.vue";
import CForm from "../custom/CForm/CForm.vue";
const props = defineProps<{
  user: User;
}>();
const updateUser = reactive({
  name: "",
  email: "",
  password: "",
});
function getValsToUpdate() {
  updateUser.name = props.user.name;
  updateUser.email = props.user.email;
  updateUser.password = props.user.password;
}
async function update() {
  const res = await fetcher.put(`/users/update/${props.user.id}`, updateUser);
  if (res.status === 200) {
    alert("User updated");
  }
}
</script>
