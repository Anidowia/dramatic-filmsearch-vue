<template>
    <div>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email address</label>
          <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Enter email" required>
          <small class="text-secondary">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <div class="form-group form-check">
          <input v-model="form.check" type="checkbox" class="form-check-input" id="check">
          <label class="form-check-label" for="check">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div v-if="message">{{ message }}</div>
    </div>
</template>
<script>
import {createUser} from '@/firebase'
import {reactive} from 'vue'
import router from '@/router';
  export default {
    setup() {
      const form = reactive({ email: '', password: ''})
      const onSubmit = async () => {
        await createUser({...form})
        form.email = ''
        form.password = ''
        router.push({ name: 'MainPage' });
      }
      return {form, onSubmit}
    }
};
</script>  
<style>
.form-group {
    margin-right: 21px;
    margin-left: 21px;
}
.btn-primary {
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