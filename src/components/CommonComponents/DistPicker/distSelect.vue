<template>
    <div ref="distSelect" class="dist-select" @click.stop="() => false" v-show="visible">
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
</template>
<script>
import ChineseDistricts from '../../../assets/data/distpicker.data'
import { distLetters, distLetterTypes } from '../../../assets/data/distLetters'
function transJsonToList(key) {
	const distJson = ChineseDistricts[key]
	return Object.keys(distJson).map(item => {
		return { 'key': item, 'value': distJson[item] }
	})
}
export default {
    data() {
        return {
            visible: false,
            openFlag: false,
			level: 1,
			list: [],
            selectList: [],
            handSelect: null
        }
	},
    watch: {
        openFlag(val) {
            // 显示
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
        },
		visible(bool) {
            // 关闭
            if (!bool) {
                this.level = 1
				if (this.selectList.length > 0) {
                    this.handSelect(this.selectList.map(item => item.key))
				} else {
                    this.handSelect(false)
				}
            }
		}
	},
    computed: {
		distLetters: () => distLetters,
		distLetterTypes: () => distLetterTypes
    },
    methods: {
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
				this.visible = false
			}
		},
		clear() {
			this.level = 1
			this.selectList = []
			this.list = []
			this.visible = false
		}
    }
}
</script>
<style lang="stylus" scoped>
$blue = #409eff
$width = 400px
.dist-select
    position absolute
    z-index 9999
    width $width
    background-color #fff
    box-shadow 0 4px 16px 0 rgba(0,0,0,.2)
    .up
        font-size 14px
        line-height 32px
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

