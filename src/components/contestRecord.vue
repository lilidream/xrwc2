<template>
  <div class="cr">
    <div class="title">
      <div class="t1">
        比赛记录
      </div>
    </div>

    <el-empty description="暂无数据" v-if="gameData.length == 0" image-size="60" style="width: 100%" class="empty"></el-empty>
    <div class="dataBox2" v-else>
      <el-table :data="gameData" style="width: 100%">
        <el-table-column prop="index" label="次数" width="50"></el-table-column>
        <el-table-column prop="coins" label="获得金蝶币"></el-table-column>
        <el-table-column prop="maxTime" label="最大值次数"></el-table-column>
        <el-table-column prop="point" label="金蝶币分数"></el-table-column>
        <el-table-column prop="point2" label="最大值分数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    'gameData'
  ],
  data(){
    return{
      // contestRecord: []
    }
  },
  watch:{
    gameData(d){
      let i = 1 ;
      d.forEach((element, index) => {
        this.gameData[index].index = i;
        i++
      });
    }
  }
}
</script>

<style scoped>
.recordList{
  width: 100%;
}
.title{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.t1 img{
  width: 25px;
  height: 25px;
}
.t1{
  position: relative;
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
.t2{
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: #444;
  font-size: 14px;
}
.t2 div{
  padding: 3px 5px;
  min-width: 50px;
  text-align: center;
  background-color: #c3eef9;
  border-radius: 5px;
  color: black;
  font-size: 16px;
  margin: 0 3px;
  box-shadow: inset 0 0 4px 0 #0000000d;
}
.t1{
  font-size: 16px;
  display: flex;
  align-items: center;
}
.t3{
  font-size: 14px;
}
.dataBox1{
  width: calc(100% - 10px);
  padding: 5px;
  height: 255px;
  /* border: #c2c2c2 1px solid; */
  border-radius: 17px 0 0 17px;
  background-color: #f3f3f3;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: scroll;
}
.empty{
  height: 300px;
}
.data1{
  display: flex;
  font-size: 14px;
  margin: 3px 5px;
  height: 25px;
}
.d1{
  padding: 3px;
  width: 18px;
  text-align: center;
  border-radius: 10px 0 0 10px;
  background-color: #95B0B1;
  color: white;
}
.d2{
  padding: 3px;
  width: 55px;
  text-align: center;
  border: #c2c2c2 1px solid;
  border-radius: 0 10px 10px 0;
  border-left: none;
  background-color: white;
}

.dataBox2{
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border: 1px solid #e9e9e9;
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
</style>
