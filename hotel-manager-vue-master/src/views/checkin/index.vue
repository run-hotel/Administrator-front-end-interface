<template>
  <el-card class="box-card" shadow="always">
    <div slot="header" style="height: 40px">
      <el-input
        style="width: 300px;position: absolute;right: 150px;"
        placeholder="输入房间号进行搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        clearable
      >
      </el-input>
      <el-button
        class="primary"
        icon="el-icon-search"
        style="float: right;"
        @click="fetchData"
        >搜索</el-button
      >
      <!--      <el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>-->
    </div>
    <el-table
      ref="multipleTable"
      :loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="orderId" sortable width="180" label="订单号" />
      <el-table-column prop="persons" sortable label="入住人">
      </el-table-column>
      <el-table-column prop="ids" sortable width="170" label="身份证号码" />
      <el-table-column prop="roomNumber" sortable label="入住房间号" />
      <el-table-column prop="peoCount" sortable label="入住人数">
      </el-table-column>

      <el-table-column prop="checkInTime" sortable label="入住时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.checkInTime | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkOutTime" sortable label="退房时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span
            style="margin-left: 10px"
            v-if="scope.row.checkOutTime != null"
            >{{ scope.row.checkOutTime | formatDate }}</span
          >
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作"
     fixed="right"
     v-if="user.deptName == '前台'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            class="primary">编辑
          </el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger"
                       @click="scope.row.visible2 = true">删除
            </el-button>
          </el-popover>
        </template>
      </el-table-column> -->
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
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getCheckinAll } from "../../api/checkIn";
// import { getInfo } from '../../api/login'

export default {
  name: "Guest",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 5,
      search: null,
      list: null,
      visible2: false,
      loading: null,
      listLoading: false,
      multipleSelection: null
      // user: {},
    };
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    handleUploadSuccess(res) {
      console.log(res);
      if (res.code === 1000) {
        this.message("导入成功");
        this.fetchData();
      }
    },
    exportUser() {
      location.href = "http://localhost:8082/op/user/export";
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    fetchData() {
      getCheckinAll(this.currentPage, this.pagesize, this.search)
        .then(res => {
          console.log(res);
          this.list = res.data.list;
          this.total = res.data.total;
        })
        .catch(err => {
          this.$notify.error({
            title: "错误",
            message: err.toString()
          });
        });

      // getInfo().then(resp => {

      //   console.log("user--->"+JSON.stringify(resp.data))
      //   if (resp) {
      //     this.user = resp.data
      //     this.user1 = Object.assign({}, this.user)
      //   }
      // })
    },
    navigateTo(val) {
      this.$router.push("/user/" + val);
    },
    massDeletion() {},
    handleDel(row) {
      row.visible2 = false;
      row.loading = true;
      delUser(row.userId).then(response => {
        const res = response;
        if (res.code === 1000) {
          this.list = null;
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: "删除失败！",
            type: "error"
          });
        }
      });
      row.loading = false;
      this.fetchData();
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/user",
        name: "EditGuest",
        params: {
          id: row.userId
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange() {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.primary {
  background-color: #273954;
  color: white;
}
</style>
