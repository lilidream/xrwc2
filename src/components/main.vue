<template>
  <div class="xrwc">
    <el-dialog title="输入昵称上传比赛结果" :visible.sync="upLoadDialog" width="30%" >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="你的昵称：" prop="nickName">
        <el-input v-model="form.nickName"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="upLoadDialog = false">取 消</el-button>
      <el-button type="primary" @click="uploadContestResult">确 定</el-button>
    </span>
    </el-dialog>
  <el-container>
  <el-header height="40px">
    <div class="top">
      TYHC -  仙人微彩模拟器
      <div class="topBtn">
        <el-tooltip class="item" effect="dark" content="切换左右布局" placement="bottom-end">
          <el-button  @click="leftRight = !leftRight">
            <img src="../assets/swap.svg">
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </el-header>
  <el-main>
    <div :class="leftRight? 'main mleft' : 'main mright'">
      <div class="right1">
        <div class="recordBox">
          <Record-list :gameData="gameRecordStatic"/>
        </div>
        <div class="recordBox mgt">
          <contestRecord :gameData="contestRecord"/>
        </div>
      </div>
      <div class="left">
        <!-- 信息栏 -->
        <el-collapse v-model="infoActive" accordion class="info">
          <el-collapse-item title="规则" name="1">
            此模拟器玩法与FF14中仙人微彩完全相同，没有次数限制。制作此模拟器目的在于求出人工玩仙人微彩的奖励均值，以改进深度学习模型。
          </el-collapse-item>
          <el-collapse-item title="金蝶币奖励表" name="2">
            <table class="table1" border="0" cellspacing="0" cellpadding="0">
              <tr><th class="t1">和</th><th>币</th><th class="t1">和</th><th>币</th><th class="t1">和</th><th>币</th></tr>
              <tr>
                  <td class="t1">6</td><td class="t2" >10000</td>
                  <td class="t1">13</td><td class="t2" >72</td>
                  <td class="t1">20</td><td class="t2" >306</td>
              </tr>
              <tr>
                  <td class="t1">7</td><td class="t2" >36</td>
                  <td class="t1">14</td><td class="t2" >54</td>
                  <td class="t1">21</td><td class="t2" >1080</td>
              </tr>
              <tr>
                  <td class="t1">8</td><td class="t2" >720</td>
                  <td class="t1">15</td><td class="t2" >180</td>
                  <td class="t1">22</td><td class="t2" >144</td>
              </tr>
              <tr>
                  <td class="t1">9</td><td class="t2" >360</td>
                  <td class="t1">16</td><td class="t2" >72</td>
                  <td class="t1">23</td><td class="t2" >1800</td>
              </tr>
              <tr>
                  <td class="t1">10</td><td class="t2" >80</td>
                  <td class="t1">17</td><td class="t2" >180</td>
                  <td class="t1">24</td><td class="t2" >3600</td>
              </tr>
              <tr>
                  <td class="t1">11</td><td class="t2" >252</td>
                  <td class="t1">18</td><td class="t2" >119</td>
                  <td class="t1"></td><td class="t2"></td>
              </tr>
              <tr>
                  <td class="t1">12</td><td class="t2" >108</td>
                  <td class="t1">19</td><td class="t2" >36</td>
                  <td class="t1"></td><td class="t2"></td>
              </tr>
            </table>
          </el-collapse-item>
          <el-collapse-item title="声明" name="3">
            所有游戏过程都将被匿名记录，用于对此游戏的玩法与统计分析。提交排名时仅记录提交时的昵称与游戏记录。
          </el-collapse-item>
        </el-collapse>

        <!-- 模拟器 -->
        <div class="gameBox">
          <!-- 覆盖层 -->
          <div class="gameCover" v-if="gameCover">
            <div class="cover1" v-if="coverLayer == 1">
              <div style="font-size:18px">选择模式</div>
                <ul>
                  <li>自由模式：随心所欲地玩仙人微彩</li>
                  <li>比赛模式：每一局10张仙人微彩，根据一局的市场与得到的金蝶币计算分数，可上传结果并排名</li>
                </ul>
                <div>
                  <el-button @click="mode1">自由模式</el-button>
                  <el-button @click="coverLayer = 2">比赛模式</el-button>
                </div>
            </div>
            <div class="cover1" v-if="coverLayer == 2">
              <div>点击开始将开始<br/>比赛模式并计时</div>
              <div style="margin-top:20px">
                <el-button @click="mode2" type="primary">开始</el-button>
                <el-button @click="coverLayer = 1">返回</el-button>
              </div>
            </div>
            <div class="cover2" v-if="coverLayer == 3">
              <div class="result2" style="margin-bottom:20px">比赛结果</div>
              <div class="result">
                <div class="result1">金蝶币奖励</div>
                <div class="result2">{{contestResult.coins}}</div>
              </div>
              <div class="result">
                <div class="result1">用时</div>
                <div class="result2">{{contestResult.time}}秒</div>
              </div>
              <div class="result">
                <div class="result1">金蝶币分数</div>
                <div class="result2">{{contestResult.point}}分</div>
              </div>
              <div class="result">
                <div class="result1">最大值分数</div>
                <div class="result2">{{contestResult.point2}}分</div>
              </div>
              <div style="margin-top:20px">
                <el-button @click="coverLayer = 1">返回</el-button>
                <el-button @click="uploadContest" type="primary">上传分数</el-button>
              </div>
            </div>
          </div>
          <div class="timer" v-if="gamemode==2">
            <div>第<span>{{nowCard}}</span>张</div>
            <div> <span>{{timer.m}}</span>:<span>{{timer.s}}</span> </div>
          </div>
          <el-alert :title="gameMessage" :type="gameMessageType" center show-icon :closable="false"> </el-alert>
          <table class="table2" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td><el-button icon="el-icon-bottom-right" circle class="numBtn" type="primary" plain @click="selectLine(3)"></el-button></td>
              <td><el-button icon="el-icon-bottom" circle class="numBtn" type="primary" plain @click="selectLine(4)"></el-button></td>
              <td><el-button icon="el-icon-bottom" circle class="numBtn" type="primary" plain @click="selectLine(5)"></el-button></td>
              <td><el-button icon="el-icon-bottom" circle class="numBtn" type="primary" plain @click="selectLine(6)"></el-button></td>
              <td><el-button icon="el-icon-bottom-left" circle class="numBtn" type="primary" plain @click="selectLine(7)"></el-button></td>
            </tr>
            <tr>
              <td><el-button icon="el-icon-right" circle class="numBtn" type="primary" plain @click="selectLine(2)"></el-button></td>
              <td :class="gameData[0].bg"><el-button circle class="numBtn"  :type="gameData[0].type" @click="play(0)">{{gameData[0].display}}</el-button></td>
              <td :class="gameData[1].bg"><el-button circle class="numBtn"  :type="gameData[1].type" @click="play(1)" >{{gameData[1].display}}</el-button></td>
              <td :class="gameData[2].bg"><el-button circle class="numBtn"  :type="gameData[2].type" @click="play(2)" >{{gameData[2].display}}</el-button></td>
              <td><div :class="gameCal[2].class"><div>{{gameCal[2].sum}}</div>${{gameCal[2].coins}}<div></div><i class="el-icon-arrow-left arrowLeft"></i></div></td>
            </tr>
            <tr>
              <td><el-button icon="el-icon-right" circle class="numBtn" type="primary" plain @click="selectLine(1)"></el-button></td>
              <td :class="gameData[3].bg"><el-button circle class="numBtn"  :type="gameData[3].type" @click="play(3)" >{{gameData[3].display}}</el-button></td>
              <td :class="gameData[4].bg"><el-button circle class="numBtn"  :type="gameData[4].type" @click="play(4)" >{{gameData[4].display}}</el-button></td>
              <td :class="gameData[5].bg"><el-button circle class="numBtn"  :type="gameData[5].type" @click="play(5)" >{{gameData[5].display}}</el-button></td>
              <td><div :class="gameCal[1].class"><div>{{gameCal[1].sum}}</div>${{gameCal[1].coins}}<div></div><i class="el-icon-arrow-left arrowLeft"></i></div></td>
            </tr>
            <tr>
              <td><el-button icon="el-icon-right" circle class="numBtn" type="primary" plain @click="selectLine(0)"></el-button></td>
              <td :class="gameData[6].bg"><el-button circle class="numBtn"  :type="gameData[6].type" @click="play(6)" >{{gameData[6].display}}</el-button></td>
              <td :class="gameData[7].bg"><el-button circle class="numBtn"  :type="gameData[7].type" @click="play(7)" >{{gameData[7].display}}</el-button></td>
              <td :class="gameData[8].bg"><el-button circle class="numBtn"  :type="gameData[8].type" @click="play(8)" >{{gameData[8].display}}</el-button></td>
              <td><div :class="gameCal[0].class"><div>{{gameCal[0].sum}}</div>${{gameCal[0].coins}}<div></div><i class="el-icon-arrow-left arrowLeft"></i></div></td>
            </tr>
            <tr>
              <td><div :class="gameCal[7].class"><div>{{gameCal[7].sum}}</div>${{gameCal[7].coins}}<div></div><i class="el-icon-arrow-up arrowUpRight"></i></div></td>
              <td><div :class="gameCal[4].class"><div>{{gameCal[4].sum}}</div>${{gameCal[4].coins}}<div></div><i class="el-icon-arrow-up arrowUp"></i></div></td>
              <td><div :class="gameCal[5].class"><div>{{gameCal[5].sum}}</div>${{gameCal[5].coins}}<div></div><i class="el-icon-arrow-up arrowUp"></i></div></td>
              <td><div :class="gameCal[6].class"><div>{{gameCal[6].sum}}</div>${{gameCal[6].coins}}<div></div><i class="el-icon-arrow-up arrowUp"></i></div></td>
              <td><div :class="gameCal[3].class"><div>{{gameCal[3].sum}}</div>${{gameCal[3].coins}}<div></div><i class="el-icon-arrow-up arrowUpLeft"></i></div></td>
            </tr>
          </table>
          <div class="gameBtn">
            <el-button @click="gameCover=true;coverLayer=1" plain style="width:100px" v-if="gamemode==1">返回</el-button>
            <el-button @click="nextCard" type="primary" plain style="width:200px" v-if="nextBtn">下一张</el-button>
            <el-button @click="showContestResult" type="primary" plain style="width:200px" v-if="resultBtn">查看结果</el-button>
          </div>
        </div>
      </div>


      <div class="right2">
          <div class="recordChartBox">
            <Record-chart :gameData="gameRecordStatic" v-on:statistic="displayStatic"/>
          </div>
          <div class="recordChartBox mgt">
            <rank/>
          </div>
      </div>
    </div>
  </el-main>
  <el-footer>
    <div class="foot">
      <div>©2022 Lilidream</div>|
      <div>
        <img src="../assets/logo.png" style="width:25px;height:25px"> TOYOHAY Clouds
      </div>|
      <div>
        <img src="../assets/vue.svg" style="width:20px;height:20px"> Vue.js
      </div>|
      <div>
        <img src="../assets/element.svg" style="height:20px">
      </div>|
      <div>
        AntV G2
      </div>
    </div>
  </el-footer>
  </el-container>
  </div>
</template>

<script>
import RecordList from './recordList.vue';
import RecordChart from './recordChart.vue';
import contestRecord from './contestRecord.vue'
import rank from './rank.vue'
import {PostRecord, PostContest} from '../API/index.js';
import md5 from '../API/cryp.js'
export default {
  name: "main",
  components:{
    RecordList,
    RecordChart,
    contestRecord,
    rank
  },
  data(){
    return {
      infoActive: '3',
      cardNumberPreGame: 10,
      gameData:[
        {
          num:0, // 实际数字
          display:"", // 显示数字 
          type: "info",
          bg:""
        }
      ],
      gameStep:0, // 已经开了几个数字
      gameOpened: [],
      btnDisable: [true,true,true,true,true,true,true,true,true],
      linkIndex: [[6,7,8], [3,4,5], [0,1,2], [0,4,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6]],
      coin: [10000,36,720,360,80,252,108,72,54,180,72,180,119,36,306,1080,144,1800,3600],
      gameCal: [{
        num: 0,
        coins: 0
      }],
      gameMessage:"点击开始",
      gameMessageType:"info",
      gameStartTime:"",
      onGame:false,
      gameRecord:[],
      gameRecordStatic:[],
      gameMax:{},
      openedLine:-1,
      gameResult:{},
      playTimes:0,
      showStatistic: true,
      leftRight:true,
      gameCover: true,
      nowCard:1,
      coverLayer: 1,
      timer:{
        m: "00",
        s: "00"
      },
      gamemode: 1,
      contestTimeStart:"",
      contestTimeEnd:"",
      interval:"",
      onContest: false,
      nextBtn: true,
      contestResult:{
        coins:0,
        time:0,
        point:0,
        maxTime:0,
        point2:0,
        avgPoint:0
      },
      resultBtn:false,
      isMaxNumber:0,
      contestRecord:[],
      upLoadDialog: false,
      form:{
        nickName: ""
      },
      rules:{
        nickName:[{required: true, message: "请输入昵称", trigger:'blur'}]
      }
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      let d = [];
      let d2 = [];
      for(var i=0; i<9; i++){
        d.push({
          num: -1,
          display:"",
          type:"info",
          bg:""
        });
        d2.push({
          num:'?',
          coins:"?",
          class:"infoDiv"
        })
      }
      this.gameData = d;
      this.gameCal = d2;
    },
    displayStatic(v){
      this.showStatistic = v;
      if(v){
        this.gameRecordStatic = this.gameRecord;
      }
    },
    randomArray(array){
      let l = array.length;
      let index, temp;
      while(l>0){
        index = Math.floor(Math.random()*l);
        temp = array[l-1];
        array[l-1] = array[index];
        array[index] = temp;
        l--;
      }
      return array;
    },

    // 卡片几时和开始页面
    newGame(){
      let a = [1,2,3,4,5,6,7,8,9];
      a = this.randomArray(a);
      this.gameArray = a;
      let fristShow = Math.floor(Math.random()*9);
      let data = [];
      a.forEach((val, index)=>{
        data.push({
          num: val,
          display: index == fristShow ? val : "",
          type: index == fristShow ? "success" : "info",
          bg: ""
        })
      })
      this.gameData = data;
      this.gameStep = 1;
      this.gameOpened = [fristShow];
      this.gameStartTime = new Date();
      this.setGameInfo("请点开第"+(this.gameStep+1)+"个数字");
      if(this.gamemode == 2 && !this.onContest){
        this.onContest = true;
        this.nowCard = 1;
        this.nextBtn = true;
        this.isMaxNumber = 0;
        this.resultBtn = false;
        this.contestResult = {time: 0, coins: 0 ,point: 0, maxTime: 0};
        this.contestTimeStart = new Date();
        this.interval = setInterval(()=>{
          let t = new Date();
          let dt = t.getTime() - this.contestTimeStart.getTime();
          dt = parseInt(dt/1000);
          let min = Math.floor(dt / 60);
          let s = dt - min * 60;
          this.timer = {
            m: min < 10 ? "0"+min : min,
            s: s < 10 ? "0"+s : s,
          }
        }, 1000);
      }
      this.onGame = true;
      this.calGame();
    },
    calGame(){
      let d = [];
      this.linkIndex.forEach((val)=>{
        let sum = 0;
        val.forEach((v)=>{
          sum += this.gameData[v].display != "" ? this.gameData[v].num : 0;
        });
        let coins = sum >= 6 ? this.coin[sum-6] : "?";
        sum = sum != 0 ? sum : "?";
        d.push({
          sum: sum,
          coins: coins,
          class: "infoDiv " + (sum != "?" ? " infoDiv1" : "")
        })
      })
      if(!this.onGame){
        let max = 0;
        let maxi = 0;
        d.forEach((val,index)=>{
          if(val.coins > max){
            max = val.coins;
            maxi = index
          }
        })
        d[maxi].class = "infoDiv infoDivMax";
        this.gameMax = {max:max, maxi: maxi}
      }
      this.gameCal = d;
    },

    play(id){
      if(this.onGame){
        if(this.gameStep < 4){
          if (!this.gameOpened.includes(id)){
            this.gameData[id].display = this.gameData[id].num;
            this.gameData[id].type = "success";
            this.gameStep++;
            this.setGameInfo("请点开第"+(this.gameStep+1)+"个数字");
            this.calGame();
            this.gameOpened.push(id);
          }
        }
        if(this.gameStep >= 4){
          this.setGameInfo("请点击箭头选择一列");
        }
      }
    },
    selectLine(id){
      if(this.onGame){
        if(this.gamemode == 2){
          if(this.nowCard == this.cardNumberPreGame){
            this.contestTimeEnd = new Date();
            clearInterval(this.interval);
          }
        }
        let arr = this.linkIndex[id];
        let sum = 0;
        arr.forEach(v=>{
          sum += this.gameData[v].num
        })
        let coins = this.coin[sum-6];
        this.setGameInfo("数字和: "+sum+" ; 奖励金蝶币: "+coins, "success")
        this.gameData.forEach((val, index)=>{
          this.gameData[index].display = val.num;
          if(arr.includes(index)){
            this.gameData[index].bg = "selected"
          }
        })
        this.onGame = false;
        this.openedLine = id;
        this.gameResult = {
          sum: sum,
          coins:coins,
          duration: new Date().getTime() - this.gameStartTime.getTime()
        }
        this.playTimes++;
        this.calGame();
        this.recordGame();
        if(this.gamemode == 2 && this.onContest){
          if(this.gameMax.max == coins){
            this.contestResult.maxTime += 1;
          }
          this.contestResult.coins += coins;
          if(this.nowCard == this.cardNumberPreGame){
            this.nextBtn = false;
            this.resultBtn = true;
            this.onContest = false;
          }
        }
      }
    },
    setGameInfo(msg, type){
      this.gameMessage = msg;
      this.gameMessageType = type || "info";
    },
    recordGame(){
      if(!this.onGame){
        let d = {
          number: this.gameData.map(v=>v.num),
          open: this.gameOpened,
          max: this.gameMax.max,
          maxLine: this.gameMax.maxi,
          openLine: this.openedLine,
          sum: this.gameResult.sum,
          coins: this.gameResult.coins,
          time: new Date().getTime(),
          index: this.playTimes,
          duration: this.gameResult.duration
        }
        // deep copy d
        let d2 = JSON.parse(JSON.stringify(d));
        this.gameRecord.push(d2);
        if (this.showStatistic){
          this.gameRecordStatic.push(d2);
        }

        // POST
        let texNumber = "";
        let texOpen = "";
        //combine number in d to a text which no space
        d.number.forEach((val)=>{
          texNumber += val;
        });
        // the same as above with open
        d.open.forEach((val)=>{
          texOpen += val;
        });
        d.number = texNumber;
        d.open = texOpen;
        let ver = d.time.toString()+d.duration.toString()+"toyohay"+d.number+d.open;
        d.ver = md5(ver);
        PostRecord(d).then(res=>{
          if (res.status == 200){
            if(res.data.status == "error"){
              this.$message.error("提交游戏记录失败"+res.data.msg);
            }
          }
        })
      }
    },
    mode1(){
      this.gameCover=false;
      this.gamemode = 1;
      this.newGame();
    },
    mode2(){
      this.gameCover = false;
      this.gamemode = 2;
      this.newGame();
    },
    nextCard(){
      if(this.gamemode == 2){
        this.nowCard++;
        this.newGame();
      }else if(this.gamemode == 1){
        this.newGame()
      }
    },
    showContestResult(){
      this.gameCover = true;
      this.coverLayer = 3;
      let t = (this.contestTimeEnd.getTime()-this.contestTimeStart.getTime());
      let tp = 100*(1.053**(90-0.58*t))*0.4;
      console.log(tp);
      this.contestResult.time = parseFloat((t/1000).toFixed(3));
      this.contestResult.duration = t;
      this.contestResult.point = parseFloat((tp+this.contestResult.coins*0.6).toFixed(2));
      this.gamemode = 0;
      this.contestResult.point2 = parseFloat((this.contestResult.maxTime * 2000 * 0.6 + tp).toFixed(2));
      this.contestResult.avgPoint = (this.contestResult.point+this.contestResult.point2)/2;
      this.contestRecord.push(this.contestResult);
    },
    uploadContest(){
      // this.$message.error({message: "开发中"})
      this.upLoadDialog = true;
    },
    uploadContestResult(){
      let d = {
        coins: this.contestResult.coins,
        duration: this.contestResult.duration,
        coinPoint: this.contestResult.point,
        maxPoint: this.contestResult.point2,
        avgPoint: this.contestResult.avgPoint,
        time: new Date().getTime(),
        nickName: this.form.nickName
      }
      let ver = d.coins.toString()+d.duration.toString()+"TYHHYT"+d.coinPoint.toString()+d.maxPoint.toString()+"yuwan"+d.time.toString();
      d.ver = md5(ver);
      console.log(d);
      PostContest(d).then(res=>{
        if (res.status == 200){
          if(res.data.status == "error"){
            this.$message.error("提交比赛结果失败，请重试"+res.data.msg);
          }else if(res.data.status == "success"){
            this.$message.success("提交比赛结果成功");
            this.upLoadDialog = false;
            this.contestResult = {
              coins: 0,
              duration: 0,
              maxTime: 0,
              point: 0,
              point2: 0,
              avgPoint: 0
            }
            this.coverLayer = 1;
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.mgt{
  margin-top: 20px;
}
.result{
display: block !important;
margin-bottom: 10px;
}
.result1{
  text-align: center;
  display: block !important;
  color: #888;
  width: 100% !important;
  font-size: 14px;
}
.result2{
  text-align: center;
  display: block !important;
  width: 100% !important;
  font-size: 18px;
}
.timer{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}
.timer span{
  padding: 5px;
  border-radius: 5px;
  background-color: #d6eaff;
  margin-left: 5px;
  margin-right: 5px;
}
.xrwc{
  width: 100%;
}
.el-header{
  padding: 0;
}
.top{
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  line-height: 40px;
  font-size: 18px;
  position: relative;
}
.topBtn{
  position: absolute;
  right: 10px;
  top: 7px;
}
.topBtn img{
  width: 26px;
  height: 26px;
}
.topBtn .el-button{
  padding: 0px;
  border: none;
}
.main{
  width: 100%;
  display: flex;
  justify-content: center;
}
.mleft{
  flex-direction: row;
}
.mright{
  flex-direction: row-reverse;
}
.left{
  width: 400px;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 0 8px 0 #0000001c;
  border-radius: 20px;
  margin: 0 10px;
  /* border: 1px solid #888; */
}
.right{
  margin: 0 10px;
}
.info{
  padding: 10px;
}
.table1{
  width: 100%;
}
.table1 td{
  border-top: 1px solid #e7e7e7;
}
.t1{
  background-color: #f1f1f1;
}
.gameBox{
  width: 350px;
  padding: 20px;
  margin: 20px auto;
  position: relative;
}
.gameCover{
  width: 100%;
  height: 100%;
  background-color: #000000b9;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.cover1{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.cover2{
  width: 80% !important;
  height: 80% !important;
  border-radius: 20px;
  background-color: #fff;
  color:black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.gameCover div{
  width: 70%;
  display: flex;
  justify-content: center;
}
.gameCover ul{
  width: 70%;
  font-size: 14px;
}
.table2{
  width: 350px;
  margin: 0 auto;
}
.table2 tr{
  display: flex;
}
.table2 td{
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.numBtn{
  width: 60px;
  height: 60px;
  font-size: 30px;
}
.infoDiv{
  width: 60px;
  height: 60px;
  margin-left: 4px;
  border: 1px solid #DCDFE6;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f5f5f5;
}
.infoDiv1{
  background-color: #dcefe4 !important;
}
.infoDivMax{
  background-color: #e3d08a !important;
}
.arrowLeft, .arrowUp, .arrowUpRight, .arrowUpLeft{
  position: absolute;
  /* background-color: #fff; */
  font-size: 20px;
}
.arrowLeft{
  width: 15px;
  height: 20px;
  left: -8px;
  top:20px;
}
.arrowUp{
  width: 20px;
  height: 15px;
  top: -8px;
  left:20px;
}
.arrowUpRight{
  width: 20px;
  height: 20px;
  top: -8px;
  right:-8px;
  transform: rotate(45deg);
}
.arrowUpLeft{
  width: 20px;
  height: 20px;
  top: -8px;
  left:-8px;
  transform: rotate(-45deg);
}
.selected{
  background-color: #d6eaff;
}

.recordBox{
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 0 8px 0 #0000001c;
  border-radius: 20px;
  width: 500px;
}
.gameBtn{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.rightTop{
  width: 1300px;
  display: flex;
  justify-content: space-between;
}
.recordChartBox{
  width: 750px;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 0 8px 0 #0000001c;
  border-radius: 20px;
  /* height: 200px; */
}
.foot{
  width:100%;
  color: #888;
  font-size: 14px;
}
.foot, .foot div{
  display: flex;
  justify-content: center;
  align-items: center;
}
.foot div{
  margin: 0 10px;
}
</style>
