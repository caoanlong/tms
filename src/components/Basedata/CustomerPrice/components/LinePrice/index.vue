<template>
    <div>
        <el-dialog 
            width="70%"
            title="线路定价" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false">
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="客户名称">
						<el-input placeholder="名称" v-model="find.name"></el-input>
					</el-form-item>
                    <el-form-item label="客户地址">
						<el-input placeholder="地址" v-model="find.address"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
            <div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加线路</el-button>
			</div>
			<div class="table-box">
				<table class="table-main">
                    <thead>
                        <tr>
                            <th rowspan="2"><p>发货单位</p><p>收货单位</p></th>
                            <th rowspan="2"><p>起点地址</p><p>终点地址</p></th>
                            <th colspan="3">对客户应收运价</th>
                            <th colspan="3">对司机支付运价</th>
                            <th rowspan="2">操作</th>
                        </tr>
                        <tr>
                            <th>运输距离</th>
                            <th>吨公里价格</th>
                            <th>方公里价格</th>
                            <th>运输距离</th>
                            <th>吨公里价格</th>
                            <th>方公里价格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <td>
                                <p><span class="from">发</span>{{item.shipperName}}</p>
                                <p><span class="to">收</span>{{item.consigneeName}}</p>
                            </td>
                            <td>
                                <p><span class="from">发</span>{{item.shipperAddress}}</p>
                                <p><span class="to">终</span>{{item.consigneeAddress}}</p>
                            </td>
                            <td align="center">{{item.receivableDistance/1000}}</td>
                            <td align="center">{{item.receivableWeightUnitPrice}}</td>
                            <td align="center">{{item.receivableVolumnUnitPrice}}</td>
                            <td align="center">{{item.payableDistance/1000}}</td>
                            <td align="center">{{item.payableWeightUnitPrice}}</td>
                            <td align="center">{{item.payableVolumnUnitPrice}}</td>
                            <td align="center">
                                <el-button type="danger" size="mini" @click="del(item.routePriceID)">删除</el-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
			</div>
            <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">关闭</el-button>
            </div>
        </el-dialog>
        <add-line 
            :isVisible="isAddLineVisible" 
            :callback="callbackAddLine" 
            :customerID="customerID">
        </add-line>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { baseMixin } from '../../../../../common/mixin'
import { deleteConfirm } from '../../../../../common/utils'
import AddLine from '../AddLine'
import Company from '../../../../../api/Company'
export default {
    mixins: [baseMixin],
    components: { AddLine },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        callback: Function,
        customerID: String
    },
    watch: {
        isVisible(bool) {
            this.isChange = false
            bool && this.getList()
        }
    },
    data() {
        return {
            isAddLineVisible: false,
            isChange: false,
            find: {
				name: '',   /**收发货单位（查询）*/
				address: ''   /**收发货地址（查询）*/
			}
        }
    },
    methods: {
        reset() {
			this.find.name = ''
			this.find.address = ''
			this.pageIndex = this.PAGEINDEX
			this.pageSize = this.PAGESIZE
			this.getList()
		},
        getList() {
            Company.customerRoutePriceFind({
                customerID: this.customerID,
                current: this.pageIndex,
				size: this.pageSize,
				name: this.find.name,
				address: this.find.address
            }).then(res => {
                this.tableData = res.records
                this.total = res.total
            })
        },
        callbackAddLine(bool) {
            this.isAddLineVisible = false
            if (bool) {
                this.isChange = true
				this.getList()
            }
        },
        add() {
            this.isAddLineVisible = true
        },
        del(routePriceID) {
			deleteConfirm(routePriceID, routePriceID => {
				Company.customerRoutePriceDelete({ routePriceID }).then(res => {
                    Message.success('删除成功!')
                    this.isChange = true
					this.getList()
				})
			})
		},
        close() {
            this.callback(this.isChange)
        }
    }
}
</script>

<style lang="stylus" scoped>
.table-box
    width 100%
    overflow hidden
    overflow-x auto
    .table-main
        .arrow-group
            display inline-block
            position relative
            width 14px
            height 14px
            .icon
                margin 0 4px
                cursor pointer
                &.up
                    color #409EFF
                &.down
                    color #67C23A
                &.disabled
                    color #ddd
                    cursor not-allowed
            .arrow-up
                position absolute
                left 0
                top 4px
                color #cccccc
                transform rotate(180deg)
                &.active
                    color #409EFF
                &.rotate
                    transform rotate(0deg)
            .arrow-down
                position absolute
                left 0
                top 3px
                color #cccccc
                &.active
                    color #409EFF
                &.rotate
                    transform rotate(180deg)
        td
            height 36px
            padding 15px
table
    font-size 12px
    background-color #dcdfe6
    border-spacing 1px
    width 100%
    p
        margin 0
        padding 0
        line-height 18px
        white-space  nowrap 
        &:first-child
            margin-bottom 5px
    th
        background #f2f2f2
        color #666
        white-space  nowrap
        height 36px
    td
        background #fff
        white-space  nowrap 
        p
            color #999
            &:first-child
                color #666
            span
                width 18px
                height 18px
                display inline-block
                color #fff
                border-radius 4px
                font-size 12px
                line-height 18px
                text-align center
                margin-right 4px
                &.from
                    background #409EFF
                &.to
                    background #67C23A
                &.surplus
                    background #909399	
        &.address
            width 330px
            p
                max-width 300px
                overflow hidden
                text-overflow ellipsis
</style>
