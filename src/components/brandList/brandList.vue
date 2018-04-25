<template>
<transition name="bandfade">
	<div v-if="brandList.length" class="brand_box" @click.self="closeBrand">
			<div v-if="brandList.length" class="brand_list">
				<ul v-for="items in brandList">
					<li>
						<div class="list_title">{{items.title}}</div>
						<ul>
							<li v-for="item in items.lists" class="list_content">
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
	</div>
</transition>	
</template>
<script>
export default{
	
	props:{
		brandList:{
			tpye:Array,
			default:[]
		}
	},
	methods:{
		closeBrand(){
			this.$emit('closeBrand')
		}
	}
}
</script>
<style scoped src="./brandList.css"></style>