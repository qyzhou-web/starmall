<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl1" class="tab-control" @tabClick="tabClick" v-show=" isTabFixed"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @topScroll="topScroll"
      :pull-up-load="true"
      @pullUpUp="loadMore"
    >
      <home-swiper :banners="banners" @isImageFinshed="isImageFinshed"></home-swiper>
      <recommend-views :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl2" class="tab-control" @tabClick="tabClick" />
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import {backTopMixin} from 'common/mixin.js'

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendViews from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendViews,
    FeatureView
  },
  mixins:[backTopMixin],
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list;
    }
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY:0
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 400);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    })},
    activated(){
       this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      
  
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    //事件监听相关的方法
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    topScroll(position) {
      this.showBackTop = -position.y > 2000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    isImageFinshed() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //调用的获取数据方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: pink;
  color: #fff;
  position: sticky;
  top: 1px;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
