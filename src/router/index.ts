import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import google from '@/mock/google';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

const router = new VueRouter({
  routes,
});

/**
 * Get the current loccation of the google apps script url.
 * @returns {string} loation hash of google script
 */
const getLocation = () => {
  return new Promise((resolve) => {
    google.script.url.getLocation((location) => {
      resolve(location.hash);
    });
  });
};

router.beforeEach(async (to, from, next) => {
  let googlePath = await getLocation();
  googlePath = googlePath || '/';

  // on initial load (from.name is null) honor the google apps script url
  if (from.name === null && googlePath !== to.path) {
    next(googlePath);
  }
  next();
});

router.afterEach((to) => {
  // update google apps script url
  google.script.history.push(to.name, to.params, `${to.path}${to.hash}`);
});

export default router;
