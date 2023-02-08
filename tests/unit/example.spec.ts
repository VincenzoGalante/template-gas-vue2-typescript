import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import Vuetify from 'vuetify';
import router from '@/router';
import Vue from 'vue';
import GasPlugin from '@/plugins/gas';

Vue.use(Vuetify);
Vue.use(GasPlugin);

describe('App.vue', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should have a app bar title', () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      router,
    });

    const title = wrapper.find('.v-toolbar__title');

    expect(title.text()).toBe('Example Vue App');
  });
});
