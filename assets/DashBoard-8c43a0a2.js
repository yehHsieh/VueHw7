import{_ as h,R as l,a as _,r as i,o as p,c as m,b as e,d as t,w as r,e as c,j as f,F as k}from"./index-77ef22e1.js";const{VITE_APP_URL:A}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"practiceapi",VITE_TEXT:"…",BASE_URL:"/VueHw6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},V={components:{RouterView:l,RouterLink:_},methods:{logout(){document.cookie=`hexSchool = ;
                    expires = `,this.$router.push("/Login")},checkAdmin(){const n=document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=n,this.$http.post(`${A}/v2/api/user/check`).then(o=>{o.data.success||(this.$router.push("/Login"),console("c8 8c 8c "))}).catch(o=>{alert("帳密錯誤")})}},mounted(){this.checkAdmin()}},$=c("h1",{class:"mb-5"},"這裡是後台頁面",-1),x=c("hr",null,null,-1);function E(n,o,P,R,T,a){const s=i("router-link"),u=i("router-view");return p(),m(k,null,[$,e("| "),t(s,{to:"/admin/AdminOrders"},{default:r(()=>[e("後臺訂單")]),_:1}),e(" | "),t(s,{to:"/admin/AdminProducts"},{default:r(()=>[e("後臺產品")]),_:1}),e(" | "),t(s,{to:"/"},{default:r(()=>[e("回前台")]),_:1}),e(" | "),c("a",{href:"#",onClick:o[0]||(o[0]=f((...d)=>a.logout&&a.logout(...d),["prevent"]))},"登出"),x,t(u)],64)}const g=h(V,[["render",E]]);export{g as default};