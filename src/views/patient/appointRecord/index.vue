<template>
  <div class="pay-record-wrap">
    <p class="title">预约记录</p>
    <el-table :data="appointRecordList" border style="width: 70%">
      <el-table-column prop="depName" label="科室" width="180"></el-table-column>
      <el-table-column prop="doctorName" label="医生" width="180"></el-table-column>
      <el-table-column prop="treatTime" label="问诊时段"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="cancelAppoint(scope.$index, scope.row)">取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserName } from "@/utils/auth";
import { Message } from "element-ui";
export default {
  name: "payRecord",
  data() {
    return {
      appointRecordList: []
    };
  },
  created() {
    this.getAppointRecordList();
  },
  methods: {
    //   获取预约列表
    getAppointRecordList() {
      let username = getUserName();
      this.$store
        .dispatch("patient/getAppointRecordList", username)
        .then(data => {
          if (data.resCode == 1) {
            this.appointRecordList = data.appointRecordList.filter(
              (item, index) => {
                return item.overFlag == false;
              }
            );
          }
        });
    },
    cancelAppoint(index, data) {
      let { createTime, username, treatTime } = data;
      this.$store
        .dispatch("patient/cancelAppoint", { createTime, username, treatTime })
        .then(data => {
          if (data.resCode === 1) {
            Message({
              message: data.des,
              type: "success",
              duration: 2 * 1000
            });
            this.getAppointRecordList();
          } else {
            Message({
              message: data.des,
              type: "error",
              duration: 2 * 1000
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.pay-record-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 25px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }
}
</style>
<style lang="scss">
.has-gutter {
  .cell {
    color: rgb(25, 159, 241);
  }
}
</style>
