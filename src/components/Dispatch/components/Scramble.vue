<template>
    <div>
        <el-dialog 
            :title="(curScrambleType == 'Grab') ? '抢单详情' : '报价详情'" 
            :visible="isVisible" 
            custom-class="scrambleDialog" top="5vh" 
            :show-close="false" 
            :close-on-press-escape="false" 
            :close-on-click-modal="false">
			<p class="c1">货物： {{scrambleList.cargoName}}</p>
			<p class="c1">货量： 
				{{[(scrambleList.cargoWeight+'吨'),(scrambleList.cargoVolume+'方'),(scrambleList.cargoNum)] | trimSpaceAndJoinSlash}}
			</p>
			<p class="c1">
                {{scrambleList.load}} 
                装 
                {{scrambleList.unLoad}} 
                卸  
                预计里程 
                {{(Number(scrambleList.mileages)/1000).toFixed(2)}}
                公里
            </p>
			<div class="tableBox">
				<table class="customerTable">
					<caption>
                        {{(curScrambleType == 'Grab')?'抢单人数':'报价人数'}}
                        （{{scrambleList.grabOfferNum}}）
                    </caption>
					<thead>
						<tr>
							<th>车辆</th>
							<th width="160">司机</th>
							<th width="160">运费</th>
							<th width="160">操作</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="item in scrambleList.grabOfferOrderDetailVOList">
							<tr>
								<td colspan="4" class="blank"></td>
							</tr>
							<tr>
								<td class="txt-l">
									<p>{{item.plateNo}} 
										<!-- <el-tag size="mini" v-if="item.gps">GPS</el-tag> -->
                                        <el-tag 
                                            size="mini" 
                                            :type="item.gps ? 'success' : 'info'" 
                                            :class="item.gps ? 'el-icon-success' : 'el-icon-warning'">
                                            GPS
                                        </el-tag>
										<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
											<div slot="content">
												<el-tag 
                                                    size="mini" 
                                                    type="danger" 
                                                    v-for="(truckItem, index) in item.truckExpiredCertificate.split(',')" 
                                                    :key="index">
                                                    {{EXPIREWARN[truckItem]}}
                                                </el-tag>
											</div>
											<el-tag size="mini" type="danger" v-if="item.truckExpiredCertificate.length>0">到期</el-tag>
										</el-tooltip>
									</p>
									<p>
                                        {{[
                                            item.length ? Number(item.length/1000).toFixed(1) + '米' : null,
                                            TRUCKTYPE[item.truckType],
                                            item.loads ? Number(item.loads/1000).toFixed(2) + '吨' : null
                                        ].filter(item => item).join('/')}}
									</p>
								</td>
								<td class="txt-l">
									<p>{{item.name}}
										<el-tooltip placement="right" effect="light" popper-class="expirewarnPop">
											<div slot="content">
												<el-tag size="mini" type="danger" v-for="(driverItem,index) in item.driverExpiredCertificate.split(',')" :key="index">{{
													EXPIREWARN[driverItem]
												}}</el-tag>
											</div>
											<el-tag size="mini" type="danger" v-if="item.driverExpiredCertificate.length>0">到期</el-tag>
										</el-tooltip>
									</p>
									<p>{{item.mobile}}</p>
								</td>
								<td class="c posr">
									<span class="tags">{{item.type=='Offer'?'报':'定'}}</span>{{item.amount}}元 
									<img class="success" src="../../../assets/imgs/qdcg.png" height="48" v-if="item.status == 'Agreed'&&item.type=='Grab'" />
									<img class="success" src="../../../assets/imgs/bjcg.png" height="48" v-if="item.status == 'Agreed'&&item.type=='Offer'" />
								</td>
								<td>
									<span class="c1 selectTruck" @click="confirmScramble(item.dispatchOfferID,item.dispatchOrderID,item.type)" v-if="dispatchOrderStatus == 'Committed'">选TA承运</span>
									<p v-if="item.status == 'Agreed'">调度员：{{item.confirmer}}</p>
									<p v-if="item.status == 'Agreed'">{{item.confirmTime  | getdatefromtimestamp}}</p>
								</td>
							</tr>
							<tr>
								<td colspan="4" class="c2">
									<span class="fl"><i class="el-icon-location"></i> {{Number(item.hours).toFixed(1)}} 小时前 {{item.posAddress}}</span>
									<span class="fr">距离装车地 {{item.distance}} 公里</span>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
			<div slot="footer" class="dialog-footer text-center">
				<el-button @click="close" size="small">关闭</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import axios from 'axios'
import DispatchOrder from '../../../api/DispatchOrder'
import { confirmSelect } from '../../../common/utils'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        callback: Function,
        curScrambleType: String,
        dispatchOrderStatus: String,
        dispatchOrderID: String
    },
    data() {
        return {
            scrambleList: {}
        }
    },
    watch: {
        isVisible(bool) {
            bool && this.getList()
        }
    },
    methods: {
        getList() {
            DispatchOrder.offerList({ dispatchOrderID: this.dispatchOrderID }).then(res => {
                this.scrambleList = res
                const list = res.grabOfferOrderDetailVOList
				list.forEach(item =>{
					const location = item.longitude+ ',' +item.latitude     
					const loadLocation = item.loadLongitude+ ',' +item.loadLatitude
					this.getDistance(loadLocation, location)
				})
            })
        },
        /**
		 * 调用高德地图接口获取距离
		 */
		getDistance(loadLocation,location) {
			const url = `https://restapi.amap.com/v3/distance?origins=${loadLocation}&destination=${location}&key=${this.MAPKEY}`
			axios({ url }).then(res => {
				const results = res.data.results
				this.scrambleList.grabOfferOrderDetailVOList= this.scrambleList.grabOfferOrderDetailVOList.map(item =>{
					return Object.assign(item, {
						"distance": Number((Number(results[0].distance)/1000).toFixed(2))
					})
				})
			})
        },
        /**
         * 选他承运
         */
        confirmScramble(dispatchOfferID, dispatchOrderID, type) {
			type = type == 'Offer' ? '报价' : '承运人'
			confirmSelect(dispatchOrderID, type, dispatchOrderID => {
				DispatchOrder.acceptOffer({ dispatchOfferID }).then(res => {
					Message.success('已成功选择承运人!')
					this.callback(true)
				})
			})
			
		},
        close() {
            this.callback()
        }
    }
}
</script>

<style lang="stylus" scoped>
.tableBox
    width 100%
    overflow hidden
    overflow-x auto
    .customerTable
        font-size 12px
        background #dcdfe6
        border-spacing 1px
        width 100%
        caption
            text-align left
            height 30px
            line-height 30px
        th
        td
            &.txt-l
                text-align left	
            &.w1
                width 140px
            &.w2
                width 200px
            &.w3
                width 300px
            &.w4
                width 100px
        th
            background #f2f2f2
            color #666
            padding 10px 15px
            white-space  nowrap
        td
            padding 10px 15px
            background #fff
            color #999
            white-space  nowrap 
            text-align center
            &.blank
                padding 5px 0
                background #f8f8f8
            .tags
                background #409EFF
                color #fff
                width 18px
                height 18px
                display inline-block
                border-radius 4px
                font-size 12px
                line-height 18px
                text-align center
                margin-right 4px
            .success
                position absolute
                right 10px
                top 50%
                transform translateY(-50%)
            p
                margin 0
                padding 0
                line-height 24px
            .dispatchbillTit
                float left
                height 28px
                
                .num
                    color #409EFF
                    margin-right 10px
                    cursor pointer
                    line-height 28px
                .quoteInfo
                    width 300px
                    padding 0 10px
                    display inline-block
                    vertical-align top
                    height 28px
                    line-height 28px
                    overflow hidden
                    position relative
                    .quoteList
                        position absolute
                        .quoteListItem
                            b
                                font-weight normal
                                margin-left 10px
                            .forcefontsize8
                                color #f00
                                margin-left 5px
                                display inline-block
                                font-size 12px
                                -webkit-text-size-adjust none
                                -webkit-transform scale(0.8,0.8)								
            .handler
                float right
                height 28px
                span
                    margin-left 20px
                    line-height 28px
                    vertical-align top
                    cursor pointer
                    &.noCursor
                        cursor auto
        .c3			
            color #f60
        .selectTruck
            cursor pointer
        .tracto
            padding 0 5px 0 8px	
</style>
