import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUP from "@/components/siginUp/signUp.vue";
import LogIn from "@/components/logIn/logIn.vue";
import profile from "@/views/profilePage.vue";
import errorPage from "@/views/errorPage.vue";
import AddNewLocation from "@/components/locations/AddNewLocation.vue";
import deleteLocation from "@/components/locations/deleteLocation.vue";
import deleteAllLocations from "@/components/locations/deleteAllLocations.vue";
import UpdateLocation from "@/components/locations/UpdateLocation.vue";
import menu from "@/components/menu/menu.vue";
import addNewCategory from "@/components/menu/addNewCategory.vue";
import viewCategory from "@/components/menu/viewCategory.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/SignUP",
    name: "SignUP",
    component: SignUP,
  },
  {
    path: "/LogIn",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/profile",
    name: "Profile",
    component: profile,
  },
  {
    path: "/AddNewLocation",
    name: "addNewLocation",
    component: AddNewLocation,
  },
  {
    path: "/UpdateLocation/:locationID",
    name: "UpdateLocation",
    component: UpdateLocation,
  },
  {
    path: "/deleteAllLocations",
    name: "deleteAllLocations",
    component: deleteAllLocations,
  },
  {
    path: "/deleteLocation/:locationID",
    name: "deleteLocation",
    component: deleteLocation,
  },
  {
    path: "/menu/locations/:locationID",
    name: "menu",
    component: menu,
  },
  {
    path: "/menu/categories/:locationID",
    name: "addNewCategory",
    component: addNewCategory,
  },
  {
    path: "/menu/view/:locationID",
    name: "viewCategory",
    component: viewCategory,
  },
  //stays last
  {
    path: "/:catchAll(.*)",
    name: "errorPage",
    component: errorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name == null) {
    document.title = ` ${process.env.VUE_APP_TITLE} / unknown`;
  } else {
    document.title = ` ${process.env.VUE_APP_TITLE} / ${to.name}`;
  }
  next();
});

export default router;
