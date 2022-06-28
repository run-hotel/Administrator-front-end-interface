# 酒店管理系统

## 项目运行

```
# git项目
git clone https://gitee.com/huangsr/hotel-manager.git

# 下载依赖
npm install

#下载ECharts
npm install echarts --save

# 运行服务 localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

## 可能出现的问题
![demo](/screenshots/问题.png)
```
可能是因为webpack版本太高
解决方法：
1、删除node_modules依赖和package-lock.json文件
2、npm install 
3、下载打包依赖
  npm i -D webpack-cli@3.1.0
  npm i -D webpack-dev-server@3.1.5
4、npm run dev
```
## 后端源码
```
https://gitee.com/huangsr/hotel-manager.git
```

## 部分截图

![demo](/screenshots/首页.png)
![demo](/screenshots/客户信息.png)
![demo](/screenshots/订单信息.png)
![demo](/screenshots/AdminInfo.png)
![demo](/screenshots/WorkInfo.png)
![demo](/screenshots/CategoryManager.png)


