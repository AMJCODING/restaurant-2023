<template>
  <div class="deleteLocation">
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1 class="text-danger">Delete Location #{{ locationID }}</h1>
      </div>
    </div>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <p class="text-danger">
          Are you sure you want to delete this location ?
        </p>
        <br />
        <hr />
        Name: &nbsp; {{ name }}
        <br />
        Address:&nbsp; {{ address }}
        <br />
        Phone:&nbsp; {{ phone }}
        <hr />
      </div>
    </div>
    <br />
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button class="btn btn-danger" @click="deleteLocation">Delete</button>
        &nbsp; &nbsp; &nbsp;
        <router-link :to="{ name: 'Home' }">
          <button class="btn btn-secondary">Close</button>
        </router-link>
      </div>
    </div>
    <br />
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <p class="alert alert-success" v-if="locDeletedMsg.length > 0">
          {{ locDeletedMsg }}
        </p>
        <p class="alert alert-danger" v-if="locErrorMsg.length > 0">
          {{ locErrorMsg }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "deleteLocation",
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      userID: "",
      locationID: "",
      locDeletedMsg: "",
      locErrorMsg: "",
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LogIn" });
    } else {
      this.userID = JSON.parse(user).id;
      this.locationID = this.$route.params.locationID;
      this.canCurrentUserAccessThisLoaction();
    }
  },
  methods: {
    async deleteLocation() {
      let result = await axios.delete(
        `http://localhost:3000/locations/${this.locationID}`
      );
      if (result.status == 200) {
        this.locDeletedMsg = "Location deleted";
        this.locErrorMsg = "";
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 500);
      } else {
        this.locDeletedMsg = "";
        this.locErrorMsg = "Sorry, something error please try again";
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

<style scoped></style>
