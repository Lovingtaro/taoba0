<template>
  
</template>
<script> 
  // 导入 axios   npm
import axios from 'axios';
//  导入moment npm
import moment from 'moment';
export default {
  name:"index",
  data:function(){
    return {
      //  分类列表
      catelist: [],
      //  轮播图
      sliderlist: [],
      //  置顶推荐
      toplist: []
    }
  },
//   生面周期函数
  created(){
     axios.get('http://111.230.232.110:8899/site/goods/gettopdata/goods')
      .then(result=> {
    this.toplist=result.data.message.toplist;
    this.sliderlist=result.data.message.sliderlist;
    this.catelist=result.data.message.catelist;
  })
  },
  filters: {
    shortTime: function (value) {
    return moment(value).format('YYYY年MM月DD日')
  }
  }
}

</script>

<style>
  
</style>
