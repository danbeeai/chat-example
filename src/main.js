import "babel-polyfill"
import Vue from 'vue'
import axios from 'axios'
import ChatBody from './chatBody.vue'
import chatBtn from './chatBtn.vue'
import VueAgile from 'vue-agile'

Vue.prototype.$http = axios;
Vue.use(VueAgile);

Vue.component('chat-body',{
    render: h => h(ChatBody)
});

new Vue({
    el: '#dorothyChat',
    render: h => h(chatBtn)
});
