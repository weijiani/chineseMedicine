



export function getOption(data) {
    let option = {
        title: { text: '本年度诊所营业额',
        textStyle: {
            color: 'rgb(206, 24, 11)'
        }
      },
        tooltip: {},
        xAxis: {
           
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        },
        yAxis: {
            name: '单位：元',
        },
        series: [{
            name: '营业额',
            type: 'bar',
            data: data
        }]
    }
    return option
}