import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    isUserLoggedIn: "",
    loggedInUserID: "",
    numberOfCategories: "",
    listOfCategories: [],
  },
  getters: {},
  mutations: {
    isLoggedInUser(state) {
      let user = localStorage.getItem("user-info");
      if (user) {
        state.isUserLoggedIn = true;
        state.loggedInUserID = JSON.parse(user).id;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    async displayAllCategories(state, payload) {
      let result = await axios.get(
        `http://localhost:3000/categories?userID=${payload.userID}&locationID=${payload.locationID}`
      );
      if (result.status == 200) {
        state.listOfCategories = result.data;
        state.numberOfCategories = state.listOfCategories.length;
      }
    },
  },
  actions: {},
  modules: {},
});
