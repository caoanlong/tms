<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加运费模板</span>
			</div>
            <el-row>
                <div class="split-item">
                    <span class="num">1</span>
                    <span class="tit">配置运算项</span>
                </div>
            </el-row>
			<el-row>
                <el-col :span="24">
					<el-form label-width="120px" style="display: flex">
						<el-form-item label="托运人" style="flex: 1">
							<el-autocomplete
                                style="width: 100%"
                                v-model="templateFreight.consigner"
                                :fetch-suggestions="getConsigner"
                                placeholder="请输入..."
                            ></el-autocomplete>
						</el-form-item>
                        <el-form-item style="flex: 1"></el-form-item>
                        <el-form-item style="flex: 1"></el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
                    <p style="text-align: center; color: #bfcbd9;">------ 从哪 ------</p>
					<el-form label-width="120px" style="display: flex">
                        <el-form-item label="发货单位" style="flex: 1">
                            <el-input placeholder="请输入..." v-model="templateFreight.consigneCompany"></el-input>
                        </el-form-item>
						<el-form-item label="发货地" style="flex: 1">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="selectedConsigneAreas"
								@change="handleDistChange1">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.consigneAddress"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
                <el-col :span="24">
                    <p style="text-align: center; color: #bfcbd9;">------ 到哪 ------</p>
					<el-form label-width="120px" style="display: flex">
                        <el-form-item label="收货单位" style="flex: 1">
                            <el-input placeholder="请输入..." v-model="templateFreight.receiveCompany"></el-input>
                        </el-form-item>
						<el-form-item label="收货地" style="flex: 1">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="selectedReceiveAreas" 
								@change="handleDistChange2">
							</el-cascader>
						</el-form-item>
						<el-form-item label="详细地址" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.receiveAddress"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
                <el-col :span="24">
                    <p style="text-align: center; color: #bfcbd9;">------ 对内 ------</p>
					<el-form label-width="120px" style="display: flex">
                        <el-form-item label="对内运距" style="flex: 1">
                            <el-input placeholder="请输入..." v-model="templateFreight.innerDistance"></el-input>
                        </el-form-item>
						<el-form-item label="对内TKM" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.innerTKM"></el-input>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对内运费" style="flex: 1">
							<el-input v-model="templateFreight.innerFreight"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
                <el-col :span="24">
                    <p style="text-align: center; color: #bfcbd9;">------ 对外 ------</p>
					<el-form label-width="120px" style="display: flex">
                        <el-form-item label="对外运距" style="flex: 1">
                            <el-input placeholder="请输入..." v-model="templateFreight.externalDistance"></el-input>
                        </el-form-item>
						<el-form-item placeholder="请输入..." label="对外TKM" style="flex: 1">
							<el-input v-model="templateFreight.externalTKM"></el-input>
						</el-form-item>
						<el-form-item placeholder="请输入..." label="对外运费" style="flex: 1">
							<el-input v-model="templateFreight.externalFreight"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
            <el-row>
                <div class="split-item">
                    <span class="num">2</span>
                    <span class="tit">配置收费方式</span>
                </div>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <p style="text-align: center; color: #bfcbd9;">------ 对内付款方式占比 ------</p>
					<el-form label-width="120px" style="display: flex">
                        <el-form-item label="现付" style="flex: 1">
                            <el-input placeholder="请输入..." v-model="templateFreight.payNow1"></el-input>
                        </el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.payArrived1"></el-input>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.payReturn1"></el-input>
						</el-form-item>
                        <el-form-item label="月结" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.settleMonth1"></el-input>
						</el-form-item>
                        <el-form-item label="收方到货付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.payArrivedRec1"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
                <el-col :span="24">
                    <p style="text-align: center; color: #bfcbd9;">------ 对外收款方式占比 ------</p>
					<el-form label-width="120px" style="display: flex">
                        <el-form-item label="现付" style="flex: 1">
                            <el-input placeholder="请输入..." v-model="templateFreight.payNow2"></el-input>
                        </el-form-item>
						<el-form-item label="到付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.payArrived2"></el-input>
						</el-form-item>
						<el-form-item label="回单付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.payReturn2"></el-input>
						</el-form-item>
                        <el-form-item label="月结" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.settleMonth2"></el-input>
						</el-form-item>
                        <el-form-item label="收方到货付" style="flex: 1">
							<el-input placeholder="请输入..." v-model="templateFreight.payArrivedRec2"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                    <el-form label-width="120px">
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
                </el-col>
            </el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			distData: regionData,
			selectedConsigneAreas: [],
			selectedReceiveAreas: [],
			templateFreight: {
                consigner: '',
				consigneCompany: '',
				consigneArea: '',
				consigneAddress: '',
				receiveCompany: '',
				receiveArea: '',
				receiveAddress: '',
				innerDistance: '',
				innerTKM: '',
				innerFreight: '',
				externalDistance: '',
				externalTKM: '1',
				externalFreight: '',
				payNow1: '',
				payArrived1: '',
				payReturn1: '',
				settleMonth1: '',
				payArrivedRec1: '',
				payNow2: '',
				payArrived2: '',
				payReturn2: '',
				settleMonth2: '',
				payArrivedRec2: ''
			},
            consignerResource: [
                { "value": "武藤兰"},
                { "value": "泷泽萝拉"},
                { "value": "佐伯奈"},
                { "value": "苍井空"},
                { "value": "波多野结衣"}
            ]
		}
	},
	created() {
	},
	methods: {
        getConsigner(queryString, cb) {
            let results = queryString ? this.consignerResource.filter(this.createStateFilter(queryString)) : this.consignerResource
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                cb(results)
            }, 1000 * Math.random())
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        add() {
            Message.success('保存成功！')
            this.$router.push({name: 'settleconfig'})
		},
		handleDistChange1(val) {
			console.log('active item:', val)
			this.templateFreight.consigneArea = val.join(',')
		},
		handleDistChange2(val) {
			console.log('active item:', val)
			this.templateFreight.receiveArea = val.join(',')
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
</style>