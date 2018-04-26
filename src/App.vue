<template>
  <div id="app">
    <v-head></v-head>
    <div class="router_box" ref="routerBox">
      <ul ref="navigCont">
        <li class="item">
          <router-link to="/home">home</router-link>  
        </li>
        <li  class="item" >
          <router-link to="/select" >select</router-link>  
        </li>
        <li class="item">
          <router-link to="/carFriends">车友圈</router-link> 
        </li>
        <li class="item">
          <router-link to="/smallVideo">小视频</router-link> 
        </li>
        <li class="item">
          <router-link to="/ranking">排行榜</router-link>  
        </li>
        <li class="item">
          <router-link to="/service">服务</router-link> 
        </li>
        <li class="item">
          <router-link to="/word">文章</router-link> 
        </li>
        <li class="item">
          <router-link to="/video">视频</router-link> 
        </li>   
    </ul>
    </div>
    
    <div class="appContent">
      <transition name="fade-main">
        <router-view :key="key"></router-view>
      </transition>
    

    </div>
  </div>
</template>

<script>
import head from '@/components/head/head.vue'
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      itemWidth:[],
      naviName:['home','select','carFriends','smallVideo','ranking','service','word','video'],

    }
  },
  components:{
    'v-head':head
  },
  created(){
    // this.goMiddle();
    this.$root.eventHub.$on('changeRoute',this.goMiddle);
    this.width=document.body.clientWidth;
    this.$nextTick(()=>{
     this._initNavigation();
    })
  },
  methods:{
    goMiddle(to){
      // console.log(to.name);
       if(this.navigation){
        for(let i=0;i<this.naviName.length;i++)
          if(this.naviName[i]==to.name){
            let leave=this.width/2-this.itemWidth[i];
            if(leave>0){
              leave=0;
            }else if(leave<this.width-this.itemWidth[this.itemWidth.length-1]){
              leave=this.width-this.itemWidth[this.itemWidth.length-1];
            }
            this.navigation.scrollTo(leave,0,100)
          }
       }
    },
    _initNavigation(){
      let _this=this
      this.navigation=new BScroll(this.$refs.routerBox,{
        click:true,
        probeType:3,
        scrollX:true,
        scrollY:false,
        // startX:0
      })
      this.navigation.on('scroll',(pos)=>{
        // console.log(pos)
      })
      let navig_item=this.$refs.routerBox.querySelectorAll('.item')
      this.itemWidth.push(0)
      let nav_width=0;
      for(let i=0;i<navig_item.length;i++){
        nav_width+=navig_item[i].clientWidth
        this.itemWidth.push(nav_width);
      }
      this.$refs.navigCont.style.width=nav_width+'px';
      // this.navigation.scrollTo(-30,0,300)
    }
  },
  computed: {
        key() {
            return this.$route.path.replace(/\//g, '_')
        }
   }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.head{
  width: 100%;
  flex: 0 0 30px;
  font-size: 0;
  box-sizing: border-box;
}
.appContent{
  flex: 1;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
/*.navigation{
    flex: 0 0 48px;
    width: 100%;
   overflow: auto;
   position: relative;
}*/
.router_box{
  width: 100%;
  flex: 0 0 48px;
  overflow: hidden;
  padding: 10px 0px;
  background: #333;
  box-sizing: border-box; 
}
.router_box ul{
  font-size: 0;
}
.router_box .item{
  padding: 5px 10px;
  text-align: center;  
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  font-size: 0;
}
.router_box .item a{
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  font-weight: 500;
  /*padding-bottom: 3px;*/
  position: relative;
  text-align: center;
}
.router_box .item .active:after{
  border-bottom: 3px solid #fc0;
  position: absolute;
  left: 50%;
  right: 0;
  bottom: -6px;
  content: '';
  height: 1px;
  width: 20px;
  transform: translateX(-50%);
}

.fade-main-enter-active,
.fade-main-leave-active {
  transition: all .2s;
}
.fade-main-enter,
.fade-main-leave-to{
  opacity: 0;
  transform: translateX(100%);
}
</style>
