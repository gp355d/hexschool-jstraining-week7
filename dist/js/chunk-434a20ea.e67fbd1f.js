(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-434a20ea"],{7277:function(o,t,e){"use strict";e.r(t);var n=function(){var o=this,t=o.$createElement;o._self._c;return o._m(0)},c=[function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",[e("main",{staticClass:"col-md-9 ml-sm-auto col-lg-10 px-4 mt-5",attrs:{role:"main"}},[e("h2",[o._v("請點選左邊選單進行操作")])])])}],s=(e("ac1f"),e("5319"),{data:function(){return{userinfo:{token:"",checkSuccess:!1}}},methods:{signout:function(){console.log(document.cookie),document.cookie="logintoken=; expires=; path=/",console.log("token已清除"),this.$router.push("/login")}},created:function(){var o=this;this.userinfo.token=document.cookie.replace(/(?:(?:^|.*;\s*)logintoken\s*=\s*([^;]*).*$)|^.*$/,"$1"),console.log(this.userinfo),this.$http.defaults.headers.common.Authorization="Bearer ".concat(this.userinfo.token);var t="".concat("https://course-ec-api.hexschool.io/api","/auth/check");this.$http.post(t,{api_token:this.userinfo.token}).then((function(t){console.log(t),o.userinfo.checkSuccess=!0})).catch((function(t){console.log(t),alert("您尚未登入，請重新登入"),o.$router.push("/login")}))}}),i=s,u=(e("b985"),e("2877")),a=Object(u["a"])(i,n,c,!1,null,null,null);t["default"]=a.exports},b985:function(o,t,e){"use strict";var n=e("de7f"),c=e.n(n);c.a},de7f:function(o,t,e){}}]);
//# sourceMappingURL=chunk-434a20ea.e67fbd1f.js.map