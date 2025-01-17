import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from './store';
import router from './routes';
import VueApexCharts from 'vue-apexcharts';

Vue.config.productionTip = process.env.NODE_ENV == 'production';

Vue.use(Vuetify);
Vue.use(VueApexCharts)
Vue.use(require('vue-moment'));

Vue.component('apexchart', VueApexCharts)

const vue = new Vue({
  vuetify: new Vuetify(),
  store,
  router,
  render: h => h(App)
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('tagify', function (id, what) {
  const type = id.split("/", 1)[0];
  const name = id.substr(type.length + 1);
  return { id, type, name }[what];
})
Vue.filter('formatDate', function (time) {
  if (time === null) return null;
  time = vue.$moment(time).local();
  let format = "hh:mm:ss.SSS";
  if (!time.isSame(vue.$moment(), "day")) format = `YYYY-MM-DD ${format}`;
  return time.format(format);
})
Vue.filter('formatDateLong', function (time) {
  if (time === null) return null;
  time = vue.$moment(time).local();
  return time.format('YYYY-MM-DD hh:mm:ss.SSS ZZ');
})
Vue.filter('tagForURI', function (tagId) {
  const type = tagId.split("/", 1)[0];
  let name = tagId.substr(type.length + 1);
  if (name.includes('"'))
    name = name.replaceAll('"', '""');
  if (/[ "]/.test(name))
    name = `"${name}"`;
  return `${type}:${name}`;
})

vue.$mount('#app')