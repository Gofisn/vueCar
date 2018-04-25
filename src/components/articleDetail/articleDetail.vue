<template>
	<transition name="detail-fade">
		<div v-if="detailData" class="detailBox" >
			<div class="head">
				<i class="iconfont icon-back back"  @click="hiddenDetail"></i>
				<span>文章详情</span>
			</div>
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
	export default{
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
			hiddenDetail(){
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
		}
	}
</script>
<style scoped src="./articleDetail.css"></style>