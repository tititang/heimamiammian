<template>
  <div class="login">
    <div class="leftbox">
      <div class="title">
        <span class="titlelogo">
          <img src="../../assets/矢量智能对象 拷贝 9.png" alt />
        </span>
        <span class="title1">黑马面面</span>
        <span class="titleline"></span>
        <span class="title2">用户登录</span>
      </div>
      <el-form ref="form" :model="form" label-width="0px" :rules="rules" class="formsty">
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="form.phone"
            class="inputmsg"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            class="inputmsg"
          ></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="8" class="logincaptchadiv">
              <img :src="logincode" alt class="logincaptcha" @click="getlogincode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="ischeck">
          <el-checkbox name="type" class="logincheck" v-model="form.ischeck">
            我已阅读并同意
            <el-link type="primary" href="./02element栅格系统.html" target="_blank" id="loginlink">用户协议</el-link>和
            <el-link type="primary" href="./01element输入框练习.html" target="_blank" id="loginlink">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="loginbtn">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onrigister" class="loginbtn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="rightbox">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
    <rigister ref="rigister"></rigister>
  </div>
</template>

<script>
import rigister from "./components/rigister";
import { phonepass } from "@/utils/mycheck.js";
import { apilogin } from "@/api/login.js";
import { settoken } from "@/utils/mytoken.js";
//校验的方法
export default {
  components: {
    rigister
  },
  data() {
    return {
      logincode: process.env.VUE_APP_URL + "/captcha?type=login",
      codearr: [],
      form: {
        phone: "",
        password: "",
        logincode: "",
        ischeck: []
      },
      input1: "",
      input2: "",
      input3: "",
      rules: {
        phone: [{ validator: phonepass, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "密码长度应为5-10个字符",
            trigger: "blur"
          }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4个字符",
            trigger: "blur"
          }
        ],
        ischeck: [
          {
            type: "array",
            required: true,
            message: "此处为必填项",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getlogincode() {
      this.logincode =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apilogin({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.logincode
          }).then(res => {
            window.console.log(res)
          if(res.data.code==200){
            settoken(res.data.data.token);
            //跳转到首页
            this.$router.push({
              path:'/index'
            })
          }else{
            this.$message.error(res.data.message)
          }
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    onrigister() {
      this.$refs.rigister.dialogFormVisible = true;
    }
  },
};
</script>

<style lang='less'>
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .leftbox {
    width: 478px;
    height: 550px;
    background-color: #fff;
    padding: 47px 42px 86px 42px;
    .title {
      display: flex;
      align-items: center;
      .titlelogo {
        width: 22px;
        height: 17px;
      }
      .title1 {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 22px;
        margin-left: 16px;
      }
      .titleline {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .title2 {
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 22px;
      }
    }
    .formsty {
      margin-top: 29px;
      .el-form-item {
        margin-bottom: 25px;
      }
      .el-form-item:nth-child(3) {
        margin-bottom: 20px;
      }
      .logincaptchadiv {
        height: 40px;
      }
      .logincaptcha {
        width: 100%;
        height: 40px;
      }
    }
    .logincheck {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 16px;
      #loginlink {
        text-decoration: none;
        span {
          text-decoration: none;
        }
      }
    }
    .loginbtn {
      width: 100%;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
    }
  }
  .rightbox {
    width: 633px;
    height: 435px;
    // margin-right: 73px;
  }
}
</style>