<template>
  <div class="addent">
    <el-dialog :title="$parent.isedit?'编辑用户':'新增用户'" :visible.sync="dialogFormVisible">
      <el-form ref='form' :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth" class="entname">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" class="entname">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" class="shortname" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" class="intro" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" class="intro" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" :label-width="formLabelWidth" class="remark" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiuseredit, apiuseradd } from "@/api/user.js";
import {phonepass} from '@/utils/mycheck.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: phonepass, trigger: "blur" }
          
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      form: {
        id: "",
        role_id: "",
        username: "",
        phone: "",
        status: "",
        remark: "",
        email: "",
      }
    };
  },
  methods: {
    onsubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$parent.isedit) {
            //执行编辑逻辑
        
            apiuseredit(this.form).then(res => {
              window.console.log("edit", res);
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.dialogFormVisible = false;
                this.$parent.getlist();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            //执行新增逻辑
            apiuseradd(this.form).then(res => {
              window.console.log(res);
              if (res.data.code == 200) {
                (this.dialogFormVisible = false), this.$parent.getlist();
                this.$message.success("新增成功!");
                this.form.remark = "";
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.addent {
  .el-dialog__header {
    height: 53px;
    background: linear-gradient(
      225deg,
      rgba(20, 147, 250, 1),
      rgba(1, 198, 250, 1)
    );
    text-align: center;
    padding: 0px;
    line-height: 53px;
    .el-dialog__title {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .el-icon-close {
      color: #fff;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>