<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">添加客户</div>
            <el-form label-width="120px" :model="recdeliverycomp" :rules="rules" ref="ruleForm" size="small">
			<el-row>
				<el-col :span="14" :offset="5">
						<el-form-item label="客户LOGO" prop="logoUrl">
							<div style="display:flex">
								<div style="flex:0 0 110px">
									<ImageUpload :files="[recdeliverycomp.logoUrl]" :fixed="true" :fixedNumber="[1,1]" @imgUrlBack="handleLogoSuccess"/>
								</div>
								<div style="flex:1;color:#999">
									<p>LOGO用途：用于展示客户形象</p>
									<p>位置：客户软件头部</p>
									<p>大小：100px*100px</p>
								</div>
							</div>
						</el-form-item>
						<el-form-item label="客户名称" prop="companyName">
							<el-input v-model="recdeliverycomp.companyName" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="客户类型" prop="customerType">
							<el-checkbox-group v-model="recdeliverycomp.customerType">
								<el-checkbox label="Shipper">发货方</el-checkbox>
								<el-checkbox label="Consignee">收货方</el-checkbox>
								<el-checkbox label="Delegate">委托方</el-checkbox>
							</el-checkbox-group>							
						</el-form-item>
						<el-form-item label="所在区域" prop="companyAreaID">
							<dist-picker :distList="selectedArea" @hand-select="handleSelectedArea"></dist-picker>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input v-model="recdeliverycomp.contactName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="contactPhone">
							<el-input v-model="recdeliverycomp.contactPhone"></el-input>
						</el-form-item>
                        <el-form-item label="客户编号" prop="code">
							<el-input v-model="recdeliverycomp.code"></el-input>
						</el-form-item>
                        <el-form-item label="监控类型" prop="fencingType">
                            <el-select v-model="recdeliverycomp.fencingType" placeholder="请选择">
                                <el-option label="请选择" value=""></el-option>
                                <el-option label="区域监控" value="Area"></el-option>
                                <el-option label="地址监控" value="Point"></el-option>
                            </el-select>					
						</el-form-item>
				</el-col>
			</el-row>
            <el-row>
				<el-col :span="14" :offset="5" style="padding-left:120px">
                    <div class="addAreaTit">价格监控区域<span class="el-icon-plus fr addArea" @click="addArea"> 增加</span></div>
                    <el-table :data="monitoringAreaList" style="width: 100%;border-radius:0 0 4px 4px;margin-bottom:18px" border size="mini">
                            <el-table-column prop="provice" label="省" align="center"></el-table-column>
                            <el-table-column prop="city" label="市" align="center"></el-table-column>
                            <el-table-column prop="area" label="区" align="center"></el-table-column>
                            <el-table-column label="控制" align="center">
                                <template slot-scope="scope">
                                    <span @click="del(scope.$index)" class="el-icon-delete deleteBtn"> 删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-col>
            </el-row>
            <el-row>
				<el-col :span="14" :offset="5">
                    <el-form-item>
                        <el-button type="primary" @click="add">立即保存</el-button>
                        <el-button @click="back">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
		</el-card>
        <el-dialog title="添加价格监控区域" :visible.sync="addAreaDialog" width="500px">
            <dist-picker :distList="selectedMonitoringArea" @hand-select="handleSelectedMonitoringArea"></dist-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addAreaDialog = false">取 消</el-button>
                <el-button type="primary" @click="addMonitoringArea">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../api/Company'
import ImageUpload from '../../CommonComponents/ImageUpload'
import DistPicker from '../../CommonComponents/DistPicker'
import { checkTel } from '../../../common/validator'
import { areaIdToArrayId ,searchAreaByAreaID} from '../../../common/utils'
export default {
	data() {
		return {
            addAreaDialog:false,
            selectedMonitoringArea:[],
            monitoringAreaList:[],
			selectedArea: [],
			recdeliverycomp: {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
                customerType: [],
                code:'',
                fencingType:'',
                areas:[]
			},
			rules: {
                logoUrl:[ {required: true, message: '请上传客户LOGO'} ],
				companyName: [ {required: true, message: '请输入名称', trigger: 'blur'}, {min: 1, max: 50, message: '长度在 1 到 50 个字符'} ],
				companyAreaID: [ { required: true, message: '请选择区域', trigger: 'change' } ],
				customerType: [ { required: true, message: '请选择类型' } ],
				contactName: [ {min: 1, max: 20, message: '长度在 1 到 20 个字符'} ],
				contactPhone: [ { validator: checkTel } ]
			}
		}
	},
	components: { ImageUpload, DistPicker },
	activated() {
		if(!this.$route.query.cache) {
			this.recdeliverycomp = {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
                customerType: [],
                code:'',
                fencingType:'',
                areas:[]
			}
			this.selectedArea = []
		}
	},
	methods: {
		handleLogoSuccess(res) {
			this.recdeliverycomp.logoUrl = res.length == 0 ? '' : res[0]
		},
		handleSelectedArea(data) {
			if (data) {
                this.recdeliverycomp.companyAreaID = data[data.length - 1]
				this.selectedArea = data
			} else {
				this.recdeliverycomp.companyAreaID = ''
				this.selectedArea = []
			}
        },
        handleSelectedMonitoringArea(data){
            if (data) {
				this.selectedMonitoringArea = data
			} else {
				this.selectedMonitoringArea = []
			}
        },
		add() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                const recdeliverycomp = {
                    customer:{
                        logoUrl:this.recdeliverycomp.logoUrl,
                        companyAreaID:this.recdeliverycomp.companyAreaID,
                        companyName:this.recdeliverycomp.companyName,
                        contactName:this.recdeliverycomp.contactName,
                        contactPhone:this.recdeliverycomp.contactPhone,
                        customerType:this.recdeliverycomp.customerType,
                        code:this.recdeliverycomp.code,
                        fencingType:this.recdeliverycomp.fencingType
                    },
                    areas:this.recdeliverycomp.areas
                }
				recdeliverycomp.customer.customerType = this.recdeliverycomp.customerType.join(',')
				Company.customerAdd(recdeliverycomp).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'recdeliverycomp'})
				})
			})
        },
        addArea(){
            this.addAreaDialog = true
            this.selectedMonitoringArea=[]
        },
        addMonitoringArea(){
            this.addAreaDialog = false
            let list={
                provice:searchAreaByAreaID(this.selectedMonitoringArea[0]),
                city:searchAreaByAreaID(this.selectedMonitoringArea[1]),
                area:searchAreaByAreaID(this.selectedMonitoringArea[2])
            }
            let areaIDList = {
                areaID:this.selectedMonitoringArea[2]
            }
            this.monitoringAreaList.push(list)
            this.recdeliverycomp.areas.push(areaIDList)
        },
        del(scopeIndex){
            this.monitoringAreaList.splice(scopeIndex, 1)
            this.recdeliverycomp.areas.splice(scopeIndex,1)
        },
		back() {
			this.$router.push({name: 'recdeliverycomp'})
		}
	}
}
</script>
<style lang="stylus" scoped>
.addAreaTit
    height 33px
    line-height 33px
    font-size 14px
    color #999
    padding 0 15px
    border 1px solid #ebeef5
    border-bottom none
    border-radius 4px 4px 0 0
    .addArea
        height 32px
        line-height 32px
        color #409EFF
        cursor pointer
.deleteBtn
    color #F56C6C
    height 20px
    line-height 20px
    cursor pointer
    font-size 12px
    display inline-block
</style>