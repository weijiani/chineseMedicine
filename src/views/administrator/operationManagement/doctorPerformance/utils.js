


function getMonthData(list,month) {
    let newList = list.filter((item,index) => {
        return item.month == month
    });
    return newList.length
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

export function getDeplist(list,doctorName){
    
    let newList = list.filter((item,index) => {
        return item.doctorName == doctorName
    });
    return newList
    
    
}


