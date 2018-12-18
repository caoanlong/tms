<template>
    <div class="main-content" >
		<el-card class="box-card">
            <el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">驾驶员信息</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="12">
							<div class="flex-item">
								<div class="tit">手机号</div>
								<div class="ctt">{{truck.carOwnerMobile || '13049497395'}}</div>
							</div>
							<div class="flex-item">
								<div class="tit">正面照片</div>
								<div class="ctt">
                                    <ImageUpload :width="80" :height="80" :files="[truck.truckFrontPic]" :isPreview="true"/>
                                </div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="flex-item">
								<div class="tit">姓名</div>
								<div class="ctt">{{truck.name || '罗凯'}}</div>
							</div>
							<div class="flex-item">
								<div class="tit">驾驶证</div>
								<div class="ctt">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="120" :height="80" :files="[truck.truckFrontPic]" :isPreview="true"/>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="120" :height="80" :files="[truck.truckFrontPic]" :isPreview="true"/>
										<p>副本</p>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">车辆信息</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="6">
							<div class="flex-item">
								<div class="tit">车牌号</div>
								<div class="ctt">{{truck.plateNo}}</div>
							</div>
							<div class="flex-item">
								<div class="tit">车牌品牌</div>
								<div class="ctt">雷克萨斯</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="flex-item">
								<div class="tit">车长</div>
								<div class="ctt">{{(truck.length/1000).toFixed(1) + '米'}}</div>
							</div>
							<div class="flex-item">
								<div class="tit">车辆照片</div>
								<div class="ctt">
									<ImageUpload :width="120" :height="80" :files="[truck.truckFrontPic]" :isPreview="true"/>
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="flex-item">
								<div class="tit">车型</div>
								<div class="ctt">罐体</div>
							</div>
							<div class="flex-item">
								<div class="tit">行驶证照片</div>
								<div class="ctt">
									<div class="uploadTruckPicItem">
										<ImageUpload :width="120" :height="80" :files="[truck.truckFrontPic]" :isPreview="true"/>
										<p>正本</p>
									</div>
									<div class="uploadTruckPicItem">
										<ImageUpload :width="120" :height="80" :files="[truck.truckFrontPic]" :isPreview="true"/>
										<p>副本</p>
									</div>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<el-row class="section-block" style="margin-bottom:20px">
				<span class="block-title">其他信息</span>
				<div class="block-content">
					<el-row style="margin-bottom: 10px">
						<el-col :span="8">
							<div class="flex-item">
								<div class="tit">最后上线</div>
								<div class="ctt">{{moment().format('YYYY-MM-DD hh:mm:ss')}}</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="flex-item">
								<div class="tit">GPS安装</div>
								<div class="ctt">{{truck.gpsFlag == 'Y' ? '已安装' : '未安装'}}</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="flex-item">
								<div class="tit">便携设备</div>
								<div class="ctt">255668897KJ23</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
		</el-card>
    </div>
</template>

<script>
import ImageUpload from '../../CommonComponents/ImageUpload'
import Company from '../../../api/Company'
export default {
    components: { ImageUpload },
    data() {
		return {
			truck: {}
		}
	},
    created() {
		this.getInfo()
	},
    methods: {
        getInfo() {
			const truckID = this.$route.query.truckID
			Company.truckFindById({ truckID }).then(res => {
				this.truck = res
			})
        },
        back() {
			this.$router.push({name: 'truck'})
		}
    }
}
</script>

<style lang="stylus" scoped>
.box-card {
	margin-bottom: 10px;
}
.section-block {
	margin: 10px 0 0;
	.block-content {
        font-size: 14px;
        line-height: 2;
		.flex-item {
			position: relative;
			padding-left: 140px;
			.tit {
				position: absolute;
				left: 0;
				top: 0;
				width: 126px;
				text-align: right;
				color: #333;
				font-weight: bold;
			}
			.ctt {
				flex: 1;
				text-align: left;
				color: #666;
				.uploadTruckPicItem {
					float: left;
					margin-right: 10px;
					p {
						margin: 0;
						text-align: center;
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
}
</style>
