<template>
    <div>
        <div>
            <h2 class="text-center">昆明市危货运输户籍化管理登记表</h2>
            <table class="common-table">
                <tr>
                    <td rowspan="8" width="50"><p style="width: 1em">车辆基础信息</p></td>
                    <td width="100">车牌号码</td>
                    <td>{{transportRecordDetail.plateNo}}</td>
                    <td>厂牌型号</td>
                    <td width="120"><p>{{transportRecordDetail.manufacturer}}</p><p>{{transportRecordDetail.carBrandModel}}</p>
                    </td>
                    <td width="50">核载人数</td>
                    <td>{{transportRecordDetail.personsCapacity}}人</td>
                </tr>
                <tr>
                    <td>注册登记日期</td>
                    <td>{{transportRecordDetail.driverLicRegisterTime | getdatefromtimestamp(true) }}</td>
                    <td>检验有效期止</td>
                    <td>{{transportRecordDetail.driverLicExamineExpires | getdatefromtimestamp(true) }}</td>
                    <td>车身颜色</td>
                    <td>{{transportRecordDetail.carBodyColor}}</td>
                </tr>
                <tr>
                    <td>所有权归属</td>
                    <td colspan="3">
                        <span v-if="transportRecordDetail.trailerPropertyType=='单位'">单位</span>
                        <span v-else-if="transportRecordDetail.trailerPropertyType=='个人'">个人</span>
                        <span v-else>挂靠</span>
                    </td>
                    <td>经营性质</td>
                    <td>
                        <span v-if="transportRecordDetail.businessNature=='营运'">营运</span>
                        <span v-else>自用</span>
                    </td>
                </tr>
                <tr>
                    <td>车辆所有人姓名或单位名称</td>
                    <td colspan="3">{{transportRecordDetail.carOwnerName}}</td>
                    <td>联系电话</td>
                    <td>{{transportRecordDetail.carOwnerMobile}}</td>
                </tr>
                <tr>
                    <td>实际车主姓名</td>
                    <td colspan="3">{{transportRecordDetail.curDriverName}}</td>
                    <td>联系电话</td>
                    <td>{{transportRecordDetail.curDriverMobile}}</td>
                </tr>
                <tr>
                    <td colspan="5">是否喷涂“严禁超员，核载X人”</td>
                    <td>{{transportRecordDetail.hasWarnMark=='Y'?'是':'否'}}</td>
                </tr>
                <tr>
                    <td>登记地址</td>
                    <td colspan="5">{{transportRecordDetail.carOwnerAddress}}</td>
                </tr>
                <tr>
                    <td>现住址</td>
                    <td colspan="5">{{transportRecordDetail.curDriverAddress}}</td>
                </tr>
                <tr>
                    <td rowspan="4"><p style="width: 1em">驾驶人基础信息</p></td>
                    <td>驾驶人姓名</td>
                    <td>{{transportRecordDetail.realName}}</td>
                    <td>性别</td>
                    <td>{{transportRecordDetail.sex=="M"?'男':'女'}}</td>
                    <td>准驾车型</td>
                    <td>{{transportRecordDetail.quasiDrivingType}}</td>
                </tr>
                <tr>
                    <td>身份证号</td>
                    <td colspan="3">{{transportRecordDetail.idCardNum}}</td>
                    <td>档案编号</td>
                    <td>{{transportRecordDetail.driverLicenseCode}}</td>
                </tr>
                <tr>
                    <td>驾驶证审验有效起止</td>
                    <td colspan="3">
                        <span v-if="transportRecordDetail.driverLicExamineBeginTime">{{transportRecordDetail.driverLicExamineBeginTime | getdatefromtimestamp(true) }}--{{transportRecordDetail.driverLicExamineEndTime | getdatefromtimestamp(true) }}</span>
                    </td>
                    <td>联系电话</td>
                    <td>{{transportRecordDetail.mobile}}</td>
                </tr>
                <tr>
                    <td>现住址</td>
                    <td colspan="5">{{transportRecordDetail.homeAddress}}</td>
                </tr>
                <tr>
                    <td><p style="width: 1em">车辆照片</p></td>
                    <td colspan="6">
                        <img v-if="transportRecordDetail.truckFrontPic" width="200" height="150" :src="imgUrl + transportRecordDetail.truckFrontPic"/>
                        <img v-if="transportRecordDetail.truckSidePic1" width="200" height="150" :src="imgUrl + transportRecordDetail.truckSidePic1"/>
                        <img v-if="transportRecordDetail.truckSidePic2" width="200" height="150" :src="imgUrl + transportRecordDetail.truckSidePic2"/>
                    </td>
                </tr>
                <tr>
                    <td :rowspan="trafficList.length > 0 ? (trafficList.length + 1) : (trafficList.length + 2)">车辆交通违法及事故情况</td>
                    <td>时间</td>
                    <td>地点</td>
                    <td>驾驶人</td>
                    <td colspan="2">交通违法行为或事故简要描述</td>
                    <td>处理情况</td>
                </tr>
                <tr v-for="traffic in trafficList" :key="traffic.endorsementID">
                    <td>{{traffic.occurredTime | getdatefromtimestamp(true)}}</td>
                    <td>{{traffic.areaName + traffic.detailAddress}}</td>
                    <td>{{transportRecordDetail.realName}}</td>
                    <td colspan="2">{{traffic.endorseDesc}}</td>
                    <td>{{traffic.handleResult}}</td>
                </tr>
                <tr v-if="trafficList.length<1">
                    <td colspan="6">暂无记录</td>
                </tr>
            </table>
        </div>
        <div class="common-table-footer">
            <el-button type="success" @click="isShowAddDialog = true">添加记录</el-button>
            <el-button type="primary" @click="isShowListDialog = true" v-if="trafficList.length > 0">修改记录</el-button>
            <el-button @click="back">返回</el-button>
        </div>
        <add-traffic 
            :isVisible="isShowAddDialog" 
            @addCallback="addCallback" 
            :driver="transportRecordDetail.realName">
        </add-traffic>
        <update-traffic 
            :isVisible="isShowEditDialog" 
            @updateCallback="updateCallback" 
            :driver="transportRecordDetail.realName" 
            :trafficProps="traffic">
        </update-traffic>
		<el-dialog title="记录列表" width="60%" :visible.sync="isShowListDialog">
			<el-table :data="trafficList">
				<el-table-column property="occurredTime" label="时间" width="120">
					<template slot-scope="scope">
						<span>{{scope.row.occurredTime | getdatefromtimestamp(true)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="地点">
					<template slot-scope="scope">
						<span>{{scope.row.areaName + scope.row.detailAddress}}</span>
					</template>
				</el-table-column>
				<el-table-column label="驾驶人" width="100">
					<template slot-scope="scope">
						<span>{{transportRecordDetail.realName}}</span>
					</template>
				</el-table-column>
				<el-table-column label="交通违法行为或事故简要描述" prop="endorseDesc"></el-table-column>
				<el-table-column label="处理情况" prop="handleResult"></el-table-column>
				<el-table-column label="操作" align="center" width="230">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" @click="update(scope.row)">编辑</el-button>
						<el-button size="mini" icon="el-icon-delete" @click="del(scope.row.endorsementID)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import TransportRecord from '../../../api/TransportRecord'
import Truck from '../../../api/Truck'
import DistPicker from '../../CommonComponents/DistPicker'
import { areaIdToArrayId, deleteConfirm } from '../../../common/utils'
import AddTraffic from './AddTraffic'
import UpdateTraffic from './UpdateTraffic'
export default {
    data() {
        return {
            transportRecordDetail: {},
            trafficList: [],
            isShowAddDialog: false,
			isShowListDialog: false,
            isShowEditDialog: false,
            traffic: {
				occurredTime: '',
				areaID: '',
				detailAddress: '',
				endorseDesc: '',
				handleResult: ''
			}
        }
    },
    components: {
        DistPicker, AddTraffic, UpdateTraffic
    },
    created() {
        this.getDetail()
        this.getTrafficList()
    },
    methods: {
		getDetail() {
			let transportRecordID =this.$route.query.transportRecordID
			TransportRecord.findDetail({ transportRecordID }).then(res => {
				this.transportRecordDetail = res
			})
        },
        getTrafficList() {
			let transportRecordID =this.$route.query.transportRecordID
			Truck.findEndorsements({ transportRecordID }).then(res => {
				this.trafficList = res
			})
        },
        addCallback(bool) {
            this.isShowAddDialog = false
            bool && this.getTrafficList()
        },
        updateCallback(bool) {
            this.isShowEditDialog = false
            this.isShowListDialog = false
            bool && this.getTrafficList()
        },
		update(obj) {
			this.traffic = obj
            this.isShowEditDialog = true
		},
		del(endorsementID) {
			deleteConfirm(endorsementID, endorsementIDs => {
				Truck.deleteEndorsement({ endorsementIDs }).then(res => {
					Message({ type: 'success', message: '删除成功!' })
					this.getTrafficList()
					this.isShowEditDialog = false
					this.isShowListDialog = false
				})
			})
        },
        back() {
			this.$router.go(-1)
		}
    }
}
</script>

<style lang="stylus" scoped>

</style>
