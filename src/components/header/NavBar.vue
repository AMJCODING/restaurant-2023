<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>
    <router-link @click="logOutMe" to="/LogIn">Log out</router-link>

    <button @click="editProfile" class="--bs-blue btn btn-dark" title="Profile">
      <img src="@/assets/logo.png" class="mx-auto h20" alt="" />
      {{ userName }}
    </button>
  </nav>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      userName: "",
    };
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.userName = JSON.parse(user).name;
    }
  },

  methods: {
    logOutMe() {
      localStorage.clear();
    },
    editProfile() {
      this.$router.push({ name: "Profile" });
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 30px;
  display: flex;
  justify-content: center;

  a {
    font-weight: bold;
    padding: 10px;
    margin: 5px;
    font-weight: 350;
    color: #6c757d;
    text-decoration: none;
    &.router-link-exact-active {
      box-shadow: 1px 1px 5px 0px;
    }
  }
  a:hover {
    background: #6c757d;
    color: white;
  }
  .btn {
    position: absolute;
    right: 10px;
    background: linear-gradient(45deg, #a3cfbb, #9ec5fe);
    border-radius: 170px;
    font-size: 15px;
    font-weight: 400;
    border: none;
  }
  .btn:hover {
    opacity: 0.8;
  }
  .h20 {
    display: block;
    height: 40px;
    border-radius: 100px;
    font-weight: bold;
  }
}
</style>
