
let date = new Date()

let year = date.getFullYear()

let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

// let day = date.getDate(); //获取当前日(1-31)

// let week = date.getDay(); //获取当前星期X(0-6,0代表星期天)

// let time = date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)

let hour = date.getHours(); //获取当前小时数(0-23)

let minutes = date.getMinutes(); //获取当前分钟数(0-59)

let seconds = date.getSeconds(); //获取当前秒数(0-59)

let localeDate = date.toLocaleDateString(); //"2020/4/23"

// let localeTime = date.toLocaleTimeString(); //"下午10:50:00"

let locale = new Date().toLocaleString(); //"2020/4/23 下午10:49:23"

function getDate(index) {
    var time = new Date().getTime() + parseInt(index) * 86400000;
    var date = new Date(time).toLocaleString().replace(/\//g, '-').split(" ")[0].toString();
    return date;
}



export function getCurrentDay() {
    return getDate(0)
}

export function getNextDay() {
    return getDate(1)
}

export function getDayafterTomorrow() {
    return getDate(2)
}


export function isFirstOverTime() {
    if((hour > 11 || (hour == 11 && minutes > 20) )){
        return true
    }else{
        return false
    }
    
}

export function isSecondOverTime() {
    if( hour > 16 || (hour == 16 && minutes > 30) ){
        return true
    }else{
        return false
    }
}

export function getCurrentTime() {
    console.log("gettime被调用了")
    return locale
}