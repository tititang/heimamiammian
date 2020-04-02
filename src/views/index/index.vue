<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="left">
          <i class="el-icon-s-fold" @click="iscollapse=!iscollapse"></i>
          <img src="@/assets/index_logo.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="right">
          <el-avatar class="avatar" :src="$store.state.avatar"></el-avatar>
          <span class="hello">{{$store.state.username}}</span>
          <el-button type="primary" size="mini" @click="loginout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="iscollapse"
            :router="true"
          >
            <el-menu-item index="/index/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/index/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/index/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/index/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入网络请求
import { removetoken } from "@/utils/mytoken.js";
import { logout } from "@/api/index.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      iscollapse: false
    };
  },
  created() {
    this.username = this.$store.state.username;
    this.avatar = this.$store.state.avatar;
  },
  methods: {
    loginout() {
      this.$confirm("是否退出黑马面面", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout()
            .then(res => {
              if (res.data.code == 200) {
                removetoken();
                this.$router.push("/login");
                this.$message({
                  type: "success",
                  message: "退出成功!"
                });
              }
            })
            .catch(err => {
              window.console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.index,
.el-container {
  height: 100%;
}
.el-header {
  background-color: rgba(255, 255, 255, 1);
  color: #333;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .avatar {
      width: 43px;
      height: 43px;
      margin-right: 9px;
    }
    .hello {
      font-size: 14px;
      color: #636363;
      margin-right: 38px;
    }
  }
}

.el-aside {
  background-color: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}

.el-main {
  background-color: rgba(232, 233, 236, 1);
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>