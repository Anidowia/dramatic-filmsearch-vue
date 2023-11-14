<template>
  <div>
    <div class="form-group">
      <h1>Let's login to your account</h1>
      <label for="email">Email address</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email"
        placeholder="Enter email"
        required
      />
      <small class="text-secondary"
        >We'll never share your email with anyone else.</small
      >
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        required
      />
    </div>
    <div class="form-group form-check">
      <input
        v-model="check"
        type="checkbox"
        class="form-check-input"
        id="check"
      />
      <label class="form-check-label" for="check">Check me out</label>
    </div>
    <button @click="signIn" type="submit" class="btn btn-primary">
      Submit
    </button>
    <a class="register-link"
      ><router-link to="/login">Don't have an account? Register</router-link></a
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useGtm } from "@gtm-support/vue-gtm";
const email = ref("");
const password = ref("");
const router = useRouter();
const store = useStore();
const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      store.commit("SET_CURRENT_USER", user);
      alert("Successfully logged in!");
      router.push("/");
      const gtm = useGtm();
      gtm.trackEvent({
        event: "sign-in",
      });
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>

<style>
.form-group {
  margin-right: 50px;
  margin-left: 50px;
}
.btn-primary {
  margin-left: 50px !important;
  margin-top: 10px;
  background-color: #ffc907 !important;
  font-weight: bold;
  border-radius: 18.5px !important;
  text-align: center !important;
  margin-right: 21px;
  margin-left: 21px;
}
.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus,
.btn-primary.active {
  background: #000 !important;
  color: #ffffff !important;
}
.register-link a {
  position: relative;
  color: #ffffff !important;
  text-decoration: none;
  margin-left: 1085px;
}
.register-link a:hover {
  color: #ffc907 !important;
  text-decoration: underline;
}
</style>
