export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    
    // console.log(this.$store.state.cartList)
    return state.cartList
  }
}