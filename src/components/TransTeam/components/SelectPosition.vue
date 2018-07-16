<template>
    <div class="main lift">
        <div class="item" v-for="item in titleList" :key="item">{{item}}</div>
    </div>
</template>

<script>
export default {
    props: {
        titleList: Array
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
    overflow auto
    .item
        width 100%
        height 24px
        line-height 24px
        font-size 13px
        color #409eff
        text-align center
        cursor pointer
        &.active
            background-color #eee
</style>
