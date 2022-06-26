<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <el-button type="primary" @click="navigateTo('add')">添加部门信息</el-button>
      <el-button type="danger" @click="massDeletion(ids)">批量删除</el-button>
      <el-input
        style="width: 300px;position: absolute;right: 150px;"
        placeholder="输入部门名称进行搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        clearable
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" style="float: right;" @click="fetchData" >搜索</el-button>
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
        prop="id"
        label="编号"/>
      <el-table-column
        prop="department"
        label="部门名称"/>
      <el-table-column
        prop="remark"
        label="描述"/>
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
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger" @click="scope.row.visible2 = true">删除</el-button>
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
  import {deleteBatchDept,del, getAll} from '../../api/department'


  export default {
  data() {
    return {
      total: 10,//总条数
      currentPage: 1,//当前页
      pageSize: 5,
      search: '',
      visible2: false,
      multipleSelection: [],
      // list: null,
      list: [{}, {}],
      listLoading: true,
      ids:[]
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.fetchData()
    }
    ,
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.currentPage = pageNum
      this.fetchData()
    }
    ,

    InitInfo(){

    },
    fetchData() {
      this.listLoading = true
      getAll(this.currentPage,this.pageSize,this.search).then(response => {
        console.log(response)
        this.list = response.data.list
        this.total=response.data.total
        this.listLoading = false
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/department/' + val })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/department',
        name: 'editDepartment',
        params: {
          id: row.id
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      del(row.id).then(response => {
          const res =response;
        if (res.code===1000) {
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
      this.ids = val.map(v => v.id)   // [{id,name}, {id,name}] => [id,id]
      console.log(this.ids)
    },
    massDeletion(rows){
      if (rows.length !== 0) {
        this.$confirm('是否确认删除这' + rows.length + '条数据?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          return deleteBatchDept(rows)
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
</style>
