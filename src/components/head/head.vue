<template>
  <div class="head">
  	<div class="head_line">
  		<i class="iconfont icon-back back"  @click="hidden" v-show="backBtn"></i>
  		<div v-show="showSearch">
  			<input type="text" class="input" placeholder="搜你所想">
	        <i class="iconfont icon-sousuo search"></i>
  		</div>
  		<span v-show="title" class="title">
  			{{title}}
  		</span>
	    <i class="iconfont icon-serialnumber menuline" @click="toggleMenu"></i>
  	</div>
    
	<div class="menu_list" v-show="menu" @click="menu=false">
		<div class="content">
			<span class="triangle"></span>
			<router-link to="/home">
				<div class="title"><i class="iconfont icon-home home"></i>回到首页</div>
			</router-link> 
			
			<div class="item">
				<router-link to="/home">首页</router-link>
				<router-link to="/select">选车</router-link>
				<router-link to="/carFriends">车友圈</router-link>
				<router-link to="/smallVideo">小视频</router-link>
				<router-link to="/ranking">排行榜</router-link>
				<router-link to="/service">服务</router-link>
				<router-link to="/word">文章</router-link>
				<router-link to="/video">视频</router-link>
				<router-link to="/home">新车</router-link>
				<router-link to="/home">SUV</router-link>
				<router-link to="/home">导购</router-link>
				<router-link to="/home">提车业务</router-link>
				<router-link to="/home">用车</router-link>
				<router-link to="/home">试驾导航</router-link>
				<router-link to="/home">香车美女</router-link>
				<router-link to="/home">自驾游</router-link>
				<router-link to="/home">新能源</router-link>
			</div>
		</div>
		
	</div>
  </div>
</template>

<script>
export default {
  data(){
  	return{
  		menu:false
  	} 
  },
  props:{
  	showSearch:{
  		type:Boolean,
  		default:false
  	},
  	title:{
  		type:String,
  		default:''
  	},
  	backBtn:{
  		type:Boolean,
  		default:false
  	}

  },
  methods:{
  	toggleMenu(){
  		this.menu=!this.menu;
  	},
	hidden(){
    console.log('hidden')
	  this.$emit('hiden')
	}
  }
}
</script>

<style scoped src="./head.css">
</style>
