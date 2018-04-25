Date.prototype.format = function(format) {
    var weekday = new Array(7)
    weekday[0] = "星期日"
    weekday[1] = "星期一"
    weekday[2] = "星期二"
    weekday[3] = "星期三"
    weekday[4] = "星期四"
    weekday[5] = "星期五"
    weekday[6] = "星期六"

    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day  
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds(), //millisecond 
        "D": weekday[this.getDay()],
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
//去左空格;
function ltrim(s) {
    return s.replace(/(^\s*)/g, "");
}
//去右空格;
function rtrim(s) {
    return s.replace(/(\s*$)/g, "");
}
//去左右空格;
function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}