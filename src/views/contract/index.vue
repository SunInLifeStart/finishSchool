<template>
     <div>
     <!-- 查询条件 -->
      <div class="investmentClass">
          <el-form  label-width="120px">
            <el-row :gutter="0">
              <el-col :span="5">
                <el-form-item label="车牌号:">
                  <el-input v-model="keywords.entiId"  size="small" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="时间:">
                  <el-input v-model="keywords.pointState"  size="small" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
              </el-col>
                <el-col :span="5">
              </el-col>
              <el-col :span="4"  class="div-font">
                  <el-button size="mini" icon="el-icon-search" @click="findContracts" type="primary">搜索</el-button>
              </el-col>
            </el-row>
          </el-form>
      </div>
      <!-- 台账列表 -->
       <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="24">
          </el-col>
       </el-row>
       <div>
         <el-table
            border
            size="small"
            :default-sort="{prop: 'approvalStatus', order: 'descending'}"
            :data="$contract.contracts"
            :row-class-name="tableRowClassName"
            :cell-style="({row, column, rowIndex, columnIndex}) => (columnIndex === 3||columnIndex === 0)?{'text-align': 'center',padding: '3px'}:{padding: '3px'}"
            :header-cell-style="{background:'#efefe0', 'text-align': 'center', color: '#a08e6e',fontSize:'13px',padding:'3px 0',fontWeight:'500'}"
              >
              <el-table-column prop="contractId" label="序号" fixed width="100"></el-table-column>
              <el-table-column sortable prop="entiId" fixed label="车牌号" width="110"></el-table-column>
              <el-table-column sortable prop="pointState" fixed label="时间" width="115"></el-table-column>
              <el-table-column sortable prop="projectName" fixed label="地点" width="200"></el-table-column>
              <el-table-column sortable prop="contractName" fixed label="姓名" width="200">
                <template slot-scope="scope">
                  <el-button type="text" @click="showContract(scope.row)">{{scope.row.contractName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column sortable prop="contractAmt" fixed label="金额" width="130"></el-table-column>
              <el-table-column sortable prop="ContentPlaceHolderxGridExpensePlan_1" label="累计变更金额" width="200"></el-table-column>
              <el-table-column sortable prop="ContentPlaceHolderxGridExpensePlan_2" label="预估变更金额" width="200"></el-table-column>
              <el-table-column sortable prop="ContentPlaceHolderxGridExpensePlan_5" label="付款比例" width="100"></el-table-column>
          </el-table>
       </div>
     </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      //  查询条件
      keywords: {
        pointState: '',
        entiId: '',
        pageSize: '10', // 每页记录条数
        pageNum: '1', // 页数
        organization: '', // 组织机构
        project: '', // 项目分期
        word: '', // 关键词
        agent: '1', // 经办人
        state: '', // 状态--审批状态
        settlementState: '', // 结算状态
        contractItem: '', // 合同类别
        accurates: [
          {
            columnName: '', // 列名
            condtion: '', // 条件
            content: ''// 内容
          }
        ]
      },

      // -------模拟数据------
      // 条件
      condtions: [
        { code: '>', value: '大于' },
        { code: '<', value: '小于' },
        { code: '=', value: '等于' },
        { code: '>=', value: '大于等于' },
        { code: '<=', value: '小于等于' },
        { code: 'like%', value: '模糊' }
      ],

      // 列名
      columnNames: [
        { code: 'CONTRACTAMT', value: '有效签约金额', disabled: false },
        { code: 'CONTRACTVOAMT', value: '累计变更金额', disabled: false },
        { code: 'ESTIMATEVOAMT', value: '预估变更金额', disabled: false },
        { code: 'DOCAMT', value: '已申请金额', disabled: false },
        { code: 'PAYMENTAMT', value: '已付款金额', disabled: false },
        { code: 'CONTRACTSUM', value: '合同总额', disabled: false },
        { code: 'RESERVEDBALANCE', value: '预留金余额', disabled: false },
        { code: 'INCHARGESBYID', value: '经办人', disabled: false },
        { code: 'TENDERTYPE', value: '形成方式', disabled: false },
        { code: 'CONTRACTNO', value: '合同编号', disabled: false },
        { code: 'VALUATIONMODE', value: '计价模式', disabled: false },
        { code: 'SIGNINGDATE', value: '签约日期', disabled: false },
        { code: 'SIGNOFFDATE', value: '结算日期', disabled: false },
        { code: 'SUPPLIERNAME', value: '供方单位', disabled: false }
      ],
      // 合同类别
      contractItems: [
        { code: '01', value: '合同类别1' },
        { code: '02', value: '合同类别2' },
        { code: '03', value: '合同类别3' }
      ],
      // 结算状态
      settlementStates: [
        { code: '01', value: '所有' },
        { code: '02', value: '已结算' },
        { code: '03', value: '未结算' }
      ],
      // 状态
      states: [
        { code: '01', value: '草稿' },
        { code: '02', value: '已驳回' },
        { code: '03', value: '审批中' },
        { code: '04', value: '已审批' }
      ],
      // 项目分期
      projects: [
        { code: '01', value: '项目分期1' },
        { code: '02', value: '项目分期2' }
      ],
      // 组织机构
      organizations: [
        { code: '01', value: '组织机构1' },
        { code: '02', value: '组织机构2' }
      ],

      showAdvancedSearch: false,
      radio: '1',
      form: {
        organization: '',
        contactName: '',
        project: '',
        contractNum: '',
        contractTypeId: '',
        addConditions: [{
          columnName: '',
          condtion: '',
          content: ''
        }],
        contractTypeIds: [{
          value: '选项1',
          label: '合同1'
        }, {
          value: '选项2',
          label: '合同2'
        }],
        contractNums: [{
          value: '选项1',
          label: '所有'
        }, {
          value: '选项2',
          label: '已结算'
        }, {
          value: '选项3',
          label: '未结算'
        }],
        statusAccounting: '',
        screen: [],
        screens: ['草稿', '已驳回', '审批中', '已审批'],
        freeTo: '',
        responsiblePerson: '',
        responsiblePersons: [{
          value: '选项1',
          label: '审批状态'
        }, {
          value: '选项2',
          label: '项目名称'
        }],
        transactionDepartment: '',
        dateSigning: '',
        ourUnit: '',
        ourUnits: [
          {
            value: '选项1',
            label: '大于'
          }, {
            value: '选项2',
            label: '大于等于'
          }, {
            value: '选项3',
            label: '等于'
          }, {
            value: '选项4',
            label: '小于等于'
          }, {
            value: '选项5',
            label: '小于'
          }
        ],
        supplierUnit: ''
      },
      options: [{
        value: '选项1',
        label: '龙湖1'
      }, {
        value: '选项2',
        label: '龙湖2'
      }, {
        value: '选项3',
        label: '龙湖3'
      }, {
        value: '选项4',
        label: '龙湖4'
      }, {
        value: '选项5',
        label: '龙湖5'
      }],
      list: []
    }
  },
  computed: {
    ...mapGetters(['$contract', 'user'])
  },
  created() {
  },
  methods: {
    ...mapActions([
      'FindContracts'
    ]),
    ...mapMutations(['postUrl']),
    // 选择每页条数
    pageSizeChange(val) {
      this.keywords.pageSize = val// 每页记录条数
      this.findContracts()
    },
    // 选择页码
    goPage(val) {
      this.keywords.pageNum = val// 页数
      this.findContracts()
    },
    // 禁止已经选择的列名
    changeColumnName() {
      // 先将下拉数据全部设置为展示
      this.columnNames.forEach(obj => {
        obj.disabled = false
      })
      // 判断哪些已展示，然后禁用
      this.keywords.accurates.forEach(obj => {
        this.columnNames.forEach(obj1 => {
          if (obj.columnName === obj1.code) {
            obj1.disabled = true
          }
        })
      })
    },
    findContracts() {
      this.FindContracts(this.keywords).then((data) => {
        if(this.keywords.organization){
          let lists = data.data.filter((item)=> item.organization ===this.keywords.organization)
          this.list = lists
        } else {
          this.list = data.data
        }
      })
    },
    showContract(row) {
      var id = row.contractId
      if (row.entiId === '审批中' || row.entiId === '草稿' || row.entiId === undefined) {
        window.open(window.origin + '/#/contract/detail/' + id, '_blank')
      } else {
        this.$router.push({ name: '合同信息', params: { id }})
      }
    },
    showPayments(id) {
      this.$router.push({ name: '合同付款', params: { id }})
    },
    showChanges(id) {
      this.$router.push({ name: '预估变更', params: { id }})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 3) {
        return 'selected'
      }
      return ''
    },
    addAccurate() {
      var obj = {
        columnName: '',
        condtion: '',
        content: ''
      }
      this.keywords.accurates.push(obj)
    },
    delAccurate() {
      if (this.keywords.accurates.length > 1) {
        this.keywords.accurates.pop()
        // 更新一下下拉禁用项目
        this.changeColumnName()
      }
    }
  },
  mounted() {
    this.postUrl(this.$route.path)
  }
}
</script>
<style scoped>
  /**
    分页位置样式
   */
  .paginate{
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }
  .el-col-18{
    margin-top: -20px;
  }
  /**
    搜索按钮样式
   */
  .searchBtn{
    margin-top: 5px;
    background-color: #7986a9;
    color: white;
  }
  /**
    form样式
   */
  .el-form-item{
    margin-bottom: 0;
  }
  /**
    高级查询,input样式调整
   */
  .investmentClass >>> .el-collapse-item__content{
    padding-bottom: 0;
    font-size: 12px;
    color: #333;
  }
  .investmentClass >>> .el-col-6, .el-col-5{
    height: 40px;
  }
  .investmentClass >>> .el-collapse-item__arrow{
    position: absolute;
    right: 65px;
  }
  /**
    高级查询样式
   */
  .investmentClass{
    padding-top: 10px;
    font-size: 13px;
    border: 1px solid #D5D5D5;
    border-left-style: none;
    border-top-style: none;
    border-right-style: none;
    box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  }
  /**
    提示信息样式
   */
  .reminder{
    margin-left: 70px;
    font-size: 13px;
  }
  .reminderNum{
    color: #333;
    font-size: 16px;
    margin-left: 5px;
  }
  .reminderBorder{
    background-color: #F8F8FE;
    border: 1px solid #D1D2D2;
    color: #999;
    padding: 5px;
    position: fixed;
    bottom: 2px;
    width: 100%;
  }
  .btnRight{
    float: right;
    margin-right: 1%;
  }
   .el-table .interleave_row {
    background: #F5F7FA;
  }

  .el-table .success-row {
    background: #FAECD7;
  }
</style>
