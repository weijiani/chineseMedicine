<template>
  <div class="app-container">
    <div class="doctorPerformance-wrap">
      <el-input placeholder="请输入医生名称" v-model="doctorName"  @keyup.enter.native="changeChart">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="chart" id="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import { getUserName } from "@/utils/auth";
import { getAppointRecordList } from "@/api/patient";
import { getOption } from "./options";
import { getChartData, getDeplist } from "./utils";
export default {
  data() {
    return {
      appointRecordList: [],
      chart: null,
      doctorName: ''
    };
  },
  created() {},
  mounted() {
    this.getDoctorPerformanceList();
  },
  methods: {
    //   获取医生业绩数据
    getDoctorPerformanceList() {
      getAppointRecordList()
        .then(res => {
          if (res.data.resCode == 1) {
            this.appointRecordList = res.data.appointRecordList;
            this.initChart();
          }
        })
        .catch(error => {
          console.log("getPayRecordList", error);
          reject(error);
        });
    },
    // 初始化图表
    initChart() {
      let chart = echarts.getInstanceByDom(document.querySelector("#chart"));
      if (chart === undefined) {
        chart = echarts.init(document.querySelector("#chart"));
      }
      this.chart = chart;
      let seriesData = []
      chart.setOption(getOption(seriesData));
    },
    changeChart() {
      let list = getDeplist(this.appointRecordList, this.doctorName);
      let seriesData = getChartData(list);
      this.reSetOption(seriesData);
    },
    reSetOption(data) {
      this.chart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.doctorPerformance-wrap {
  .chart {
    margin: 10px 0 0 20px;
    width: 800px;
    height: 500px;
    color: rgb(21, 172, 126)
  }
}
</style>
<style lang="scss">
.el-input{
  width: 200px;
}
</style>
