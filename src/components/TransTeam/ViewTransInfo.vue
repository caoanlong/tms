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
                                    <!-- <ImageUpload :width="300" :height="200"/> -->
                                    <img width="300" height="200" src="http://f11.baidu.com/it/u=2588434687,3162842634&fm=72"/>
                                    <img width="300" height="200" src="http://img0.imgtn.bdimg.com/it/u=211127819,408382177&fm=200&gp=0.jpg"/>
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
                                v-for="traffic in trafficList" 
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
                <el-tab-pane label="运输单位备案" name="second">
                    <div id="transUnitList" style="min-width: 1360px">
                        <el-row>
                            <el-col>
                                <h3 class="text-center">危险物品运输单位备案（危险物品运输车辆基本信息表）</h3>
                                <table class="common-table" style="font-size: 12px; width: 640px; margin: 0 auto">
                                    <tr>
                                        <td colspan="5">
                                            <el-row style="font-weight: bold">
                                                <el-col :span="10">车辆所有人：云南安化中达物流有限责任公司</el-col>
                                                <el-col :span="7">公司经营证号：530181000690</el-col>
                                                <el-col :span="6">建档日期：2016年5月25日</el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="80">车牌号码</td>
                                        <td>云AF8532</td>
                                        <td width="80">核载质量</td>
                                        <td width="100">9900kg</td>
                                        <td rowspan="6" colspan="2">
                                            <img width="240" height="180" src="http://f11.baidu.com/it/u=2588434687,3162842634&fm=72"/>
                                            <!-- <ImageUpload :width="200" :height="160"/> -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>品牌型号</td>
                                        <td>程力威牌CLW516XQYD4</td>
                                        <td>总质量</td>
                                        <td>16000kg</td>
                                    </tr>
                                    <tr>
                                        <td>车架号</td>
                                        <td>LGAX2A131F1014903</td>
                                        <td>发动机号</td>
                                        <td>78206803</td>
                                    </tr>
                                    <tr>
                                        <td>注册日期</td>
                                        <td>2015年7月30日</td>
                                        <td>车辆类型</td>
                                        <td>重型厢式货车</td>
                                    </tr>
                                    <tr>
                                        <td>使用性质</td>
                                        <td>危化品运输</td>
                                        <td>经营类别</td>
                                        <td>危货运输（1类1项）</td>
                                    </tr>
                                    <tr>
                                        <td>道路运输证号</td>
                                        <td>安宁字530181014786</td>
                                        <td>有效期限</td>
                                        <td>2016年7月</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <el-row>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/QQ截图20180316100511.png"/>
                                                </el-col>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/QQ截图20180316100522.png"/>
                                                </el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <el-row>
                                                <el-col>
                                                    <img src="../../assets/imgs/QQ截图20180316100532.png"/>
                                                </el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                </table>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 20px">
                            <el-col>
                                <h3 class="text-center">危险物品运输单位备案（危险物品运输驾驶员基本信息表）</h3>
                                <table class="common-table" style="font-size: 12px; width: 640px; margin: 0 auto">
                                    <tr>
                                        <td colspan="7">
                                            <el-row style="font-weight: bold">
                                                <el-col :span="10">单位：云南安化中达物流有限责任公司</el-col>
                                                <el-col :span="7">公司经营证号：530181000690</el-col>
                                                <el-col :span="6">建档日期：2016年5月25日</el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100">姓名</td>
                                        <td>张军</td>
                                        <td width="80">性别</td>
                                        <td>男</td>
                                        <td>联系电话</td>
                                        <td>13888129549</td>
                                        <td>照片</td>
                                    </tr>
                                    <tr>
                                        <td>身份证号</td>
                                        <td colspan="3">530113197108260019</td>
                                        <td>准驾车型</td>
                                        <td>A1A2E</td>
                                        <td rowspan="5">
                                            <img width="120" height="150" src="../../assets/imgs/00.png"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>从业资格证号</td>
                                        <td colspan="3">530113197108260019</td>
                                        <td>资格证编号</td>
                                        <td>NO.5300313469</td>
                                    </tr>
                                    <tr>
                                        <td>从业资格类别</td>
                                        <td colspan="5">道路危险物品运输驾驶员；道路危险物品运输押运人员；经营性道路货物运输驾驶员</td>
                                    </tr>
                                    <tr>
                                        <td>从业资格证有效期至</td>
                                        <td colspan="5">2021-06-03</td>
                                    </tr>
                                    <tr>
                                        <td>居住地</td>
                                        <td colspan="5">昆明市东川区新村路47号一栋一单元402室</td>
                                    </tr>
                                    <tr>
                                        <td colspan="7">
                                            <el-row>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/01.png"/>
                                                </el-col>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/02.png"/>
                                                </el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="7">
                                            <el-row>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/03.png"/>
                                                </el-col>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/04.png"/>
                                                </el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="7">
                                            <el-row>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/05.png"/>
                                                </el-col>
                                                <el-col :span="12">
                                                    <img width="240" height="180" src="../../assets/imgs/06.png"/>
                                                </el-col>
                                            </el-row>
                                        </td>
                                    </tr>
                                </table>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
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