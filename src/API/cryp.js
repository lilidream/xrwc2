import cryptoJs from "crypto-js";
var crypteObj = function(text){
  return cryptoJs.MD5(text).toString();
}
export default crypteObj;