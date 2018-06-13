// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
// 【方法四】全局指令（模块化）
import './directive/index.js'

// 【方法三】全局指令（加个Vue.use而已，为模块化做准备！）
/* Vue.use(Vue => {
  Vue.directive("src", {
    componentUpdated(el,binding){
        let { url, defaultUrl } = binding.value;
        // console.log(binding)
        if(url){
            el.src = url;
            console.log(this)//居然是undefined,讲道理应该是null【源码：plugin.apply(null, args);】
            // function test(){
            //   console.log(this)
            // }
            // test.apply(null)
        }else{
            el.src = defaultUrl;
        }
      }
    }); 
}); */

// 【方法二】全局指令（要在new Vue()实例化前完成！）
/* Vue.directive("src", {
  update: function (el,binding) {
    let { url, defaultUrl } = binding.value;
    console.log(binding)
    if(url){
        el.src = url;
    }else{
        el.src = defaultUrl;
    }
  }
}) */


/* Vue.filter('addMark', function (value) {
  return `《${value}》`
}) */


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})







