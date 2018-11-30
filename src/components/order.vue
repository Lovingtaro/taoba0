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
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url>
              <!-- element-ui的form表单 -->
              <!-- el-提交表单时ref和表单绑定数据一致 -->
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="收货人姓名" prop="accept_name">
                  <el-input v-model="ruleForm.accept_name"></el-input>
                </el-form-item>
                <el-form-item label="所属地区" prop="area">
                  <VDistpicker
                    @selected="selectedArea"
                    :province="ruleForm.area.province.value"
                    :city="ruleForm.area.city.value"
                    :area="ruleForm.area.area.value"
                  ></VDistpicker>
                </el-form-item>

                <el-form-item label="详细地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="post_code">
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>

                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                      <el-radio v-model="ruleForm.payment_id" :label="6">在线支付</el-radio>
                      <em>手续费：0.00元</em>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <label>
                       
                        <el-radio  v-model="ruleForm.express_id"  :label="1" @change="ruleForm.expressMoment=20">顺丰快递&nbsp;&nbsp;&nbsp;<em>费用：20.00元</em></el-radio>
                        <el-radio  v-model="ruleForm.express_id"  :label="6" @change="ruleForm.expressMoment=8">韵达快递&nbsp;&nbsp;&nbsp;<em>费用：8.00元</em></el-radio>
                        <el-radio  v-model="ruleForm.express_id" :label="9" @change="ruleForm.expressMoment=10">圆通快递&nbsp;&nbsp;&nbsp;<em>费用：10.00元</em></el-radio>
                
                      <span class="Validform_checktip"></span>
                    </label>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <!-- 商品数据 -->
                    <tr v-for="item in goodsList" :key="item.id">
                      <td width="68">
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">
                          <img :src="item.img_url" class="img">
                        </router-link>
                        <!-- </a> -->
                      </td>
                      <td>
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>

                        <!-- </a> -->
                      </td>
                      <td>
                        <span class="red">￥{{item.sell_price}}</span>
                      </td>
                      <td align="center">{{item.buyCount}}</td>
                      <td>
                        <span class="red">￥{{item.buyCount*item.sell_price}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea name="message" class="input" style="height:35px;"></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalbuyCount}}</label>件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{totalPrice}}</label>元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label>元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                    </p>
                    <p class="btn-box">
                      <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                      <router-link class="btn button" to="/shopcart">返回购物车</router-link>
                      <a id="btnSubmit" @click="submit('ruleForm')"  class="btn submit">确认提交</a>
                    </p>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 注册省市联动插件
import VDistpicker from "v-distpicker";
export default {
  name: "order",

  data: function() {
        // 自定义校验规则 函数 会被element-ui内部调用
     var validateMobile = (rule, value, callback) => {
      //  console.log(value)
       // 空值判断
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          // 非空 格式验证
          // 正则表达式的规则
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          // 用正则判断对错
          if(reg.test(value)==true){
            callback();
          }else{
            // 格式不对
            callback(new Error('请输入正确的手机号！'));
          }
       
        }
      };
      // 自定义校验规则 函数 会被element-ui内部调用
     var validateEmail = (rule, value, callback) => {
      //  console.log(value)
       // 空值判断
        if (value === '') {
          callback(new Error('请输入邮箱地址'));
        } else {
          // 非空 格式验证
          // 正则表达式的规则
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          // 用正则判断对错
          if(reg.test(value)==true){
            callback();
          }else{
            // 格式不对
            callback(new Error('请输入正确的邮箱地址！'));
          }
       
        }
      };
    // 自定义校验规则 函数 会被element-ui内部调用
     var validatePostCode = (rule, value, callback) => {
      //  console.log(value)
       // 空值判断
        if (value === '') {
          callback(new Error('请输入邮编'));
        } else {
          // 非空 格式验证
          // 正则表达式的规则
          let reg = /^[1-9]\d{5}(?!\d)$/;
          // 用正则判断对错
          if(reg.test(value)==true){
            callback();
          }else{
            // 格式不对
            callback(new Error('请输入正确的邮编！'));
          }
       
        }
      };
    return {
      ids:'',
      goodsList: [],
      totalPrice: 0,
      totalbuyCount: 0,
      ruleForm: {
        // 收货人姓名
        accept_name: "",
        // 收货人地址
        address: "深圳市南山村西巷12号",
        // 收货人手机号
        mobile: "16608661397",
        // 邮箱地址
        email: "732704471@qq.com",
        // 邮编
        post_code: "430305",
        // 地区
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440305",
            value: "南山区"
          },
        },
          payment_id:6,
          express_id:1,
          expressMoment:20,
          message:''
      },
      rules: {
        accept_name: [
          // required 必须  message 提示信息  trigger 触发时机
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          // min 最短  max 最长   message 提示信息   trigger 触发时机
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        address: [
          // required 必须  message 提示信息  trigger 触发时机
          { required: true, message: "请输入收货人地址", trigger: "change" },
          // min 最短  max 最长   message 提示信息   trigger 触发时机
          { min: 2, message: "你地址只有这么短?", trigger: "change" }
        ],
        // 手机号的验证规则
        mobile: [{ validator: validateMobile, trigger: "change" }],
        // 邮箱的验证规则
        email: [{ validator: validateEmail, trigger: "change" }],
        // 邮箱的验证规则
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods:{
       selectedArea(newArea){
      // console.log(newArea);
      this.ruleForm.area = newArea;
    },
    submit(ruleForm){      
      this.$refs[ruleForm].validate((valid) => {
          if (valid) {
           this.ruleForm.goodsAmount = this.totalPrice;
        // 商品id们
          this.ruleForm.goodsids = this.ids;
           // {id:个数,id2:个数}
          let obj = {};
          this.goodsList.forEach(v => {
            obj[v.id] = v.buyCount;
          });
          // 商品对象
          this.ruleForm.cargoodsobj = obj;
           this.$axios
            .post("site/validate/order/setorder", this.ruleForm)
            .then(result => {
              this.$Message.success("订单提交成功");
               // 删除Vuex中的 当前这一次 购买的数据
              this.goodsList.forEach(v=>{
                this.$store.commit('delGoodsById',v.id);
              })
              // 跳转路由
              this.$router.push("/payMoney/"+result.data.message.orderid);
              
              
             
            });
          } else {
            this.$Message.warning('数据不完整请补充！');
            return false;
          }
        });
    }

       
  },
  created() {
    //  动态路由匹配接收
    this.ids = this.$route.params.ids;
    // 调用接口
    this.$axios.get(`site/validate/order/getgoodslist/${this.ids}`).then(result=>{
          console.log(result);
        // buycount 服务器是不知道的 我们要人为的 设置
        this.goodsList = result.data.message;
        // 动态的修改buycount的值 
        result.data.message.forEach(v=>{
            // 通过Vuex获取购买数量
            // 因为buycount这个字段 一直都在 所以 不需要Vue.set 
            // 如果是 本来没有 自己额外增加的 才需要 
            v.buyCount = this.$store.state.cartData[v.id];
            // 累加总个数
            this.totalbuyCount+=v.buyCount; 
            // 累加总金额
            this.totalPrice+=(v.buyCount*v.sell_price)
        })
        // console.log(this.goodsList);
        // console.log(result);
      })
    },
  components: { VDistpicker }
};
</script>
<style>
</style>
