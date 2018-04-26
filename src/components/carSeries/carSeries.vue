<template>
	<div v-if="seriesLine" class="series_box">
		
	</div>
</template>
<script>
import {getSeriesObj,getSeriesLine} from '@/common/js/ajax.js'
	export default{
		data(){
			return {
				seriesLine:null,
				seriesObject:null
			}
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