<template>
  <div class="profile-create-user">
    <h3>Create user:</h3>
    <CForm name="create-user" @submit.prevent="createUser">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="user.name" required />
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="user.email" required />
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="user.password" required />
      <label for="role">Role:</label>
      <select name="role" v-model="user.role" required>
        <option value="client" selected>Client</option>
        <option value="admin">Admin</option>
      </select>
      <input type="submit" value="Create user" />
    </CForm>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { users } from "../../models/user";
import { fetcher } from "../../utils/fetcher";
import CForm from "../custom/CForm/CForm.vue";
import type { NewUser } from "../../models/user";
const user = reactive<NewUser>({
  name: "",
  email: "",
  password: "",
  role: "client",
});

async function createUser() {
  const dbUser = users.find((u) => u.email === user.email);
  if (dbUser) {
    alert("A user with that email already exists");
  } else {
    await fetcher.post("/users", user);
    alert("The user was created successfully");
  }
}
</script>
