<template>
  <div>
 </div>
</template>

<script>
export default {
  beforeRouteEnter:(to,from,next)=>{
	 next(vm=>{
	  	vm.$root.eventHub.$emit('changeRoute',to)
	  });
  },
}
</script>

<style>
</style>