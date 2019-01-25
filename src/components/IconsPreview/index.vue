<template>
    <div class="wrapper">
        <div class="icon" v-for="icon in icons" :key="icon">
            <svg-icon :icon-class="icon"></svg-icon>
        </div>
    </div>
</template>

<script>
import { requireAllName, req } from '../../assets/icons';
export default {
    data() {
        return {
            icons: []
        }
    },
    created() {
        const gohome = this.$route.query.gohome
        if (gohome) this.$router.push({name: 'home'})
        this.icons = requireAllName(req)
    }
}
</script>

<style lang="stylus" scoped>
.wrapper
    width 100%
    .icon
        color #666
        float left
        padding 20px
</style>
