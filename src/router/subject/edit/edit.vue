<template>
  <div class="addsub">
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="formname">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth" class="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth" class="subname">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiedit } from "@/api/subject.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: "",
        rid: "",
        name: "",
        remark: "",
        intro: "",
        short_name: ""
      },
      formLabelWidth: "100px",
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    onadd() {
      this.dialogFormVisible = true;
    },
    editsubmit() {
      this.$refs.formname.validate(valid => {
        if (valid) {
          apiedit(this.form).then(res => {
            window.console.log("edit", res);
            if (res.data.code == 200) {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.getlist();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less'>
.addsub {
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
  .rid {
    .el-form-item__label::before {
      content: "*";
      color: red;
    }
  }
  .subname {
    .el-form-item__label::before {
      content: "*";
      color: red;
    }
  }
}
</style>