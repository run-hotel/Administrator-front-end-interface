import Vue from 'vue'
import Router from 'vue-router'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Container from '../views/layout/Container'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  {
    path: '/',
    component: Container,
    redirect: '/home',
    meta: { requireAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index')
      }
      ,
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: { title: '个人中心' },
        component: () => import('@/views/home/userInfo')
      }
      ,
      {
        path: '/wechat',
        name: '在线聊天',
        // meta: { title: '在' },
        component: () => import('../views/chat/FriendChat')
      }
    ]
  },
  {
    path: '/roomType', component: Container, meta: { requireAuth: true, title: '房间类型管理' },
    children: [
      { path: '', name: '房间类型管理', component: () => import('@/views/roomType/index') },
      {
        path: 'add',
        name: 'AddType',
        hidden: true,
        component: () => import('@/views/roomType/add'),
        meta: { title: '添加房间类型' }
      },
      {
        path: 'edit',
        name: 'EditType',
        hidden: true,
        component: () => import('@/views/roomType/edit'),
        meta: { title: '编辑房间类型' }
      }
    ]
  },
  {
    path: '/roomInfo', component: Container, meta: { requireAuth: true }, children: [
      {
        path: '',
        name: '房间信息管理',
        component: () => import('@/views/roomInfo/index'),
        meta: { title: '房间信息管理', icon: 'table' }
      },
      {
        path: 'add',
        name: 'AddRoom',
        hidden: true,
        component: () => import('@/views/roomInfo/add'),
        meta: { title: '添加房间' }
      },
      {
        path: 'edit',
        name: 'EditRoom',
        hidden: true,
        component: () => import('@/views/roomInfo/edit'),
        meta: { title: '编辑房间' }
      }
    ]
  },
  {
    path: '/worker', component: Container, meta: { requireAuth: true }, children: [
      {
        path: '',
        name: 'Worker',
        component: () => import('@/views/worker/index')
      },
      {
        path: 'add',
        name: '添加工作人员',
        hidden: true,
        component: () => import('@/views/worker/add')

      },
      {
        path: 'edit',
        name: 'EditWorker',
        hidden: true,
        component: () => import('@/views/worker/edit')

      }
    ]
  },
  {
    path: '/bookingType', component: Container, meta: { title: '预订方式管理', icon: 'tree', requireAuth: true }, children: [
      {
        path: '',
        name: '预订方式管理',
        component: () => import('@/views/bookingType/index'),
        meta: { title: '预订方式管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/order', component: Container, meta: { title: '订单管理', icon: 'tree', requireAuth: true }, children: [
      {
        path: '',
        name: '订单管理',
        component: () => import('@/views/order/order'),
        meta: { title: '订单管理', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddOrder',
        hidden: true,
        component: () => import('@/views/order/add'),
        meta: { title: '添加订单' }
      },
      {
        path: 'edit',
        name: 'EditOrder',
        hidden: true,
        component: () => import('@/views/order/edit'),
        meta: { title: '财务审核' }
      }
    ]
  },

  {
    path: '/department',
    component: Container,
    meta: { title: '部门管理', requireAuth: true },
    children: [
      {
        path: '',
        name: '部门管理',
        meta: { title: '部门管理' },
        component: () => import('@/views/department/index')
      },
      {
        path: 'add',
        name: '添加部门',
        meta: { title: '添加部门' },
        hidden: true,
        component: () => import('@/views/department/add')

      },
      {
        path: 'edit',
        name: 'editDepartment',
        meta: { title: '编辑部门' },
        hidden: true,
        component: () => import('@/views/department/edit')

      }
    ]
  },

  //  财务管理
  {
    path: '/finana',
    component: Container,
    meta: { title: '财务管理', requireAuth: true },
    children: [
      {
        path: '',
        name: '财务管理',
        meta: { title: '财务管理' },
        component: () => import('@/views/finana/index')
      }
    ]
  },

  // 维修管理
  {
    path: '/repair',
    component: Container,
    meta: { title: '维修管理', requireAuth: true },
    children: [
      {
        path: '',
        name: '维修管理',
        meta: { title: '维修管理' },
        component: () => import('@/views/repair/index')
      }
    ]
  },

  {
    path: '/comment',
    component: Container,
    meta: { title: '评论管理', requireAuth: true },
    children: [
      {
        path: '',
        name: '评论管理',
        meta: { title: '评论管理' },
        component: () => import('@/views/comment/index')
      }
    ]
  },

  {
    path: '/user', component: Container, meta: { title: '客户管理', icon: 'tree', requireAuth: true }, children: [
      {
        path: '',
        name: 'Guest',
        component: () => import('@/views/guest/index'),
        meta: { title: '客户管理', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'AddGuest',
        hidden: true,
        component: () => import('@/views/guest/add'),
        meta: { title: '添加客户' }
      },
      {
        path: 'edit',
        name: 'EditGuest',
        hidden: true,
        component: () => import('@/views/guest/edit'),
        meta: { title: '编辑客户' }
      }
    ]
  },
  /*客户入住信息管理*/
  {
    path: '/checkin', component: Container, meta: { title: '客户入住管理', icon: 'tree', requireAuth: true }, children: [
      {
        path: '',
        name: 'Guest',
        component: () => import('@/views/checkin/index'),
        meta: { title: '客户管理', icon: 'tree' }
      },

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (Cookie.get('admin_id')) {
      next()
    } else {
      const mess = '请先登录'
      Message({
        message: mess,
        type: 'warning',
        duration: 5 * 1000
      })
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
