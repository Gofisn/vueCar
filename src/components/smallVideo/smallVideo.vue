<template>
  <div class="smallVideo_box" id="video_box">
  	<div v-show="videoItems.length==0" class="loading">
		<loading></loading>
	</div>
	<waterfall :line-gap="imgWidth" :watch="videoItems">
	  <waterfall-slot v-if="videoItems.length"
	    v-for="(item, index) in videoItems"
	    :width="item.info.image_list[0].width"
	    :height="item.info.image_list[0].height"
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
	<div class="load_more">{{loadMoreData}}</div>
  	
 </div>
</template>

<script>
import {getVideo} from '@/common/js/ajax.js'
import loading from '@/components/loading/loading.vue'
import waterfall from 'vue-waterfall/lib/waterfall'
import waterfallSlot from 'vue-waterfall/lib/waterfall-slot'
export default {
	data(){
		return{
			videoItems:[],
			imgWidth:0,
			line:2,
			loadMoreData:'',
			canload:true
		}
	},
	mounted(){
		let scop=this;
		scop.imgWidth=document.body.clientWidth/scop.line;
    	window.addEventListener('resize', () => {
          scop.imgWidth=document.body.clientWidth/scop.line;
        });
    	let box=document.getElementById('video_box');
    	let scrollTop=0;
        box.addEventListener('scroll', function () {
            scrollTop = box.scrollTop;

            if (scrollTop + box.clientHeight+1 >= box.scrollHeight) {
              if(scop.canload){
              	console.log('load')
                   scop.canload=false;
              	   scop.loadMoreData='加载更多...';
                   scop.loadData(scop.videoItems[scop.videoItems.length-1].info.behot_time);
              	}
              
            }
          })
          let startY;
          box.addEventListener('touchstart', function (e) {
            startY=e.touches[0].clientY;
          })
          box.addEventListener('touchend', function (e) {
            if(scrollTop<=0){
              if(e.changedTouches[0].clientY-startY>100){
              	if(scop.canload){
                   scop.canload=false;
              		scop.loadData();
              		console.log('shuaxin')
              	}
                
              }
            }
          })
	},
    created(){
    	this.loadData();
    },
    components:{
    	waterfall,
    	waterfallSlot,
    	loading
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
				this.videoItems=[];
			}

			getVideo(paras,(res)=>{
				this.loadMoreData='';
				this.canload=true;
				let data=res.data;
				if(data.length){
					this.videoItems.push(...data)
				}
				// console.log(this.videoItems)
			})
    	}
    }

}
</script>

<style scoped src="./smallVideo.css">
</style>