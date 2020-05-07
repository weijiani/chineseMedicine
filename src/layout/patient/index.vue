<template>
    <div class="patient-wrap">
        <navbar />
        <div class="back" @click="goBack" v-show="!homeFlag">
            <span><<返回</span>
        </div>
      
        <!-- disabled -->
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
    name: 'patient',
    data(){
        return{
            homeFlag: true
        }
    },
    components: {
        Navbar
    },
    watch: {
        $route(val){
          if(val.path !== "/patient/home") {
             this.homeFlag = false
          }else{
             this.homeFlag = true
          }
        }
    },
    methods: {
        goBack(){
            if(this.$route.path == "/patient/home") return false
            else{
                history.go(-1)
            }
        }
    }
}
</script>
<style lang="scss">
    .patient-wrap{
        .back{
            position: relative;
            left: 1200px;
            top: 30px;
            width: 70px;
            height: 40px;
            cursor: pointer;
            >span{
                color: #1497ee;
            }
        }
        .content{
            width: 100%;
            height: 100%;
        }
    }
</style>