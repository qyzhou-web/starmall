<template>

    <div class="toast">{{message}}</div>

</template>

<script>
	export default {
		name: "Toast",
    data() {
			return {
				
        message: '加入购物车'
      }
    },
  
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
  }

  /* .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  } */
  /* .fade-enter, .fade-leave-to {
    opacity: 0;
  } */
</style>