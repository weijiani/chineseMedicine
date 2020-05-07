<template>
    <div class="home-wrap">
        <div  class="cards-wrap">
            <div class="card"
            v-for="(item,index) in cardList" 
            :key="index" 
            @click="cardClick(item.path)">
                <span class="text">{{item.name}}</span>
                <div class="icon"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            cardList:[
                {
                    name: "预约挂号",
                    path: '/registration/selectDep'
                },
                 {
                    name: "查看预约",
                    path: "/appointRecord"
                },
                {
                    name: "诊间缴费",
                    path: '/medicinePay'
                },
                {
                    name: "费用记录",
                    path: '/payRecord'
                },
                {
                    name: "个人信息",
                    path: '/patientDetail'
                }
            ]
        }
    },
    methods: {
        cardClick(path){
            this.$router.push({path: path})
        }
    }
}
</script>
<style lang="scss">
    
    .home-wrap{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 40px auto;
        width: 1000px;
        height: 400px;
        border-radius: 20px;
        .cards-wrap{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .card{
                position: relative;
                width: 280px;
                height: 180px;
                margin: 10px 0 0 20px;
                cursor: pointer;
                .icon{
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    background-size: cover;
                }
                 .text{
                    margin: 20px 0 0 20px;
                    display: inline-block;
                    color: rgb(255,255,255);
                    font-size: 30px;
                }
            }
            .card:nth-child(1){
                background: rgb(113, 184, 231);
                .icon{
                   background-image: url('~@/images/patient/yvyue.png');
                }
            }
            .card:nth-child(2){
                background: lightskyblue;
                .icon{
                   background-image: url('~@/images/patient/check.png');
                }
            }
            .card:nth-child(3){
                  background: rgb(66, 214, 219);
                .icon{
                   background-image: url('~@/images/patient/jiaofei.png');
                }
            }
             .card:nth-child(4){
                 background: rgb(162, 160, 219);
                .icon{
                   background-image: url('~@/images/patient/yvjiaorecord.png');
                }
            }
             .card:nth-child(5){
                 background: rgb(179, 131, 211);
                .icon{
                   background-image: url('~@/images/patient/person.png');
                }
            }
        }
       
       

    }
</style>