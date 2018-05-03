<template>
  <div class="ranking">
  	<div class="series_title">
  		<span  v-for="(item,index) in seriesArr" @click="chooseSeries(item)" :class="{active:seriesType==item.type}">{{item.name}}</span>
  	</div>
  	<div class="type_title" ref="type_title">
  		<span v-for="item in typeObj[seriesType]"  @click="chooseType(item)" :class="{active:type==item.type}">{{item.name}}</span>
  	</div>
  	<div v-show="datalist.length==0" class="loading">
			<loading></loading>
		</div>
  	<scroll class="ranking_box" :data="datalist" :pulldown="true" :pullup="true" @scrollToEnd="loadMore" :probeType="3">
			<ul>
				<li v-for="item in datalist" class="list_content"  @click="seriesId=item.series_id">
					<div class="rank">
						<div v-if="item.rank===1">
							<img src="./img/one.png" alt="">
						</div>
						<div v-else-if="item.rank===2">
							<img src="./img/two.png" alt="">
						</div>
						<div v-else-if="item.rank===3">
							<img src="./img/three.png" alt="">
						</div>
						<div v-else>
							{{item.rank}}
						</div>
						<div class="rank_change">
							<div v-if="item.rank>item.last_rank">
								<i class="iconfont icon-down down"></i><span>{{item.rank-item.last_rank}}名</span>
							</div>
							<div v-else-if="item.rank<item.last_rank">
								<i class="iconfont icon-up up"></i><span>{{item.last_rank-item.rank}}名</span>
							</div>
							<div v-else>-</div>
						</div>
					</div>
					<div class="img_box">
					  <img v-lazy="item.image">
					</div>
					<div class="content_box">
						<div class="name">
						{{item.series_name}}</div>
						<div class="price">{{item.min_price}}-{{item.max_price}}万</div>
					</div>
				</li>
				<li class="loadMore_data">{{loadMoreData}}</li>
			</ul>
		</scroll>
		<series :seriesId="seriesId" @hiden="hiddenSeries"></series>
 </div>
</template>

<script>
import scroll from '@/components/scroll/scroll.vue'
import loading from '@/components/loading/loading.vue'
import series from '@/components/carSeries/carSeries.vue'
import {mapMutations} from 'vuex'
import {getRanking} from '@/common/js/ajax.js'
export default {
	data(){
		return {
			type:'100',
			seriesType:'100',
			seriesArr:[{type:'100',name:'轿车'},{type:'200',name:'SUV'},{type:'300',name:'MPV'}],
			typeObj:{
				'100':[
					{type:'100',name:'全部'},
					{type:'2',name:'紧凑型车'},
					{type:'0',name:'微型车'},
					{type:'1',name:'小型车'},
					{type:'3',name:'中型车'},
					{type:'4',name:'中大型车'},
					{type:'5',name:'大型车'}
				],
				'200':[
					{type:'200',name:'全部'},
					{type:'11',name:'紧凑型SUV'},
					{type:'10',name:'小型SUV'},
					{type:'12',name:'中型SUV'},
					{type:'13',name:'中大型SUV'},
					{type:'14',name:'大型SUV'}
				],
				'300':[
					{type:'300',name:'全部'},
					{type:'21',name:'紧凑型MPV'},
					{type:'20',name:'小型MPV'},
					{type:'22',name:'中型MPV'},
					{type:'23',name:'大型MPV'}
				],
			},
			datalist:[],
			canLoad:true,
			loadMoreData:'',
			imageArr:['./img/1.png','./img/2.png','./img/3.png'],
			seriesId:0
		}
	},
	created(){
		this.loadData();
	},
	components:{
		scroll,
		loading,
		series
	},
	 methods:{
	 	chooseSeries(item){
	 		this.type=item.type;
	 		this.seriesType=item.type;
	 		this.$refs.type_title.scrollLeft=0;
	 		this.datalist=[];
	 		this.loadData()
	 	},
	 	chooseType(item){
	 		this.type=item.type;
	 		this.datalist=[];
	 		this.loadData()
	 	},
	 	loadData(){
	 		var params={
	 			rank_type:this.type,
	 			offset:this.datalist.length,
	 			limit:15
	 		}
	 		getRanking(params,(res)=>{
	 			this.canLoad=true;
	 			this.loadMoreData='';
	 			this.datalist.push(...res.data)
	 		})
	 	},
	 	loadMore(){
	 		if(this.canLoad){
	 			this.canLoad=false;
	 			this.loadMoreData='加载更多'
	 			this.loadData();
	 		}
	 	},
	 	refreshData(){
	 		if(this.canLoad){
	 			this.canLoad=false;
	 			this.datalist=[];
	 			this.loadData();
	 		}
	 	},
	      hiddenSeries(){
	        this.seriesId=0;
	      },
	 	selectRank(){
	 		// this.$router.push({

	 		// })
	 		this.rankType()
	 	},
	 	...mapMutations({
	 		rankType:'RANK_TYPE'
	 	})
 }
}
</script>

<style scoped src="./ranking.css">
</style>