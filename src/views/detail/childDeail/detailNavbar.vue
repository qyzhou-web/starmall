<template>
  <div id="DetailNavbar">
    <nav-bar>
      <div slot="center" class="title">
        <div
          class="detailNavbarItem"
          v-for="(item,index,key) in titles"
          :key="key"
          :class="{active:currentIndex===index}"
          @click="indexChange(index)"
        >{{item}}</div>
      </div>
      <div slot="left" class="back" @click="backToHome">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavbar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    indexChange(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    },
    backToHome(){
     this.$router.go(-1)   
    }
  }
};
</script>

<style scoped>
#DetailNavbar{
  z-index: 10;
}
.title {
  display: flex;
  font-size: 14px;
}
.detailNavbarItem {
  flex: 1;
}
.active {
  color: pink;
}
.back img{
    margin-top: 8px

}
</style>