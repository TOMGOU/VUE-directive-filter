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

/* const Loading = {
	install: function(Vue) {
		Vue.directive(config)
	}
};

export default Loading */