<template>
  <div class="rigistersty">
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="title">
      <el-form :model="form" class="form" :rules="rules" ref="form">
        <el-form-item label="头像" :label-width="formLabelWidth" class="headiconitem" prop="icon">
          <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
          <el-upload
            class="avatar-uploader"
            :action="iconurl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
            ref="iconurl"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
              <img :src="imgurl" alt class="rigisterimg" @click="getimgurl" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.captcha" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="8" class="rigistercode">
              <el-button
                class="rigisterbtn"
                :disabled="time!=0"
                @click="getcode"
              >{{time>0?time:'获取用户验证码'}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset" class="footbtn">取 消</el-button>
        <el-button type="primary" @click="onsubmit" class="footbtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入模块
//导入封装的方法
import { apigetcode,apirigister } from "@/api/rigister";
//定义校验方法
var phonepass = (rule, value, callback) => {
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
};
var emailpass = (rule, value, callback) => {
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
};
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "67px",
      imgurl:
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms" +
        "&date=" +
        Date.now(),
      timer: null,
      time: 0,
      imageUrl: "",
      iconurl: process.env.VUE_APP_URL + "/uploads",
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
        icon: [{ required: true, message: "请选择头像", trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [{ validator: emailpass, trigger: "blur" }],
        phone: [{ validator: phonepass, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击校验规则
    onsubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apirigister({
            username:this.form.nickname,
            phone:this.form.phone,
            email:this.form.email,
            avatar:this.form.icon,
            password:this.form.password,
            rcode:this.form.captcha
          }).then(res=>{
           if(res.data.code!=200){
             this.$message.error(res.data.message)
           }else{
             this.$message.success('注册成功')
             this. reset()
           }
          }).catch(err=>{
            window.console.log(err)
          })
         
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },
    //点击获取图片验证码
    getimgurl() {
      this.imgurl =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms" +
        "&date=" +
        Date.now();
    },
    //获取短信验证码
    getcode() {
      //判断手机号是否合法
      let res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

      if (!res.test(this.form.phone)) {
        this.$message.error("手机号不合法!");
        return;
      }if(this.form.code.trim().length!=4){
         this.$message.error("图形验证码不合法!");
        return;
      }
    
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 100);
      apigetcode({
        code: this.form.code,
        phone: this.form.phone
      })
        .then(res => {
          if(res.data.code!=200){
            this.$message.error(res.data.message)
          }else{
  this.$message.success('验证码为'+res.data.data.captcha+"")
          }
          
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    //头像上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.icon = res.data.file_path;
      this.$refs.form.validateField("icon");
    },
    //头像上传之前的回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    reset(){
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.imageUrl=''
    }
  }
};
</script>

<style lang='less'>
.rigistersty {
  // width: 600px;
  .el-dialog {
    width: 600px;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
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
        // line-height: 40px;
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
      .footbtn {
        // line-height: 40px;
      }
    }
  }
}
</style>