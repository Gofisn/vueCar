<template>
	<div v-if="seriesObject" class="series_box">
		
		<div class="series_head" v-if="headList.length" :scrollX="true">
			<sowing :loop="true" :scrollX="true" v-if="headList[0].info.appear_normal_img_list">
				<div v-for="item in headList[0].info.appear_normal_img_list">
					<img :src="item">
				</div>
			</sowing>
			<div  v-else-if="headList[0].info.appear_360_img_list" class="img_box">
				<img :src="headList[0].info.appear_360_img_list[0]">
			</div>
			<div  v-else-if="headList[0].info.cover_img_list" class="img_box_c">
				<img :src="headList[0].info.cover_img_list[0]">
			</div>
			<div class="series_cnt">
				<div class="name">{{seriesObject.concern_obj.name}}</div>
				<div>售价：{{seriesObject.concern_obj.dealer_price}}</div>
				<div>详细参数></div>
			</div>
			<div class="logos">
				<div class="item">
					<img src="./img/car.png">
					<span>外观</span>
				</div>
				<div  class="item">
					<img src="./img/360.png">
					<span>内饰</span>
				</div>
				<div  class="item">
					<img src="./img/cam.png">
					<span>实拍</span>
				</div>
			</div>
		</div>
		<div class="comper">
			<ul v-if="seriesObject.recommended_compare_series_list" class="comper_box" ref="comperBox">
				<li v-for="item in seriesObject.recommended_compare_series_list" class="item">
					<div class="image">
						<img :src="item.cover_image">
					</div>
					<div class="cont">
						<div>{{item.series_name}}</div>
						<div>{{item.dealer_price}}</div>
					</div>
					<div class="comp">
						<span>对比</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="series_line" v-if="seriesLine">
			<div class="line_head">
				<span v-if="seriesLine.online.length" class="item" :class="{active: lineType === online }" @click="lineType = online" >在售</span>
				<span  v-if="seriesLine.offline.length" class="item"  :class="{active: lineType === offline }" @click="lineType = offline" >停售</span>
				<span v-if="seriesLine.urban.length" class="item"  :class="{active: lineType === urban }" @click="lineType = urban" >未上市</span>
			</div>
			<ul class="line_cont">
				<li v-for="item in seriesLine[lineType]">
					<div v-if="item.type==1037" class="cont">
						<div class="name">{{item.info.year}}款 {{item.info.name}} {{item.info.car_config.base_config[0]}}
						<span v-if="item.info.dealer_tag==1" class="price_reduct">降价</span>
	                    <span v-if="item.info.dealer_tag==2" class="price_hort">热门</span>
						 </div>
						<div class="prices" v-if="lineType==online">
							最低价：
							<span class="dealer_price">{{item.info.dealer_price}}</span>
							<span class="price">{{item.info.price}}</span>
						</div>
						<div class="prices" v-else>
							官方价：
							<span class="dealer_price">{{item.info.price}}</span>
						</div>
					</div>
					<div v-else class="nocont">{{item.info.name}}</div>
					<span class="ask" v-if="item.type==1037">询底价</span>

				</li> 
			</ul>
		</div>
       <v-head :backBtn="true" :title="title" @hiden="hiddenSeries"></v-head>
	</div>

	
</template>
<script>
import head from '@/components/head/head.vue'
import sowing from "@/components/sowing/sowing.vue"
import {getSeriesObj,getSeriesLine} from '@/common/js/ajax.js'
import {addClass} from '@/common/js/dom.js'
	export default{
		data(){
			return {
				seriesLine:null,
				seriesObject:null,
				title:'车系详情',
				headList:[],
				lineType:'',
				online:'online',
				offline:'offline',
				urban:'urban'
			}
		},
		components:{
			'v-head':head,
			sowing
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
				this.lineType='online';
			}
		},
		methods:{
			getSeriesData(){
				if(this.seriesId){
					getSeriesObj({series_id:this.seriesId},(res)=>{
			          let headInfo=res.concern_obj.head_info;
			          headInfo=JSON.parse(headInfo);
			          console.log(headInfo)
			          this.headList=headInfo;
			          this.seriesObject=res;

			          setTimeout(()=>{
			          	if(this.seriesObject.recommended_compare_series_list){
			          		this.$refs.comperBox.style.width=240*this.seriesObject.recommended_compare_series_list.length+'px'
			          	}
			          	
			          },50)
			        })
			        getSeriesLine({
			          'series_id':this.seriesId,
			          'req_type':'all'
			        },(res)=>{
			          console.log(res.data)
			          this.seriesLine=res.data;
			          if(res.data.online.length){
			          	this.lineType='online';
			          }else if(res.data.offline.length){
			          	this.lineType='offline';
			          }else if(res.data.urban.length){
			          	this.lineType='urban';
			          }
			        })
				}else{
					this.seriesObject=null;
					this.seriesLine=null;
				}
				
			},
			hiddenSeries(){
				this.$emit('hiden')
			},
			changeLine(event){
				// console.log(line) 
				console.log(event) 
			}
		}
	}
</script>
<style scoped src="./carSeries.css"></style>