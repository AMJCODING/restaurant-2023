<template>
  <form @click.prevent>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Update Your Profile Now</h1>
      </div>
    </div>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          :disabled="inputDisabled"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Edit Your Username"
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
          :disabled="inputDisabled"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Edit Your Password"
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
          :disabled="inputDisabled"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="Edit Your Email"
        />
        <span class="error-feedback" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button
          :disabled="makeItDisabled"
          @click="editProfileNow"
          type="submit"
          class="btn btn-primary"
        >
          Update Profile
        </button>
        &nbsp; &nbsp; &nbsp;
        <button @click="goToHome" class="btn btn-secondary">Close</button>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <p v-if="counter == 1" class="alert alert-success">
          {{ profileEdited }}
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "editProfile-page",
  data() {
    return {
      v$: useValidate(),
      disabled: true,
      inputDisabled: false,
      name: "",
      password: "",
      email: "",
      userID: "",
      counter: 0,
      profileEdited: "",
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
      this.name = JSON.parse(user).name;
      this.password = JSON.parse(user).password;
      this.email = JSON.parse(user).email;
      this.userID = JSON.parse(user).id;
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
    async editProfileNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("form validated successfully");
        let result = await axios.put(
          `http://localhost:3000/users/${this.userID}`,
          {
            name: this.name,
            password: this.password,
            email: this.email,
          }
        );
        if (result.status == 200) {
          this.profileEdited = "profile edited successfully ...";
          this.counter = 1;
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.inputDisabled = true;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 500);
        } else {
          console.log("user adding falied");
        }
      } else {
        console.log("form validated failed");
      }
    },
  },
  computed: {
    makeItDisabled() {
      let user = localStorage.getItem("user-info");
      if (
        this.name !== JSON.parse(user).name ||
        this.password !== JSON.parse(user).password ||
        this.email !== JSON.parse(user).email
      ) {
        this.disabled = false;
      }
      if (
        this.name === JSON.parse(user).name &&
        this.password === JSON.parse(user).password &&
        this.email === JSON.parse(user).email
      ) {
        this.disabled = true;
      }
      return this.disabled;
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: rgba(227, 9, 53, 0.777);
}
.back {
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
}
</style>
