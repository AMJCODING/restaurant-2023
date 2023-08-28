<template>
  <edit-profile></edit-profile>
</template>

<script>
import EditProfile from "@/components/profile/editProfile.vue";
export default {
  name: "porfile-page",
  components: {
    EditProfile,
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LogIn" });
    }
  },
};
</script>

<style></style>
