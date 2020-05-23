<template>
  <div class="app-container">
    <p class="patientName">患者：{{patientName}}</p>
    <div class="prescribing-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 主诉-->
        <el-form-item label="主诉：" prop="mainSuit" style="width: 70%;">
          <el-input type="textarea" v-model="ruleForm.mainSuit"></el-input>
        </el-form-item>
        <!-- 现病史 -->
        <el-form-item label="现病史：" prop="currentIllHis" style="width: 70%;">
          <el-input type="textarea" v-model="ruleForm.currentIllHis"></el-input>
        </el-form-item>
        <!-- 既往史 -->
        <el-form-item label="既往史：" prop="oldIllHis" style="width: 70%;">
          <el-input type="textarea" v-model="ruleForm.oldIllHis"></el-input>
        </el-form-item>

        <!-- 体格检查-->
        <el-form-item label="体格检查：" prop="bodyCheck" style="width: 70%;">
          <el-input type="textarea" v-model="ruleForm.bodyCheck"></el-input>
        </el-form-item>
        <!-- 诊断 -->
        <el-form-item label="诊断：" prop="diagnosis" style="width: 70%;">
          <el-input type="textarea" v-model="ruleForm.diagnosis"></el-input>
        </el-form-item>
        <!-- 处方 -->
        <el-form-item label="处方：" style="width: 70%;" class="drug">
          <el-form-item label="成分：" prop="ingredient" style="width: 70%;">
            <el-input v-model="ruleForm.drugs.ingredient" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="用法：" prop="usage" style="width: 70%;">
            <el-input v-model="ruleForm.drugs.usage" type="textarea"></el-input>
          </el-form-item>
          <el-button type="warning" @click="showDragList">选用模板药方</el-button>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" @click="submitHandle">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="处方模板" :visible.sync="drugDialogVisible" width="80%">
      <el-table :data="dragList" border fit highlight-current-row @cell-click="selectDrug">
        <el-table-column align="center" label="处方名称" width="150">
          <template slot-scope="scope">{{ scope.row.dragname }}</template>
        </el-table-column>
        <el-table-column label="药品成分" align="center">
          <template slot-scope="scope">{{ scope.row.ingredient }}</template>
        </el-table-column>
        <el-table-column label="用法" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.usage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger">选用此药方</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getUserDetail, makeAnAppointment } from "@/api/patient";
import { getDragList, postMedicalRecord, postMedicalPay } from "@/api/doctor";
import { getUserName } from "@/utils/auth";
import { Message } from 'element-ui'
export default {
  data() {
    return {
      patientDetail: {},
      patientName: "",
      ruleForm: {
        mainSuit: "",
        currentIllHis: "",
        oldIllHis: "",
        bodyCheck: "",
        diagnosis: "",
        drugs: {
          ingredient: "",
          usage: ""
        },
        doctorName: getUserName(),
        depName: ""
      },
      rules: {
        mainSuit: [
          { required: true, message: "请输入患者主诉", trigger: "blur" }
        ],
        currentIllHis: [
          { required: true, message: "请输入患者现病史", trigger: "blur" }
        ],
        oldIllHis: [
          { required: true, message: "请输入患者既往史", trigger: "blur" }
        ],
        bodyCheck: [
          { required: true, message: "请输入患者体格检查结果", trigger: "blur" }
        ],
        diagnosis: [
          { required: true, message: "请输入患者诊断结果", trigger: "blur" }
        ]
      },
      drugDialogVisible: false,
      dragList: []
    };
  },
  watch: {},
  created() {},
  mounted() {
    if (!this.$route.query.patientName) {
        Message({
          message: '请先选择病人！',
          type: 'error',
          duration: 3 * 1000
      })
      this.$router.push({ path: "/doctor/appointmentList" });
      return false;
    }
    this.getDragList();
    this.getPatientDetail();
  },
  methods: {
    getPatientDetail() {
      this.ruleForm.depName = this.$route.query.depName;
      this.patientName = this.$route.query.patientName;
      let postData = {
        username: this.patientName,
        role: "0"
      };
      getUserDetail(postData)
        .then(res => {
          let patientDetail = res.data.userDetail[0];
          this.patientDetail = patientDetail
        })
        .catch(error => {
          console.log("getUserDetail", error);
          reject(error);
        });
    },
    showDragList() {
      this.drugDialogVisible = true;
    },
    getDragList() {
      getDragList({ username: getUserName() })
        .then(res => {
          this.dragList = res.data;
        })
        .catch(error => {
          console.log("getDragList", error);
          reject(error);
        });
    },
    selectDrug(row, column, cell, event) {
      this.ruleForm.drugs.ingredient = row.ingredient;
      this.ruleForm.drugs.usage = row.usage;
      this.drugDialogVisible = false;
    },
    // 医生提交诊断信息
    submitHandle() {
      let medicalData = {
        patientMsg: this.patientDetail,
        doctorDiagnosis: this.ruleForm,
        createTime: new Date().toLocaleString(),
        patientName: this.patientName
      };
      postMedicalRecord(medicalData)
        .then(res => {
          if (res.data.resCode === 1) {
            // console.log("提交病历成功")
            makeAnAppointment({
              patientName: this.patientName,
              doctorName: getUserName(),
              updateFlag: true
            })
              .then(res => {
                if (res.data.resCode === 1) {
                  // console.log("修改预约成功")
                  postMedicalPay({
                    payUsername: this.patientName,
                    createTime: new Date().toLocaleString(),
                    TCMTreatmentPay: 10,
                    drugPay: 200,
                    depName: this.$route.query.depName
                  })
                    .then(res => {
                      if (res.data.resCode === 1) {
                        // console.log("提交诊间缴费成功")
                        this.$router.push({ path: "/doctor/appointmentList" });
                      }
                    })
                    .catch(error => {
                      console.log("postMedicalPay", error);
                      reject(error);
                    });
                }
              })
              .catch(error => {
                console.log("makeAnAppointment", error);
                reject(error);
              });
          }
        })
        .catch(error => {
          console.log("postMedicalRecord", error);
          reject(error);
        });
    }
  }
};
</script>

<style lang="scss">
.drug {
  > .el-form-item__content {
    margin-top: 50px;
    margin-left: 50px !important;
    .el-form-item {
      margin: 0px 0 20px 0;
    }
    .el-button {
      margin: 0 0 0 380px;
    }
  }
}
</style>
<style lang="scss" scoped>
.app-container {
  .patientName {
    margin-left: 40px;
    color: rgb(13, 152, 238);
  }
}
</style>