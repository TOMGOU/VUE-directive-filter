const config = {
    addMark(val){
        return `《${val}》`
    }
}

export default Vue => {
    for (let item in config) {
        Vue.filter(item,config[item])
    }
}