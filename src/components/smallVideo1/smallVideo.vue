<template>
  <div class="smallVideo_box" id="video_box">
  	<waterfall :line-gap="imgWidth" :watch="videoItems">
	  <waterfall-slot
	    v-for="(item, index) in videoItems"
	    :width="item.info.image_list[0].width"
	    :height="item.info.image_list[0].height"
	    :order="index"
	    :key="item.unique_id"
	  >
	  <div class="item" :item="item">
	  	<img :src="item.info.image_list[0].url" class="item_img">
	  	<div class="content">
	  		<div class="title">{{item.info.title}}</div>
	  		<div class="">
	  			<div class="user">
	  				<img :src="item.info.user_info.avatar_url" alt="用户图片" class="img">
	  				<span class="name">{{item.info.source}}</span>
	  			</div>
	  			<div class="comment">{{item.info.comment_count}}评论</div>
	  		</div>
	  	</div>
	  </div>
	  </waterfall-slot>
	</waterfall>
 </div>
</template>

<script>
import {getSmallVideo} from '@/common/js/ajax.js'
import waterfall from 'vue-waterfall/lib/waterfall'
import waterfallSlot from 'vue-waterfall/lib/waterfall-slot'
export default {
	data(){
		return{
			videoItems:[],
			imgWidth:0,
			line:2
		}
	},
	mounted(){
		let scop=this;
		scop.imgWidth=document.body.clientWidth/this.line;
    	window.addEventListener('resize', () => {
          scop.imgWidth=document.body.clientWidth/this.line;
        });
    	let box=document.getElementById('video_box');
        box.addEventListener('scroll', function () {
            var scrollTop = box.scrollTop;
            console.log('top '+scrollTop)
            console.log('innerHeight '+box.scrollHeight)
            console.log('clientHeight '+box.clientHeight)
            if (scrollTop + box.clientHeight >= box.scrollHeight) {
              console.log('scroll')
              scop.loadData(scop.videoItems[scop.videoItems.length-1].info.behot_time)
            }
          })
        document.addEventListener('scroll',function(e) {
        	console.log(e)
        })
	},
    created(){
    	this.loadData();
    },
    components:{
    	waterfall,
    	waterfallSlot
    },
    methods:{
    	loadData(time){
    		let paras={
				aid: '1230',
				channel: 'm_web',
				device_platform: 'wap',
				category: 'motor_car_ugc',
				max_behot_time: '0',
				min_behot_time: '0',
				web_id: '6547505738175661581',
				impression_info: '{"page_id":"page_ugc_video","product_name":"m_station","zt":"default"}',
				tt_from:''
			
			};
			if(time){
				paras.max_behot_time=time;
				paras.tt_from='load_more'
			}else{
				this.dataNews=[];
			}

			getSmallVideo(paras,(res)=>{
				let data=res.data;
				if(data.length){
					this.videoItems.push(...data)
				}
			})
    	}
    }

}
</script>

<style scoped src="./smallVideo.css">
</style>