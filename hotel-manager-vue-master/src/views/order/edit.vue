<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>财务审核</span>
    </div>
    <el-form ref="form1" :model="form1" label-width="120px">
    <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        prop="payOrderId"
        label="订单号">
        <el-input v-model="form1.name" placeholder="请输入订单号"/>
      </el-form-item>

      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        prop="name"
        label="预订人姓名">
        <el-input v-model="form1.name" placeholder="请输入预订人姓名"/>
      </el-form-item>

      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="预留手机号"
        prop="phone"
      >
        <el-input v-model.number="form1.phone" placeholder="请输入预留手机号"/>
      </el-form-item>

      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="预订日期"
        prop="orderDate"
      >
         <el-input v-model.number="form1.orderDate" placeholder="请输入预定的日期"/>
      </el-form-item>

      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="预订天数"
        prop="orderDays"
      >
        <el-input v-model.number="form1.orderDays" placeholder="请输入预定的天数"/>
      </el-form-item>

      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="订单状态"
        prop="orderStatus"
      >
        <el-input v-model.number="form1.orderStatus" placeholder="请输入订单的状态"/>
      </el-form-item>
      
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { addOrder } from "../../api/order";
import {getAllOrderType } from "../../api/orderType";
import { getAllRoomType } from "../../api/roomType";

export default {
    name: "Edit",
  data() {
    return {
      form1: {
        typeId: null,
        roomType: null,
        area: null,
        window: null,
        bedNum: null,
        bedSize: null,
        price: null,
        discount: null,
        remark: null,
        orderTypeId:null,
        orderType: null,
        roomTypeId: null,
        userId:0,
        name: '',
        phone:'',
        orderDate: null,
        orderDays: 1,
        orderCost: 0
      },
      loading: false,
      typeId: null,
      windowSwitch: {
        has: 1,
        none: 0
      },
      orderDateRange:null,
          loading: false,
          roomTypeList: [],
          orderTypeList: [],
            expireTimeOption:{
                disabledDate: time =>{
                    return time.getTime() < Date.now()-24*60*60*1000;
                },
            },
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData() {
        getAllOrderType().then(res => {
        this.orderTypeList = res.data;
        })
        getAllRoomType().then(res => {
        this.roomTypeList = res.data;
        })
    },
    idToType(rtId,otId) {
        if (rtId == null){
        this.orderTypeList.forEach(t => {
            if (otId === t.typeId) {
            this.form1.orderType = t.type
            }
        })
        } else {
        this.roomTypeList.forEach(type => {
            if (rtId === type.typeId) {
            this.form1.roomType = type.roomType
            this.form1.orderCost = type.price*this.form1.orderDays
            }
        })
        }

    },
    calcDays(){
        this.form1.orderDate = this.orderDateRange[0]
        var days = this.orderDateRange[1].getTime() - this.orderDateRange[0].getTime();
        this.form1.orderDays = days / (24*60*60*1000);
    },
    onSubmit() {
        this.$refs.form1.validate((valid) => {
        if (valid) {
            this.loading = true
            addOrder(this.form1).then(response => {
                const res = response;
            if(res.code === 1000){
                this.$message({
                message: '提交成功！',
                type: 'success'
                })
                this.loading = false
                setTimeout(this.onCancel(), 20000)
            }else {
                this.showError()
                this.loading = false
            }
            })
        } else {
            this.loading = false
            return false
        }
        })
    },
    showError() {
        this.$message({
        message: '提交失败！',
        type: 'error'
        })
    },
    onCancel() {
        this.$router.back()
    }
  }
}
</script>