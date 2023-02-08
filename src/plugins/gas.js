import google from '@/mock/google';

export default {
  install(Vue) {
    Vue.prototype.$google = google;
  },
};
