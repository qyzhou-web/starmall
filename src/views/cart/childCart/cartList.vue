<template>
  <scroll class="cart-list" :data="[cartList]">
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  </scroll>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    CartListItem,
    Scroll
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
 
};
</script>

<style scoped>
.cart-List {
  height: 100vh;
}

.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 93px;
}
</style>