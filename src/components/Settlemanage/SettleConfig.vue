<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>运费模板</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="司机姓名">
						<el-input placeholder="请输入..." v-model="findDriver"></el-input>
					</el-form-item>
                    <el-form-item label="随车人员">
						<el-input placeholder="请输入..." v-model="findFollower"></el-input>
					</el-form-item>
                    <el-form-item label="发货日期">
						<el-date-picker
                            v-model="findConsignDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="selectDateRange">
                        </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
            <div class="tableControl">
                <el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
                <el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="recTable" 
					:data="tableData" 
					border style="width: 100%" size="mini">
                    <el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="发货单位" prop="deliveryer"></el-table-column>
					<el-table-column label="发货地" prop="deliveryArea"></el-table-column>
					<el-table-column label="发货详细地址" prop="deliveryAdress"></el-table-column>
					<el-table-column label="收货单位" prop="receiver"></el-table-column>
					<el-table-column label="收货地" prop="receiveArea"></el-table-column>
					<el-table-column label="收货详细地址" prop="receiveAdress"></el-table-column>
					<el-table-column label="对内运距" prop="innerDistance"></el-table-column>
					<el-table-column label="对内运价" prop="innerFreight"></el-table-column>
					<el-table-column label="对内TKM" prop="innerTKM"></el-table-column>
                    <el-table-column label="对外运距" prop="externalDistance"></el-table-column>
                    <el-table-column label="对外运价" prop="externalFreight"></el-table-column>
                    <el-table-column label="对外TKM" prop="externalTKM"></el-table-column>
                    <el-table-column label="对内付款占比" prop="innerPayRatio" width="100"></el-table-column>
                    <el-table-column label="对外收款占比" prop="externalRecRatio" width="100"></el-table-column>
					<el-table-column label="操作" align="center" width="230">
						<template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-edit" @click="editInfo()">编辑查看</el-button>
                            <el-button size="mini" icon="el-icon-delete" @click="deleteConfirm()">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
                findDriver: '',
                findFollower: '',
                findConsignDate: [],
                startDate: '',
                endDate: '',
				pageIndex: 1,
				pageSize: 10,
                count: 87,
                tabSelected: 'driver',
                tableData: [
                    {
                        "deliveryer": "安化",
                        "deliveryArea": "云南省昆明市",
                        "deliveryAdress": "安化工厂",
                        "receiver": "红河厂",
                        "receiveArea": "云南省红河州蒙自市",
                        "receiveAdress": "蒙自小东山",
                        "innerDistance": "336",
                        "innerFreight": 322.56,
                        "innerTKM": "0.96",
                        "externalDistance": "345",
                        "externalFreight": 393,
                        "externalTKM": "1.14",
                        "innerPayRatio": "月结100%",
                        "externalRecRatio": "回单付100%"
                    },
                    {
                        "deliveryer": "安化",
                        "deliveryArea": "云南省昆明市",
                        "deliveryAdress": "安化工厂",
                        "receiver": "云锡",
                        "receiveArea": "云南省红河州个旧市",
                        "receiveAdress": "个旧云锡",
                        "innerDistance": "335",
                        "innerFreight": 321.6,
                        "innerTKM": "0.96",
                        "externalDistance": "350",
                        "externalFreight": 399,
                        "externalTKM": "1.14",
                        "innerPayRatio": "月结100%",
                        "externalRecRatio": "回单付100%"
                    },
                ]
			}
        },
		created() {
		},
		methods: {
            reset() {
                this.findDriver = ''
                this.findFollower = ''
                this.findConsignDate = []
                this.startDate = ''
                this.endDate = ''
            },
			pageChange(index) {
                this.pageIndex = index
            },
            selectDateRange(date) {
                this.startDate = new Date(date[0]).getTime()
                this.endDate = new Date(date[1]).getTime()
            },
            handleTabSelected(tab) {
                console.log(tab.$options.propsData.name)
            },
            add() {
                this.$router.push({name: 'addsettleconfig'})
            },
            editInfo() {
                this.$router.push({name: 'addsettleconfig'})
            }
		}
	}
</script>
<style lang="stylus" scoped>

</style>