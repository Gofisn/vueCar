<template>
  <div class="select">
    <scroll class="selectBox" :data="selectDataAll" ref="selectBox">
        <div>
          <ul class="car_brand" v-if="carBrand.brand">
            <li v-for="item in carBrand.brand" class="brand_item" @click="chooseCarbrand(item)">
              <img v-lazy="item.image_url">
              <span>{{item.brand_name}}</span>
            </li>
          </ul>
          <ul class="car_series" v-if="carBrand.series">
            <li v-for="item in carBrand.series" class="series_item">
              <img v-lazy="item.cover_image">
              <div>{{item.series_name}}</div>
            </li>
          </ul>
          <div class="select_sort" v-if="selectSort.data">
            {{selectSort.data.params_select_car_bar.expand_text}}
            <i class="iconfont icon-right right"></i>
          </div>
          <ul v-if="sortCarArr.length">
            <li v-for="list in sortCarArr" ref="carLists">
              <div class="car_head">
                {{list.pinyin}}
              </div>
              <ul>
                <li v-for="item in list.items"  class="car_item">
                  <img v-lazy="item.image_url" alt="" class="car_logo">
                  <div class="car_name">
                    {{item.brand_name}}
                    <span v-if="item.dealer_tag==1" class="price_reduct">降价</span>
                    <span v-if="item.dealer_tag==2" class="price_hort">热门</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <div v-show="sortCarArr.length==0" class="loading">
            <loading></loading>
          </div>
        </div>
    </scroll>
  	 <ul class="ruler">
        <li v-for="(item,index) in sortCarArr" @click="jumpClassify(index)">{{item.pinyin}}</li>   
    </ul>
    <div>
      
    </div>
 </div>
</template>

<script>
import scroll from '@/components/scroll/scroll.vue'
import loading from '@/components/loading/loading.vue'
import {getSelectData} from '@/common/js/ajax.js'
export default {
	data(){
		return {
			carBrand:{},
      selectSort:{},
      selectDataAll:[],
      sortCarArr:[]
		}
	},
	created(){
    this.loadData();
	},
    beforeRouteEnter:(to,from,next)=>{
	 next(vm=>{
	  	vm.$root.eventHub.$emit('changeRoute',to)
	  });
    },
    methods:{
    	loadData(){
        getSelectData(null,(res)=>{
          var data=res.data;
          this.selectDataAll=data;
          this.carBrand=data[0].info;
          this.selectSort=data[1].info;
          this.sortList(data)
        })
    	},
      chooseCarbrand(data){
        console.log(data)
      },
      sortList(list){
        // 得到对象
        let carObj={}
        list.forEach((item,index,arr)=>{
          if(item.type=='1001'){
            const key =item.info.pinyin
            if(!carObj[key]){
              carObj[key]={
                pinyin:key,
                items:[]
              }
            }
            carObj[key].items.push(item.info)
          }
        })
        // 得到有序数组
        let carArr=[];
        for (let key in carObj){
          let value=carObj[key];
          carArr.push(value)
        }
        carArr.sort((a,b)=>{
          return a.pinyin.charCodeAt(0)-b.pinyin.charCodeAt(0);
        })
        this.sortCarArr=carArr;
        // console.log(this.sortCarArr)
      },
      jumpClassify(index){
        this.$refs.selectBox.scrollToElement(this.$refs.carLists[index],20)
      }
    },
    components:{
      loading,
      scroll
    }
}
</script>

<style src="./select.css" scoped>
</style>