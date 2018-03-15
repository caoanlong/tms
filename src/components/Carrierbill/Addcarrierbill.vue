<template>
	<div class="main-content">
		<el-card class="box-card hasTit">
			<div slot="header" class="clearfix">添加承运单</div>
			<el-row>
				<div class="split-item">
					<span class="num">1</span>
					<span class="tit">基本信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="托运人">
							<el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" :trigger-on-focus="false" placeholder="托运人" @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="承运人">
							<el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch"  placeholder="承运人" @select="handleSelect"></el-autocomplete>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">2</span>
					<span class="tit">收发货信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="发货单位">
							<el-input placeholder="发货单位" v-model="carrierbillInfo.ConsignerCompany"></el-input>
						</el-form-item>
						<el-form-item label="发货人">
							<el-input placeholder="发货人" v-model="carrierbillInfo.Consigner"></el-input>
						</el-form-item>
						<el-form-item label="发货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择发货时间" v-model="carrierbillInfo.DeliveryDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="委托时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择委托时间" v-model="carrierbillInfo.CommissionDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="发货单号">
							<el-input placeholder="发货单号" v-model="carrierbillInfo.ConsignNum"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="100px">
						<el-form-item label="发货地">
							<el-cascader style="width: 100%" :options="distData" v-model="selectedAreas">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="发货详细地址" v-model="carrierbillInfo.Dispatch"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货单位">
							<el-input placeholder="收货单位" v-model="carrierbillInfo.Consigner"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="收货人">
							<el-input placeholder="收货人" v-model="carrierbillInfo.Consignee"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="到货时间">
							<el-date-picker type="datetime" style="width:100%" placeholder="选择到货时间" v-model="carrierbillInfo.ArrivalDate"></el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="100px">
						<el-form-item label="运输方式">
							<el-select v-model="transType" placeholder="请选择" style="width:100%">
								<el-option v-for="op in transTypeOption" :key="op.value" :label="op.label" :value="op.value"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6">
					<el-form label-width="100px">
						<el-form-item label="卸货地">
							<el-cascader style="width: 100%" :options="distData" v-model="selectedAreas">
							</el-cascader>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="10">
					<el-form label-width="20px">
						<el-form-item>
							<el-input placeholder="卸货详细地址" v-model="carrierbillInfo.Discharge"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">3</span>
					<span class="tit">货物信息</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="100px">
						<el-form-item label="货物信息">
							<div class="cargoItem" v-for="(item,index) in cargoInfo">
								<el-select v-model="item.type" placeholder="请选择" style="width:100px">
									<el-option label="重货" value="重货"></el-option>
									<el-option label="轻货" value="轻货"></el-option>
								</el-select>
								<el-input placeholder="货物名称" style="width:150px"></el-input>
								<el-input placeholder="货物规格" style="width:150px"></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">吨</span></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">方</span></el-input>
								<el-input placeholder="货物数量" style="width:150px"><span slot="suffix">件</span></el-input>
								<el-button type="text" icon="el-icon-plus" @click="addItem">添加</el-button>
								<el-button type="text" icon="el-icon-delete" style="color:#F56C6C" @click="removeItem(index)" v-show="cargoInfo.length>1">删除</el-button>
							</div>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<div class="split-item">
					<span class="num">4</span>
					<span class="tit">应款金额</span>
				</div>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="100px">
						<el-form-item label="承运单应收款">
							<el-radio-group v-model="carrierbillInfo.Receivable">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.Receivable=='Y'" class="tips">从“这个单的发货地”到卸货地对外运距为“50公里”总价为90909009？</div>
							<div class="form-input">
								<el-form-item label="现付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="现付"></el-input>
								</el-form-item>
								<el-form-item label="到付" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="到付"></el-input>
								</el-form-item>
								<el-form-item label="回单结" label-width="60px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="回单结"></el-input>
								</el-form-item>
								<el-form-item label="月结" label-width="40px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="月结"></el-input>
								</el-form-item>
								<el-form-item label="收货方付" label-width="70px" style="width:180px;display:inline-block;margin:10px 10px 0 0">
									<el-input placeholder="收货方付"></el-input>
								</el-form-item>
							</div>
						</el-form-item>
						<el-form-item label="付款费用">
							<el-radio-group v-model="carrierbillInfo.payable">
								<el-radio label="Y">按吨公里自动生成</el-radio>
								<el-radio label="N">手动输入</el-radio>
							</el-radio-group>
							<div v-show="carrierbillInfo.payable=='Y'" class="tips">从“这单的发货地”到卸货地对内运距为“50公里”?</div>
						</el-form-item>
						<el-form-item label="发票">
							<el-radio-group v-model="carrierbillInfo.invoice">
								<el-radio label="Y">开发票</el-radio>
								<el-radio label="N">不开发票</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回单要求">
							<el-checkbox-group v-model="carrierbillInfo.receipt">
								<el-checkbox label="1">货物托运单</el-checkbox>
								<el-checkbox label="2">发货单文件</el-checkbox>
								<el-checkbox label="3">不需要回单</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form label-width="0">
						<el-form-item align="center">
							<el-button type="primary">保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			state1: '',
			state2: '',
			distData: regionData,
			selectedAreas: [],
			carrierbillInfo: {
				Status: '',
				Consignor: '',
				Carrier: '',
				CarrierNum:'',
				ConsignNum:'',
				ConsigneeCompany:'',
				Discharge:'',
				Consignee:'',
				ArrivalDate:'',
				CargoTotal:'',
				ConsignerCompany:'',
				DeliveryDate:'',
				Consigner:'',
				Dispatch:'',
				CargoName:'',
				CreatedDate:'',
				CommissionDate:'',
				invoice:'N',
				receipt: ['3'],
				Receivable:'N',
				payable:'N'
			},
			cargoInfo: [{
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			}],
			transType:'',
			transTypeOption:[
				{
					label:'海上运输',
					value:'海上运输'
				},
				{
					label:'铁路运输',
					value:'铁路运输'
				},
				{
					label:'公路运输',
					value:'公路运输'
				},
				{
					label:'航空运输',
					value:'航空运输'
				},
				{
					label:'邮件运输',
					value:'邮件运输'
				},
				{
					label:'多式联运',
					value:'多式联运'
				},
				{
					label:'固定设施运输',
					value:'固定设施运输'
				},
				{
					label:'内河运输',
					value:'内河运输'
				},
				{
					label:'其他',
					value:'其他'
				}
			]
		}
	},
	created() {

	},
	methods: {
		addItem() {
			this.cargoInfo.push({
				'type': '',
				'name': '',
				'rule': '',
				'weight': '',
				'volumn': '',
				'num': ''
			})
		},
		removeItem(index) {
			this.cargoInfo.splice(index,1)
		},
		back() {
			this.$router.go(-1)
		},
		querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
	},
	mounted() {
      this.restaurants = this.loadAll();
    }
}

</script>
<style lang="stylus" scoped>
	.el-card__header
		span
			margin-right 40px
			font-size 14px
			color #909399
			&.CarrierNum
				font-weight bold
				margin-left 20px
			&.status
				position absolute
				margin-right 0
				right 20px
				top 15px
				height 24px
				line-height 24px
				color #fff
				padding 0 15px
				font-size 12px
				border-radius 4px
				&.status1
					background #F56C6C
				&.status2
					background #409EFF
				&.status3
					background #909399
	.tips
		color #909399
.cargoItem
	padding-bottom 10px
	margin-bottom 10px
	border-bottom 1px solid #ebeef5
	.el-select
	.el-input
		margin 0 10px 10px 0
</style>
