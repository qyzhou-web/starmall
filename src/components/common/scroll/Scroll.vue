<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props:{
   probeType:{
       type:Number,
       default:0
   },
   pullUpLoad:{
       type:Boolean,
       default:false
   }
  },
  
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
        this.scroll.finishPullUp()
    }
  },
  mounted() {
      //1.创建对象
    this.scroll = new BScroll(this.$refs.wrapper, {
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true
    });
    //2.监听属性
    this.scroll.on('scroll',(position)=>{
        this.$emit('topScroll',position)
    }),
    this.scroll.on('pullingUp',()=>{
        this.$emit('pullUpUp')
    })
  }
};
</script>

<style>
</style>