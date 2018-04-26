<template>
	<div v-if="seriesObject" class="series_box">
		<v-head :backBtn="true" :title="seriesObject.concern_obj.name"></v-head>
	</div>
</template>
<script>
import head from '@/components/head/head.vue'
import {getSeriesObj,getSeriesLine} from '@/common/js/ajax.js'
	export default{
		data(){
			return {
				seriesLine:null,
				seriesObject:null
			}
		},
		components:{
			'v-head':head
		},
		props:{
			seriesId:{
				type:Number,
				type:0
			}
		},
		watch:{
			seriesId(){
				this.getSeriesData();
			}
		},
		methods:{
			getSeriesData(){
				getSeriesObj({series_id:this.seriesId},(res)=>{
		          console.log(res)
		          this.seriesObject=res;
		        })
		        getSeriesLine({
		          'series_id':this.seriesId,
		          'req_type':'all'
		        },(res)=>{
		          console.log(res.data)
		          this.seriesLine=res.data;
		        })
			}
		}
	}
</script>
<style scoped src="./carSeries.css"></style>