<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="customerList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @cell-click="checkDetail"
    >
      <el-table-column align="center" label="客户名称" width="150">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      
      <el-table-column label="最近预约就诊时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog title="客户详细信息" :visible.sync="dialogVisible" width="30%">
      <div class="medicalRecord-detail-wrap" v-if="userDetail">
        <div class="medicalRecord-item">
          <label>姓名:</label>
          <span>{{userDetail.username}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>性别:</label>
          <span>{{userDetail.sex}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>出生日期:</label>
          <span>{{new Date(userDetail.birthData).toLocaleDateString()}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>年龄:</label>
          <span>{{userDetail.age}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>手机号码:</label>
          <span>{{userDetail.telNumber}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>居住地址:</label>
          <span>{{userDetail.region}}</span>
        </div>
      </div>
    
    </el-dialog>
  </div>
</template>

<script>
import { getAppointRecordList, getUserDetail } from "@/api/patient";
import { getUserName } from "@/utils/auth";
export default {
  data() {
    return {
      loading: false,
      customerList: [],
      userDetail: null,
      dialogVisible: false
    };
  },
  created() {
   
  },
  mounted(){
    this.loading = true;
    this.getCustomerList()
  },
  methods: {
    // 获取客户信息列表
    getCustomerList() {
      getAppointRecordList({ doctorName: getUserName() })
        .then(res => {
          this.customerList = res.data.appointRecordList.filter(
              (item, index) => {
                return item.overFlag == true;
              }
            );
          this.customerList = this.deDuplication(this.customerList)
          this.loading = false;
        })
        .catch(error => {
          console.log("getAppointRecordList", error);
          reject(error);
        });
    }, 
    // 获取客户详情信息
     getUserDetail(data) {
      let postData = {
        username: data.username,
        role: "0"
      };
      getUserDetail(postData)
        .then(res => {
          let userDetail = res.data.userDetail[0];
          this.userDetail = userDetail
        })
        .catch(error => {
          console.log("getUserDetail", error);
          reject(error);
        });
    },
    checkDetail(row, column, cell, event) {
      this.dialogVisible = true;
      this.getUserDetail(row)
    },
    deDuplication(arr){
        let newArr = []
        let map = new Map()
        for(let i=0;i<arr.length;i++){
            if(!map.get(arr[i].username)){
                newArr.push(arr[i])
                map.set(arr[i].username,1)
            }
        }
        return newArr
    },
  }
};
</script>
<style lang="scss">
.has-gutter {
  .cell {
    color: rgb(25, 159, 241);
  }
}
.el-dialog__body {
  .medicalRecord-detail-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // width: 800px;
    margin: 0 auto;
    .medicalRecord-item {
      width: 800px;
      margin: 0 0 25px 0;
      label {
        color: rgb(25, 159, 241);
      }
      .drugs-detail {
        margin: 5px 0px 0 35px;
        label {
          color: rgb(241, 129, 25);
        }
      }
    }
  }
}
</style>
