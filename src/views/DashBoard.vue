<template>
    <h1 class="mb-5">這裡是後台頁面</h1>|
    <router-link to="/admin/AdminOrders">後臺訂單</router-link> |
    <router-link to="/admin/AdminProducts">後臺產品</router-link> |
    <router-link to="/">回前台</router-link> |
    <a href="#" @click.prevent="logout">登出</a>

    <!-- <router-link to="/admin">後台首頁</router-link> -->
    <hr />
    <router-view v-if="status" />
</template>
<script>
const { VITE_APP_URL } = import.meta.env;
import { RouterView, RouterLink } from 'vue-router';

export default {
    data() {
        return {
            status: false,
        };
    },
    components: {
        RouterView,
        RouterLink,
    },
    methods: {
        logout() {
            document.cookie = `hexSchool = ;
                    expires = `
            this.$router.push('/Login')
        },
        checkAdmin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*=\s*([^;]*).*$)|^.*$/, '$1');
            this.$http.defaults.headers.common.Authorization = token;
            this.$http.post(`${VITE_APP_URL}/v2/api/user/check`)
                .then((res) => {
                    // this.getData();
                    if (!res.data.success) {
                        alert('請先登入')
                        this.$router.push('/Login')
                    }
                    else {
                        this.status = true;
                        console.log("11212")
                        console.log(this.status)
                        console.log(res)
                    }
                })
                .catch((err) => {
                    alert("帳密錯誤")
                    this.$router.push('/Login')
                })
        },
    },
    mounted() {
        this.checkAdmin();
    }
};
</script>