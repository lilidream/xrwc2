import cryptoJs from "crypto-js";
var crypteObj = {
  encryptFunc:(data)=>{
    var key = "123";
    var iv = "asd";
    // TODO: 增加iv
    var keyHex = cryptoJs.enc.Utf8.parse(key);
    var encrypted = cryptoJs.AES.encrypt(data, keyHex, {
      mode: cryptoJs.mode.ECB,
      // padding: cryptoJs.pad.Pkcs7
    })
    return encrypted.toString();
  }
}
export default crypteObj;