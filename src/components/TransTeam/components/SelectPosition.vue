<template>
    <div class="main">
        <div class="item" :class="{'active': selected.key == item.key}" v-for="(item,index) in titleList" :key="index" @click="select(item)">{{item.value}}</div>
    </div>
</template>

<script>
export default {
    props: {
        titleList: Array,
        selected: Object
    },
    methods: {
        select(item) {
            this.$emit('select', item)
        }
    }
}
</script>

<style lang="stylus" scoped>
.main
    position fixed
    left 200px
    top 128px
    width 180px
    height 100%
    background-color #fff
    .item
        width 100%
        height 50px
        line-height 50px
        font-size 14px
        color #409eff
        text-align center
        cursor pointer
        &.active
            background-color #eee
</style>
