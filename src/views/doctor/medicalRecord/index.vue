<template>
  <div class="app-container">
    <el-input
      placeholder="请输入患者姓名"
      prefix-icon="el-icon-search"
      v-model="patientNameSearch"
      @keyup.enter.native="getMedicalRecordList"
    ></el-input>
    <el-table
      v-loading="loading"
      :data="medicalRecordList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @cell-click="checkDetail"
    >
      <el-table-column align="center" label="患者名称" width="150">
        <template slot-scope="scope">{{ scope.row.patientName }}</template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="病历记录" :visible.sync="dialogVisible" width="60%">
      <div class="medicalRecord-detail-wrap" v-if="medicalRecord">
        <div class="medicalRecord-item">
          <label>姓名:</label>
          <span>{{medicalRecord.patientMsg.username}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>性别:</label>
          <span>{{medicalRecord.patientMsg.sex}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>出生日期:</label>
          <span>{{new Date(medicalRecord.patientMsg.birthData).toLocaleDateString()}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>年龄:</label>
          <span>{{medicalRecord.patientMsg.age}}</span>
        </div>
        <div class="medicalRecord-item">
          <label>手机号码:</label>
          <span>{{medicalRecord.patientMsg.telNumber}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>居住地址:</label>
          <span>{{medicalRecord.patientMsg.region}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>科别：</label>
          <span>{{medicalRecord.doctorDiagnosis.depName}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>主诉：</label>
          <span>{{medicalRecord.doctorDiagnosis.mainSuit}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>现病史：</label>
          <span>{{medicalRecord.doctorDiagnosis.currentIllHis}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>既往史：</label>
          <span>{{medicalRecord.doctorDiagnosis.oldIllHis}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>体格检查：</label>
          <span>{{medicalRecord.doctorDiagnosis.bodyCheck}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>诊断：</label>
          <span>{{medicalRecord.doctorDiagnosis.diagnosis}}</span>
        </div>
        <div class="medicalRecord-item" style="width: 800px">
          <label>处方：</label>
          <div class="drugs-detail">
            <label>成分：</label>
            <span>{{medicalRecord.doctorDiagnosis.drugs.ingredient}}</span>
            <br />
            <label>用法：</label>
            <span>{{medicalRecord.doctorDiagnosis.drugs.usage}}</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="medicalRecord">
        <label>医生：</label>
        <span>{{medicalRecord.doctorDiagnosis.doctorName}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMedicalRecordList } from "@/api/doctor";
import { getUserName } from "@/utils/auth";
export default {
  data() {
    return {
      loading: false,
      medicalRecordList: [],
      patientNameSearch: "",
      dialogVisible: false,
      medicalRecord: null
    };
  },
  created() {},
  mounted() {
    // this.getMedicalRecordList()
  },
  methods: {
    // 获取患者病历信息
    getMedicalRecordList() {
      getMedicalRecordList({ patientName: this.patientNameSearch })
        .then(res => {
          this.medicalRecordList = res.data.medicalRecordList;
          this.loading = false;
        })
        .catch(error => {
          console.log("getMedicalRecordList", error);
          reject(error);
        });
    },
    checkDetail(row, column, cell, event) {
      this.dialogVisible = true;
      console.log(row);
      this.medicalRecord = row;
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
.el-input {
  width: 300px;
  margin: 0 0 30px 0px;
}
.el-dialog__body {
  .medicalRecord-detail-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 800px;
    margin: 0 auto;
    .medicalRecord-item {
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
.dialog-footer {
  padding-right: 100px;
  label {
    color: rgb(241, 68, 25);
  }
}
</style>

















