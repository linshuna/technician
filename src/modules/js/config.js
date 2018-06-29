export function changeTitle(title) {
  return document.getElementsByTagName('title')[0].innerHTML=title;
}

export const configObj = {
}


// 截取字符串
export function GetQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  let r = window.location.search.substr(1).match(reg); //真实环境请用这句
  if (r!==null) return (r[2]); return null;
}

//时间戳转时分
export function SecondToDate(msd) {
  var time = msd
  if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
          time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
              parseInt(time / 60.0)) * 60) + "秒";
      }
      else if (time >= 60 * 60 && time < 60 * 60 * 24) {
          time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60) + "分钟" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
      } else if (time >= 60 * 60 * 24) {
          time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
              parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60) + "分钟" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
      }
      else {
          time = parseInt(time) + "秒";
      }
  }
  return time;
}