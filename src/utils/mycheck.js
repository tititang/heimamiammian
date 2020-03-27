export function phonepass(rule, value, callback){
    let res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (value === "") {
      callback(new Error("请输入手机号"));
    } else {
      if (res.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式错误"));
      }
    }
  }
  export function emailpass(rule, value, callback){
    let res = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (value === "") {
      callback(new Error("请输入邮箱号"));
    } else {
      if (res.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱号格式错误"));
      }
    }
  }