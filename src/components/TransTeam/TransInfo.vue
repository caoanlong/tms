<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>运输档案</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
                    <el-form-item label="车牌号">
						<el-input placeholder="请输入..." v-model="findPlateNum"></el-input>
					</el-form-item>
                    <el-form-item label="自编号">
						<el-input placeholder="请输入..." v-model="findSelfNum"></el-input>
					</el-form-item>
                    <el-form-item label="创建时间">
						<el-date-picker
                            v-model="findDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
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
					<el-table-column label="姓名" prop="name"></el-table-column>
					<el-table-column label="身份证号" prop="cardNum"></el-table-column>
					<el-table-column label="联系电话" prop="mobile"></el-table-column>
					<el-table-column label="从业资格证件号" prop="qualifCerNum"></el-table-column>
					<el-table-column label="车牌号" prop="plateNum"></el-table-column>
					<el-table-column label="自编号" prop="selfNum"></el-table-column>
					<el-table-column label="道路运输证号" prop="roadTransNum"></el-table-column>
					<el-table-column label="载重" prop="load"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
                    <el-table-column label="创建时间" prop="createTime"></el-table-column>
					<el-table-column label="建档时间" prop="buildTime"></el-table-column>
					<el-table-column label="操作" align="center" width="230">
						<template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-view" @click="view">查看</el-button>
                            <el-button size="mini" icon="el-icon-edit" @click="edit">编辑</el-button>
                            <el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.$index)">删除</el-button>
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
                findName: '',
                findPlateNum: '',
                findSelfNum: '',
                findDate: [],
                startDate: '',
                endDate: '',
				pageIndex: 1,
				pageSize: 10,
                count: 87,
                tabSelected: 'driver',
                tableData: [
                    {
                        "name": "李金锐",
                        "cardNum": "532424197508031415",
                        "mobile": "13700669154",
                        "qualifCerNum": "532424197508031415",
                        "plateNum": "云AG5836",
                        "selfNum": "1",
                        "roadTransNum": "530181031849",
                        "load": "9990",
                        "remark": "",
                        "createTime": "2018-03-01",
                        "buildTime": "2016-05-25"
                    },
                    {
                        "name": "李金锐",
                        "cardNum": "532424197508031415",
                        "mobile": "13700669154",
                        "qualifCerNum": "532424197508031415",
                        "plateNum": "云AG5836",
                        "selfNum": "1",
                        "roadTransNum": "530181031849",
                        "load": "9990",
                        "remark": "",
                        "createTime": "2018-03-01",
                        "buildTime": "2016-05-25"
                    },
                ]
			}
        },
		created() {
		},
		methods: {
            reset() {
                this.findName = ''
                this.findPlateNum = ''
                this.findSelfNum = ''
                this.findDate = []
                this.startDate = ''
                this.endDate = ''
            },
			pageChange(index) {
                this.pageIndex = index
            },
            handleTabSelected(tab) {
                console.log(tab.$options.propsData.name)
            },
            add() {
                this.$router.push({name: 'addtransinfo'})
            },
            edit() {
                this.$router.push({name: 'edittransinfo'})
            },
            view() {
                this.$router.push({name: 'viewtransinfo'})
            },
            deleteConfirm(i) {
                console.log(i)
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData.splice(i, 1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
		}
	}
</script>
<style lang="stylus" scoped>

</style>