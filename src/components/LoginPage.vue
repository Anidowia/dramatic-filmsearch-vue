<template>
    <div>
      <div class="form-group">
        <h1>Let's create your new account</h1>
        <label for="email">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required>
        <small class="text-secondary">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required>
      </div>
      <div class="form-group form-check">
        <input v-model="check" type="checkbox" class="form-check-input" id="check">
        <label class="form-check-label" for="check">Check me out</label>
      </div>
      <button @click="register" type="submit" class="btn btn-primary">Submit</button>
    </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { auth } from '@/firebase'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex' 
  import { useGtm } from '@gtm-support/vue-gtm';
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const store = useStore() 
  const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      alert('Successfully registered!');
      router.push('/');
      store.dispatch('addNotification', {
        message: 'Successfully registered!',
        type: 'success',
      });
      console.log(store.state.notifications);

      const gtm = useGtm();
      gtm.trackEvent({
        event: 'login',
      });
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);

      store.dispatch('addNotification', {
        message: error.message,
        type: 'error',
      });
    });
};
</script>

<style>
.form-group {
    margin-right: 50px;
    margin-left: 50px;
}
.btn-primary {
  margin-left: 50px!important;
  margin-top: 10px;
  background-color: #ffc907 !important;
  font-weight: bold;
  border-radius: 18.5px !important;
  text-align: center!important;
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
</style>