


function getMonthData(list,month) {
    let newList = list.filter((item,index) => {
        return item.month == month
    });
    return newList.length
    // console.log('newList',newList)
    // if(newList.length == 0){
    //     return 0
    // }else{
    //     let newArr = []
    //     newList.forEach((item,index)=>{
    //         newArr.push(item.pay)
    //     })
    //     let monthData = newArr.reduce((total, num)=>{
    //         return total + num
    //     })
    //     return monthData
    // }
    
}



 export function getChartData(list) {
     if(list.length==0){
         return []
     }else{
        list.forEach((item,index) => {
            let itemMonth = new Date(Date.parse(item.createTime.split(' ')[0])).getMonth()+1
            item.month = itemMonth
       });
       let newArr = []
       for(let i = 0;i<12;i++){
           newArr.push(getMonthData(list,i+1))
       }
       return newArr
     }
   
    
}

export function getDeplist(list,depName){
    if(depName=='门诊总和'){
        return list
    }else{
        let newList = list.filter((item,index) => {
            return item.depName == depName
        });
        return newList
    }
    
}


