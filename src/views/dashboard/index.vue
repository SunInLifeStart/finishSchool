<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-carousel :interval="4000" height="300px">
            <el-carousel-item v-for="item in $dashboard.headlines" :key="item.id">
              <img :src="item.img" style="width:100%; height: 300px" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>媒体报道</span>
              </div>
              <el-table
                :data="tableData"
                :showHeader="false"
                style="width: 100%">
                <el-table-column
                  prop="type"
                  width="100"
                  label="人物">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="事迹">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>行业动态</span>
              </div>
              <el-table
                :data="$dashboard.news"
                :showHeader="false"
                style="width: 100%">
                <el-table-column
                  prop="newstitle"
                  width="200"
                  label="">
                </el-table-column>
                <el-table-column
                  prop="createdate"
                  label="">
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
  </div>
</template>

<script>
import 'vue-event-calendar/dist/style.css' // 1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar' // 日历
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'

Vue.use(vueEventCalendar, {
  locale: 'zh',
  color: '#50aaf8', // Set main color
  className: 'selected-day', // (default: 'selected-day')
  weekStartOn: '1' // Can be: 1, 2, 3, 4, 5, 6, 0 (default: 0)
})

export default {
  data() {
    return {
      tableData: [{
        type: '谭龙',
        address: '“ETCP的理念很简单，给钱的投资人都是好的投资人。”谭龙说，“创业公司在钱面前不能挑三拣四，现在风光不代表一直风光，永远都要深挖洞广积粮。”',
      }, {
        type: '接送孩子',
        address: '但凡是有车一族，开车的时候都遇见过这样的事：你兜兜转转找了半天停车位，好不容易等到了一个空位，正打算施展从科目二磨练而来的倒车入库神技，却不料半路杀出个程咬金，一头扎进你看好的车位，是不是感觉佛也有火'
      }, {
        type: '摩拜互怼',
        address: '9月22日，中国交通运输协会共享出行分会成立大会暨第一届会员代表大会在北京举行，我国首家综合交通领域共享出行社团组织的正式成立。会上，来自共享出行行业内的多家巨头参与其中，摩拜单车CEO王晓峰、滴滴C',
      }]
    }
  },
  computed: {
    ...mapGetters(['$dashboard'])
  },
  created() {
    this.GetHeadlines()
    this.GetNews()
    this.GetEvents()
  },
  methods: {
    ...mapActions([
      'GetHeadlines',
      'GetNews',
      'GetEvents'
    ]),
    goNews() {
      this.$router.push({ path: '/news' })
    },
    goToDo() {
      this.$router.push({ path: '/toDo' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
