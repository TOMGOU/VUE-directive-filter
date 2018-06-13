# VUE-directive-filter
JUST RECORD THE USE METHODS OF VUE DIRECTIVE AND FILTER 


【方法一】局部指令


  directives: {
    src: {
      update: function (el,binding) {
        let { url,defaultUrl } = binding.value
        console.log(binding)
        el.src = url
      }
    }
  } 


【方法二】全局指令（要在new Vue()实例化前完成！）


Vue.directive("src", {
  update: function (el,binding) {
    let { url, defaultUrl } = binding.value;
    console.log(binding)
    if(url){
        el.src = url;
    }else{
        el.src = defaultUrl;
    }
  }
}) 


【方法三】全局指令（加个Vue.use而已，为模块化做准备！）


 Vue.use(Vue => {
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
}); 


【方法四】全局指令（模块化）

import './directive/index.js'

//directive.js

const config = {
    src: {
        componentUpdated(el,binding){
            let { url, defaultUrl } = binding.value;
            // console.log(binding)
            if(url){
                el.src = url;
            }else{
                el.src = defaultUrl;
            }
        }
    }
}
export default Vue =>{
    for (let item in config) {
        Vue.directive(item, config[item]);
      }
}

//index.js

import Vue from 'vue';
import directive from './directive.js';
Vue.use(directive);


filter和directive一个卵样！！！！！！！

^_^