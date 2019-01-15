<template>
    <div>
        <el-dialog 
            title="重置密码" 
            :visible="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false" 
            :append-to-body="true">
            <el-form label-width="120px" :model="user" :rules="rules" ref="ruleForm">
                <el-form-item label="登录帐号">
                    <p>{{curUser ? curUser.mobile : ''}}</p>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="user.password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="sure">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        curUser: Object
    },
    data() {
        return {
            user: {
                password: ''
            },
            rules: {
				password: [{ required: true, message: '请输入密码' }]
			}
        }
    },
    watch: {
        curUser: {
            handler(val) {
                console.log(val)
            },
            deep: true
        }
    },
    methods: {
        sure() {
            this.close()
        },
        close() {
            this.$emit('control')
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
