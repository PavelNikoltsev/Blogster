<template>
  <div class="profile-create-user">
    <h3>Create user:</h3>
    <CForm name="create-category" @submit.prevent="createUser">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="user.name" required />
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="user.email" required />
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="user.password" required />
      <label for="role">Role:</label>
      <select name="role" v-model="user.role">
        <option value="client" selected>Client</option>
        <option value="admin">Admin</option>
      </select>
      <input type="submit" value="Create user" />
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { fetcher } from "../../../utils/fetcher";
import CForm from "../../custom/CForm/CForm.vue";
import type { NewUser } from "../../../models/user";
const user = reactive<NewUser>({
  name: "",
  email: "",
  password: "",
  role: "client",
});

async function createUser() {
  const res = await fetcher.post("/users", user);
  if (res.status === 200) {
    alert("User created");
    return;
  }
  if (res.status === 404) {
    alert("User with provided email already exist");
    return;
  }
}
</script>
