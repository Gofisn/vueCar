<template>
	<div class="itemContent">
		<div class="imgone" v-if="showImage.length===1">
			<div class="info_box">
				<div class="title">
				{{itemNews.info.title}}
				</div>
				<div class="info">
					<span class="source">{{itemNews.info.source}}</span>
					<span class="comment">{{itemNews.info.comment_count}}评论</span>
					<span class="time">{{beTime}}</span>
					<span class="name" v-show="itemNews.info.auto_label_config"><span class="logo">#</span>{{showName}}</span>
				</div>
			</div>
			
			<div class="img_box">
				<div v-for="img in showImage" :class="imgClass" class="imgitem">
					<img v-lazy="img.url" alt="">
				</div>
			</div>
			
		</div>
		<div v-else>
			<div class="title">
				{{itemNews.info.title}}
			</div>
			<div class="img_box">
				<div v-for="img in showImage" :class="imgClass" class="imgitem">
					<img v-lazy="img.url" alt="">
				</div>
			</div>
			<div class="info">
				<span class="source">{{itemNews.info.source}}</span>
				<span class="comment">{{itemNews.info.comment_count}}评论</span>
				<span class="time">{{beTime}}</span>
				<span class="name" v-show="itemNews.info.auto_label_config"><span class="logo">#</span>{{showName}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			itemNews:Object,
			now:Date
		},
		computed:{
			imgClass(){
				return 'img_'+this.showImage.length
			},
			beTime(){
				let time=this.itemNews.info.cursor;
				let now=this.now;
				let interval=now-time;
				if(interval<60000){
					return '刚刚'
				}else{
					var nowDay=now.format('yyyy-MM-dd')
					var timeDay=new Date(time).format('yyyy-MM-dd')
					if(nowDay===timeDay){
						let hour=Math.floor(interval/1000/3600);
						let minute=Math.floor(interval/1000%3600/60);
						return hour?(hour+'小时前'):(minute+'分钟前');
					}else{
						return new Date(time).format('MM-dd hh:mm')
					}
				}
				return '';
			},
			showName(){
				if(this.itemNews.info.auto_label_config){
					return this.itemNews.info.auto_label_config.name;
				}else{
					return '';
				}
			},
			showImage(){
				let imgs= this.itemNews.info.image_list;
				if(imgs.length>3){
					return imgs.slice(0,3)
				}else{
					return imgs
				}
			}
		}
	}
</script>
<style src="./itemContent.css" scoped>
	
</style>