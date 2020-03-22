       //防抖动
       export function debounce(func,delay){
        let timer = null
        return function(...args){
          if(timer) clearTimeout(timer)
          timer = setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      }
/**
 * ***js时间日期格式化*** <br>
 * <p>
 * 模版字符串采用严谨格式，超出则会抛出异常，且每类格式只可出现一次，如:yyyy-mm-yyyy 格式会抛异常
 * </p>
 * y-年    length: 2/4位 <br>
 * q-季度    length: 1位 <br>
 * M-月    length: 1~2位 <br>
 * d-日    length: 1~2位 <br> 
 * H-时    length: 1~2位24小时制，h：12小时制 <br>
 * m-分    length: 1~2位 <br>
 * s-秒    length: 1~2位 <br>
 * S-毫秒 length: 固定1位
 * @param {Date类型对象} date
 * @param {String类型模板字符串} fmt
 * @return 格式化后时间日期字符串
 * @author lyt
 */ 
export function DateFormat(date, fmt){
  if (arguments.length != 2) // 参数个数校验
      throw Error('arguments长度不合法');
  if (!date || (typeof date != 'object') || (date.constructor != Date)) // 参数合法性校验
      throw Error(arguments[0] + ':类型不为Date类型');
  if (/H+/.test(fmt) && /h+/.test(fmt))
      throw Error("小时格式错误，同类型只能连续出现一次！");
  /* 模板参数校验，正则验证方法 */
  var verify = function(Rex ){
      var arr = new RegExp(Rex).exec(fmt); // 获得匹配结果数组
      if (!arr) // 匹配失败返回
          return "";
      if (fmt.split(Rex).length > 2)  // 同一类型间隔出现多次
          throw Error("fmt格式错误：同类型只能连续出现一次！");
      return arr[0];
  };
  /**
   * 提供月、天、时、分、秒通用匹配替换
   * @param {对象o属性key} r
   * @param {r对应正则对象} rex
   **/
  var common = function(r, rex) {
      if(len !=1 && len !=2)
          throw Error("月份格式错误:M只能出现1/2次");
      len == 2 ? fmt=fmt.replace(rex, o[r].length==1 ? "0"+o[r] : o[r]) : fmt=fmt.replace(rex, o[r]);
  }
  var o = { // 数据存储对象
      "y+": date.getFullYear() + "", // 年
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      "M+": date.getMonth() + 1 + "", // 月
      "d+": date.getDate() + "", // 日
      "H+": date.getHours() + "", // 24时
      "h+": date.getHours() + "", // 12时
      "m+": date.getMinutes() + "", // 分
      "s+": date.getSeconds() + "", // 秒
      "S+": date.getMilliseconds() // 毫秒
  }
  for(var r in o) {
      var rex, len, temp;
      rex = new RegExp(r);
      temp = verify(rex); // 匹配所得字符串
      len = temp.length; // 长度
      if(!len || len == 0)
          continue;
      if(r == "y+") {
          if(len !=2 && len != 4)
              throw Error("年份格式错误:y只能出现2/4次");
          len == 2 ? fmt=fmt.replace(rex, o[r].substr(2,3)) : fmt=fmt.replace(rex, o[r]);
      } else if(r == "q+") {
          if(len != 1)
              throw Error("季度格式错误:q只能出现1次");
          fmt=fmt.replace(rex, o[r]);
      } else if(r == "h+") {
          if(len !=1 && len !=2)
              throw Error("小时格式错误:h只能出现1/2次");
          var h = (o[r] > 12 ? o[r]-12 : o[r]) + "";
          len == 2 ? fmt=fmt.replace(rex, h.length==1 ? "0"+h : h) : fmt=fmt.replace(rex, h);
      }  else if(r == "S+") {
          if(len != 1)
              throw Error("毫秒数格式错误:S只能出现1次");
          fmt=fmt.replace(rex, o[r]);
      }else {    // (r=="M+" || r=="d+" || r=="H+" || r=="m+" || r=="s+")
          common(r, rex)
      } 
  }
  return fmt;
}