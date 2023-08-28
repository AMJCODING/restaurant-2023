<template>
  <form @click.prevent>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Sign Up Now</h1>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Enter Your Username"
        />
        <span class="error-feedback" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
        />
        <span class="error-feedback" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
        />
        <span class="error-feedback" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button @click="signUpNow" type="submit" class="btn btn-primary">
          Sign Up Now
        </button>
        &nbsp; &nbsp; &nbsp;
        <button @click="goToLogin" type="submit" class="btn btn-link">
          Login
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "signUp-page",

  data() {
    return {
      v$: useValidate(),
      name: "",
      password: "",
      email: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(4), maxLength: maxLength(16) },
      password: { required, minLength: minLength(8), maxLength: maxLength(24) },
      email: { required, email },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: "LogIn" });
    },
    async signUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("form validated successfully");
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          password: this.password,
          email: this.email,
        });
        if (result.status == 201) {
          console.log("user added successfully");
          //save user data in local storage
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result.data);
          //go to Home page
          this.$router.push({ name: "Home" });
        } else {
          console.log("user adding falied");
        }
      } else {
        console.log("form validated failed");
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 5rem;
}
.error-feedback {
  color: rgba(227, 9, 53, 0.777);
}
</style>
