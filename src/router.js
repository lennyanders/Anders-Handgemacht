import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const title = document.title;
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/impressum',
      name: 'Impressum',
      meta: {
        title: 'Impressum'
      },
      component: () => import('./views/Impressum.vue')
    },
    {
      path: '/datenschutzerklaerung',
      name: 'Datenschutzerklärung',
      meta: {
        title: 'Datenschutzerklärung'
      },
      component: () => import('./views/Datenschutzerklaerung.vue')
    },
    {
      path: '*',
      name: 'not found',
      meta: {
        title: '404'
      },
      component: () => import('./views/NotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = title + ' – ' + to.meta.title;
  } else {
    document.title = title;
  }
  next();
});

export default router;
