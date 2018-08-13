import { PAGEINDEX, PAGESIZE, TOTAL } from './const'
import Page from '../components/CommonComponents/Page'

export const baseMixin = {
    data() {
        return {
            pageIndex: PAGEINDEX,
            pageSize: PAGESIZE,
            total: TOTAL,
            tableData: [],
            selectedList: []
        }
    },
    components: { Page },
    methods: {
        search() {
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.getList()
		},
		reset() {
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.getList()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.pageIndex = PAGEINDEX
			this.getList() 
        }
    }
}