<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="subobj.rid" placeholder class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="subobj.name" placeholder class="long"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="subobj.user" placeholder class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="subobj.status" placeholder="所有">
            <el-option label="所有" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 学科列表 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" type="index" width="100px"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="130px"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="150px"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="130px"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180px"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180px">>
           <template slot-scope="scope">
           {{scope.row.create_time|mydate}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.status===1?'启用':'禁用' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="getstatus(scope.row)">{{scope.row.status===0?'启用':'禁用'}}</el-link>&nbsp;
            <el-link type="primary" @click="delsub(scope.row)">删除</el-link>&nbsp;
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="subobj.page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="subobj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="mypagination"
        background
      ></el-pagination>
    </el-card>
    <addsubject ref="addsub"></addsubject>
    <edit ref="edit"></edit>
  </div>
</template>

<script>
import { getsubjectlist, getsubjectstatus, apidel } from "../../api/subject.js";
//新增学科路由
import addsubject from "./addsubject/addsubject";
import edit from "./edit/edit";
export default {
  
  data() {
    return {
      total: 0,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      subobj: {
        name: "",
        page: 1,
        limit: 4,
        rid: "",
        username: "",
        status: ""
      }
    };
  },
  methods: {
    delsub(x) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apidel(x.id).then(res => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
              window.console.log('changdu',this.tableData.length)
              if (this.tableData.length == 1) {
                this.subobj.page = this.subobj.page - 1;
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
    },
    edit(x) {
      this.$refs.edit.dialogFormVisible = true;
      if (this.$refs.edit.form.id !== x.id) {
        let obj = JSON.stringify(x);
        obj = JSON.parse(obj);
        this.$refs.edit.form = obj;
      }
    },
    clear() {
      (this.subobj.name = ""),
        (this.subobj.page = 1),
        (this.subobj.limit = 4),
        (this.subobj.rid = ""),
        (this.subobj.username = ""),
        (this.subobj.status = "");
      this.getlist();
    },
    search() {
      this.getlist();
    },
    onSubmit() {
      this.$refs.addsub.onadd();
    },
    handleSizeChange(index) {
      this.subobj.limit = index;
      this.getlist();
      window.console.log("size", index);
    },
    handleCurrentChange(index) {
      this.subobj.page = index;
      this.getlist();
      console.log(index);
    },
    getlist() {
      getsubjectlist(this.subobj).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
        window.console.log("list", res);
      });
    },
    getstatus(x) {
      getsubjectstatus(x.id).then(res => {
        this.getlist({});
        window.console.log("01", res);
        if (x.status == 0) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    }
  },
  components: {
    addsubject,
    edit
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang='less'>
.demo-form-inline {
  .long {
    width: 150px;
  }
  .short {
    width: 100px;
  }
}
.mypagination {
  text-align: center;
  margin-top: 30px;
}
div .box-card {
  text-align: center;
  span {
    margin-left: 0;
  }
}
</style>