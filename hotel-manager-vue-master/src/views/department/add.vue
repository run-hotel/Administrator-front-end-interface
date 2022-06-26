<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>添加部门</span>
    </div>
    <el-form ref="form1" :model="form1" label-width="120px">
      <el-form-item
        :rules="rules2"
        prop="department"
        label="部门">
        <el-input v-model="form1.department" placeholder="请输入部门名称"/>
      </el-form-item>
      <el-form-item
        prop="description"
        label="描述">
        <el-input v-model="form1.description"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import ElCard from "element-ui/packages/card/src/main";
  import {add, getAll} from "../../api/department";

  export default {
    components: {ElCard},
    data() {
      return {
        form1: {
          department: null,
          description: ''
        },
        loading: false,
        rules2: {
          department: [
            {required: true, message: '不能为空'}
          ]
        }
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAll().then(res => {
          this.orderTypeList = res.data;
        })
      },
      onSubmit() {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            this.loading = true
            /*添加部门*/
            add(this.form1).then(response => {
              const res = response;
              if (res.code === 1000) {
                this.$message({
                  message: '提交成功！',
                  type: 'success'
                })
                this.loading = false
                setTimeout(this.onCancel(), 20000)
              } else {
                this.showError(res.message)
                this.loading = false
              }
            }).catch(error => {
              this.loading = false
              this.showError(error)
            })
          } else {
            this.loading = false
            return false
          }
        })
      },
      showError(msg) {
        this.$message({
          message: msg,
          type: 'error'
        })
      },
      onCancel() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
