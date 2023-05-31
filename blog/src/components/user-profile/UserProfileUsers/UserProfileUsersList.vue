<template>
  <CTable>
    <template v-slot:thead>
      <td>ID</td>
      <td>Name</td>
      <td>Email</td>
      <td>Password</td>
      <td>Role</td>
      <td>Created</td>
      <td>Updated</td>
    </template>
    <template v-slot:tbody>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.id }}</td>
        <td>{{ u.name }}</td>
        <td>{{ u.email }}</td>
        <td>{{ u.password }}</td>
        <td>{{ u.role }}</td>
        <td>{{ u.created }}</td>
        <td>{{ u.updated }}</td>
        <td><button @click="deleteUser(u.id)">Delete</button></td>
        <td>
          <button
            @click="
              currentUser = u.id;
              getValsToUpdate(u.name, u.email, u.password, u.role);
              modalOpen('users-update-modal');
            "
          >
            Update
          </button>
        </td>
      </tr>
    </template>
  </CTable>
  <CModalWindow id="users-update-modal">
    <CForm name="user-update-form" @submit.prevent="update(currentUser)">
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
      <label for="role">Role:</label>
      <select name="role" v-model="updateUser.role">
        <option value="client" selected>Client</option>
        <option value="admin">Admin</option>
      </select>
      <input type="submit" value="Update user" />
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
import type { NewUser, User } from "../../../models/user";
const users = ref<User[]>([]);
onMounted(() => {
  get();
});
async function get() {
  users.value = await fetcher.get("/users");
}
const updateUser: NewUser = reactive({
  name: "",
  email: "",
  password: "",
  role: "client",
});
function getValsToUpdate(
  name: string,
  email: string,
  password: string,
  role: "client" | "admin"
) {
  updateUser.name = name;
  updateUser.email = email;
  updateUser.password = password;
  updateUser.role = role;
}
const currentUser = ref(0);
async function update(id: number) {
  const res = await fetcher.put(`/users/${id}`, updateUser);
  if (res.status === 200) {
    alert("User updated");
  }
  get();
}
async function deleteUser(id: number) {
  const res = await fetcher.delete(`/users/${id}`);
  if (res.status === 200) {
    alert("User deleted");
  }
  get();
}
</script>
