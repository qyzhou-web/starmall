export default{
    addCart(context, payload) {
        let oldProduct = null;
        //判断之前的商品列表里是否存在此产品,如果存在，
        //则给这个产品本来已经存在的数量加一，如果不存在，说明此产品是新产品，给此产品赋值初始化count
        for (let item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item
          }
        }
        if (oldProduct) {
          //oldProduct.count += 1
          context.commit('addCounter',oldProduct)
        } else {
          payload.count = 1
          //context.state.cartList.push(payload)
          context.commit('addToCart',payload)
        }
  
  
        
      }
  }