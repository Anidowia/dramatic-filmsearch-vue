import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'MainPage',
     component: () =>
     import('@/components/MainPage.vue'),
  },
  {
     path: '/search',
     name: 'SearchResult',
      component: () =>
      import('@/components/SearchResult.vue'),
      props: true,
   },
   {
    path: '/login',
    name: 'LoginPage',
     component: () =>
     import('@/components/LoginPage.vue'),
     props: true,
  },
  {
    path: '/sign',
    name: 'SignIn',
     component: () =>
     import('@/components/SignIn.vue'),
     props: true,
  },
  {
    path: '/discuss',
    name: 'DiscussPage',
     component: () =>
     import('@/components/DiscussPage.vue'),
     props: true,
  },
  {
    path: '/film/:id',
    name: 'FilmPage',
    component: () =>
    import('@/components/FilmPage.vue'),
  },
  {
    path: '/tvshow',
    name: 'TvShow',
    component: () =>
    import('@/components/TvShow.vue'),
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
