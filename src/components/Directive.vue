<template>
  <div id="result">
    <img class="text" src="//game.gtimg.cn/images/3new/cp/a20180402sprogram/text.png"/>
    <div class="text_box">
      <div class="blue">{{adj}}</div>的<div class="yellow">{{name}}</div> 相似度高达<div class="blue">{{simular}}%</div>，
      <div>超越了<div class="yellow">{{better}}%</div>的玩家。</div>
    </div>
    <div class="info_box" :class="{on:animate}" style="-webkit-animation-delay: .5s;">
      <img class="hero_img" 
      v-src="{url: pic, defaultUrl: require('../assets/default.png')}"/>
      <div class="hero">{{name | addMark}}</div>
      <div class="attr">
        <img :src="imgSrc"/>
        <div class="category">{{type}}</div>
        <div class="style">{{category}}</div>
      </div>
      <div class="detail">
        <div class="wl li">
          <div class="attr_name">武力</div>
          <div class="value">({{power}})</div>
          <div class="box">
            <div class="con" :style="a"></div>
          </div>
        </div>
        <div class="zm li">
          <div class="attr_name">智谋</div>
          <div class="value">({{wisdom}})</div>
          <!-- <progress percent="wisdom" stroke-width="15" :active="active" activeColor="#505a7d" backgroundColor="#b5b7c2"></progress> -->
          <div class="box">
            <div class="con" :style="b"></div>
          </div>
        </div>
        <div class="ts li">
          <div class="attr_name">统帅</div>
          <div class="value">({{lead}})</div>
          <!-- <progress :percent="lead" stroke-width="15" :active="active" activeColor="#505a7d" backgroundColor="#b5b7c2"></progress> -->
          <div class="box">
            <div class="con" :style="c"></div>
          </div>
        </div>
      </div>
      <div class="des">{{des}}</div>
      <div class="note">(推荐使用该武将，助你成就霸业)</div>
      <img class="stick" src="//game.gtimg.cn/images/3new/cp/a20180402sprogram/stick.png"/>
    </div>
    <div class="button">
      <a href="javascript:void(0)" class="share" @click="share"></a>
      <a class="more" href="javascript:void(0)" @click="more"></a>
    </div>
    <div class="pop" v-show="show" @click="close">
        <img class="click_share" src="http://game.gtimg.cn/images/3new/cp/a20180402sprogram/click_share.png"/>
    </div>
  </div>
</template>

<script>
import { jsonp } from '../utils/http.js'
export default {
  data () {
    return {
      a: 'width: 50%',
      b: 'width: 50%',
      c: 'width: 50%',
      num: 1,
      animate: false,
      active: false,
      name: '',
      type: '',
      category: '',
      power: 0,
      wisdom: 0,
      lead: 0,
      _power: 0,
      _wisdom: 0,
      _lead: 0,
      des: '',
      pic: '',
      imgSrc: '',
      simular: 90.8,
      better: 55,
      adj: '',
      params: {},
      show: false
    }
  },
  methods: {
    fetchData (num) {
      jsonp({
        url: `//3.qq.com/zlkdatasys/${num}.json`,
        config: {
          name: 'herodetailcallback'
        }
      })
        .then(res => {
          var fetch_data = res
          this.name = fetch_data['wjmc_1f']
          this.category = fetch_data['xttd_79']
          this.type = fetch_data['wjlx_28']
          this.power = fetch_data['wjnlz_09'][0]['wjwlz_0d']
          this.wisdom = fetch_data['wjnlz_09'][0]['wjzmz_1f']
          this.lead = fetch_data['wjnlz_09'][0]['wjtsz_b8']
          this.des = fetch_data['bjgs_f9']
          this.pic = fetch_data['wjzst_51']
          this.adj = fetch_data['wjdw_b4']
          this.a = `width:${this.power}%`
          this.b = `width:${this.wisdom}%`
          this.c = `width:${this.lead}%`
          var arr = [
            '//game.gtimg.cn/images/3new/cp/a20180402sprogram/t_ui_icon_bubing_26.png',
            '//game.gtimg.cn/images/3new/cp/a20180402sprogram/t_ui_icon_gongbing_14.png',
            '//game.gtimg.cn/images/3new/cp/a20180402sprogram/t_ui_icon_chebing_35.png',
            '//game.gtimg.cn/images/3new/cp/a20180402sprogram/t_ui_icon_qibing_69.png'
          ]
          if (fetch_data['xttd_79'] == '步将') {
            this.imgSrc = arr[0]
          } else if (fetch_data['xttd_79'] == '弓将') {
            this.imgSrc = arr[1]
          } else if (fetch_data['xttd_79'] == '武将') {
            this.imgSrc = arr[2]
          } else {
            this.imgSrc = arr[3]
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    more () {
      PTTSendClick('bottomright', 'more', '了解更多')
      PTTSendClick('bottomleft', 'share', '分享')
      this.$router.push({
        name: 'feature'
      })
    },
    share () {
      PTTSendClick('bottomright', 'share', '分享')
      this.show = true
    },
    close () {
      PTTSendClick('bottom', 'know', '了解')
      this.show = false
    }
  },
  mounted () {
    // alert(localStorage.getItem("num"))
    var simu = (Math.random() * 7).toFixed(1)
    var bett = (Math.random() * 10).toFixed(0)
    this.simular = 92 + parseFloat(simu)
    this.better = 70 + parseFloat(bett)

    setTimeout(() => {
      this.animate = true
    }, 1000)

    this.fetchData(1)
    var i = 1;
    var _this = this
    setInterval(function(){
      i++;
      _this.fetchData(i)
    },2000)
  },
  // 【vue2.0,filter只能用在{{}}和v-bind中】
  /* filters: {
    addMark: function(val){
        return `《${val}》`
    }
  } */
  // 【方法一】局部指令
  /* directives: {
    src: {
      update: function (el,binding) {
        let { url,defaultUrl } = binding.value
        console.log(binding)
        el.src = url
      }
    }
  } */
}
</script>
<style lang="scss">
#result {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 7.5rem;
  height: 100vh;
  background-image: url("//game.gtimg.cn/images/3new/cp/a20180402sprogram/s4_bg.jpg");
  background-size: cover;
  font-size: 20px;
  // margin-top: -1.3rem;
  /* 弹窗 */
  .pop {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.8);
    .click_share{
      position: absolute;
      top: 0;
      right: .8rem;
      width: 4.88rem;
      height: 4.46rem;
    }
  }
  .text {
    width: 4.18rem;
    height: 0.4rem;
    margin: 0.5rem auto 0.1rem;
  }
  .text_box {
    width: 100%;
    text-align: center;
    font-size: 0.36rem;
    .yellow {
      display: inline-block;
      color: #a15a56;
      margin: 0 0.1rem;
    }
    .blue {
      display: inline-block;
      color: #536289;
      margin: 0 0.1rem;
    }
  }
  .info_box {
    position: relative;
    margin-top: 0.5rem;
    width: 7.39rem;
    height: 6.22rem;
    transform: translateX(-6.95rem);
    transition: all 1s;
    background-image: url("//game.gtimg.cn/images/3new/cp/a20180402sprogram/spooler1.png");
    background-size: 7.39rem 100%;
    transform: translateX(0);
    .hero_img {
      position: absolute;
      top: -0.75rem;
      right: 0.43rem;
      width: 4rem;
      height: 4.8rem;
    }
    .hero {
      width: 3rem;
      font-size: 0.45rem;
      color: #212d48;
      font-weight: bold;
      letter-spacing: 0.1rem;
      margin: 0.45rem 0 0.45rem 0.5rem;
    }
    .attr {
      position: relative;
      width: 2.6rem;
      height: 0.42rem;
      margin-left: 0.7rem;
      img {
        position: absolute;
        left: -0.3rem;
        width: 0.61rem;
        height: 0.61rem;
      }
      .category {
        display: inline-block;
        width: 1.2rem;
        height: 0.36rem;
        line-height: 0.36rem;
        text-align: center;
        border: 0.03rem solid #a45c57;
        vertical-align: middle;
        color: #a45c57;
        font-size: 0.24rem;
      }
      .style {
        display: inline-block;
        width: 1.2rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        background: #a45c57;
        vertical-align: middle;
        font-size: 0.24rem;
        color: #fff;
      }
    }
    .detail {
      width: 3.6rem;
      height: 1.35rem;
      margin: 0.3rem 0 0 0.4rem;
      .li {
        width: 100%;
        .attr_name {
          display: inline-block;
          width: 0.5rem;
          font-size: 0.24rem;
          color: #2a5077;
        }
        .value {
          display: inline-block;
          width: 0.65rem;
          font-size: 0.24rem;
          color: #2a5077;
        }
        .box {
          display: inline-block;
          width: 2.1rem;
          height: 0.3rem;
          background: rgba(0, 0, 0, 0.5);
          vertical-align: middle;
          .con {
            /* width: 1.25rem; */
            height: 0.3rem;
            background: #505a7d;
          }
        }
      }
    }
    .des {
      width: 80%;
      margin: 0.5rem 0 0 0.3rem;
      font-size: 0.24rem;
      color: #212d48;
    }
    .note {
      width: 100%;
      text-align: center;
      font-size: 0.22rem;
      color: #a45c57;
      margin-top: 0.2rem;
    }
    .stick {
      position: absolute;
      width: 0.49rem;
      height: 7.31rem;
      top: 50%;
      transform: translateY(-50%);
      right: -0.01rem;
    }
  }
  .button {
    margin: 0.5rem auto;
    text-align: center;
    .share,
    .more {
      border: none;
      outline: none;
      display: inline-block;
      height: 1rem;
      width: 3.04rem;
    }
    .share {
      background: transparent
        url("//game.gtimg.cn/images/3new/cp/a20180402sprogram/share.png") 0 0/100%
        100%;
    }
    .more {
      background: transparent
        url("//game.gtimg.cn/images/3new/cp/a20180402sprogram/more.png") 0 0/100%
        100%;
    }
  }
}
</style>
