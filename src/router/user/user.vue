<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="obj.eid" placeholder class="short"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="obj.name" placeholder class="long"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="obj.role_id" placeholder="所有">
            <el-option label="所有" value></el-option>
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="addbtn">
            <i class="el-icon-plus"></i> 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 学科列表 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop label="序号" type="index" width="100px"></el-table-column>
        <el-table-column prop="username" label="用户名" width="130px"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150px"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180px"></el-table-column>
        <el-table-column prop="role" label="角色" width="180px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180px"></el-table-column>
        <el-table-column prop="status" label="状态" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.status===1?'启用':'禁用' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link
              type="primary"
              @click="userstatus(scope.row)"
            >{{scope.row.status===0?'启用':'禁用'}}</el-link>&nbsp;
            <el-link type="primary" @click="userdel(scope.row)">删除</el-link>&nbsp;
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mypagination"
        background
      ></el-pagination>
    </el-card>
    <process ref="process"></process>
  </div>
</template>

<script>
import { apiuserlist, apiuserstatus, apiuserdel } from "@/api/user.js";
//新增路由
import process from './process/process'
export default {
  data() {
    return {
      isedit: '',
      total: 0,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      obj: {
        page: 1,
        limit: 4,
        role_id: "",
        username: "",
        email: "",
        role:""
      }
    };
  },
  methods: {
    handleSizeChange(index) {
      this.obj.limit = index;
      this.getlist();
    },
    handleCurrentChange(index) {
      this.obj.page = index;
      this.getlist();
    },
    getlist() {
      apiuserlist(this.obj).then(res => {
        window.console.log("ent", res);
        if (res.data.code == 200) {
          this.total = res.data.data.pagination.total;
          this.tableData = res.data.data.items;
        }
      });
    },
    addbtn() {
        this.$refs.process.dialogFormVisible = true;
        this.isedit = false;
        (this.$refs.process.form.role = ""),
          (this.$refs.process.form.id = ""),
          (this.$refs.process.form.role_id = ""),
          (this.$refs.process.form.phone = ""),
          (this.$refs.process.form.status = ""),
          (this.$refs.process.form.remark = "");
          (this.$refs.process.form.email = "");
          (this.$refs.process.form.username = "");
        window.console.log('form',this.$refs.process.$refs.form)
        // this.$refs.process.$refs.form.resetFields()
     
    },
    search() {
      this.getlist();
    },
    userstatus(x) {
      apiuserstatus(x.id).then(res => {
        if (res.data.code == 200) {
          this.getlist();
          if (x.status == 1) {
            this.$message.success("禁用成功");
          } else {
            this.$message.success("启用成功");
          }
        }
      });
    },
    clear() {
      (this.obj.name = ""),
        (this.obj.page = 1),
        (this.obj.limit = 4),
        (this.obj.role_id = ""),
        (this.obj.username = ""),
        this.getlist();
    },
    edit(x) {
        this.isedit = true;
        this.$refs.process.dialogFormVisible = true;
        if (this.$refs.process.form.id !== x.id) {
          let obj = JSON.parse(JSON.stringify(x));
          this.$refs.process.form = obj;
        }
    },
  userdel(x) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiuserdel(x.id).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              window.console.log('changdu',this.tableData.length)
              if (this.tableData.length == 1) {
                this.obj.page = this.obj.page - 1;
              }
              this.getlist();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getlist();
  },
  components: {
    process
  }
}
</script>

<style>
</style>