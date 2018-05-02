<template>
  <div class="ranking">
  	<div class="series_title">
  		<span  v-for="(item,index) in seriesArr" @click="chooseSeries(item)" :class="{active:type==item.type}">{{item.name}}</span>
  	</div>
  	<div class="type_title">
  		<span v-for="item in typeObj[type]">{{item.name}}</span>
  	</div>
 </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
	data(){
		return {
			type:'100',
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
			}
		}
	},
 methods:{
 	chooseSeries(item){
 		this.type=item.type;
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