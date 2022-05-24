<template>
  <div class="rank">
    <div class="title">
      <div class="t1">比赛排名</div>
      <div> <span style="font-size:14px">排序方式：</span>
        <el-radio-group v-model="mode" size="small">
        <el-radio-button label="金蝶币分" />
        <el-radio-button label="最大值分" />
        <el-radio-button label="综合分" />
        </el-radio-group>
        <el-button icon="el-icon-refresh" circle size="small" style="margin-left:10px"/>
      </div>
    </div>
    <!-- <el-empty description="暂无数据" v-if="showData.length == 0" image-size="60" style="width: 100%"></el-empty> -->
    <div class="dataBox2" >
      <el-table :data="showData" style="width: 100%" stripe border height="320">
        <el-table-column prop="rank" label="排名" width="50"></el-table-column>
        <el-table-column prop="time" label="时间" width="140"></el-table-column>
        <el-table-column prop="name" label="昵称" width="100"></el-table-column>
        <el-table-column prop="duration" label="用时" width="60"></el-table-column>
        <el-table-column prop="coins" label="金蝶币"></el-table-column>
        <el-table-column prop="maxTime" label="最大" width="50"></el-table-column>
        <el-table-column prop="point" label="金蝶币分"></el-table-column>
        <el-table-column prop="point2" label="最大值分"></el-table-column>
        <el-table-column prop="point3" label="综合分"></el-table-column>
      </el-table>
    </div>
    <el-pagination layout="prev, pager, next" :total="total" background :page-size="pageSize" @current-change="changePage" :current-page="page"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      rankData:[
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
        {rank:1,time:"2022-05-24 14:22",coins:12332, name:'Toyohay', duration:43.21, maxTime:3,point:4323.21,point2:4552.12},
      ],
      mode:"综合分",
      page:1,
      pageSize:20,
      total:100,
      showData:[],
      start:0
    }
  },
  created(){
    this.showData = this.rankData.slice(0,this.pageSize)
  },
  methods:{
    changePage(e){
      this.showData = this.rankData.slice((e-1)*this.pageSize,e*this.pageSize)
    }
  }
}
</script>

<style  scoped>
.el-empty{
  height: 320px;
}
.t1{
  position: relative;
  margin-left: 10px;
}
.t1::after{
    content: '';
    width: 100%;
    height: 3px;
    border-radius: 3px;
    display: block;
    background-color: #009BA1;
    left: 0;
    bottom: -4px;
    position: absolute;
  }
.title{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rank{
  width: 100%;
  height: 400px;
}
.dataBox2{
  height: 320px;
  /* overflow-y: scroll; */
}
.dataBox2::-webkit-scrollbar, .dataBox1::-webkit-scrollbar{
  width: 5px;
}
.dataBox2::-webkit-scrollbar-track, .dataBox1::-webkit-scrollbar-track{
  background-color: #e4e4e4;
}
.dataBox2::-webkit-scrollbar-thumb, .dataBox1::-webkit-scrollbar-thumb{
  background-color: #95B0B1;
  border-radius: 5px;
}
.el-pagination{
  text-align: right;
  margin-top: 10px;
}
</style>