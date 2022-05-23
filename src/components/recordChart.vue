<template>
  <div class="chart">
    <div class="title">
      <div class="t1">游戏记录</div>
      <div class="t2">总计获得<div>${{sum}}</div></div>
      <div class="t2">标准差<div>{{std}}</div></div>
      <div class="t2">获得最大奖励概率<div>{{maxRate}}%</div></div>
      <div class="t3">
        <el-tooltip class="item" effect="dark" content="关闭统计以提高游戏性能" placement="bottom">
        <el-switch v-model="statistic" active-text="开启统计" @change="$emit('statistic', statistic)"></el-switch>
        </el-tooltip>
      </div>
    </div>
    <div id="c1" :class="chartData == 0 ? 'hide' : ''"></div>
    <el-empty description="暂无数据" v-if="chartData.length == 0"/>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
  props:['gameData'],
  data(){
    return {
      chartData: [],
      chart: null,
      sum: 0,
      std: 0,
      maxRate: 0,
      statistic: true,
      hideChart: true
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      const chart = new Chart({
        container: 'c1',
        width: 750,
        height: 275,
      })
      chart.data(this.chartData);
      chart.scale('val',{alias:'金蝶币'});
      chart.axis('val', {title: {},});
      chart.tooltip({ showCrosshairs: true, shared: true, });
      chart.line().position('t*val').color('type').shape('smooth');
      chart.line().position('t*val').color('type').shape('smooth');
      this.chart = chart;
    }
  },
  watch:{
    gameData(d){
      let data = [];
      let sum = 0;
      let maxTime = 0;
      d.forEach((element,index) => {
        data.push({
          t: index,
          val: element.coins,
          type: '获得金蝶币'
        })
        data.push({
          t: index,
          val: element.max,
          type: '卡片最大奖励'
        })
        sum += element.coins;
        if(element.coins == element.max){
          maxTime += 1;
        }
      });
      this.chartData = data;
      this.chart.changeData(this.chartData);
      // this.chart.render();

      this.sum = sum;
      this.maxRate = d.length != 0 ? ((maxTime/d.length)*100).toFixed(1) : 0;
      if(d.length != 0){
        let mean = sum/d.length;
        let a1 = 0
        d.forEach(val=>{
          a1 += (val.coins - mean) ** 2;
        })
        this.std = Math.sqrt(a1/(d.length-1)).toFixed(2);
      }
      else{
        this.std = 0;
      }
    }
  }
}
</script>

<style>
.hide{
  display: none
}
  .chart{
    width: 100%;
    height: 300px;
  }
  #c1{
    width: 100%;
    height: 275px;
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .t1{
    font-size: 16px;
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
    bottom: 0px;
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
.title{
  display: flex;
  height: 25px;
  justify-content: space-around;
}
</style>