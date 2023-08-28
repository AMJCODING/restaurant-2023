<template>
  <form @click.prevent>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Login Now</h1>
        <input
          v-model="email"
          type="text"
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
        <input
          v-model="pass"
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
        />
        <span class="error-feedback" v-if="v$.pass.$error">{{
          v$.pass.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button @click="loginNow" type="submit" class="btn btn-primary">
          Login Now
        </button>
        &nbsp; &nbsp; &nbsp;
        <button @click="goTosignUp" type="submit" class="btn btn-link">
          Sign Up
        </button>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <p
        class="col-auto d-block mx-auto alert alert-danger"
        v-if="userError.length > 0"
      >
        {{ userError }}
      </p>
    </div>
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { email, required, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "login-page",
  data() {
    return {
      v$: useValidate(),
      email: "",
      pass: "",
      userError: "",
    };
  },
  validations() {
    return {
      email: { email, required },
      pass: { required, minLength: minLength(8), maxLength: maxLength(24) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    goTosignUp() {
      this.$router.push({ name: "SignUP" });
    },
    async loginNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.email}&password=${this.pass}`
        );
        if (result.data.length > 0 && result.status == 200) {
          console.log("logged in ");
          localStorage.setItem("user-info", JSON.stringify(result.data[0]));
          this.$router.push({ name: "Home" });
        } else {
          this.userError =
            "Login failed please rty again with another gmail and password";
          console.log(result.data.email);
        }
      } else {
        console.log("form validating failed");
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
