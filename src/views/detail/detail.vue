<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @tabClick="tabClick" ref="navbar"></detail-nav-bar>
    <Scroll class="content" ref="scroll" :probeType="3" @topScroll="topScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommendList" ref="goods"></goods-list>
    </Scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backTop" v-show="showBackTop"></back-top>
    <toast v-show="isShow" ref="toast" />
  </div>
</template>

<script>
import DetailNavBar from "./childDeail/detailNavbar";
import DetailSwiper from "./childDeail/detailSwiper";
import DetailBaseInfo from "./childDeail/detailBaseInfo";
import DetailShopInfo from "./childDeail/detailShopInfo";
import DetailGoodsInfo from "./childDeail/detailGoodsInfo";
import DetailParamInfo from "./childDeail/detailParamInfo";
import DetailBottomBar from "./childDeail/detailBottomBar";
import Scroll from "components/common/scroll/Scroll.vue";
import { backTopMixin } from "common/mixin.js";
import DetailCommentInfo from "./childDeail/detailCommentInfo";
import GoodsList from "components/content/goods/GoodsList.vue";
import Toast from "components/common/toast/Toast";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
    Scroll
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      tabClickY: [],
      currentIndex: 0,
      isShow: false
    };
  },
  created() {
    //取出iid
    this.iid = this.$route.params.iid;
    //发送商品请求
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      //商品的详细数据
      this.detailInfo = data.detailInfo;
      //6.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      getRecommend().then(res => {
        this.recommendList = res.data.list;
      });
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.tabClickY.push(0);
      this.tabClickY.push(this.$refs.param.$el.offsetTop);
      this.tabClickY.push(this.$refs.comment.$el.offsetTop);
      this.tabClickY.push(this.$refs.goods.$el.offsetTop);
      this.tabClickY.push(Number.MAX_VALUE);
    },
    tabClick(index) {
      this.$refs.scroll.scrollTo(0, -this.tabClickY[index], 100);
    },

    topScroll(position) {
      this.showBackTop = -position.y > 2000;
      let length = this.tabClickY.length;
      let positionY = -position.y;

      for (let i = 0; i <= length - 1; i++) {
        //在数组中加入一个最大值来使判断条件可以满足大于前一个，小于后一个
        if (
          this.currentIndex !== i &&
          positionY >= this.tabClickY[i] &&
          positionY < this.tabClickY[i + 1]
        ) {
          // if(this.currentIndex!==i&&((i<(length-1)&&positionY >=this.tabClickY[i]&&positionY<this.tabClickY[i+1])
          // ||(i===(length-1)&&positionY>=this.tabClickY[i])))
          this.currentIndex = i;

          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      //获取需要在购物车中展示的信息
      const product = {};
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      //加这些信息加入vuex

      this.$store.dispatch("addCart", product);

      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>