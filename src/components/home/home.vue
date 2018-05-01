<template>
	<div class="home">
		<div v-show="dataNews.length==0" class="loading">
			<loading></loading>
		</div>
		
		<scroll class="home_box" :data="dataNews" :pulldown="true" :pullup="true" @scrollToEnd="loadMore" :probeType="3" @pulldown="refreshData">
			<ul>
				<li v-for="item in dataNews" @click="goDetail(item)">
					<itemContent :itemNews="item" :now="now"></itemContent>
				</li>
				<li class="loadMore_data">{{loadMoreData}}</li>
			</ul>
		</scroll>
		
		<detail :detailData="detailData" @hidenDetail="detailData=null"></detail>
		
		
	</div>
</template>
<script>
import itemContent from '@/components/itemContent/itemContent.vue'
// import BScroll from 'better-scroll'
import loading from '@/components/loading/loading.vue'
import scroll from '@/components/scroll/scroll.vue'
import detail from '@/components/articleDetail/articleDetail.vue'
import {getNewsData,getNewsDetail} from '@/common/js/ajax.js'
	export default{
		data(){
			return{
				dataNews:[],
				now:new Date(),
				canLoad:true,
				detailData:null,
				loadMoreData:''
			}
		},
		components:{
			itemContent,
			loading,
			scroll,
			detail
		},
		created(){
			this.loadData();
		},
		methods:{
			loadData(time){

				let paras={
					aid: '1230',
					channel: 'm_web',
					device_platform: 'wap',
					category: 'motor_car',
					max_behot_time: '0',
					min_behot_time: '0',
					web_id: '6537520827524859405',
					impression_info: '{"page_id":"page_category","sub_tab":"motor_car","product_name":"m_station","zt":"default"}',
					tt_from:''
				
				};
				if(time){
					paras.max_behot_time=time;
					paras.tt_from='load_more'
				}else{
					this.dataNews=[];
				}
				getNewsData(paras,(res)=>{
					this.canLoad=true;
					this.loadMoreData='';
					var data=res.data;
					if(data.length){
						this.dataNews.push(...data);
					}
				})
				
			},
			goDetail(item){
				this.detailData=null;
				this.loadDeatil(item.unique_id_str)
			},
			loadDeatil(id){
				getNewsDetail({
						group_id:id
					},(res)=>{
						var data=res.data;
						this.detailData=data;
						// console.log(data)
					})
				
			},
			loadMore(){
				if(this.canLoad){
					this.canLoad=false;
					this.loadMoreData='加载更多'
					this.loadData(this.dataNews[this.dataNews.length-1].info.behot_time)
					}
			},
			refreshData(){
				if(this.canLoad){
					this.canLoad=false;
					this.loadData()
				}
			}
			
		},
		computed:{
			// beTime(){
			// 	return new Date(this.detailData.publish_time).format('MM-dd hh:mm')
			// }
		}
	}
</script>
<style src="./home.css" scoped>
</style>