<template>
    <div class="dist-picker">
        <div 
			class="dist-input" 
			:class="valid" 
			:style="{'height': height + 'px', 'line-height': height + 'px'}" 
			@click.stop="clickPicker">
            <span class="dist-placeholder" v-if="selectList.length == 0">请选择</span>
            <span v-else>{{selectList.map(item => item.value).join(' / ')}}</span>
            <span class="arrow" :class="status ? 'active' : ''"></span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import detail from './distSelect'
import { searchAreaObjByKey } from '../../../common/utils'
const distSelect = Vue.extend(detail)
var instance = null
export default {
	props: {
		height: {
			type: Number,
			default: 32
		},
		distList: Array,
	},
    data() {
        return {
			list: [],
			selectList: [],
			valid: ''
        }
	},
	watch: {
		distList: {
			handler(newVal) {
				this.selectList = searchAreaObjByKey(newVal)
			},
			deep: true
		}
	},
	computed: {
		status: () => instance ? instance.visible : false
	},
	created() {
        document.addEventListener('click', (e) => {
            this.close()
		})
    },
    methods: {
        clickPicker(e) {
			this.open(e)
		},
		open(e) {
			if (!instance) {
				instance = new distSelect({ el: document.createElement('div') })
				document.body.appendChild(instance.$el)
			}
			const pos = e.target.getBoundingClientRect()
			instance.$el.style.left = pos.left + 'px'
			instance.$el.style.top = pos.top + 40 + 'px'
			instance.handSelect = this.handSelect
			instance.selectList = this.selectList
			instance.visible = true
		},
		close() {
			if (instance) instance.visible = false
		},
		handSelect(data) {
			this.$emit('hand-select', data)
		},
		/**
		 * @param status(err, pass)
		 */
		validate(status) {
			this.valid = status
		}
    }
}
</script>

<style lang="stylus" scoped>
.dist-picker
	position relative
	font-size 14px
	.dist-input
		position relative
		padding-left 10px
		color #666
		border 1px solid #dcdfe6
		border-radius 4px
		&.pass
			border 1px solid #67c23a
		&.err
			border 1px solid #f56c6c
		.arrow
			position absolute
			top 11px
			right 10px
			display block
			width 8px
			height 8px
			border-top 1px solid #bbb
			border-left 1px solid #bbb
			transform rotate(225deg)
			&.active
				transform rotate(45deg)
		.dist-placeholder
			color #bbb
</style>
