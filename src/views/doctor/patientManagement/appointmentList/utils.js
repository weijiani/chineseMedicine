
import { cancelAppoint } from "@/api/patient";
export function correctList(list) {
    let noNeedList = list.filter(item => {
        let time = item.treatTime.split(' ')[0]
        return new Date(time) < new Date() && time != new Date().toLocaleDateString()
    });
    // 删除没有用的预约
    deleteList(noNeedList)
    let newList = list.filter(item => {
        let time = item.treatTime.split(' ')[0]
        return new Date(time) > new Date() || time == new Date().toLocaleDateString()
    });
    // 返回正确的预约列表
    let appointList = []
    // 今天上午的预约
    let mornAppointList = newList.filter(item => {
        let time1 = item.treatTime.split(' ')[0]
        let time2 = item.treatTime.split(' ')[1]
        return  time1 == new Date().toLocaleDateString() && time2 == '9:00~11:20'
    });
     // 今天下午的预约
    let afterAppointList = newList.filter(item => {
        let time1 = item.treatTime.split(' ')[0]
        let time2 = item.treatTime.split(' ')[1]
        return  time1 == new Date().toLocaleDateString() && time2 == '14:00~16:30'
    });

    if (new Date().getHours() < 12) {
        appointList = mornAppointList
    } else {
        deleteList(mornAppointList)
        appointList = afterAppointList
    }
    return forwardRankingDate(appointList, 'createTime')

}

function forwardRankingDate(list, p) {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (Date.parse(list[j][p]) > Date.parse(list[j + 1][p])) {
                var temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
    return list;
}


function deleteList(list) {
    if (list.length == 0) return false
    list.forEach(item => {
        let createTime = item.createTime
        let username = item.username
        let treatTime = item.treatTime
        cancelAppoint({ createTime, username, treatTime })
            .then(res => {
                if (res.data.resCode === 1) {
                    console.log('预约删除成功')
                }
            })
            .catch(error => {
                console.log("cancelAppoint", error);
                reject(error);
            });
    });
}

