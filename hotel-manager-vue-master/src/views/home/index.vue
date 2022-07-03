<template>
  <div id="home">
    <el-row :gutter="20">
      <el-col :span="8" v-if="user.deptName == '前台'">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-platform"></i>
            <span>快捷操作</span>
          </div>
          <el-button class="primary" @click="dialogFormVisible = true"
            >入住登记</el-button
          >
          <el-button class="primary" @click="dialogout = true"
            >退房结账</el-button
          >
        </el-card>
      </el-col>

      <el-col :span="8" v-if="user.deptName != '前台'">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-platform"></i>
            <span>快捷操作</span>
          </div>
          <el-button class="unable" @click="dialogFormVisible = false"
            >入住登记</el-button
          >
          <el-button class="unable" @click="dialogout = false"
            >退房结账</el-button
          >
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-data"></i>
            <span>当前日期</span>
          </div>
          <p>{{ new Date() | formatDay }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-marketing"></i>
            <span>数据展示</span>
          </div>
          <div>
            系统已注册用户人数：
            <el-tag>{{ userCount }}</el-tag>
          </div>
          <div>
            系统已接受订单数量：
            <el-tag>{{ orderCount }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-unfold"></i>
            <span>客房住宿率</span>
          </div>
          <div id="liveRate" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-home"></i>
            <span>房型比例</span>
          </div>
          <div id="roomType" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-order"></i>
            <span>订单量</span>
          </div>
          <div id="order" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-goods"></i>
            <span>各类型客房订单比例</span>
          </div>
          <div id="orderType" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="入住登记" :visible.sync="dialogFormVisible">
      <el-form inline :model="form">
        <el-form-item label="房间号">
          <el-input
            v-model="form.name"
            autoComplete="on"
            class="box"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="form.phone"
            autoComplete="on"
            class="box"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="findOrder()" class="search"
            >查询</el-button
          >
        </el-form-item> -->
      </el-form>
      <!-- <div v-if="isOrderShown && order != null" style="font-size: 13px;">
        <span style="font-size: 15px;font-weight: bold">
          订单号：{{ order.payOrderId }}</span
        ><br />
        预订方式： {{ order.orderType }}<br />
        预订房型： {{ order.roomType }}<br />
        预订日期： {{ order.orderDate | formatDay }}<br />
        预订天数： {{ order.orderDays }}天<br />
        预订费用： {{ order.orderCost }}
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelIn()">取 消</el-button>
        <el-button class="primary" @click="inputInfo(form.name, 2)">办理入住</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="入住人信息" :visible.sync="dialogPersonInfo" width="90%">
      <el-form inline :model="persons" label-width="120px">
        <el-form-item label="入住人">
          <el-input
            v-model="persons.name"
            autoComplete="on"
            style="width:100%"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="入住人数">
          <el-input
            v-model="persons.peoCount"
            autoComplete="on"
            style="width:100%"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="persons.ids"
            autoComplete="on"
            style="width:120%"
            placeholder="多人以逗号隔开"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <div v-if="roomNumShow !== null" style="float: left">
          <span style="font-size: 20px;">入住房间号为：</span>
          <el-tag type="success" effect="plain">{{ roomNumShow }}</el-tag>
        </div>
        <el-button type="danger" @click="cancelPerson">关闭</el-button>
        <el-button class="comfirm" @click="checkIn">确定入住</el-button>
      </div>
    </el-dialog> -->

    <el-dialog title="退房结账" :visible.sync="dialogout" width="50%">
      <el-form inline :model="rooms" label-width="120px">
        <el-form-item label="房间号">
          <el-input
            v-model="rooms.roomNumber"
            autoComplete="on"
            style="width:100%"
            placeholder="请输入退房号码"
            class="box"
          ></el-input>
        </el-form-item>
        <el-button class="primary" @click="checkoutEvent" >确定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderByNameAndPhone, getOrderCount } from "../../api/order";
import { getAllUser, getUserCount } from "../../api/user";
import { checkIn, checkOut } from "../../api/checkIn";
import { getInfo } from "../../api/login";
import {
  deleteBatchRoomType,
  getAllRoomType,
  delRoomType
} from "@/api/roomType";

export default {
  name: "Home",
  data() {
    return {
      dialogout: false,
      roomNumber: null,
      dialogFormVisible: false,
      dialogPersonInfo: false,
      userCount: 1203,
      orderCount: 12032,
      form: {
        name: "",
        phone: ""
      },
      rooms: {
        roomNumber: null
      },
      persons: {
        name: "",
        peoCount: "",
        ids: "",
        orderId: ""
      },
      roomNumShow: null,
      isOrderShown: false,
      order: {
        payOrderId: 1,
        orderType: null,
        roomType: null,
        orderDays: null,
        orderCost: null
      },
      user: {},
      total: 10,
      currentPage: 1,
      pageSize: 8,
      search: "",
      visible2: false,
      multipleSelection: [],
      listLoading: true,
      list: null,
      loading: false,
      ids: [],
      bedNum: 1,
      numList: {
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1,
        num5: 1,
        num6: 1,
        num7: 1,
        num8: 1
      },
      restList: {
        rest1: 1,
        rest2: 1,
        rest3: 1,
        rest4: 1,
        rest5: 1,
        rest6: 1,
        rest7: 1,
        rest8: 1
      }
    };
  },
  created: function() {
    this.getCount();
  },
  mounted() {
    // this.getCount()
    // this.rtChart()
    // this.lrChart()
    // this.orderChart()
    // this.ortChart()
  },
  methods: {
    //退房申请
    checkoutEvent() {
      checkOut(this.rooms.roomNumber).then(result => {
        console.log(result.data);
        //退房成功
        if (result.code === 1000) {
          this.$message.success("退房成功");
          this.dialogout = false;
        } else {
          this.$message.warning("退房失败");
        }
      });
    },
    /*获取订单量和用户数量*/
    getCount() {
      getUserCount().then(response => {
        this.userCount = response.data;
      });
      getOrderCount().then(res => {
        this.orderCount = res.data;
      });
      getInfo().then(resp => {
        console.log("user--->" + JSON.stringify(resp.data));
        if (resp) {
          this.user = resp.data;
          this.user1 = Object.assign({}, this.user);
        }
      });

      this.listLoading = true;
      getAllRoomType(this.currentPage, this.pageSize, this.search).then(
        response => {
          console.log(response);
          this.list = response.data.list;
          this.list.reverse();
          this.total = response.data.total;
          this.listLoading = false;
          this.$set(this.numList, "num1", this.list[0].bedNum);
          this.$set(this.numList, "num2", this.list[1].bedNum);
          this.$set(this.numList, "num3", this.list[2].bedNum);
          this.$set(this.numList, "num4", this.list[3].bedNum);
          this.$set(this.numList, "num5", this.list[4].bedNum);
          this.$set(this.numList, "num6", this.list[5].bedNum);
          this.$set(this.numList, "num7", this.list[6].bedNum);
          this.$set(this.numList, "num8", this.list[7].bedNum);
          this.$set(
            this.restList,
            "rest1",
            this.list[0].bedNum - this.list[0].rest
          );
          this.$set(
            this.restList,
            "rest2",
            this.list[1].bedNum - this.list[1].rest
          );
          this.$set(
            this.restList,
            "rest3",
            this.list[2].bedNum - this.list[2].rest
          );
          this.$set(
            this.restList,
            "rest4",
            this.list[3].bedNum - this.list[3].rest
          );
          this.$set(
            this.restList,
            "rest5",
            this.list[4].bedNum - this.list[4].rest
          );
          this.$set(
            this.restList,
            "rest6",
            this.list[5].bedNum - this.list[5].rest
          );
          this.$set(
            this.restList,
            "rest7",
            this.list[6].bedNum - this.list[6].rest
          );
          this.$set(
            this.restList,
            "rest8",
            this.list[7].bedNum - this.list[7].rest
          );
          this.rtChart();
          this.lrChart();
          this.orderChart();
          this.ortChart();
        }
      );
    },
    rtChart() {
      var rtChart = this.$echarts.init(
        document.getElementById("roomType"),
        "light"
      );
      rtChart.setOption({
        tooltip: {},
        series: [
          {
            name: "比例",
            type: "pie",
            radius: "55%",
            data: [
              { value: this.numList.num8, name: "单人房" },
              { value: this.numList.num1, name: "电竞房" },
              { value: this.numList.num2, name: "豪华大床房" },
              { value: this.numList.num3, name: "商务大床房" },
              { value: this.numList.num4, name: "情侣房" },
              { value: this.numList.num5, name: "双人房" },
              { value: this.numList.num6, name: "总统房" },
              { value: this.numList.num7, name: "豪华套房" }
            ]
          }
        ]
      });
    },
    lrChart() {
      var myChart = this.$echarts.init(
        document.getElementById("liveRate"),
        "light"
      );
      myChart.setOption({
        xAxis: {
          type: "category",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          axisLabel: {
            formatter: "{value} 月"
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
        series: [
          {
            data: [
              50,
              68,
              55.4,
              53.2,
              76.6,
              80.6,
              47.6,
              45.7,
              67.2,
              58.3,
              78.4,
              94.2
            ],
            type: "line"
          }
        ]
      });
    },
    orderChart() {
      var myChart = this.$echarts.init(
        document.getElementById("order"),
        "light"
      );
      myChart.setOption({
        itemStyle: {
          color: "#409EFF"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          axisLabel: {
            formatter: "{value} 月"
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 单"
          }
        },
        series: [
          {
            name: "订单量",
            data: [432, 568, 469, 532, 766, 806, 476, 457, 672, 583, 784, 942],
            type: "bar"
          }
        ]
      });
    },
    ortChart() {
      var rtChart = this.$echarts.init(
        document.getElementById("orderType"),
        "light"
      );
      rtChart.setOption({
        tooltip: {},
        series: [
          {
            name: "比例",
            type: "pie",
            radius: "55%",
            data: [
              { value: this.restList.rest8, name: "单人房" },
              { value: this.restList.rest1, name: "电竞房" },
              { value: this.restList.rest2, name: "豪华大床房" },
              { value: this.restList.rest3, name: "商务大床房" },
              { value: this.restList.rest4, name: "情侣房" },
              { value: this.restList.rest5, name: "双人房" },
              { value: this.restList.rest6, name: "总统房" },
              { value: this.restList.rest7, name: "豪华套房" }
            ]
          }
        ]
      });
    },
    cancelIn() {
      this.dialogFormVisible = false;
      this.order = null;
      this.isOrderShown = false;
    },
    cancelPerson() {
      this.dialogPersonInfo = false;
      // this.
    },
    findOrder() {
      getOrderByNameAndPhone(this.form).then(res => {
        console.log(res);
        this.order = res.data;
      });
      console.log(this.order);
      if (this.order == null) {
        this.$message.warning("找不到相关预订信息！请检查");
        return;
      } else {
        this.isOrderShown = true;
      }
    },

    inputInfo(roomId, num) {
      this.$router.push({
        path:"/op/room/update1",
        query:{
          roomId:roomId,
          num:num
        }
      });
    },
    //todo
    checkIn() {
      console.log("checkin------");

      //输入入住人数、入住人、身份证号
      this.persons.orderId = this.order.payOrderId;
      checkIn(this.persons).then(res => {
        console.log(res);
        if (res.code === 1000) {
          this.roomNumShow = res.data.roomNumber;
          // this.dialogPersonInfo = false
          this.order = null;
          this.isOrderShown = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin: 10px 5px;
}

.el-card {
  text-align: center;
}

.primary {
  background-color: #3d4858;
  color: white;
}

.clearfix {
  font-size: large;
}

.comfirm {
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  box-shadow: 0px 20px 40px rgba(147, 231, 221, 0.3);
  border-radius: 30px;
}

.unable {
  background-color: grey;
  color: white;
}

.box {
  background: linear-gradient(
    180deg,
    rgba(99, 106, 150, 0.4) 0%,
    rgba(182, 186, 214, 0.25) 100%
  );
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(40px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 30px;
}

.search {
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  box-shadow: 0px 20px 40px rgba(147, 231, 221, 0.3);
  border-radius: 30px;
}
</style>
