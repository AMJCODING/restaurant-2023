<template>
  <Navbar />
  <router-link :to="{ name: 'viewCategory', params: { locID: locationID } }">
    <button class="m float-start btn btn-info">Add Categries</button>
  </router-link>

  <router-link :to="{ name: 'viewCategory', params: { locID: locationID } }">
    <button class="m float-start btn btn-secondary">close</button></router-link
  >
</template>

<script>
import Navbar from "@/components/header/NavBar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style></style>
