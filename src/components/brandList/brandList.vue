<template>
	<div v-if="brandList.length" class="brand_box" @click.self="closeBrand">
        <transition name="bandfade" >
			<div v-if="sortBrandList.length" class="brand_list" ref="tran">
				<ul v-for="items in sortBrandList">
					<li>
						<div class="list_title">{{items.title}}</div>
						<ul>
							<li v-for="item in items.lists" class="list_content" @click="seriesId=item.series_id">
								<div class="img_box">
								  <img v-lazy="item.image_url">
								</div>
								<div class="content_box">
									<div class="name">
									{{item.series_name}}
									<span v-if="item.dealer_tag==1" class="price_reduct">降价</span>
	                               <span v-if="item.dealer_tag==2" class="price_hort">热门</span>
								    </div>
									<div class="price">{{item.price}}</div>
								</div>
							</li>
						</ul>
					</li>
					
				</ul>
			</div>
        </transition>	
        <series :seriesId="seriesId" @hiden="hiddenSeries"></series>
	</div>
</template>
<script>
import series from '@/components/carSeries/carSeries.vue'
export default{
	data(){
		return {
			sortBrandList:[],
			seriesId:0
		}
   },
	props:{
		brandList:{
			tpye:Array,
			default:[]
		}
	},
	components:{
		series
	},
	methods:{
		closeBrand(){
			this.sortBrandList=[];

			this.seriesId=0;
			clearTimeout(this.timer)
			this.timer=setTimeout(()=>{
				this.$emit('closeBrand')
			},500)
		},
	    hiddenSeries(){
	        this.seriesId=0;
	    }
	},
	watch:{
		brandList(){
	        let listObj={}
	        this.brandList.forEach((item,index,arr)=>{
	          if(item.type=='1002'){
	            const key=item.info.sub_brand_name;
	            if(!listObj[key]){
	              listObj[key]={
	                title:key,
	                lists:[]
	              }
	            }
	            listObj[key].lists.push(item.info)
	          }
	        })
	        let listArr=[];
	        for (let key in listObj){
	          listArr.push(listObj[key])
	        }
	        clearTimeout(this.timer)
	       this.timer= setTimeout(()=>{
	           this.sortBrandList=listArr;
	        },20)
	    }

	}
}
</script>
<style scoped src="./brandList.css"></style>