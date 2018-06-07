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