<template>
  <div class="carFriends_box">
  	<div v-show="dataList.length==0" class="loading">
		<loading></loading>
	</div>
	<scroll class="video_box" :data="dataList" :pulldown="true" :pullup="true" @scrollToEnd="loadMore" :probeType="3" @pulldown="refreshData">
		<ul>
			<li v-for="item in dataList" @click="goDetail(item)">
				<friendItem :itemData="item"></friendItem>
			</li>
			<li class="loadMore_data">{{loadMoreData}}</li>
		</ul>
	</scroll>
 </div>
</template>

<script>
import {getVideo} from '@/common/js/ajax.js'
import loading from '@/components/loading/loading.vue'
import scroll from "@/components/scroll/scroll.vue"
import friendItem from "@/components/friendItem/friendItem.vue"
export default {
	data(){
		return{
			dataList:[],
			loadMoreData:'',
			canLoad:true
		}
	},
	mounted(){
		
	},
    created(){
    	this.loadData();
    },
    components:{
    	loading,
    	scroll,
    	friendItem
    },
    methods:{
    	loadData(time){
    		let paras={
				aid: '1230',
				channel: 'm_web',
				device_platform: 'wap',
				category: 'motor_car_cmg',
				max_behot_time: '0',
				min_behot_time: '0',
				web_id: '6547505738175661581',
				impression_info: '{"page_id":"page_cmg_list","product_name":"m_station","zt":"default"}',
				tt_from:''
			
			};
			if(time){
				paras.max_behot_time=time;
				paras.tt_from='load_more'
			}else{
				this.dataList=[];
			}

			getVideo(paras,(res)=>{
				this.loadMoreData='';
				this.canLoad=true;
				let data=res.data;
				if(data.length){
					this.dataList.push(...data)
				}
			})
    	},
    	goDetail(item){

    	},
    	loadMore(){
			if(this.canLoad){
				this.canLoad=false;
				this.loadMoreData='加载更多'
				this.loadData(this.dataList[this.dataList.length-1].info.behot_time)
				}
		},
		refreshData(){
			if(this.canLoad){
				this.canLoad=false;
				this.loadData()
			}
		}
    }

}
</script>

<style scoped src="./carFriends.css">
</style>