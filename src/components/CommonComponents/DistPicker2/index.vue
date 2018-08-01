<template>
    <div class="dist-picker">
        <div class="dist-input" @click.stop="clickPicker">
            <span class="dist-placeholder">请选择</span>
            <span></span>
            <span class="arrow" :class="status ? 'active' : ''"></span>
        </div>
        <div class="dist-select" @click.stop="() => false" v-if="status">
			<div class="up">
				<div class="level">
					<div class="level-item" :class="level == 1 ? 'active' : ''" @click="changeLevel(1)">省</div>
					<div class="level-item" :class="level == 2 ? 'active' : ''" @click="changeLevel(2)">市</div>
					<div class="level-item" :class="level == 3 ? 'active' : ''" @click="changeLevel(3)">区</div>
				</div>
			</div>
			<div class="down">
				<el-button class="clear" size="mini">清空</el-button>
			</div>
		</div>
    </div>
</template>
<script>
import ChineseDistricts from '../../../assets/data/distpicker.data'
export default {
    data() {
        return {
			status: false,
			level: 1,
        }
    },
    created() {
        document.body.addEventListener('click', () => {
            this.status = false
        })
    },
    methods: {
        clickPicker() {
            this.status = !this.status
		},
		changeLevel(x) {
			this.level = x
		}
    }
}
</script>

<style lang="stylus" scoped>
$blue = #409eff
.dist-picker
	position relative
	top 5px
	.dist-input
		position relative
		width 250px
		height 32px
		line-height 32px
		padding-left 10px
		color #666
		border 1px solid #dcdfe6
		border-radius 4px
		.arrow
			position absolute
			top 11px
			right 10px
			display block
			width 8px
			height 8px
			border-top 2px solid #bbb
			border-left 2px solid #bbb
			transform rotate(225deg)
			&.active
				transform rotate(45deg)
		.dist-placeholder
			color #bbb
	.dist-select
		position absolute
		z-index 999
		width 400px
		background-color #fff
		box-shadow 0 4px 16px 0 rgba(0,0,0,.2)
		.up
			padding 0 20px
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
