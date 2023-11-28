import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("@/components/MainPage.vue"),
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: "/search",
    name: "SearchResult",
    component: () => import("@/components/SearchResult.vue"),
    meta: { showHeader: true, showFooter: true },
    props: true,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/components/LoginPage.vue"),
    meta: { showHeader: true, showFooter: true },
    props: true,
  },
  {
    path: "/sign",
    name: "SignIn",
    component: () => import("@/components/SignIn.vue"),
    props: true,
  },
  {
    path: "/discuss",
    name: "DiscussPage",
    meta: { showHeader: true, showFooter: true },
    component: () => import("@/components/DiscussPage.vue"),
    props: true,
  },
  {
    path: "/film/:id",
    name: "FilmPage",
    component: () => import("@/components/FilmPage.vue"),
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: "/tvshow",
    name: "TvShow",
    component: () => import("@/components/TvShow.vue"),
    meta: { showHeader: true, showFooter: true },
  },
  {
    path: "/admin",
    name: "PanelNot",
    component: () => import("@/components/PanelPage.vue"),
  },
  {
    path: "/panel",
    name: "AdminPage",
    component: () => import("@/components/PanelNot.vue"),
  },
  {
    path: "/admin/panel",
    name: "PanelPage",
    component: () => import("@/components/AdminPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
