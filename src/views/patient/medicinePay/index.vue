<template>
  <div class="pay-record-wrap">
    <p class="title">诊间缴费</p>
    <el-table :data="medicinePayList" border style="width: 70%" @row-click="rowClick">
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="allPay" label="费用合计（元）" width="350"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="payDetailDialog=true">费用明细</el-button>
          <el-button size="mini" type="success" @click="showDialog">支付</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请选择支付方式" :visible.sync="dialogVisible" width="30%" @close="cancelSubmit">
      <div class="pay-wrap">
        <div
          class="card"
          v-for="(item,index) in payList"
          :key="index"
          @click="selectPayWay(index,item.payWay)"
          :class="{'payCardActive': index == selectPayWayIndex}"
        >
          <div class="card-img" :style="{backgroundImage: 'url(' + item.imgUrl + ')' }"></div>
          <p class="pay-name">{{ item.payWay }}</p>
        </div>
      </div>
      <p class="pay-way-alert" v-if="showAlert">请选择支付方式!</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="postPayRecord">确定支付</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="费用明细"
      :visible.sync="payDetailDialog"
      width="30%"
      @close="payDetailDialog=false"
    >
      <!-- <button @click="payDetail">点击</button> -->
      <el-table :data="payDetailList" border style="width: 100%">
        <el-table-column prop="payDes" label="费用描述" width="180"></el-table-column>
        <el-table-column prop="pay" label="费用（元）"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getUserName } from "@/utils/auth";
import { Message } from "element-ui";
import { weixin, zhifubao } from "../registration/js/image";
import { postPayRecord, deleMedicalPay } from "@/api/patient";
import { getCurrentTime } from "@/utils/getTime";

export default {
  name: "payRecord",
  data() {
    return {
      medicinePayList: [],
      dialogVisible: false,
      selectPayWayIndex: undefined,
      showAlert: false,
      payWay: undefined,
      payList: [
        {
          payWay: "微信支付",
          imgUrl: weixin
        },
        {
          payWay: "支付宝支付",
          imgUrl: zhifubao
        }
      ],
      rowData: null,
      payDetailDialog: false,
      payDetailList: []
    };
  },
  created() {
    this.getMedicinePayList();
  },
  methods: {
    //   获取诊间缴费列表
    getMedicinePayList() {
      let username = getUserName();
      this.$store
        .dispatch("patient/getMedicinePayList", username)
        .then(data => {
          if (data.resCode == 1) {
            this.medicinePayList = data.medicinePayList;
          }
        });
    },
    showDialog() {
      this.dialogVisible = true;
    },
    rowClick(row, column, event) {
      this.rowData = row;
      if (this.payDetailDialog) {
        this.payDetail();
      }
    },
    selectPayWay(index, payWay) {
      this.selectPayWayIndex = index;
      this.payWay = payWay;
    },
    // 诊间缴费，提交缴费信息
    postPayRecord() {
      if (!this.payWay) {
        this.showAlert = true;
        return false;
      } else {
        let that = this;
        let postData = {
          username: getUserName(),
          createTime: getCurrentTime(),
          pay: this.rowData.allPay,
          payWay: this.payWay,
          payDes: "诊间缴费",
          depName: this.rowData.depName
        };
        postPayRecord(postData)
          .then(response => {
            Message({
              message: "支付成功",
              type: "success",
              duration: 3 * 1000
            });
            that.cancelSubmit();
            deleMedicalPay(that.row)
              .then(response => {
                that.getMedicinePayList();
              })
              .catch(error => {
                console.log("deleMedicalPay", error);
                reject(error);
              });
          })
          .catch(error => {
            console.log("postPayRecord", error);
            reject(error);
          });
      }
    },
    cancelSubmit() {
      this.dialogVisible = false;
      this.showAlert = false;
      this.selectPayWayIndex = undefined;
      this.payWay = undefined;
    },
    payDetail() {
      this.payDetailList = [
        {
          payDes: "中医技术治疗费用",
          pay: this.rowData.TCMTreatmentPay
        },
        {
          payDes: "药费",
          pay: this.rowData.drugPay
        }
      ];
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
<style lang="scss">
.el-dialog {
  .el-dialog__body {
    .pay-wrap {
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
        .card-img {
          margin-top: 15px;
          width: 48px;
          height: 48px;
          background-size: cover;
        }
        .pay-name {
          margin: 10px 0 0 0;
          font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        }
      }
      .payCardActive {
        box-shadow: 0 1px 4px rgb(245, 113, 113);
      }
    }
    .pay-way-alert {
      color: red;
      font-size: 12px;
      margin: 20px 0 0 140px;
    }
  }
}
</style>
