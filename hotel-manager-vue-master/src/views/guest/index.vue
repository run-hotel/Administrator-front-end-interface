<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" style="height: 40px">
      <el-upload
        action="http://localhost:8082/files/userImport"
        :on-success="handleUploadSuccess"
        :auto-upload="true"
        :show-file-list=false
        :limit="1"
        accept='.xls'
        style="display: inline-block; margin: 0 10px"
      >
        <el-button class="primary">导入</el-button>
      </el-upload>
      <el-button class="primary" @click="exportUser">导出</el-button>
      <el-input
        style="width: 300px;position: absolute;right: 150px;"
        placeholder="输入用户名进行搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        clearable
      >
      </el-input>
      <el-button class="primary" icon="el-icon-search" style="float: right;" @click="fetchData">搜索</el-button>
      <!--      <el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>-->
    </div>
    <el-table
      ref="multipleTable"
      :loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
     >
   <!--   <el-table-column
        type="selection"
        width="55"/>-->
      <el-table-column
        prop="userId"
        sortable
        label="编号"/>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="gender"
        label="性别"/>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        label="email">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证号">
      </el-table-column>
      <el-table-column
        label="修改时间|创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.updateTime | formatDate }}</span>
          <br>
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>


    </el-table>

    <div style="padding: 14px;">
      <div class="bottom">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

  </el-card>
</template>

<script>
  import { delUser, getAllUser } from '../../api/user'

  export default {
    name: 'Guest',
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        total: 5,
        search: null,
        list: null,
        visible2: false,
        loading: null,
        listLoading: false,
        multipleSelection: null
      }
    },
    created: function() {
      this.fetchData()
    },
    methods: {

      handleUploadSuccess(res) {
        console.log(res)
        if (res.code === 1000) {
          this.message("导入成功")
          this.fetchData()
        }
      },
      exportUser() {
        location.href = "http://localhost:8082/op/user/export";
      },
      handleSizeChange(val) {
        this.pagesize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
      },
      fetchData() {
        getAllUser(this.currentPage, this.pagesize, this.search).then(res => {
          console.log(res)
          this.list = res.data.list
          this.total=res.data.total
        }).catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.toString()
          })
        })
      },
      navigateTo(val) {
        this.$router.push('/user/' + val)
      },
      massDeletion() {
      },
      handleDel(row) {
        row.visible2 = false
        row.loading = true
        delUser(row.userId).then(response => {
          const res = response
          if (res.code === 1000) {
            this.list = null
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败！',
              type: 'error'
            })
          }
        })
        row.loading = false
        this.fetchData()
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/user',
          name: 'EditGuest',
          params: {
            id: row.userId
          }
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange() {
        this.multipleSelection = val
      }
    }
  }
</script>

<style scoped>
  .primary {
    background-color:#273954;
    color: white;
  }
</style>
