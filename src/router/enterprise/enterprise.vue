<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="entobj.eid" placeholder class="short"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="entobj.name" placeholder class="long"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="entobj.user" placeholder class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="entobj.status" placeholder="所有">
            <el-option label="所有" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="addentbtn">
            <i class="el-icon-plus"></i> 新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 学科列表 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" type="index" width="100px"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="130px"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="150px"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180px"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180px">
          >
          <template slot-scope="scope">{{scope.row.create_time|mydate}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.status===1?'启用':'禁用' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="entstatus(scope.row)">{{scope.row.status===0?'启用':'禁用'}}</el-link>&nbsp;
            <el-link type="primary">删除</el-link>&nbsp;
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="entobj.page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="entobj.limit"
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
import { apienterlist, apienterstatus } from "@/api/enterprise.js";
import process from "./process/process";
//新增学科路由
export default {
  data() {
    return {
      isedit: true,
      total: 0,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      entobj: {
        name: "",
        page: 1,
        limit: 4,
        eid: "",
        username: "",
        status: ""
      }
    };
  },
  methods: {
    handleSizeChange(index) {
      this.entobj.limit = index;
      this.getentlist();
    },
    handleCurrentChange(index) {
      this.entobj.page = index;
      this.getentlist();
    },
    getentlist() {
      apienterlist(this.entobj).then(res => {
        window.console.log("ent", res);
        this.total = res.data.data.pagination.total;
        this.tableData = res.data.data.items;
      });
    },
    addentbtn() {
      this.$refs.process.dialogFormVisible = true;
      this.isedit = false;
      this.$refs.process.$refs.formname.resetFields();
      (this.$refs.process.form.eid = ""),
        (this.$refs.process.form.id = ""),
        (this.$refs.process.form.name = ""),
        (this.$refs.process.form.short_name = ""),
        (this.$refs.process.form.intro = ""),
        (this.$refs.process.form.remark = "");
    },
    search() {
      this.getentlist();
    },
    entstatus(x) {
      apienterstatus(x.id).then(res => {
        if (res.data.code == 200) {
          this.getentlist();
          if (x.status == 1) {
            this.$message.success("禁用成功");
          } else {
            this.$message.success("启用成功");
          }
        }
      });
    },
    clear() {
      (this.entobj.name = ""),
        (this.entobj.page = 1),
        (this.entobj.limit = 4),
        (this.entobj.eid = ""),
        (this.entobj.username = ""),
        (this.entobj.status = "");
      this.getentlist();
    },
    edit(x) {
      // this.$refs.editent.dialogFormVisible = true;

      this.isedit = true;
      this.$refs.process.dialogFormVisible = true;
      if (this.$refs.process.form.id !== x.id) {
        let obj = JSON.parse(JSON.stringify(x));
        this.$refs.process.form = obj;
      }
    }
  },
  created() {
    this.getentlist();
  },
  components: {
    process
  }
};
</script>

<style>
</style>