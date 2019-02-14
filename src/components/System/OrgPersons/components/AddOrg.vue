<template>
    <div>
        <el-dialog 
            title="添加组织" 
            :visible.sync="isVisible" 
            :show-close="false" 
            :close-on-click-modal="false" 
            width="60%" 
            :append-to-body="true">
            <el-form label-width="120px" :model="org" :rules="rules" ref="ruleForm">
                <el-form-item label="所属组织">
                    <p>{{parent.name}}</p>
                </el-form-item>
                <el-form-item label="组织名称" prop="name">
                    <el-input v-model="org.name"></el-input>
                </el-form-item>
                <el-form-item label="管理员">
                    <div style="position:relative;padding-right:180px;">
                        <div style="border:1px solid #dcdfe6;border-radius:4px;padding:0 10px;min-height:40px">
                            <el-tag 
                                size="small"
                                closable style="margin-right: 5px" 
                                v-for="(item, i) in selectedMembers" 
                                :key="i" @close="closeTag(item)">
                                {{item.realName}}
                            </el-tag>
                        </div>
                        <div style="width:180px;position:absolute;right:0;top:0;padding-left:20px">
                            <el-button @click="isAddAdminVisible=true">添加</el-button>
                            <el-button @click="isSelectAdminVisible=true">查询</el-button>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="是否工厂" prop="isCom">
                    <el-radio v-model="org.isCom" :label="false">否</el-radio>
                    <el-radio v-model="org.isCom" :label="true">是</el-radio>
                </el-form-item>
                <el-form-item label="工厂编码" prop="code" v-if="org.isCom">
                    <el-input v-model="org.code"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
        <add-admin 
            :isVisible="isAddAdminVisible" 
            @control="handAddAdmin">
        </add-admin>
        <select-admin 
            :isAdd="true"
            :selected="selectedMembers"
            :organizationID="parent.id" 
            :isVisible="isSelectAdminVisible" 
            v-if="isSelectAdminVisible"
            @control="handSelectAdmin">
        </select-admin>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import AddAdmin from './AddAdmin'
import SelectAdmin from './SelectAdmin'
import Organization from '../../../../api/Organization'
export default {
    components: { AddAdmin, SelectAdmin },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        parent: Object
    },
    data() {
        return {
            isAddAdminVisible: false,
            isSelectAdminVisible: false,
            org: {
                code: '',
                name: '',
                parentId: '',
                members: [],
                isCom: false
            },
            selectedMembers: [],
            rules: {
				name: [{ required: true, message: '请输入组织名称' }],
				isCom: [{ required: true, message: '请选择是否是工厂' }],
				code: [{ required: true, message: '请输入工厂编码' }]
            }
        }
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.org = {
                    code: '',
                    name: '',
                    parentId: '',
                    members: [],
                    isCom: false
                }
                this.selectedMembers = []
                this.$nextTick(() => {
                    this.$refs['ruleForm'].resetFields()
                })
            }
        }
    },
    methods: {
        handAddAdmin(data) {
            if (data) {
                this.selectedMembers.push(data)
            }
            this.isAddAdminVisible = false
        },
        handSelectAdmin(data) {
            if (data) {
                this.selectedMembers = data
            }
            this.isSelectAdminVisible = false
        },
        closeTag(data) {
            const memberIDs = this.selectedMembers.map(item => item.memberID)
            this.selectedMembers.splice(memberIDs.indexOf(data.memberID), 1)
        },
        close() {
            this.$emit('control')
        },
        save() {
            this.org.parentId = this.parent.id
            this.org.members = this.selectedMembers
            this.$refs['ruleForm'].validate(valid => {
                if (!valid) return
                if (!this.org.isCom) this.org.code = ''
				Organization.add(this.org).then(res => {
                    Message.success('成功！')
                    this.$emit('control', true)
                })
			})
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
