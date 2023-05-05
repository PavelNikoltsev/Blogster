<template>
  <CForm name="sign-in-form" id="sign-in-form" @submit.prevent="signIn">
    <label for="email">Email:</label>
    <input
      type="email"
      name="email"
      id="sign-in-email"
      placeholder="Type your email..."
      v-model="credentials.email"
    />
    <label for="password">Password:</label>
    <input
      type="password"
      name="password"
      id="sign-in-password"
      placeholder="Type your password..."
      v-model="credentials.password"
    />
    <input type="submit" value="Sign In" />
  </CForm>
  {{ credentials.token }}
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { fetcher } from "../../utils/fetcher";
import CForm from "../custom/CForm/CForm.vue";

interface Credentials {
  email: string;
  password: string;
  token: string;
}

const credentials: Credentials = reactive({
  email: "",
  password: "",
  token: localStorage.getItem("SessionToken") || "",
});
async function signIn() {
  credentials.token = "";
  const res = await fetcher.post("/sessions/signin", credentials);
  if (res.status === 200 || res.status === 201 || res.status === 401) {
    localStorage.setItem("SessionToken", res.token);
    window.location.href = "/profile";
    return;
  }
  if (res.status === 404) {
    alert("User not found");
  }
}
</script>
