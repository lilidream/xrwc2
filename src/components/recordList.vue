<template>
  <div class="recordList">
    <div class="title">
      <div class="t1">
        <!-- <img src="../assets/recording.svg"> -->
        游戏记录
      </div>
      <div class="t2">次数<div>{{getLength}}</div></div>
      <div class="t2">平均获得<div>${{getMean}}</div></div>
      <div class="t3">
        <el-switch v-model="showDetail" inactive-text="简略" active-text="详细"></el-switch>
      </div>
    </div>

    <div class="dataBox1" v-if="!showDetail">
      <el-empty description="暂无数据" v-if="gameData.length == 0" image-size="60" style="width: 100%"></el-empty>
      <div class="data1" v-for="(d, index) in gameData" :key="d.time">
        <div class="d1">{{index + 1}}</div>
        <div class="d2">{{d.coins}}</div>
      </div>
    </div>
    <div class="dataBox2" v-else>
      <el-table :data="gameData" style="width: 100%">
        <el-table-column prop="index" label="次数"></el-table-column>
        <el-table-column prop="sum" label="和"></el-table-column>
        <el-table-column prop="coins" label="奖励"></el-table-column>
        <el-table-column prop="max" label="最大奖励"></el-table-column>
        <el-table-column prop="isMax" label="是否最大"></el-table-column>
        <el-table-column prop="selected" label="已开数字"></el-table-column>
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
    return {
      length:0,
      meanCoins:0,
      showDetail:false
    }
  },
  watch:{
    gameData(d){
      d.forEach((v,i)=>{
        if(v.max == v.coins){
          d[i].isMax = '是';
        }else{
          d[i].isMax = '否';
        }
        let selectedNumber = ""
        v.open.forEach(p=>{
          selectedNumber+= v.number[p] +" "
        })
        d[i].selected = selectedNumber
      })

    }
  },
  computed:{
    getLength(){
      return this.gameData.length;
    },
    getMean(){
      if(this.gameData.length != 0){
        let m = 0;
        this.gameData.forEach(element => {
          m += element.coins
        });
        return (m / this.gameData.length).toFixed(2);
      }
      else{
        return 0;
      }
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
  height: 255px;
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