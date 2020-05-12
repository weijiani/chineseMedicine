<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="appointList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @cell-click="prescribing"
    >
      <el-table-column align="center" label="患者名称" width="150">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="预约时段" align="center">
        <template slot-scope="scope">{{ scope.row.treatTime }}</template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.overFlag">已处理</el-button>
          <el-button size="mini" type="danger" v-else>处理预约</el-button>
         
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAppointRecordList } from "@/api/patient";
import { getUserName } from "@/utils/auth";
export default {
  data() {
    return {
      loading: false,
      appointList: [],
      interval: null
    };
  },
  created() {
   
  },
  mounted(){
    this.loading = true;
    // this.interval = null
    // this.interval = setInterval(() => {
    //     this.getAppointRecordList()
    // }, 1000);
    this.getAppointRecordList()
  },
  methods: {
    getAppointRecordList() {
      getAppointRecordList({ doctorName: getUserName() })
        .then(res => {
          this.appointList = res.data.appointRecordList;
          this.loading = false;
        })
        .catch(error => {
          console.log("getAppointRecordList", error);
          reject(error);
        });
    }, 
    // timeoutHandle(fun,time){
    //   let timeout = null
    //    timeout = setTimeout(() => {
    //      fun()
    //    }, time);
    // },
    prescribing(row, column, cell, event) {
      if(row.overFlag) return false
      this.$router.push({
        path: "/doctor/prescribing",
        query: {
          patientName: row.username,
          depName: row.depName
        }
      });
    }
  }
};
</script>
<style lang="scss">
.has-gutter {
  .cell {
    color: rgb(25, 159, 241);
  }
}
</style>
