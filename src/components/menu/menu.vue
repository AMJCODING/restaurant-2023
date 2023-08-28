<template>
  <Navbar />
  <br />
  <div class="menu">
    <div>
      <router-link
        :to="{ name: 'viewCategory', params: { locID: locationID } }"
      >
        <button class="m float-start btn btn-success">
          View Categries
        </button></router-link
      >
      <button :disabled="isDisabled" class="m float-end btn btn-success">
        Add Items
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/header/NavBar.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "menu",
  components: {
    Navbar,
  },
  data() {
    return {
      userID: "",
      locationID: "",
      disabled: true,
    };
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LogIn" });
    } else {
      this.userID = JSON.parse(user).id;
      this.isLoggedInUser();
      this.locationID = this.$route.params.locationID;
      this.displayAllCategories({
        userID: this.userID,
        locationID: this.locationID,
      });
    }
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "loggedInUserID",
      "numberOfCategories",
      "listOfCategories",
    ]),
    isDisabled() {
      if (this.numberOfCategories > 0) {
        this.disabled = false;
      }
      return this.disabled;
    },
  },
  methods: {
    ...mapMutations(["isLoggedInUser", "displayAllCategories"]),
  },
};
</script>

<style scoped>
.m {
  margin: 1rem;
}
</style>
