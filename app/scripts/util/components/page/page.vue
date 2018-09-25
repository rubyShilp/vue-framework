<template>
    <div class="fddv3-list-page">
        <div class="fddv3-page-left">
            当前第{{currentPageNo}}页，共{{page===0?1:page}}页，共{{totalCount}}条</div>
        <div class="fddv3-page">
            <a href="javaScript:;">
                <span class="fddv3-icon-page-home" v-on:click="setCurrent(1)"></span>
            </a>
            <a href="javaScript:;" v-on:click="setCurrent(currentPageNo-1)">
                <span class="fddv3-icon-page-prev"></span>
            </a>
            <a href="javaScript:;" v-for="p in grouplist" :key="p" v-on:click="setCurrent(p)" v-bind:class="{'fddv3-page-hover':currentPageNo===p}">{{p}}</a>
            <a href="javaScript:;" v-on:click="setCurrent(currentPageNo+1)">
                <span class="fddv3-icon-page-next"></span>
            </a>
            <a href="javaScript:;">
                <span class="fddv3-icon-page-last" v-on:click="setCurrent(page)"></span>
            </a>
        </div>
    </div>
</template>
<style scoped>
.fddv3-list-page {
    background: #fff;
    margin: 30px 0;
    padding-bottom: 30px;
}
.fddv3-list-page .fddv3-page-left {
    float: left;
    line-height: 30px;
    color: #a6a6a6;
    padding-left:10px;
}
.fddv3-list-page .fddv3-page {
    float: right;
}
.fddv3-list-page .fddv3-page a {
    color: #a6a6a6;
    text-decoration: none;
    line-height: 30px;
    min-width: 30px;
    height: 30px;
    padding: 0 5px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    box-sizing: border-box;
}
.fddv3-list-page .fddv3-page .fddv3-page-hover {
    background: #3896ff;
    border-radius: 2px;
    color: #fff;
}

.fddv3-list-page .fddv3-page span {
    background: url(./images/common.png) no-repeat;
    width: 16px;
    height: 16px;
    display: inline-block;
    margin: 6px auto 0;
}
.fddv3-list-page .fddv3-page .fddv3-icon-page-prev {
    background-position: -18px -1px;
}
.fddv3-list-page .fddv3-page .fddv3-icon-page-home {
    background-position: 0px -1px;
}
.fddv3-list-page .fddv3-page .fddv3-icon-page-next {
    background-position: -32px -1px;
}
.fddv3-list-page .fddv3-page .fddv3-icon-page-last {
    background-position: -48px -1px;
}
</style>
<script>
export default {
    props: {
        currentPageNo: {            // 当前页码
            type: Number,
            default: 1
        },
        totalCount: {            // 数据总条数
            type: Number,
            default: 0
        },
        pageSize: {            // 每页显示条数
            type: Number,
            default: 10
        },
        pagegroup: {        // 分页条数 -- 奇数
            type: Number,
            default: 5,
            compute: function(v) {
                v = v > 0 ? v : 5;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    computed: {
        page: function() { // 总页数
            return Math.ceil(this.totalCount / this.pageSize);
        },
        grouplist: function() {
            var pages = [];
            if (this.page === 0) {
                pages.push(1);
            } else if (this.page <= this.pagegroup) {
                for (let i = 1; i <= this.page; i++) {
                    pages.push(i);
                }
            } else if (this.page - this.currentPageNo < this.pagegroup) {
                for (var i = this.page - 5; i <= this.page; i++) {
                    pages.push(i);
                }

            } else if (this.page > this.pagegroup && (this.currentPageNo - 2) < 1) {
                for (var i = 1; i <= 3; i++) {
                    pages.push(i);
                }
                pages.push('...');
                for (var i = this.page - 1; i <= this.page; i++) {
                    pages.push(i);
                }
            } else if (this.page > this.pagegroup && (this.currentPageNo - 2) > 0) {
                for (var i = this.currentPageNo - 1; i <= this.currentPageNo + 1; i++) {
                    pages.push(i);
                    if (pages.length == 3) {
                        break;
                    }
                }
                pages.push('...');
                for (var i = this.page - 1; i <= this.page; i++) {
                    pages.push(i);
                }
            }
            return pages;
        }
    },
    methods: {
        setCurrent: function(current) {
            if (this.currentPageNo != current && current > 0 && current < this.page + 1) {
                this.currentPageNo = current;
                this.$emit('pagingQuery', this.currentPageNo);
            }
        }
    }
}
</script>

