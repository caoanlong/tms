<template>
    <div class="dist-picker">
        <div class="dist-input" :class="valid" :style="{'height': height + 'px', 'line-height': height + 'px'}" @click.stop="clickPicker">
            <span class="dist-placeholder" v-if="selectList.length == 0">请选择</span>
            <span v-else>{{selectList.map(item => item.value).join(' / ')}}</span>
            <span class="arrow" :class="status ? 'active' : ''"></span>
        </div>
        <div class="dist-select" @click.stop="() => false" v-if="status">
			<div class="up">
				<div class="level">
					<div class="level-item" :class="level == 1 ? 'active' : ''" @click="changeLevel(1)">省</div>
					<div class="level-item" :class="level == 2 ? 'active' : ''" @click="changeLevel(2)" v-if="selectList[0]">市</div>
					<div class="level-item" :class="level == 3 ? 'active' : ''" @click="changeLevel(3)" v-if="selectList[1]">区</div>
				</div>
				<div class="list" v-if="level == 1">
					<div class="items" v-for="type in distLetterTypes" :key="type">
						<div class="item-left">{{type}}</div>
						<div 
							class="item" 
							v-if="distLetters[item.key] == type"
							:class="selectList.map(item => item.key).includes(item.key) ? 'active' : ''"
							v-for="item in list" 
							:key="item.key" 
							@click="selectDist(item)">
							{{item.value}}
						</div>
					</div>
				</div>
				<div class="list" v-else>
					<div 
						class="item" 
						:class="selectList.map(item => item.key).includes(item.key) ? 'active' : ''"
						v-for="item in list" 
						:key="item.key" 
						@click="selectDist(item)">
						{{item.value}}
					</div>
				</div>
			</div>
			<div class="down">
				<el-button class="clear" size="mini" @click="clear">清空</el-button>
			</div>
		</div>
    </div>
</template>
<script>
import ChineseDistricts from '../../../assets/data/distpicker.data'
import { distLetters, distLetterTypes } from '../../../assets/data/distLetters'
import { searchAreaObjByKey } from '../../../common/utils'
function transJsonToList(key) {
	const distJson = ChineseDistricts[key]
	return Object.keys(distJson).map(item => {
		return { 'key': item, 'value': distJson[item] }
	})
}
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
			status: false,
			level: 1,
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
		},
		status(bool) {
			if (bool) {
				if (this.selectList.length == 0) {
					this.list = transJsonToList(100000)
				} else if (this.selectList.length == 1) {
					this.level = 1
					this.list = transJsonToList(100000)
				} else if (this.selectList.length == 2) {
					this.level = 2
					this.list = transJsonToList(this.selectList[0].key)
				} else if (this.selectList.length == 3) {
					this.level = 3
					this.list = transJsonToList(this.selectList[1].key)
				}
			} else {
				if (this.selectList.length > 0) {
					this.$emit('hand-select', this.selectList.map(item => item.key))
				} else {
					this.$emit('hand-select', false)
				}
			}
		}
	},
	computed: {
		distLetters: () => distLetters,
		distLetterTypes: () => distLetterTypes
	},
    created() {
        document.body.addEventListener('click', () => {
            this.status = false
		})
    },
    methods: {
        clickPicker() {
			if (this.status) {
				this.status = false
			} else {
				this.status = true
			}
		},
		changeLevel(x) {
			this.level = x
			if (this.level == 1) {
				this.list = transJsonToList(100000)
			} else if (this.level == 2) {
				this.list = transJsonToList(this.selectList[0].key)
			} else if (this.level == 3) {
				this.list = transJsonToList(this.selectList[1].key)
			}
		},
		selectDist(item) {
			if (this.level == 1) {
				this.level = 2
				this.selectList = [item]
				this.list = transJsonToList(item.key)
			} else if (this.level == 2) {
				this.level = 3
				this.selectList[1] = item
				this.selectList.splice(2, 1)
				this.list = transJsonToList(item.key)
			} else if (this.level == 3) {
				this.selectList[2] = item
				this.status = false
			}
		},
		clear() {
			this.level = 1
			this.selectList = []
			this.list = []
			this.status = false
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
$blue = #409eff
$width = 400px
.dist-picker
	position relative
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
	.dist-select
		position absolute
		z-index 999
		width $width
		background-color #fff
		box-shadow 0 4px 16px 0 rgba(0,0,0,.2)
		.up
			padding 0 20px 0 30px
			.level
				color #666
				height 40px
				.level-item
					float left
					width 50px
					height 40px
					line-height 40px
					text-align center
					cursor pointer
					&.active
						color $blue
						border-bottom 2px solid $blue
			.list
				padding 10px 0
				.items
					position relative
					padding-left 40px
					.item-left
						position absolute
						left 0
						top 0
						width 30px
						font-size 12px
						color $blue
				.item
					display inline-block
					padding 0 10px
					cursor pointer
					&:hover
						background-color rgb(153,213,251)
					&.active
						border 1px solid #0097f5
						background-color rgba(0,151,245,.1)
		.down
			position relative
			width 100%
			height 50px
			border-top 1px solid #ddd
			.clear
				position absolute
				right 10px
				top 10px
</style>
