(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2496e2f8"],{6572:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("nav",{staticClass:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},[s("a",{staticClass:"navbar-brand col-sm-3 col-md-2 mr-0",attrs:{href:"#"}},[t._v("logo")]),s("ul",{staticClass:"navbar-nav px-3"},[s("li",{staticClass:"nav-item text-nowrap"},[s("a",{staticClass:"nav-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.signout(a)}}},[t._v("登出")])])])]),s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("nav",{staticClass:"col-md-2 d-none d-md-block bg-light sidebar"},[s("div",{staticClass:"sidebar-sticky"},[t._m(0),s("ul",{staticClass:"nav flex-column mb-2"},[s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"file-text"}}),s("router-link",{attrs:{to:"/admin/index"}},[t._v("後台管理頁面")])],1)]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"file-text"}}),s("router-link",{attrs:{to:"/"}},[t._v("回前台")])],1)]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"file-text"}}),s("router-link",{attrs:{to:"/admin/products"}},[t._v("產品管理列表")])],1)]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"file-text"}}),s("router-link",{attrs:{to:"/admin/coupons"}},[t._v("優惠卷管理列表")])],1)]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"file-text"}}),s("router-link",{attrs:{to:"/admin/orders"}},[t._v("訂單列表")])],1)]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"file-text"}}),s("router-link",{attrs:{to:"/admin/imgmanger"}},[t._v("圖片儲存列表")])],1)])])])]),s("main",{staticClass:"col-md-9 ml-sm-auto col-lg-10 px-4 mt-5",attrs:{role:"main"}},[t.userinfo.checkSuccess?s("router-view",{attrs:{token:t.userinfo.token}}):t._e()],1)])])])},n=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("h6",{staticClass:"sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted"},[s("span",[t._v("後台功能")]),s("a",{staticClass:"d-flex align-items-center text-muted",attrs:{href:"#"}},[s("span",{attrs:{"data-feather":"plus-circle"}})])])}],i=(s("ac1f"),s("5319"),{data:function(){return{userinfo:{token:"",checkSuccess:!1}}},methods:{signout:function(){console.log(document.cookie),document.cookie="logintoken=; expires=; path=/",console.log("token已清除"),this.$router.push("/login")}},created:function(){var t=this;this.userinfo.token=document.cookie.replace(/(?:(?:^|.*;\s*)logintoken\s*=\s*([^;]*).*$)|^.*$/,"$1"),console.log(this.userinfo),this.$http.defaults.headers.common.Authorization="Bearer ".concat(this.userinfo.token);var a="".concat("https://course-ec-api.hexschool.io/api","/auth/check");this.$http.post(a,{api_token:this.userinfo.token}).then((function(a){console.log(a),t.userinfo.checkSuccess=!0})).catch((function(a){console.log(a),alert("您尚未登入，請重新登入"),t.$router.push("/login")}))}}),r=i,o=(s("6d8f"),s("2877")),l=Object(o["a"])(r,e,n,!1,null,null,null);a["default"]=l.exports},"6d8f":function(t,a,s){"use strict";var e=s("ac3b"),n=s.n(e);n.a},ac3b:function(t,a,s){}}]);
//# sourceMappingURL=chunk-2496e2f8.52ca5ba3.js.map