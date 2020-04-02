<template>
  <div class="addent">
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="formname">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth" class="rid">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth" class="entname">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth" class="shortname" prop="short_name"> 
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth" class="intro"  prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth" class="remark" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {apienteradd} from '@/api/enterprise.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
          eid:[
               { required: true, message: '请输入企业编号', trigger: 'blur' },
          ],
          name:[
               { required: true, message: '请输入企业名称', trigger: 'blur' },
          ],
          short_name:[
               { required: true, message: '请输入企业简称', trigger: 'blur' },
          ],
          intro:[
               { required: true, message: '请输入企业简介', trigger: 'blur' },
          ],
      },
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      }
    };
  },
  methods: {
      addsubmit(){
             this.$refs.formname.validate((valid) => {
          if (valid) {
            apienteradd(this.form).then(res=>{
                window.console.log(res)
                if(res.data.code==200){
                   this.dialogFormVisible=false,
                   this.$parent.getentlist()
                   this.$message.success('新增成功!')
                   this.$refs.formname.resetFields()
                   this.form.remark=''
                }else{
                    this.$message.error(res.data.message)
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  },
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
  .dialog-footer{
     text-align: center;
  }
}
</style>