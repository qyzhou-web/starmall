<template>
 
  <div class="tab-bar-item" @click='itemClick()'>
      <div v-if="!isActive"><slot name="tab-bar-item"></slot></div>
      <div v-else><slot name="tab-bar-item-active"></slot></div>
      <div><slot name="tab-bar-text"></slot></div>
  </div>
</template>

<script>
export default {
props: {
    path:String
},
computed:{
    isActive(){
        return this.$route.path.indexOf(this.path)!==-1
    },
    activeStyle(){
        return this.isActive ? {color: this.activeColor}:{}
    }
},
methods :{
    itemClick(){
        this.$router.replace(this.path)
    }
}
}
</script>

<style>
 .tab-bar-item {
      flex: 1;
      text-align: center;
      height: 49px;
      font-size: 14px;
  }
  .tab-bar-item img {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }
</style>