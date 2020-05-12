<template>
    <div class="selectDep-wrap">
       <p class="title">选择医生<span class="title-dep-name">（{{depName}}）</span></p>
       <div class="cards-wrap">
           <div class="card" @click="selectDoc(item.name,item.pay)" v-for="(item,index) in cardList" :key="index">
               <div class="card-img" :style="{backgroundImage: 'url(' + icon + ')' }"></div>
               <div class="dep-name">{{item.name}}</div>
               <div class="doc-grade">级别：{{ item.grade }}</div>
               <div class="doc-grade" style="color: red">挂号费：¥{{ item.pay }}</div>
           </div>
       </div>
    </div>
</template>
<script>
import { docIcon } from './js/image'
export default {
     data(){
            return{
                icon: docIcon,
                cardList: [],
                depName: undefined
            }
        },
    created(){
        this.depName = this.$store.getters.depName
        this.getDoctors(this.depName) 
    },
    methods: {
        // 获取该科室下的医生信息
        getDoctors(depName){
             this.$store.dispatch('patient/getDepOfDoctor', depName).then((data) => {
                 let { name,doctors } = data
                 this.cardList = doctors
             })
        },
        // 选择医生，跳转到选择就诊时间段的页面
        selectDoc(doctorName,pay){
            this.$store.commit("patient/setDoctorNameAndPay",{ doctorName, pay })
            this.$router.push({path:'/registration/selectTime'})
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
            .title-dep-name{
                color: lightseagreen;
            }
        }
        .cards-wrap{
            display: flex;
            flex-wrap: wrap;
            width: 1000px;
            .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 20px 0 0 80px; 
                width: 150px;
                height: 140px;
                box-shadow: 0 1px 4px rgba(0, 5, 10, 0.5);
                cursor: pointer;
                .card-img {
                    margin-top: 8px;
                    width: 48px;
                    height: 48px;
                    background-size: cover;
                }
                .dep-name {
                    margin-top: 10px;
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                }
                .doc-grade {
                    margin-top: 8px;
                    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    font-size: 12px;
                    color: rgb(31, 177, 169);
                }

            }
        }
    }
</style>