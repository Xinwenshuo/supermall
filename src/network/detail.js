import { request } from './request'
// 详情页的全部信息
export function getDetail(iid){
  return request({
    url : "/detail",
    params:{
      iid:iid
    }
  })
}
//获取详情页里的推荐信息
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}


//获取商品信息
export class Goods {
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
//获取店铺信息
export class Shop{
  constructor(shopInfo){
    this.log = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
// // 5.获取参数的信息
export class GoodsParam {
  constructor(info,rule){
    this.image = info.images ? info.images[0]:'';
    this.infos = info.set;
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
