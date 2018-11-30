<template>
  <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model.trim="user_name" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model.trim="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" @keyup.enter="login" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</template>
<script>
    export default{
        name:"login",
        data:function(){
            return{
            user_name:'',
            password:''
            }
        },
        methods:{
            login(){
                // 非空判断
                if(this.user_name==''||this.password==''){
                    this.$Message.warning("用户名或密码错误!")
                }else{
                    this.$axios.post('site/account/login',{
                        "user_name":this.user_name,
                        "password":this.password
                    }).then(result=>{
                        if(result.data.status===0){
                        this.$Message.success(result.data.message)
                        this.$store.commit('changeLogin',true);
                        this.$router.go(-1);
                        }else{
                        this.$Message.error(result.data.message) 
                        }
                        
                    })
                }

                
            }
        }

    }
</script>
<style>

</style>
