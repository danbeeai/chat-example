import "babel-polyfill"
import Vue from 'vue'
import axios from 'axios'
import chatBtn from './chatBtn.vue'
import VueAgile from 'vue-agile'

Vue.prototype.$http = axios;
Vue.use(VueAgile);

new Vue({
    el: '#ChatExample',
    render: h => h(chatBtn)
});
