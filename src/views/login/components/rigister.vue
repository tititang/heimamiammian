<template>
  <div class="rigistersty">
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="title">
      <el-form :model="form" class="form" :rules="rules" ref='form'>
        <el-form-item label="头像" :label-width="formLabelWidth" class="headiconitem">
          <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
          <label for="headicon" class="headicon"></label>
          <el-input type="file" autocomplete="off" id="headicon" v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="8" class="rigistercode">
              <img src="../../../assets/login_captcha.png" alt class="rigisterimg" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.captcha" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="8" class="rigistercode">
              <el-buttom class="rigisterbtn">获取用户验证码</el-buttom>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="footbtn">取 消</el-button>
        <el-button type="primary" @click="onsubmit" class="footbtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//定义校验方法
var phonepass = (rule, value, callback) => {
  let res=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (res.test(value)) {
            callback()
          }else{
            callback(new Error('手机号格式错误'))
          }
        }
      };
      var emailpass = (rule, value, callback) => {
  let res=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (value === '') {
          callback(new Error('请输入邮箱号'));
        } else {
          if (res.test(value)) {
            callback()
          }else{
            callback(new Error('邮箱号格式错误'))
          }
        }
      };
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "67px",
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        captcha: "",
        icon: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
           { validator: emailpass, trigger: 'blur' }
        ],
        phone: [
           { validator: phonepass, trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onsubmit() {
     
      this.$refs.form.validate(valid => {
        if (valid) {
           this.dialogFormVisible = false;
          this.$message({
            message: "恭喜你,验证成功",
            type: "success"
          });
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.rigistersty {
  // width: 600px;
  .el-dialog {
    width: 600px;

    .el-dialog__header {
      background: linear-gradient(
        225deg,
        rgba(20, 147, 250, 1),
        rgba(1, 198, 250, 1)
      );
      padding: 10px 20px;
      text-align: center;
      .el-dialog__title {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(254, 254, 254, 1);
      }
    }
    .form {
      text-align: left;
      .el-form-item__label:before {
        content: "*";
        color: red;
      }
      .el-form-item__content {
        line-height: 0px;
      }
      .headiconitem {
        text-align: center;
        #headicon {
          display: none;
        }
        .headicon {
          display: inline-block;
          width: 179px;
          height: 179px;
          border: 1px dashed rgba(206, 206, 206, 1);
          border-radius: 4px;
          text-align: center;
          line-height: 179px;
        }
        .headicon::before {
          content: "+";
          font-size: 24px;
          font-weight: 400;
        }
      }

      .rigistercode {
        //  width: 143px;
        height: 40px;
        text-align: right;
        .rigisterimg {
          width: 143px;
          height: 40px;
        }
      }
      .rigisterbtn {
        display: inline-block;
        width: 143px;
        height: 40px;
        border: 1px solid rgba(211, 215, 223, 1);
        border-radius: 4px;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(86, 88, 93, 1);
        text-align: center;
        line-height: 40px;
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
      .footbtn {
      }
    }
  }
}
</style>