<template>
    <div class="selectDep-wrap">
       <p class="title">选择科室</p>
       <div class="cards-wrap">
           <div class="card" @click="selectDep(item.depName)" v-for="(item,index) in cardList" :key="index">
               <div class="card-img" :style="{backgroundImage: 'url(' + item.imgUrl + ')' }"></div>
               <div class="dep-name">{{item.depName}}</div>
           </div>
       </div>
    </div>
</template>
<script>
import { 
  neike,
  waike,
  fuke,
  nanke,
  pifu,
  xiaohua,
  laonian,
  zhongliu,
  tengtong,
  huxi,
  guke,
  yingyang } from './js/image'
export default {
     data(){
            return{
                cardList:[{
                    depName: "内科",
                    imgUrl: neike
                },{
                    depName: "外科",
                    imgUrl: waike
                },{
                    depName: "妇科",
                    imgUrl: fuke
                },{
                    depName: "男科",
                    imgUrl: nanke
                },{
                    depName: "皮肤科",
                    imgUrl: pifu
                },{
                    depName: "消化科",
                    imgUrl: xiaohua
                },{
                    depName: "老年科",
                    imgUrl: laonian
                },{
                    depName: "骨科",
                    imgUrl: guke
                },{
                    depName: "肿瘤科",
                    imgUrl:  zhongliu
                },{
                    depName: "呼吸科",
                    imgUrl:  huxi
                },{
                    depName: "营养科",
                    imgUrl: yingyang
                },{
                    depName: "疼痛科",
                    imgUrl: tengtong
                }]
            }
        },
    methods: {
        selectDep(depName){
            this.$store.commit("patient/setDepName",depName)
            this.$router.push({path: '/registration/selectDoc'})
        }
    }
}
</script>
<style lang="scss" scoped>
    .selectDep-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
            font-size: 25px;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }
        .cards-wrap{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 1000px;
            height: 400px;
            .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 150px;
                height: 140px;
                cursor: pointer;
                box-shadow: 0 1px 4px rgba(0, 5, 10, 0.3);
                .card-img{
                    margin-top: 30px;
                    width: 48px;
                    height: 48px;
                    background-size: cover;
                }
                .dep-name{
                    margin-top: 20px;
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                }

            }
        }
    }
</style>