<template>
	<transition name="detail-fade">
		<div v-if="detailData" class="detailBox" >
			<v-head :backBtn="true" :title="title" @hidenDetail="hidenDetail"></v-head>
			<div class="cnt">
				<div class="title">
				{{detailData.title}}
				</div>
				<div class="dtl">
					<span class="source">{{detailData.source}}</span>
				</div>
				<div class="content" v-html="detailData.content">
				</div>
				<div class="content4">
					<ul>
						<li v-for="item in imageList">
							<div>
							{{item.desc}}
							</div>
							<div>
								<img v-lazy="detailImg(item.image_uri)" alt="">
							</div>
						</li>
					</ul>
					
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import head from '@/components/head/head.vue'
	export default{
		data(){
			return{
				title:"文章详情"
			}
		},
		props:{
			detailData:{
				type:Object,
				default:{}
			}
		},
		methods:{
			detailImg(img){
				return 'http://p9.pstatp.com/large/'+img;
			},
			hidenDetail(){
				this.$emit('hidenDetail')
			}
		},
		computed:{
			imageList(){
				if(this.detailData.gallery_info){
				   return this.detailData.gallery_info.image_list
				}
			},
			beTime(){
				return new Date(this.detailData.publish_time).format('MM-dd hh:mm')
			},
			detailShow(){
				if(this.detailData){
					return true;
				}else{
					return false;
				}
			}
		},
		  components:{
		    'v-head':head
		  }
	}
</script>
<style scoped src="./articleDetail.css"></style>