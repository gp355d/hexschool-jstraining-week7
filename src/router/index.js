import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: () => import('../views/Home.vue'),
    // name: 'Home',
    // component: Home,
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: 'checkout',
        component: () => import('../views/Checkout.vue')
      },
      {
        path: 'checkoutok',
        component: () => import('../views/Checkcomplete.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/admin/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard2.vue'),
    children: [
      {
        path: 'index',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Orders.vue')
      },
      {
        path: 'imgmanger',
        component: () => import('../views/admin/Imagemanage.vue')
      }
    ]
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },

]

const router = new VueRouter({
  routes
})

export default router
