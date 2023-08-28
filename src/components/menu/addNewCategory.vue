<template>
  <form @click.prevent>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Add new category</h1>
      </div>
    </div>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          :disabled="inputDisabled"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Category Name"
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
          v-model="address"
          type="text"
          class="form-control"
          placeholder="Address"
        />
        <span class="error-feedback" v-if="v$.address.$error">{{
          v$.address.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          :disabled="inputDisabled"
          v-model="phone"
          type="text"
          class="form-control"
          placeholder="Phone Number"
        />
        <span class="error-feedback" v-if="v$.phone.$error">{{
          v$.phone.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button @click="AddNewRest" type="submit" class="btn btn-success">
          Add now
        </button>
        &nbsp; &nbsp; &nbsp;
        <button @click="goToMenu" type="submit" class="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
    <br />
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <p class="alert alert-success" v-if="locAdded.length > 0">
          {{ locAdded }}
        </p>
        <p class="alert alert-danger" v-if="locError.length > 0">
          {{ locError }}
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "addNewCategory",
  data() {
    return {
      v$: useValidate(),
      name: "",
      address: "",
      phone: "",
      userID: "",
      locError: "",
      locAdded: "",
      inputDisabled: false,
    };
  },
  validations() {
    return {
      name: { required, maxLength: maxLength(50) },
      address: { required, maxLength: maxLength(50) },
      phone: { required, minLength: minLength(11), maxLength: maxLength(11) },
    };
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.userID = JSON.parse(user).id;
    }
  },
  methods: {
    goToMenu() {
      this.$router.push({ name: "menu" });
    },
    async AddNewRest() {
      this.$emit("AddNewRest", {
        name: this.name,
        address: this.address,
        phone: this.phone,
      });
      this.v$.$validate();

      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/locations", {
          name: this.name,
          address: this.address,
          phone: this.phone,
          userID: this.userID,
        });
        if ((result.status = 201)) {
          this.locAdded = "Location Added ...";
          this.locError = "";
          this.inputDisabled = true;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 500);
        } else {
          this.locError = "Sorry, something went error please try again";
        }
      } else {
        this.locAdded = "";
        this.locError = "You must fill all required fields";
      }
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: rgb(203, 15, 18);
}
</style>
