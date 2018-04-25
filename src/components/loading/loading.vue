<template>
	<div class="loading_box">
		<img src="./img/wait.gif" height="24" width="24">
		<div class="message">
			{{msg}}
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			msg:{
				type:String,
				default:'正在加载...'
			}
		}
	}
</script>
<style scoped>
	.loading_box{
		text-align: center;
	}
	.loading_box img{
		width: 24px;
		height: 24px;
	}
	.loading_box .message{
		margin-top: 5px;
		font-size: 14px;
		color: #999;
	}
</style>