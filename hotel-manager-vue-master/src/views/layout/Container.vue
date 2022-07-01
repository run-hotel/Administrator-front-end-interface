<!-- 页面的大致布局 -->
<template>
  <el-container id="container">
    <el-header>
      <span style="float: left;font-size: 24px;font-family:'Courier New', Courier, monospace;font-weight: bold;">
        <i class="el-icon-sunny"/>
        艾登酒店</span>
      <div class="info">
        <el-button class="primary" type="text" round>{{ roles[role] }}</el-button>
        <button class="el-icon-message" @click="gochat"></button>
        <el-dropdown @command="handleCommand">
          <el-button icon="el-icon-user-solid" class="primary" type="text">
            <el-badge is-dot class="item">{{ username }}</el-badge>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">查看个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <!-- -->
    <el-container>
      <!-- 侧边栏-->
      <el-aside>
        <el-menu
          :collapse="isCollapse"
          background-color="#3d4858"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="0" @click="handleNav">
            <i class="el-icon-sort"/>
            <span slot="title">展开/关闭侧边栏</span>
          </el-menu-item>

          <el-menu-item index="1" @click="navigateTo('/')">
            <i class="el-icon-news"/>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item v-show="role == 'admin' || user.deptName == '客房部'" index="2" @click="navigateTo('/roomType')">
            <i class="el-icon-goods"/>
            <span slot="title">房间类型管理</span>
          </el-menu-item>

          <el-menu-item v-show="role == 'admin'|| user.deptName == '客房部'" index="3" @click="navigateTo('/roomInfo')">
            <i class="el-icon-sold-out"/>
            <span slot="title">房间信息管理</span>
          </el-menu-item>

          <el-menu-item v-show="role == 'admin'" index="4" @click="navigateTo('/bookingType')">
            <i class="el-icon-service"/>
            <span slot="title">预订方式管理</span>
          </el-menu-item>

          <el-menu-item index="5" @click="navigateTo('/department')" v-show="role == 'admin'">
            <i class="el-icon-menu"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>

          <el-menu-item v-show="role == 'admin'" index="6" @click="navigateTo('/worker')">
            <i class="el-icon-setting"/>
            <span slot="title">工作人员管理</span>
          </el-menu-item>

          <!-- 工作人员管理 -->
          <el-menu-item v-show="user.deptName == '前台' || user.deptName == '客服部' || user.deptName == '财务部'" index="7" @click="navigateTo('/order')">
            <i class="el-icon-mobile-phone"/>
            <span slot="title">订单信息管理</span>
          </el-menu-item>
          <el-menu-item v-show="user.deptName == '财务部'" index="8" @click="navigateTo('/finana')">
            <i class="el-icon-wallet"/>
            <span slot="title">财务管理</span>
          </el-menu-item>
          <el-menu-item v-show="user.deptName == '维修部'" index="9" @click="navigateTo('/repair')">
            <i class="el-icon-paperclip"/>
            <span slot="title">维修管理</span>
          </el-menu-item>
          <el-menu-item v-show="role != 'admin' && user.deptName != '财务部' && user.deptName != '客房部'" index="10" @click="navigateTo('/user')">
            <i class="el-icon-document"/>
            <span slot="title">客户信息管理</span>
          </el-menu-item>
          <el-menu-item v-show="role != 'admin' && user.deptName != '客房部'" index="11" @click="navigateTo('/checkin')">
            <i class="el-icon-edit-outline"/>
            <span slot="title">客户入住信息管理</span>
          </el-menu-item>
          <el-menu-item index="12" @click="navigateTo('/comment')" v-show="user.deptName == '客服部'">
            <i class="el-icon-s-order"/>
            <span slot="title">评价信息管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <router-view/>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import ElContainer from 'element-ui/packages/container/src/main'
  import ElHeader from 'element-ui/packages/header/src/main'
  import ElAside from 'element-ui/packages/aside/src/main'
  import ElMain from 'element-ui/packages/main/src/main'
  import Cookies from 'js-cookie'
  import { getByUsername } from '../../api/admin'
  import { getUserById } from '../../api/user'
  import { getInfo, logout, update } from '../../api/login'

  export default {
    name: 'Container',
    components: { ElMain, ElAside, ElHeader, ElContainer },
    data() {
      return {
        user:{},
        isCollapse: false,
        isAdmin: null,
        username: null,
        userInfo: null,
        role: null,
        roles: {
          'admin': '管理员',
          'operator': '工作人员'
        }
      }
    },
    created: function() {
      this.initUser()
      this.username = Cookies.get('admin_name')
      this.userInfo = null
      this.role = Cookies.get('role')
    },
    methods: {
      initUser() {
        getInfo().then(resp => {
          console.log(resp)
          if(resp) {
            this.user = resp.data
          }
        })
      },
      gochat() {
        this.$router.push('/wechat')
      },
      handleCommand(command) {
        console.log(command)
        switch (command) {
          case 'info':
            this.$router.push('/userInfo')
            // console.log("11")
            break
          case 'logout':
            this.logout()
            break
          default:
            break
        }
      },
      navigateTo(val) {
        this.$router.push(val)
      },
      handleNav() {
        this.isCollapse = this.isCollapse === false
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      logout() {
        this.$message.success('注销成功')
        logout()
        Cookies.remove('admin_name')
        Cookies.remove('admin_id')
        Cookies.remove('role')
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  #container {
    height: inherit;
  }

  .el-header {
    /* background-color: #409EFF; */
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 60px;
    background-color:#273954;
  }

  .el-header .info {
    float: right;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: #3d4858;
  }

  el-menu-vertical-demo {
    border-right: none;
  }

  .el-aside {
    color: #fff;
    width: inherit !important;
    /*height: 100%;*/
    background-color: #3d4858;
  }

  .primary {
    background-color:#273954;
    color: white;
  }
</style>
