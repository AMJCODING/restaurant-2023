<template>
  <div class="deleteAllLocations">
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <h1 class="text-danger">Delete All Locations Location</h1>
      </div>
    </div>
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <p class="text-danger">
          Are you sure you want to delete all locations ?
        </p>
        <br />
      </div>
    </div>
    <br />
    <br />
    <div class="signUp row g-3 align-items-center">
      <div class="col-auto d-block mx-auto">
        <button class="btn btn-danger" @click="deleteAllLocation">
          Delete All
        </button>
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
  name: "deleteAllLocation",
  data() {
    return {
      userID: "",
      locDeletedMsg: "",
      locErrorMsg: "",
      allLoctionsID: [],
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LogIn" });
    } else {
      this.userID = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/locations?userID=${this.userID}`
      );
      for (let i = 0; i < result.data.length; i++) {
        this.allLoctionsID.push(result.data[i].id);
      }
    }
  },
  methods: {
    async deleteAllLocation() {
      let allResults = [];
      for (let i = 0; i < this.allLoctionsID.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/locations/${this.allLoctionsID[i]}`
        );
        if (result.status == 200) {
          allResults.push(true);
        } else {
          allResults.push(false);
        }
      }
      if (!allResults.includes(false)) {
        this.locDeletedMsg = "All Location Is Deleted ...";
        this.locErrorMsg = "";
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 500);
      } else {
        this.locDeletedMsg = "";
        this.locErrorMsg = "Sorry, something error please try again";
      }
    },
  },
};
</script>

<style></style>
