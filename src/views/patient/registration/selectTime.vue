
<template>
    <div class="selectDep-wrap">
       <p class="title">选择时间</p>
       <div class="cards-wrap">
           <div class="card"
            @click="selectTime(item.day,item.time,item.overTime);showDialog(item.overTime)" v-for="(item,index) in cardList" :key="index">
               <p class="over-time" v-if="index < 2 && item.overTime">(该时段已失效)</p>
               <div class="card-img" :style="{backgroundImage: 'url(' + icon + ')' }"></div>
               <div class="time-wrap">
                    <div class="day">{{item.day}}</div>
                    <div class="time">{{item.time}}</div>
               </div>
         </div>
       </div>
       <el-dialog
            title="请选择支付方式"
            :visible.sync="dialogVisible"
            width="30%"
            @close="cancelSubmit">
           <div class="pay-wrap">
               <div class="card" 
               v-for="(item,index) in payList" 
               :key="index"  
               @click="selectPayWay(index,item.payWay)"
               :class="{'payCardActive': index == selectPayWayIndex}"> 
                   <div class="card-img" :style="{backgroundImage: 'url(' + item.imgUrl + ')' }"></div>
                   <p class="pay-name">{{ item.payWay }}</p>
               </div>
               
           </div>
           <p class="pay-way-alert" v-if="showAlert">请选择支付方式!</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelSubmit">取 消</el-button>
                <el-button type="primary" @click="submitMsg">确定支付</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { time,weixin,zhifubao } from './js/image'
import { Message } from 'element-ui'
import { getUserName } from '@/utils/auth'
import { postPayRecord } from '@/api/patient'
import { getNextDay, getCurrentDay, getDayafterTomorrow, isFirstOverTime, isSecondOverTime } from '@/utils/getTime'
export default {
     data(){
            return{
                selectPayWayIndex: undefined,
                dialogVisible: false,
                icon: time,
                cardList: [{
                    day: getCurrentDay(),
                    time: "9:00~11:20",
                    overTime: isFirstOverTime()
                },{
                    day: getCurrentDay(),
                    time: "14:00~16:30",
                    overTime: isSecondOverTime()
                },{
                    day: getNextDay(),
                    time: "9:00~11:20",
                    overTime: false
                },{
                    day: getNextDay(),
                    time: "14:00~16:30",
                    overTime: false

                },{
                    day: getDayafterTomorrow(),
                    time: "9:00~11:20",
                    overTime: false

                },{
                    day: getDayafterTomorrow(),
                    time: "14:00~16:30",
                    overTime: false

                }],
                payList: [{
                    payWay: "微信支付",
                    imgUrl: weixin
                },{
                    payWay: "支付宝支付",
                    imgUrl: zhifubao
                }],
                payWay: undefined,
                showAlert: false
                
            }
        },
    created(){
        
    },
    methods: {
        showDialog (overTime){
            if(overTime){
                return false
            }
            this.dialogVisible = true
        },
        selectTime(day,time,overTime){
            if(overTime)  return false
            this.$store.commit("patient/setTreatTime",`${day} ${time}`)
            
        },
        selectPayWay(index,payWay) {
            this.selectPayWayIndex = index
            this.payWay = payWay  
        },
        submitMsg(){
            if(!this.payWay){
                this.showAlert = true
                return false
            }else {
                let submitMsg = {
                    username: getUserName(),
                    depName: this.$store.getters.depName,
                    doctorName: this.$store.getters.doctorName,
                    treatTime: this.$store.getters.treatTime,
                    pay: this.$store.getters.doctorPay,
                    payWay: this.payWay,
                    createTime: new Date().toLocaleString(),
                    payDes: "预约",
                    overFlag: false
              }
              console.log('submitMsg',submitMsg)
                this.$store.dispatch('patient/makeAnAppointment', submitMsg ).then((data) => {
                    if(data.resCode == 1){
                        let payData = {
                            username: getUserName(),
                            createTime: new Date().toLocaleString(),
                            pay: this.$store.getters.doctorPay,
                            payWay: submitMsg.payWay,
                            payDes: "预约"
                        }
                        postPayRecord(payData).then(response => {
                            if(response.data.resCode==1){
                                Message({
                                    message: '支付成功,预约成功',
                                    type: 'success',
                                    duration: 3 * 1000
                              })
                            }
                             this.$router.push({path: '/patient/home'})
                        }).catch(error => {
                            console.log('postPayRecord', error)
                            reject(error)
                        })
                    }
                })
                this.cancelSubmit()

            }
        },
        cancelSubmit(){
            this.dialogVisible = false
            this.showAlert = false
            this.selectPayWayIndex = undefined
            this.payWay = undefined  
        }
    },
    
}
</script>
<style lang="scss">
    .el-dialog {
        .el-dialog__body{
            .pay-wrap{
                display: flex;
                justify-content: space-around;
                margin: 0 auto;
                width: 280px;
                height: 100%;
                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100px;
                    height: 100px;
                    cursor: pointer;
                    box-shadow: 0 1px 4px rgba(0, 5, 10, 0.3);
                    .card-img{
                        margin-top: 15px;
                        width: 48px;
                        height: 48px;
                        background-size: cover;
                       
                    }
                    .pay-name{
                        margin: 10px 0 0 0;
                        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                    } 
                    
                    
                 }
                  .payCardActive{
                        box-shadow: 0 1px 4px rgb(245, 113, 113);
                 }  
                

                }
                 .pay-way-alert{
                    color: red;
                    font-size: 12px; 
                    margin: 20px 0 0 140px;
                 }
                
            }
        }
    
</style>
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
            // justify-content: space-between;
            flex-wrap: wrap;
            width: 900px;
           
            .card {
                position: relative;
                margin: 20px 0 0 50px; 
                width: 250px;
                height: 140px;
                box-shadow: 0 1px 4px rgba(16, 93, 170, 1);
                cursor: pointer;
                .over-time{
                    position: absolute;
                    top: 10px;
                    right: 5px;
                    font-size: 12px;
                    margin: 0;
                    color: red;
                }
                .card-img{
                    position: absolute;
                    left: 15px;
                    top: 15px;
                    width: 48px;
                    height: 48px;
                    background-size: cover;
                }
               .time-wrap{
                    position: absolute;
                    left: 85px;
                    top: 65px;
                    .day,.time {
                        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                        font-size: 18px;
                    }
                   
               }

            }
        }
    }
</style>