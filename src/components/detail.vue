<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="this.images.normal_size.length!=0"
  :base-images="images"
  :base-zoomer-options="zoomerOptions"
/>
                            </div>
                            <div class="goods-spec" >
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                 <el-input-number v-model="buyCount" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button  class="add" @click="add2cart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                        <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="tabNum=0" :class="{selected:tabNum==0}" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;"  @click="tabNum=1" :class="{selected:tabNum==1}" >商品评论</a>
                                    </li>
                                </ul>
                            </div>
                        </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="tabNum==0" >
                               
                            </div>
                            <div class="tab-content" v-show="tabNum==1" >
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="message" @keyup.enter.prevent="addComments" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="addComments" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="pageSize==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in messages" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                         <Page :total="totalcount" show-sizer :page-size=6 placement="top"
                                               :show-elevator=true  :page-size-opts="[6,8,10]"  
                                                @on-change="pageChange" @on-page-size-change="sizeChange"
                                               />
                                    
                                </div>
                            </div>  
                           
                        </div>
                        
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <router-link :to="'/detail/'+item.id">
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/90" class="">
                                                <img :src="item.img_url">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <BackTop></BackTop>
    </div>
</template>
<script>
   export default{
       name:"detail",
       data:function(){
           return{
                    // 商品id
            artID: "",
            // 服务器返回的商品数据
            // 商品详情
            goodsinfo: {},
            //   热卖商品
            hotgoodslist: [],
            //   图片列表
            imglist: [],
            buyCount:"0",
            tabNum:0,
            totalcount:0,
            pageIndex:1,
            pageSize:6,
            comments:[] ,
            messages:[],
            message:"",
            images:{
              'normal_size':[]
            },
           zoomerOptions: {
            'zoomFactor': 4,
            'pane': 'pane',
            'hoverDelay': 300,
            'namespace': 'zoomer',
            'move_by_click':false,
            'scroll_items': 7,
            'choosed_thumb_border_color': "#dd2c00"
            }
            }
        },
        methods:{
            initData(){
            this.artID = this.$route.params.artID; 
            this.$axios.get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`)
            .then(result=>{
                // console.log(result)
                this.goodsinfo=result.data.message.goodsinfo
                this.hotgoodslist=result.data.message.hotgoodslist
                this.imglist=result.data.message.imglist
                // 设置给放大镜的个数
                this.images.normal_size=[];
                this.imglist.forEach(ele=> {
                   this.images.normal_size.push({
                       id:ele.id,
                       url:ele.original_path
                   }) 
                });
            });
                this.getComments();
            },
            getComments(){
                this.$axios.get(`http://111.230.232.110:8899/site/comment/getbypage/goods/${this.artID
                }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(result=>{
                    console.log(result)
                    this.messages=result.data.message
                    this.totalcount=result.data.totalcount
                })
                },
            pageChange(pageIndex) {
                //console.log(pageSize);
                this.pageIndex = pageIndex;
                // 重新获取这一页的数据
                this.getComments();
            },
            sizeChange(pageSize){
                this.pageSize=pageSize;
                this.getComments();
            },
            addComments(){
                 //事件对象的keyCode属性获取按键

                // e.preventDefault();
                if(this.message==""){
                   this.$Message.warning('请输入搜索内容哦！');
                    return;
                }
                this.$axios.post(`/site/validate/comment/post/goods/${this.artID}`,{
                    "commenttxt":this.message
                }).then(result=>{
                this.pageIndex = 1;
                this.getComments();
                this.message="";
                this.$Message.success('评论成功！');
            });
            },
            add2cart(){
                // 获取商品Id,获取商品名称
                // 提交载荷
                this.$store.commit('add2cart',{
                    goodId:this.artID,
                    goodNum:this.buyCount
                })
            }   
        },   
        created() {
        // console.log(this.$route.params);
            // 保存数据
        this.initData();
    },
    watch:{
           // 如果 `question` 发生改变，这个函数就会运行
    $route(newQ, oldQ) {
        this.initData();
        this.images.normal_size=[];
    }
    }
   } 
</script>
<style>
 .tab-content img{
     display:block;
     max-width:900px;
 }
 .preview-box,
 .thumb-list{
     width:395px;
 } 
 .responsive-image{
     width: 30px;
     height: 30px;
 }
 .responsive-image img{
     width: 185px;
    height: 185px;
 }
</style>
