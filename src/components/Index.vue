<template>
  <div class="home-wrapper">
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="/workTab">
        <router-link to="/workTab">
          
          工作台
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="/customer">
        <router-link to="/customer">
          
          客户
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="/pickupCar">
        <router-link to="/pickupCar">
          
          接车
        </router-link>  
      </mt-tab-item>
      <mt-tab-item id="/order">
        <router-link to="/order">
          
          订单
        </router-link>   
      </mt-tab-item>
      <mt-tab-item id="/user">
        <router-link to="/user">
        
          我的
        </router-link>   
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default{
  	data() {
  		return {
  			selected: '/workTab'
      }
    },
    created(){

    },
  }
</script>
<style lang="">
  
</style>