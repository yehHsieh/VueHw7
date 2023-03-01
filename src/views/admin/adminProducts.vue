<template>
    後臺產品列表
    <div class="container">
        <div class="text-end mt-4">
            <button class="btn btn-primary" @click="openModal(true)">
                建立新的產品
            </button>
        </div>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">
                    分類
                </th>
                <th>產品名稱</th>
                <th width="120">
                    原價
                </th>
                <th width="120">
                    售價
                </th>
                <th width="100">
                    是否啟用
                </th>
                <th width="120">
                    編輯
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in products" :key="item.id">
                <td>{{ item.category }}</td>
                <td>{{ item.title }}</td>
                <td class="text-end">{{ item.origin_price }}</td>
                <td class="text-end">{{ item.price }}</td>
                <td>
                    <span class="text-success" v-if="item.is_enabled">啟用</span>
                    <span v-else>未啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                            編輯
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                            刪除
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    <!-- Modal -->
    <product-modal @update-product="updateProduct" :product="tempProduct" :isNew="isNew" ref="productModal" />

    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="delProduct">
                        確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ProductModal from '../../components/ProductModal.vue';
import Pagination from '../../components/Pagination.vue';
export default {
    data() {
        return {
            products: [],
            tempProduct: {},
            isNew: false,
            pagination: {},
            isLoading: false,
            currentPage: 1,
        }
    },
    components: {
        ProductModal,
        Pagination,
    },
    methods: {
        getProducts(page = 1) {
            this.currentPage = page;
            const api = `${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/admin/products?page=${page}`;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                this.products = response.data.products;
                this.pagination = response.data.pagination;
                this.isLoading = false;

            }).catch((error) => {
                this.isLoading = false;
                this.$httpMessageState(error.response, '錯誤訊息');
            });
        },
        openModal(isNew, item) {
            if (isNew) {
                this.tempProduct = {};
                this.isNew = true;
            } else {
                this.tempProduct = { ...item };
                this.isNew = false;
            }
            const productComponent = this.$refs.productModal;
            console.log(this.$refs)
            productComponent.openModal();
        },
        updateProduct(item) {
            this.tempProduct = item;
            let api = `${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/admin/product`;
            this.isLoading = true;
            let httpMethod = 'post';
            let status = '新增產品';
            if (!this.isNew) {
                api = `${import.meta.env.VITE_APP_URL}api/${import.meta.env.VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
                httpMethod = 'put';
                status = '更新產品';
            }
            const productComponent = this.$refs.productModal;
            this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
                this.isLoading = false;
                // this.$httpMessageState(response, status);
                productComponent.hideModal();
                this.getProducts(this.currentPage);
            }).catch((error) => {
                this.isLoading = false;
                // this.$httpMessageState(error.response, status);
            });
        },
    },
    created() {
        this.getProducts();
    },
}
</script>