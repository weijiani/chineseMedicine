<template>
  <div class="pay-record-wrap">
     <p class="title">费用记录</p>
     <el-table
        :data="payRecordList"
        border
        style="width: 70%">
        <el-table-column
        prop="createTime"
        label="支付日期"
        width="180">
        </el-table-column>
        <el-table-column
        prop="pay"
        label="支付费用(元)"
        width="180">
       
        </el-table-column>
        <el-table-column
        prop="payWay"
        label="支付方式">
        </el-table-column>
        <el-table-column
        prop="payDes"
        label="支付描述">
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserName } from '@/utils/auth'
export default {
  name: 'payRecord',
  data(){
      return{
        payRecordList: []
      }
  },
  created(){
      this.getPayRecordList()
  },
  methods: {
      getPayRecordList(){
          let username = getUserName()
          this.$store.dispatch('patient/getPayRecordList', username ).then((data) => {
              if(data.resCode == 1){
                  this.payRecordList = data.payRecordList
              }
          })
      }
  }
}
</script>
<style lang="scss" scoped>
    .pay-record-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
            font-size: 25px;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
           
        }
    }
</style>
<style lang="scss">
.has-gutter{
    .cell{
        color: rgb(25, 159, 241);
    }
}

</style>
