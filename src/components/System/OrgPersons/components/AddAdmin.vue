<template>
    <el-dialog 
        title="添加管理员" 
        :visible.sync="isVisible" 
        :show-close="false" 
        :close-on-click-modal="false" 
        width="60%" 
        :append-to-body="true">
        <el-form label-width="120px" :model="admin" :rules="rules" ref="ruleForm">
            <el-form-item label="头像" prop="headPic">
                <ImageUpload :files="[admin.headPic]" @imgUrlBack="handleHeadPicSuccess" :fixed="true"/>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="admin.mobile"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="realName">
                <el-input v-model="admin.realName"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input type="password" v-model="admin.password"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="jobPosition">
                <el-input v-model="admin.jobPosition"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber">
                <el-input v-model="admin.jobNumber"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import ImageUpload from '../../../CommonComponents/ImageUpload'
import { checkMobile } from '../../../../common/validator'
export default {
    components: { ImageUpload },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            admin: {
				headPic: '',
				realName: '',
				mobile: '',
				password: '',
				jobPosition: '',
				jobNumber: ''
			},
			rules: {
				mobile: [
					{ required: true, message: '请输入手机号' },
					{ required: true, validator: checkMobile }
				],
				realName: [
					{ required: true, message: '请输入姓名' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符' }
				],
				password: [
					{ required: true, message: '请输入密码' },
					{ min: 8, max: 16, message: '密码必须是8-16位字母、下划线、数字' }
				]
			}
        }
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.admin = {
                    headPic: '',
                    realName: '',
                    mobile: '',
                    password: '',
                    jobPosition: '',
                    jobNumber: ''
                }
                this.$nextTick(() => {
                    this.$refs['ruleForm'].resetFields()
                })
            }
        }
    },
    methods: {
        save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				this.$emit('control', this.admin)
			})
		},
		handleHeadPicSuccess(res) {
			this.admin.headPic = res[0]
        },
        close() {
            this.$emit('control')
        }
    }
}
</script>
