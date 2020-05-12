<template>
  <div class="app-container">
    <div class="patientSituation-wrap">
      <el-select v-model="value" placeholder="" @change="changeChart">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="chart" id="chart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import { getUserName } from "@/utils/auth";
import { getAppointRecordList } from "@/api/patient";
import { getOption } from "./options";
import { getChartData,getDeplist } from "./utils";
export default {
  data() {
    return {
      appointRecordList: [],
      chart: null,
      options: [{
          value: '门诊总和',
          label: '门诊总和'
        }, {
          value: '内科',
          label: '内科'
        }, {
          value: '外科',
          label: '外科'
        }, {
          value: '妇科',
          label: '妇科'
        }, {
          value: '男科',
          label: '男科'
        },{
          value: '皮肤科',
          label: '皮肤科'
        }, {
          value: '消化科',
          label: '消化科'
        }, {
          value: '老年科',
          label: '老年科'
        }, {
          value: '骨科',
          label: '骨科'
        }, {
          value: '肿瘤科',
          label: '肿瘤科'
        },{
          value: '营养科',
          label: '营养科'
        }, {
          value: '疼痛科',
          label: '疼痛科'
        }],
        value: "门诊总和"
    };
  },
  created() {
    
  },
  mounted() {
    this.getPatientSituationList()
  },
  methods: {
     //   获取患者情况数据
    getPatientSituationList() {
      getAppointRecordList()
        .then(res => {
          if (res.data.resCode == 1) {
            this.appointRecordList = res.data.appointRecordList;
            // console.log(this.appointRecordList)
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
      let seriesData = getChartData(this.appointRecordList)
      chart.setOption(getOption(seriesData));
    },
    changeChart(val){
      let list = getDeplist(this.appointRecordList,val)
      let seriesData = getChartData(list)
      this.reSetOption(seriesData)
    },
    reSetOption(data) {
      this.chart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    },
    
  }
};
</script>
<style lang="scss" scoped>
.patientSituation-wrap {
  .chart {
    margin: 10px 0 0 20px;
    width: 800px;
    height: 500px;
    color: rgb(13, 187, 240);
  }
}
</style>
<style lang="scss">
.el-select {
  margin: 0 0 0 900px;
}
</style>
