import{_,R as p,a as m,r as u,o as i,c as f,b as e,d as s,w as r,e as a,j as k,k as g,g as V,F as A}from"./index-5a906f6f.js";const{VITE_APP_URL:$}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"practiceapi",VITE_TEXT:"…",BASE_URL:"/VueHw7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},x={data(){return{status:!1}},components:{RouterView:p,RouterLink:m},methods:{logout(){document.cookie=`hexSchool = ;
                    expires = `,this.$router.push("/Login")},checkAdmin(){const n=document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=n,this.$http.post(`${$}/v2/api/user/check`).then(t=>{t.data.success?(this.status=!0,console.log("11212"),console.log(this.status),console.log(t)):(alert("請先登入"),this.$router.push("/Login"))}).catch(t=>{alert("帳密錯誤"),this.$router.push("/Login")})}},mounted(){this.checkAdmin()}},E=a("h1",{class:"mb-5"},"這裡是後台頁面",-1),P=a("hr",null,null,-1);function R(n,t,T,w,l,c){const o=u("router-link"),h=u("router-view");return i(),f(A,null,[E,e("| "),s(o,{to:"/admin/AdminOrders"},{default:r(()=>[e("後臺訂單")]),_:1}),e(" | "),s(o,{to:"/admin/AdminProducts"},{default:r(()=>[e("後臺產品")]),_:1}),e(" | "),s(o,{to:"/"},{default:r(()=>[e("回前台")]),_:1}),e(" | "),a("a",{href:"#",onClick:t[0]||(t[0]=k((...d)=>c.logout&&c.logout(...d),["prevent"]))},"登出"),P,l.status?(i(),g(h,{key:0})):V("",!0)],64)}const v=_(x,[["render",R]]);export{v as default};