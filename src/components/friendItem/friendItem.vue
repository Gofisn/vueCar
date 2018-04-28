<template>
	<div class="itemBox">
		<div class="head">
			<img :src="itemData.info.user_info.avatar_url">
			<span>{{itemData.info.cursor}}</span>
		</div>
		<div class="content">
			<div class="word">
				<span class="name">#{{itemData.info.discuss_label.name}}#</span>
				<span>{{itemData.info.content}}</span>
			</div>
			<div class="video_box">
				<img v-lazy="itemData.info.image_list[0].url">
				<i class="iconfont icon-videofill video_btn"></i>
			</div>
			
		</div>
		<div class="bottom">
			<div class="count">
				<i class="iconfont icon-zan"></i>
				<span>{{itemData.info.digg_count}}</span>
			</div>
			<div class="count">
				<i class="iconfont icon-message2"></i>
				<span>{{itemData.info.comment_count}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			itemData:{
				type:Object,
				default:null
			}

		}
	}
</script>
<style scoped src="./friendItem.css"></style>