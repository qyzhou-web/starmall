<template>
  <swiper>
    <swiper-item v-for="(item,key) in banners" :key="key">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    imageLoad(){
        if(!this.isLoaded){
       this.$emit('isImageFinshed')
       this.isLoaded = true

       }
       
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style>
</style>