<template>
  <div class="home">
    <nav-bar></nav-bar>
    <br />
    <router-link to="/AddNewLocation">
      <button type="button" class="btn btn-success">Add New Location</button>
    </router-link>
    <br />
    <br />
    <br />
    <LocationsTable
      :locations="userLocations"
      :name="name"
      :phone="phone"
      :address="address"
    />
  </div>
</template>

<script>
import LocationsTable from "@/components/locations/LocationsTable.vue";
import NavBar from "@/components/header/NavBar.vue";
import axios from "axios";
// @ is an alias to /src
export default {
  name: "HomeView",
  data() {
    return {
      userLocations: [],
      userID: "",
    };
  },
  components: {
    NavBar,
    LocationsTable,
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LogIn" });
    } else {
      this.userID = JSON.parse(user).id;
      this.userName = JSON.parse(user).name;
    }
    let result = await axios.get(
      `http://localhost:3000/locations?userID=${this.userID}`
    );
    if (result.status == 200 && result.data.length > 0) {
      this.userLocations = result.data;
    }
  },
};
</script>
<style scoped>
.welcome {
  position: absolute;
  bottom: 50%;
  text-align: center;
  margin: auto;
  right: 35%;
  left: 35%;
  box-shadow: 1px 1px 5px;
  padding: 1rem;
  border-radius: 20px;
}
</style>
