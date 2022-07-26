<template>
    <div class="table-view">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <slot name="heading">
                    <component :is="headingTag" v-if="heading" class="font-weight-light mb-2">
                        {{ heading }}
                    </component>
                </slot>
                <slot name="description">
                    <p v-if="description" v-html="description" />
                </slot>
                <slot name="search">
                    <input-field v-if="search" icon="search" :placeholder="searchPlaceholder" pill @input="onSearchInput" />
                </slot>
            </div>
        
            <div v-if="$slots.buttons" class="ml-auto mb-3 mt-auto">
                <slot name="buttons" />
            </div>
        </div>
            
        <div :class="{'card': !!card, [shadowClassName]: !!shadow}">
            <base-table
                :request="request"
                :response="response"
                :columns="columns"
                :data="data"
                :hover="hover"
                :loading="loading"
                :min-height="minHeight"
                :paginate="paginate"
                @paginate="onPaginate"
                @order="id => orderBy(id)">
                <slot :data="data" :columns="columns" />
            </base-table>
        </div>
    </div>
</template>

<script>
import BaseTable from './Table.vue';
import Proxy from '../../Mixins/Proxy';
import Request from '../../Http/Request';
import Shadowable from '../../Mixins/Shadowable';
import InputField from '../../Components/InputField';
import TableViewTransformer from '../../Http/TableViewTransformer';
import { debounce, map } from '../../Helpers/Functions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

const debounced = debounce((fn, ...args) => {
    fn(...args);
}, 250);

export default {
    name: 'TableView',

    components: {
        BaseTable,
        InputField
    },

    mixins: [Proxy, Shadowable],

    props: {

        // (boolean) Show the table in a card.
        card: Boolean,

        // (string) A relative or absolute endpoint URL used to fetch data
        url: {
            type: String,
            required: true
        },

        // (integer) The starting page of the table
        page: {
            type: Number,
            default: 1
        },

        // (integer) The total number of results per page
        limit: {
            type: Number,
            default: 20
        },

        // (string) The column used to order the data
        order: String,

        // (string) The sort direction (asc|desc)
        sort: {
            type: String,
            validate: (value) => {
                return ['asc', 'desc'].indexOf(value) !== -1;
            }
        },

        // (integer) The minimum height of the row when loading data
        minHeight: {
            type: Number,
            default: 400
        },

        // (array) An array of button objects
        // [{href: 'test-123', label: 'Test 123'}]
        buttons: {
            type: Array,
            default: () => {
                return [];
            }
        },

        // (array) An array of table column
        // [{id: 'database_id', name: 'Database id', width: '20%'}]
        columns: {
            type: Array,
            default: () => {
                return [];
            }
        },

        // (string) The table heading
        heading: String,

        headingTag: {
            type: String,
            default: 'h3'
        },

        // (string) The default sort value
        defaultSort: {
            type: String,
            default: 'desc'
        },

        // (string) The HTTP method used to send the request.
        method: {
            type: String,
            default: 'get',
            validate(value) {
                return ['get', 'post', 'put', 'delete'].indexOf(value) !== -1;
            }
        },

        // (string) Add table-hover to the table element
        hover: {
            type: Boolean,
            default: true
        },

        // (string) The table description
        description: String,

        // (bool) Should show the pagination for this table
        paginate: {
            type: Boolean,
            default: true
        },

        // (object) The HTTP response transformer instance
        transformer: {
            type: Object,
            validate: (value) => {
                return value instanceof TableViewTransformer;
            }
        },

        // (bool) The request headers
        headers: {
            type: Object,
            default() {
                return {};
            }
        },

        // (bool) The request URL parameters
        params: {
            type: Object,
            default() {
                return {};
            }
        },

        search: {
            type: Boolean,
            default: false
        },

        searchPlaceholder: {
            type: String,
            default: 'Search by keyword(s)'
        },

        searchParam: {
            type: String,
            default: 'q'
        }

    },

    data() {
        return {
            // (array) The dataset for the table
            data: this.$attrs.data || [],

            // (bool) Is the table currently loading data
            loading: false,

            // (null|object) The response object
            response: null,

            // (object) The HTTP request object
            request: {
                headers: Object.assign({}, this.headers),
                params: Object.assign({
                    page: this.page,
                    limit: this.limit,
                    order: this.order,
                    sort: this.sort
                }, this.params)
            }
        };
    },

    mounted() {
        this.fetch();
    },

    beforeDestroy() {
        this.$off();
    },

    methods: {
        
        orderBy(order) {
            const currentSort = this.getRequestParam('sort');
            const currentOrder = this.getRequestParam('order');

            this.setRequestParam('order', order);
            this.setRequestParam('sort',
                currentOrder !== order || !currentSort ? this.defaultSort : (
                    currentSort === this.defaultSort ? 'asc' : null
                )
            );

            this.fetch();
        },

        getRequestHeader(key, defaultValue) {
            return this.request.headers[key] || defaultValue;
        },

        setRequestHeader(key, value) {
            this.request.headers = Object.assign(this.request.headers, {
                [key]: value
            });
        },

        setRequestHeaders(value) {
            Object.assign(this.request.headers, value);
        },

        getRequestParam(key, defaultValue) {
            return this.request.params[key] || defaultValue;
        },

        getRequestParams() {
            return this.request.params;
        },

        setRequestParam(key, value) {
            this.request.params = Object.assign(this.request.params, {
                [key]: value
            });
        },

        setRequestParams(value) {
            Object.assign(this.request.params, value);
        },

        getRequestData(key, defaultValue) {
            return this.request.data[key] || defaultValue;
        },

        setRequestData(key, value) {
            if(value === undefined) {
                this.request.data = Object.assign(this.request.data, {
                    [key]: value
                });
            }
            else {
                Object.assign(this.request.data, value);
            }
        },

        fetch(page = 1, params = {}) {
            this.setRequestParams(params);
            this.setRequestParam('page', page);        
            this.loading = true;
            this.$emit('fetch');

            return Request[this.method](this.url, this.request).then(response => {
                const transformer = this.transformer || new TableViewTransformer(response);

                this.loading = false;
                this.data = transformer.data();
                this.response = transformer.response();
                this.$emit('fetch-success', response, this.request);
                this.$emit('fetch-complete', true, response, this.request);
            }, error => {
                this.loading = false;
                this.$emit('fetch-failed', error, this.request);
                this.$emit('fetch-complete', false, error, this.request);
            });
        },

        onPaginate(page) {          
            this.fetch(page);
        },

        onSearchInput(value) {
            this.$set(this.request.params, this.searchParam, value);

            debounced(() => {
                this.fetch();
            });
        }

    }
};
</script>

<style lang="scss">
.card > .table {
    margin-bottom: 0;

    thead th {
        border-top: 0;
        border-bottom: 0;

        &:first-child {
            border-radius: .25em 0 0 0;
        }

        &:last-child {
            border-radius: 0 .25em 0 0;
        }
    }

    tfoot .pagination {
        margin-bottom: 0;
    }
}
</style>
