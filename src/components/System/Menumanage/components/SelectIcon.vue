<template>
    <el-dialog title="选择图标" :visible.sync="selectIcondialog" width="30%">
        <ul class="iconList clearfix">
            <li v-for="icon in svgicons" :key="icon" :class="{'selected': selectedIcon == icon}" @click="selectIcon(icon)">
                <svg-icon :iconClass="icon"></svg-icon>
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect">取 消</el-button>
            <el-button type="primary" @click="submitSelect">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { requireAllName, req } from '../../../../assets/icons'
export default {
    props: {
        selectIcondialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedIcon: '',
        }
    },
    computed: {
		svgicons: () => requireAllName(req)
    },
    methods: {
        selectIcon(icon) {
			this.selectedIcon= icon
		},
		submitSelect() {
            this.$emit('select-icon', this.selectedIcon)
        },
        cancelSelect() {
            this.$emit('select-icon')
        }
    }
}
</script>

<style lang="stylus" scoped>
.iconList
    padding 0
    &:after
        clearfix
    li
        list-style-type none
        float left
        font-size 18px
        width 44px
        height 44px
        padding 10px
        text-align center
        cursor pointer
        &:hover
        &.selected
            color #409EFF
</style>
