<template>
    <el-dialog title="添加记录" width="45%" :visible.sync="isVisible">
        <el-form label-width="120px" :model="traffic" :rules="rules" ref="ruleForm" size="mini">
            <el-form-item label="时间" prop="occurredTime">
                <el-date-picker 
                    style="width: 100%" 
                    v-model="traffic.occurredTime" 
                    value-format="timestamp" 
                    type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地区" prop="areaID">
                <DistPicker @selectChange="handleSelectedArea"/>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
                <el-input v-model="traffic.detailAddress"></el-input>
            </el-form-item>
            <el-form-item label="驾驶人">
                <el-input v-model="driver" disabled></el-input>
            </el-form-item>
            <el-form-item label="违法行为描述" prop="endorseDesc">
                <el-input type="textarea" v-model="traffic.endorseDesc" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="处理情况" prop="handleResult">
                <el-input type="textarea" v-model="traffic.handleResult" resize="none"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="addTraffic">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import DistPicker from '../../CommonComponents/DistPicker'
import Truck from '../../../api/Truck'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        driver: String
    },
    data() {
        return {
            traffic: {
				occurredTime: '',
				areaID: '',
				detailAddress: '',
				endorseDesc: '',
				handleResult: ''
			},
			rules: {
				occurredTime: [
					{required: true, message: '请选择时间', trigger: 'blur'}
				],
				areaID: [
					{ required: true, message: '请选择地区', trigger: 'change' }
				],
				detailAddress: [
					{required: true, message: '请输入详细地址', trigger: 'blur'}
				],
				endorseDesc: [
					{required: true, message: '请输入违法行为描述', trigger: 'blur'}
				],
				handleResult: [
					{required: true, message: '请输入处理情况', trigger: 'blur'}
				]
			}
        }
    },
    components: {
        DistPicker
    },
    methods: {
        handleSelectedArea(data) {
			this.traffic.areaID = data
        },
        cancel() {
            this.$emit('addCallback', false)
        },
        // 添加记录
		addTraffic() {
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
                    let transportRecordID = this.$route.query.transportRecordID
					Truck.addEndorsement({
						transportRecordID,
						occurredTime:this.traffic.occurredTime,
						areaID:this.traffic.areaID,
						detailAddress:this.traffic.detailAddress,
						endorseDesc:this.traffic.endorseDesc,
						handleResult:this.traffic.handleResult
					}).then(res => {
                        Message.success('保存成功！')
                        this.$emit('addCallback', true)
					})
				} else {
					return
				}
			})
		},
    }
}
</script>

<style lang="stylus" scoped>

</style>
