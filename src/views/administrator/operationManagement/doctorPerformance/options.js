



export function getOption(data) {
    let option = {
        title: { text: '本年度医生诊断人数',
        textStyle: {
            color: 'rgb(21, 172, 126)'
        }
      },
        tooltip: {},
        xAxis: {
           
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        },
        yAxis: {
            name: '单位：人',
        },
        series: [{
            name: '诊断人数',
            type: 'bar',
            data: data,
            itemStyle: {
                normal: {
                    color: 'rgb(21, 172, 126)'
                }
            }
        }]
    }
    return option
}