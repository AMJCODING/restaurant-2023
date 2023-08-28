<template>
  <form @click.prevent>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1>Update this location</h1>
      </div>
    </div>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          :disabled="inputDisabled"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Restaurant Name"
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
        <button @click="UpdateLocation" type="submit" class="btn btn-info">
          Update Now
        </button>
        &nbsp; &nbsp; &nbsp;
        <button @click="goToHome" type="submit" class="btn btn-secondary">
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
  name: "AddNewLocation",
  data() {
    return {
      v$: useValidate(),
      name: "",
      address: "",
      phone: "",
      userID: "",
      locError: "",
      locAdded: "",
      locationID: "",
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
      this.locationID = this.$route.params.locationID;
      this.canCurrentUserAccessThisLoaction();
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
    async UpdateLocation() {
      this.v$.$validate();

      if (!this.v$.$error) {
        let result = await axios.put(
          `http://localhost:3000/locations/${this.locationID}`,
          {
            name: this.name,
            address: this.address,
            phone: this.phone,
            userID: this.userID,
          }
        );
        if ((result.status = 200)) {
          this.inputDisabled = true;
          this.locAdded = "Location updated ...";
          this.locError = "";
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
    async canCurrentUserAccessThisLoaction() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.locationID}&userID=${this.userID}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.address = result.data[0].address;
        this.phone = result.data[0].phone;
        this.name = result.data[0].name;
      } else {
        this.$router.push({ name: "Home" });
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
