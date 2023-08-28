<template>
  <div class="errorPage">
    <img
      class="rounded mx-auto d-block h400"
      src="../assets/logo.png"
      alt="img"
    />
    <br />

    <div class="error-feedback signUp row g-3 align-items-center">
      <p class="col-auto d-block mx-auto">Sorry this page is not found</p>
      <br />
      <router-link :to="{ name: 'Home' }">
        <button class="col-auto d-block mx-auto btn btn-info">
          Back to home page
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "errorPage",
};
</script>

<style scoped>
.h400 {
  height: 400px;
}
.error-feedback {
  color: rgb(155, 47, 47);
}
</style>
