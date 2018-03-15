<template>
	<div class="main-content">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
				<span>运输档案详情</span>
			</div>
            <el-tabs v-model="tabSelected" type="card">
                <el-tab-pane label="危货运输登记表" name="first">
                    <div id="dangerObjList">
                        <h2 class="text-center">昆明市危货运输户籍化管理登记表</h2>
                        <table class="common-table" style="width: 800px; margin: 0 auto">
                            <tr>
                                <td rowspan="8" width="50"><p style="width: 20px">车辆基础信息</p></td>
                                <td width="100">车牌号码</td>
                                <td>云AE0969</td>
                                <td>厂牌型号</td>
                                <td width="120">希尔牌ZZT5166XQY</td>
                                <td width="50">核载人数</td>
                                <td>3人</td>
                            </tr>
                            <tr>
                                <td>注册登记日期</td>
                                <td>2013-03-22</td>
                                <td>检验有效期止</td>
                                <td>2016-03-21</td>
                                <td>车身颜色</td>
                                <td>蓝/白</td>
                            </tr>
                            <tr>
                                <td>所有权归属</td>
                                <td colspan="3">
                                    <el-radio-group v-model="ownership" disabled>
                                        <el-radio :label="1">单位</el-radio>
                                        <el-radio :label="2">个人</el-radio>
                                        <el-radio :label="3">挂靠</el-radio>
                                    </el-radio-group>
                                </td>
                                <td>经营性质</td>
                                <td>
                                    <el-radio-group v-model="buisnessNature" disabled>
                                        <el-radio :label="1">营运</el-radio>
                                        <el-radio :label="2">自用</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td>车辆所有人姓名或单位名称</td>
                                <td colspan="3">云南安化中达物流有限责任公司</td>
                                <td>联系电话</td>
                                <td>13888209635</td>
                            </tr>
                            <tr>
                                <td>实际车主姓名</td>
                                <td colspan="3">云南安化中达物流有限责任公司</td>
                                <td>联系电话</td>
                                <td>13888209635</td>
                            </tr>
                            <tr>
                                <td colspan="5">是否喷涂“严禁超员，核载X人”</td>
                                <td>是</td>
                            </tr>
                            <tr>
                                <td>登记地址</td>
                                <td colspan="5">云南省昆明市安宁市太平镇安化生活区办公楼</td>
                            </tr>
                            <tr>
                                <td>现住址</td>
                                <td colspan="5">云南省昆明市安宁市太平镇安化生活区办公楼</td>
                            </tr>
                            <tr>
                                <td rowspan="4"><p style="width: 20px">驾驶人基础信息</p></td>
                                <td>驾驶人姓名</td>
                                <td>罗少成</td>
                                <td>性别</td>
                                <td>男</td>
                                <td>准驾车型</td>
                                <td>A2</td>
                            </tr>
                            <tr>
                                <td>身份证号</td>
                                <td colspan="3">530123196808133019</td>
                                <td>档案编号</td>
                                <td>530100356058</td>
                            </tr>
                            <tr>
                                <td>驾驶证审验有效起止</td>
                                <td colspan="3">2011-07-13至2021-07-13</td>
                                <td>联系电话</td>
                                <td>13708443225</td>
                            </tr>
                            <tr>
                                <td>现住址</td>
                                <td colspan="5">云南省昆明市西山区海口镇东风村八栋一单元204号</td>
                            </tr>
                            <tr>
                                <td><p style="width: 20px">车辆照片</p></td>
                                <td colspan="6">
                                    <ImageUpload :width="300" :height="200"/>
                                </td>
                            </tr>
                            <tr>
                                <td :rowspan="trafficList.length + 1">车辆交通违法及事故情况</td>
                                <td>时间</td>
                                <td>地点</td>
                                <td>驾驶人</td>
                                <td colspan="2">交通违法行为或事故简要描述</td>
                                <td>处理情况</td>
                            </tr>
                            <tr 
                                v-for="(traffic, i) in trafficList" 
                                :key="traffic.time">
                                <td>{{traffic.time}}</td>
                                <td>{{traffic.area + traffic.address}}</td>
                                <td>{{traffic.driver}}</td>
                                <td colspan="2">{{traffic.description}}</td>
                                <td>{{traffic.info}}</td>
                            </tr>
                        </table>
                    </div>
                    <el-row type="flex" justify="center" style="margin: 20px auto">
                        <el-col :span="8" :offset="6">
                            <el-button type="success" @click="add">添加记录</el-button>
                            <el-button type="primary" @click="edit">修改记录</el-button>
                            <el-button @click="back">返回</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="运输单位备案" name="second">运输单位备案</el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog title="添加记录" width="45%" :visible.sync="isShowAddDialog">
            <el-form label-width="120px">
                <el-form-item label="时间">
                    <el-date-picker
                        style="width: 100%" 
                        v-model="selectedDate"
                        type="date"
                        placeholder="选择日期"
                        @change="selectDate">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地区">
                    <el-cascader
                        style="width: 100%"
                        :options="distData" 
                        :props="areaProps"
                        v-model="selectedArea"
                        @change="selectArea">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="traffic.address"></el-input>
                </el-form-item>
                <el-form-item label="驾驶人">
                    <el-input v-model="traffic.driver" disabled></el-input>
                </el-form-item>
                <el-form-item label="违法行为描述">
                    <el-input type="textarea" v-model="traffic.description" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="处理情况">
                    <el-input type="textarea" v-model="traffic.info" resize="none"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowAddDialog = false">取 消</el-button>
                <el-button type="primary" @click="addTraffic">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改记录" width="60%" :visible.sync="isShowEditDialog">
            <el-table :data="trafficList">
                <el-table-column property="time" label="时间" width="120"></el-table-column>
                <el-table-column label="地点">
                    <template slot-scope="scope">
                        <span>{{scope.row.area + scope.row.address}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="driver" label="驾驶人"></el-table-column>
                <el-table-column property="description" label="交通违法行为或事故简要描述"></el-table-column>
                <el-table-column property="info" label="处理情况"></el-table-column>
                <el-table-column label="操作" align="center" width="230">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" @click="update(scope.row)">编辑</el-button>
                        <el-button size="mini" icon="el-icon-delete" @click="del(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
	</div>
</template>
<script type="text/javascript">
    import { Message } from 'element-ui'
    import { regionData } from 'element-china-area-data'
    import ImageUpload from '../CommonComponents/ImageUpload'
    import { getdatefromtimestamp } from '../../common/utils'
	export default {
        data() {
            return {
                distData: regionData,
                tabSelected: 'first',
                ownership: 1,
                buisnessNature: 1,
                isShowAddDialog: false,
                isShowEditDialog: false,
                selectedDate: '',
                selectedArea: [],
                areaProps: {
                    label: 'label',
                    value: 'label'
                },
                traffic: {
                    time: '',
                    area: '',
                    address: '',
                    driver: '王小川',
                    description: '',
                    info: ''
                },
                trafficList: [
                    {
                        time: '2017-08-09',
                        area: '云南省-昆明市',
                        address: '人民大道',
                        driver: '王小川',
                        description: '逆向行驶',
                        info: '罚款500',
                    },
                    {
                        time: '2017-08-10',
                        area: '云南省-昆明市',
                        address: '人民大道',
                        driver: '王小川',
                        description: '逆向行驶',
                        info: '罚款500',
                    }
                ]
            }
        },
		methods: {
            selectDate(data) {
                this.traffic.time = getdatefromtimestamp(new Date(data).getTime(), true)
            },
            selectArea(data) {
                this.traffic.area = data.join('-')
            },
            add() {
                this.traffic = {
                    time: '',
                    area: '',
                    address: '',
                    driver: '王小川',
                    description: '',
                    info: ''
                }
                this.isShowAddDialog = true
            },
            edit() {
                this.isShowEditDialog = true
            },
            update(obj) {
                this.traffic = obj
                this.isShowAddDialog = true
            },
            addTraffic() {
                this.trafficList.push(this.traffic)
                Message.success('保存成功！')
                this.isShowAddDialog = false
            },
            del(i) {
                this.trafficList.splice(i, 1)
            },
            back() {
                this.$router.go(-1)
            }
        },
        components: {
            ImageUpload
        }
	}
</script>
<style lang="stylus" scoped>

</style>