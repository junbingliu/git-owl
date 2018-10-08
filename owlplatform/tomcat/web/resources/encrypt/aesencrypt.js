function encrypt(word,key,iv){
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv  = CryptoJS.enc.Utf8.parse(iv);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
    return encrypted.toString();
}