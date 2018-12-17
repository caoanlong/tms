<template>
	<div class="main-content">
		<el-card class="box-card">
            <div slot="header" class="clearfix">添加交货单</div>
            <el-form label-width="120px" :model="deliveryInfo" :rules="rules" ref="ruleForm" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="交货单号" prop="companyName">
                            <el-input v-model="deliveryInfo.companyName" :maxlength="100"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工厂名称" class="customerSelect">
                            <el-select placeholder="请选择" v-model="deliveryInfo.status" style="width:100%">
                                <el-option value="Committed" label="未执行">未执行</el-option>
                                <el-option value="Running" label="执行中">执行中</el-option>
                                <el-option value="Signed" label="已完成">已完成</el-option>
                                <el-option value="Closed" label="已关闭">已关闭</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称">
                            <el-autocomplete 
                                style="width:100%" 
                                value-key="companyName" 
                                
                                placeholder="请输入...">
                                <i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品名称">
                            <el-autocomplete 
                                style="width:100%" 
                                value-key="companyName" 
                                
                                placeholder="请输入...">
                                <i class="el-icon-close el-input__icon" slot="suffix"  @click="clearSelect"></i>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品数量" class="customerSelect">
                            <el-input placeholder="0"><template slot="append">袋</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="产品重量" class="customerSelect">
                            <el-input placeholder="0"><template slot="append">吨</template></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="监控级别" class="customerSelect">
                            <el-select placeholder="请选择"  style="width:100%">
                                <el-option value="" label="全部"></el-option>
                                <el-option value="A" label="A"></el-option>
                                <el-option value="B" label="B"></el-option>
                                <el-option value="C" label="C"></el-option>
                                <el-option value="D" label="D"></el-option>
                                <el-option value="E" label="E"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车牌号">
                            <el-input placeholder="车牌号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出厂时间">
                            <el-date-picker 
                                type="date" 
                                :clearable="false" 
                                value-format="timestamp"  style="width:100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary" @click="add">立即保存</el-button>
                            <el-button @click="back">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
export default {

	data() {
		return {
            deliveryInfo:{},
			rules: {
				companyName: [ 
                    {required: true, message: '请输入名称', trigger: 'blur'}, 
                    {min: 1, max: 50, message: '长度在 1 到 50 个字符'} 
                ],
				companyAreaID: [ { required: true, message: '请选择区域', trigger: 'change' } ],
				customerType: [ { required: true, message: '请选择类型' } ],
                code: [ { required: true, message: '请输入客户编号' } ],
                fencingType: [ { required: true, message: '请选择监控类型' } ]
            }
		}
	},
	activated() {
		if(!this.$route.query.cache) {
			this.deliveryInfo = {
				logoUrl: '',
				companyAreaID: '',
				companyName: '',
				contactName: '',
				contactPhone: '',
                customerType: [],
                code:'',
                fencingType:''
			}
           
        }
        if(this.$refs['ruleForm']) {
            this.$refs['ruleForm'].resetFields()
        }
    },
	methods: {
		clearSelect(){},
        add() {
			this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                const deliveryInfo = {
                    customer: {
                        logoUrl: this.deliveryInfo.logoUrl,
                        companyAreaID: this.deliveryInfo.companyAreaID,
                        companyName: this.deliveryInfo.companyName,
                        contactName: this.deliveryInfo.contactName,
                        contactPhone: this.deliveryInfo.contactPhone,
                        customerType: this.deliveryInfo.customerType.join(','),
                        code: this.deliveryInfo.code,
                        fencingType: this.deliveryInfo.fencingType
                    },
                    areas: this.monitoringAreaList,
                    addressList: this.addressList
                }
				Company.customerAdd(deliveryInfo).then(res => {
					Message.success('保存成功！')
					this.$router.push({name: 'delivery'})
				})
			})
        },
		back() {
			this.$router.push({name: 'delivery'})
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>