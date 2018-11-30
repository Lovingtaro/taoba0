<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>   
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="center">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr>
                                       <tr v-for="item in goodsList" :key="item.id">
                                      <td>
                                        <el-switch
                                            v-model="item.isSelected"
                                            active-color="#13ce66"
                                            inactive-color="#9e9e9e"
                                        ></el-switch>
                                    </td>
                                    <td colspan="2">
                                        <img :src="item.img_url" alt="">
                                        <span>{{item.title}}</span> 
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                     <td>
                                        <el-input-number v-model="item.buyCount"  :min="0" ></el-input-number>
                                    </td>
            
                                    <td align="center">{{item.buyCount*item.sell_price}}</td>
                                    <td align="center"> 
                                        <el-button type="danger" icon="el-icon-delete" @click="delOne(item.id)"  circle></el-button>
                                        <!-- <el-button type="text" @click="open2">点击打开 Message Box</el-button> -->
                                    </td>
                                   
                                </tr>
                                <tr v-show="goodsList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selectedPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                             <!-- 1.声明式导航,routerlink 地址写法固定,需要修改 结构删除 routerlink绑定点击事件
                            2.selectedIds
                                watch
                                    watch观察goodlist deep(深度侦听监听第二层几以后层次)
                                    数据改变后重新复制selectedIds赋值,
                                    使用计算属性
                                        只需要使用一个计算属性即可selectedIds -->
                            
                            <router-link :to="'/order/'+selectedIds">
                            <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


    <audio controls="controls" style="display: none;"></audio>
</div>
</template>

<script>
export default {
  name: "shopcart",
  data: function() {
    return {
      goodsList: []

    };
  },
     methods:{
       
       delOne(id) {
      this.$confirm("此操作将删除该商品, 是否删除?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "继续保留",
        type: "warning"
      })
        .then(() => {
          // 删除数据
          // 删除当前这个组件中的数据
          this.goodsList.forEach((v, index) => {
            if (v.id == id) {
              this.goodsList.splice(index, 1);
            }
          });
          // 删除Vuex中的数据
          // 因为 watch 会监控数据的改变 修改 删除 都会触发 同步更新Vuex中的数据
          //   this.$store.commit('delGoodsById',id);
          // 提示用户
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  
  },
  created() {
    let ids = "";
    for (const key in this.$store.state.cartData) {
      ids += key, 
      ids += ","
    }
    ids = ids.slice(0, ids.length - 1);
    
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(result => {
      result.data.message.forEach(v => {
          console.log(result);
          
        v.buyCount = this.$store.state.cartData[v.id];
        //    this.goodList=this.
        v.isSelected=true;
        // console.log(result);
      });
       // 如果 是先加字段 再 赋值给 vue的数据 就不需要使用$set
        this.goodsList = result.data.message;
    });

  },
  destroyed() {
       
            
        
        
  },
  computed:{
    // 计算总件数
     selectedCount(){
         let num=0;
         this.goodsList.forEach(v => {
             if(v.isSelected==true){
                 num+=v.buyCount
             }
         });
         return num;
     },
    //  计算总价格
     selectedPrice(){
         let price=0;
         this.goodsList.forEach(v => {
             if(v.isSelected==true){
                 price+=(v.buyCount*v.sell_price)
             }
         });
         return price;
     },
     selectedIds(){
         let ids='';
         this.goodsList.forEach(v => {
             if(v.isSelected==true){
             ids+=v.id
             ids+=','
             }
         });
         return ids.slice(0,ids.length-1);
     }
  },
  watch: {
    goodsList: {
      //    引用类型两次值都是一样
      //     不能使用箭头函数this会指向全局
      handler: function(newData, oldData) {
        let obj = {};
        newData.forEach(ele => {
          obj[ele.id] = ele.buyCount;
        });
        // 提交载荷
        this.$store.commit("updateCartData",obj);
      },
      deep: true
    }
  }
};
</script>
<style>
.el-input-number {
  width: 126px;
}

.el-input-number__decrease {
  margin-left: 0;
}
td img {
  height: 60px;
  vertical-align: middle;
}
td span {
  margin-left: 20px;
}
</style>
