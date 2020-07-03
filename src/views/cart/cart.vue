<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车( {{cartLength}})</div>
    </nav-bar>

    <cart-list :cart-list="cartList"/>
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childCart/cartList";
 import CartBottomBar from './childCart/CartBottomBar'
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"])
  },
}
</script>

<style scoped>

.cart-nav {
  background-color: pink;
  color: #ffff;
   z-index: 9;
   position: relative;
}
</style>