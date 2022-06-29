<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <el-button class="primary" @click="navigateTo('add')">添加工作人员信息</el-button>
      <el-button class="primary" @click="BatchDelete(ids)">批量删除</el-button>
      <el-upload

        class="upload-demo"
        :on-success="handleUploadSuccess"
        action="http://localhost:8082/files/import"
        :auto-upload="true"
        :show-file-list=false
        :limit="1"
        style="display: inline-block; margin: 0 10px"
      >
        <el-button class="primary">导入</el-button>
      </el-upload>
      <el-button plain @click="downPerson" class="primary">导出</el-button>
      <el-input
        style="width: 300px;position: absolute;right: 150px;"
        placeholder="输入用户名进行搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        clearable
      >
      </el-input>
      <el-button class="primary" icon="el-icon-search" style="float: right;" @click="fetchData">搜索</el-button>

    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="workerId"
        sortable
        label="编号"/>
      <el-table-column
        prop="username"
        label="用户名"/>

      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="gender"
        label="性别"/>
      <el-table-column
        prop="phone"
        label="手机号"/>
      <el-table-column
        prop="deptName"
        label="部门"/>
      <el-table-column
        prop="email"
        label="电子邮箱"/>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.updateTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)" class="primary">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger"
                       @click="scope.row.visible2 = true">删除
            </el-button>
          </el-popover>
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
  import { deleteBatch, del, getAll, uploadMessage } from '../../api/worker'
  // import {downloadRequest} from '../../utils/request'

  export default {
    data() {
      return {

        total: 10,//总条数
        currentPage: 1,//当前页
        pageSize: 5,
        search: '',
        visible2: false,
        multipleSelection: [],
        list: null,
        listLoading: true,
        ids: []
      }
    },
    created: function() {
      this.fetchData()
    },
    methods: {
      beforeUpload(file) {
        this.files = file
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!')
          return
        }
        if (!isLt5M) {
          this.$message.warning('上传模板大小不能超过 5MB!')
          return
        }
        this.fileName = file.name
        setTimeout(() => {
          this.submitUpload()
        }, 500)
        return false // 返回false不会自动上传
      },

      // 上传excel
      submitUpload() {
        console.log('上传' + this.files.name)
        if (this.fileName == '') {
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        let fileFormData = new FormData()
        fileFormData.append('code', 't_pathology_info_excel')
        fileFormData.append('description', 'excel上传测试')
        //filename是键，file是值，就是要传的文件，test是要传的文件名
        fileFormData.append('files', this.files, this.fileName)
        let requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        // 执行上传excel
        let id = ''
        this.http.postJson('/op/user/import', fileFormData, requestConfig).then(resp => {
          if (resp.data.status != 200) {
            this.$message.error('excel上传失败，请重新上传')
          } else {

          }
        }).catch((e) => {
          // console.log(e);
          this.$message.error('excel上传失败，请重新上传')
        }).finally(() => {
          if (id) {
            // 触发生成订单实体数据
            this.generateBill(id)
          }
        })
      },

      // 构建实体
      generateBill(attachmentId) {
        this.http.postJson('/admin/myTest/leadingIn/' + attachmentId + '/type_one').then(resp => {
          if (resp.data.status != 200) {
            // this.$message.error("excel上传失败，请重新上传");
          } else {
            this.$message.success('excel上传成功！')
            this.query()
          }
        }).catch((e) => {
          // console.log(e);
          // this.$message.error("excel上传失败，请重新上传");
        }).finally(() => {

        })

      },
      handleUploadSuccess(res) {
        console.log('---------ahdau'+res.data)

      },
      //批量删除
      BatchDelete(rows) {
        if (rows.length !== 0) {
          this.$confirm('是否确认删除这' + rows.length + '条数据?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {
            return deleteBatch(rows)
          }).then(() => {
            this.fetchData()
          })
        } else {
          this.$confirm('请选择要删除的数据', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })

        }
      },
      handleSizeChange(pageSize) {   // 改变当前每页的个数触发
        this.pageSize = pageSize
        this.fetchData()
      }
      ,
      handleCurrentChange(pageNum) {  // 改变当前页码触发
        this.currentPage = pageNum
        this.fetchData()
      },

      //获取所有数据
      fetchData() {
        this.listLoading = true
        getAll(this.currentPage, this.pageSize, this.search).then(response => {
          console.log(response)
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
      },
      navigateTo(val) {
        this.$router.push({ path: '/worker/' + val })
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/worker',
          name: 'EditWorker',
          params: {
            id: row.workerId
          }
        })
      },
      handleDel(row) {
        row.visible2 = false
        row.loading = true
        del(row.workerId).then(response => {
          const res = response
          if (res.code === 1000) {
            this.list = null
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message({
              message: '删除失败！',
              type: 'error'
            })
          }
        })
        row.loading = false
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
      handleSelectionChange(val) {
        console.log(val + '---------------')
        this.ids = val.map(v => v.workerId)   // [{id,name}, {id,name}] => [id,id]
        console.log(this.ids)
      },
      downPerson() {
        // location.href = "http://" + window.server.filesUploadUrl + ":9090/user/export";
        location.href = 'http://localhost:8082/admin/operator/export'
      }
    }
  }
</script>

<style>
  .red {
    color: red;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

    .primary {
    background-color:#273954;
    color: white;
  }
</style>