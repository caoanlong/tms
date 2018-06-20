<template>
    <el-dialog title="上传照片" :visible.sync="isVisible" :show-close="false" custom-class="table" width="70%" :close-on-click-modal="false">
        <div class="area">
            <div class="area-item">装车地：{{shipperArea}}</div>
            <div class="area-item">送货地：{{consigneeArea}}</div>
        </div>
        <div class="pic">
            <div class="photo">
                <div class="left">装车照片：</div>
                <div class="right">
                    <ImageUpload 
                        :objs="loadImgObjs" 
                        :files="loadImgs" 
                        :limitNum="10" 
                        @imgUrlBack="imgLoadUrlBack" 
                        :isUseCropper="false" 
                        :isPreview="isPreview">
                    </ImageUpload>
                </div>
            </div>
            <div class="photo">
                <div class="left">到货照片：</div>
                <div class="right">
                    <ImageUpload 
                        :objs="arriveImgObjs" 
                        :files="arriveImgs" 
                        :limitNum="10" 
                        @imgUrlBack="imgArriveUrlBack" 
                        :isUseCropper="false" 
                        :isPreview="isPreview">
                    </ImageUpload>
                </div>
            </div>
            <div class="photo">
                <div class="left">回单照片：</div>
                <div class="right">
                    <ImageUpload 
                        :objs="backImgObjs" 
                        :files="backImgs" 
                        :limitNum="10" 
                        @imgUrlBack="imgBackUrlBack" 
                        :isUseCropper="false" 
                        :isPreview="isPreview">
                    </ImageUpload>
                </div>
            </div>
            <div class="photo">
                <div class="left">异常照片：</div>
                <div class="right">
                    <ImageUpload 
                        :objs="exceptImgObjs" 
                        :files="exceptImgs" 
                        :limitNum="10" 
                        @imgUrlBack="imgExceptUrlBack" 
                        :isUseCropper="false" 
                        :isPreview="isPreview">
                    </ImageUpload>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="isPreview">
            <el-button @click="control(false)">返回</el-button>
        </span>
        <span slot="footer" class="dialog-footer" v-else>
            <el-button @click="control(false)">取消</el-button>
            <el-button type="primary" @click="control(true)">确认</el-button>
        </span>
    </el-dialog>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import TaskPic from '../../../api/TaskPic'
import ImageUpload from '../../CommonComponents/ImageUpload2'
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        isPreview: {
            type: Boolean,
            default: false
        },
        dispatchTaskID: String,
        shipperArea: String,
        consigneeArea: String,
    },
    data() {
        return {
            loadImgs: [],
            arriveImgs: [],
            backImgs: [],
            exceptImgs: [],
            loadImgObjs: [],
            arriveImgObjs: [],
            backImgObjs: [],
            exceptImgObjs: [],
            Loaded: [],
            Arrived: [],
            Received: [],
            Unusual: []
        }
    },
    watch: {
        isVisible(newVal) {
            let dispatchTaskID = this.dispatchTaskID
            newVal && this.getImgs(dispatchTaskID)
        }
    },
    components: {
        ImageUpload
    },
    methods: {
        control(bool) {
            if (bool) {
                TaskPic.add({
                    'Loaded': this.Loaded,
                    'Arrived': this.Arrived,
                    'Received': this.Received,
                    'Unusual': this.Unusual
                }).then(res => {
                    Message.success(res.data.msg)
                    this.$emit('control', bool)
                })
            } else {
                this.$emit('control', bool)
            }
        },
        imgLoadUrlBack(files) {
            this.loadImgs = files
			this.Loaded = files.map(item => {
                return {
                    'dispatchTaskID': this.dispatchTaskID,
                    'maxURL': item
                }
            })
        },
        imgArriveUrlBack(files) {
            this.arriveImgs = files
			this.Arrived = files.map(item => {
                return {
                    'dispatchTaskID': this.dispatchTaskID,
                    'maxURL': item
                }
            })
        },
        imgBackUrlBack(files) {
            this.backImgs = files
			this.Received = files.map(item => {
                return {
                    'dispatchTaskID': this.dispatchTaskID,
                    'maxURL': item
                }
            })
        },
        imgExceptUrlBack(files) {
            this.exceptImgs = files
			this.Unusual = files.map(item => {
                return {
                    'dispatchTaskID': this.dispatchTaskID,
                    'maxURL': item
                }
            })
        },
        getImgs(dispatchTaskID) {
            TaskPic.find({ dispatchTaskID }).then(res => {
                this.loadImgObjs = res.Loaded
                this.arriveImgObjs = res.Arrived
                this.backImgObjs = res.Received
                this.exceptImgObjs = res.Unusual
                this.loadImgs = res.Loaded.map(item => item.maxURL)
                this.arriveImgs = res.Arrived.map(item => item.maxURL)
                this.backImgs = res.Received.map(item => item.maxURL)
                this.exceptImgs = res.Unusual.map(item => item.maxURL)
                this.Loaded = res.Loaded.map(item => {
                    return {
                        'dispatchTaskID': this.dispatchTaskID,
                        'maxURL': item.maxURL
                    }
                })
                this.Arrived = res.Arrived.map(item => {
                    return {
                        'dispatchTaskID': this.dispatchTaskID,
                        'maxURL': item.maxURL
                    }
                })
                this.Received = res.Received.map(item => {
                    return {
                        'dispatchTaskID': this.dispatchTaskID,
                        'maxURL': item.maxURL
                    }
                })
                this.Unusual = res.Unusual.map(item => {
                    return {
                        'dispatchTaskID': this.dispatchTaskID,
                        'maxURL': item.maxURL
                    }
                })
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.area
    padding-bottom 10px
.pic
    .photo
        position relative
        padding-left 90px
        min-height 30px
        .left
            position absolute
            left 0
            top 0
            width 90px
</style>
