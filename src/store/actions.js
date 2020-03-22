import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type.js'
export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
          // console.log(payload)
    // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item=>item.iid===payload.iid)
    // console.log(oldProduct)
    if(oldProduct){
      // console.log('1')
      // oldProduct.count +=1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('当前商品的数量+1')
    } else {
      // const count = 1
      oldProduct = payload
      oldProduct.count =1
      context.commit(ADD_TO_CART,oldProduct)
      resolve('添加了新的商品')
      reject('tanjia')
    }
    })
  }
}