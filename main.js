// 粒子背景特效
function initParticleBackground() {
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas.getContext('2d');
  
  // 设置canvas尺寸
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // 粒子配置
  const particles = [];
  const particleCount = 80;
  const mouse = { x: null, y: null, radius: 100 };
  
  // 鼠标移动监听
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // 粒子类
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = `rgba(74, 144, 226, ${Math.random() * 0.5 + 0.2})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // 边界检测
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
      
      // 鼠标交互
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          this.speedX = -dx * 0.02;
          this.speedY = -dy * 0.02;
        }
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // 初始化粒子
  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // 连接粒子
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  init();
  animate();
}

// 页面加载完成后初始化背景特效
window.addEventListener('load', initParticleBackground);
var md5=(function(){
function MD5(string) {    
var x = Array();    
var k, AA, BB, CC, DD, a, b, c, d;    
var S11 = 7, S12 = 12, S13 = 17, S14 = 22;    
var S21 = 5, S22 = 9, S23 = 14, S24 = 20;    
var S31 = 4, S32 = 11, S33 = 16, S34 = 23;    
var S41 = 6, S42 = 10, S43 = 15, S44 = 21;    
string = Utf8Encode(string);    
x = ConvertToWordArray(string);    
a = 0x67452301;    
b = 0xEFCDAB89;    
c = 0x98BADCFE;    
d = 0x10325476;    
for (k=0; k<x.length; k += 16) {    
AA = a;    
BB = b;    
CC = c;    
DD = d;    
a = FF(a, b, c, d, x[k+0], S11, 0xD76AA478);    
d = FF(d, a, b, c, x[k+1], S12, 0xE8C7B756);    
c = FF(c, d, a, b, x[k+2], S13, 0x242070DB);    
b = FF(b, c, d, a, x[k+3], S14, 0xC1BDCEEE);    
a = FF(a, b, c, d, x[k+4], S11, 0xF57C0FAF);    
d = FF(d, a, b, c, x[k+5], S12, 0x4787C62A);    
c = FF(c, d, a, b, x[k+6], S13, 0xA8304613);    
b = FF(b, c, d, a, x[k+7], S14, 0xFD469501);    
a = FF(a, b, c, d, x[k+8], S11, 0x698098D8);    
d = FF(d, a, b, c, x[k+9], S12, 0x8B44F7AF);    
c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);    
b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);    
a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);    
d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);    
c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);    
b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);    
a = GG(a, b, c, d, x[k+1], S21, 0xF61E2562);    
d = GG(d, a, b, c, x[k+6], S22, 0xC040B340);    
c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);    
b = GG(b, c, d, a, x[k+0], S24, 0xE9B6C7AA);    
a = GG(a, b, c, d, x[k+5], S21, 0xD62F105D);    
d = GG(d, a, b, c, x[k+10], S22, 0x2441453);    
c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);    
b = GG(b, c, d, a, x[k+4], S24, 0xE7D3FBC8);    
a = GG(a, b, c, d, x[k+9], S21, 0x21E1CDE6);    
d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);    
c = GG(c, d, a, b, x[k+3], S23, 0xF4D50D87);    
b = GG(b, c, d, a, x[k+8], S24, 0x455A14ED);    
a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);    
d = GG(d, a, b, c, x[k+2], S22, 0xFCEFA3F8);    
c = GG(c, d, a, b, x[k+7], S23, 0x676F02D9);    
b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);    
a = HH(a, b, c, d, x[k+5], S31, 0xFFFA3942);    
d = HH(d, a, b, c, x[k+8], S32, 0x8771F681);    
c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);    
b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);    
a = HH(a, b, c, d, x[k+1], S31, 0xA4BEEA44);    
d = HH(d, a, b, c, x[k+4], S32, 0x4BDECFA9);    
c = HH(c, d, a, b, x[k+7], S33, 0xF6BB4B60);    
b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);    
a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);    
d = HH(d, a, b, c, x[k+0], S32, 0xEAA127FA);    
c = HH(c, d, a, b, x[k+3], S33, 0xD4EF3085);    
b = HH(b, c, d, a, x[k+6], S34, 0x4881D05);    
a = HH(a, b, c, d, x[k+9], S31, 0xD9D4D039);    
d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);    
c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);    
b = HH(b, c, d, a, x[k+2], S34, 0xC4AC5665);    
a = II(a, b, c, d, x[k+0], S41, 0xF4292244);    
d = II(d, a, b, c, x[k+7], S42, 0x432AFF97);    
c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);    
b = II(b, c, d, a, x[k+5], S44, 0xFC93A039);    
a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);    
d = II(d, a, b, c, x[k+3], S42, 0x8F0CCC92);    
c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);    
b = II(b, c, d, a, x[k+1], S44, 0x85845DD1);    
a = II(a, b, c, d, x[k+8], S41, 0x6FA87E4F);    
d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);    
c = II(c, d, a, b, x[k+6], S43, 0xA3014314);    
b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);    
a = II(a, b, c, d, x[k+4], S41, 0xF7537E82);    
d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);    
c = II(c, d, a, b, x[k+2], S43, 0x2AD7D2BB);    
b = II(b, c, d, a, x[k+9], S44, 0xEB86D391);    
a = AddUnsigned(a, AA);    
b = AddUnsigned(b, BB);    
c = AddUnsigned(c, CC);    
d = AddUnsigned(d, DD);    
}    
var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);    
return temp.toUpperCase();    
}    
function RotateLeft(lValue, iShiftBits) {    
return (lValue << iShiftBits) | (lValue >>> (32-iShiftBits));    
}    
function AddUnsigned(lX, lY) {    
var lX4, lY4, lX8, lY8, lResult;    
lX8 = (lX & 0x80000000);    
lY8 = (lY & 0x80000000);    
lX4 = (lX & 0x40000000);    
lY4 = (lY & 0x40000000);    
lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);    
if (lX4 & lY4) {    
return (lResult ^ 0x80000000 ^ lX8 ^ lY8);    
}    
if (lX4 | lY4) {    
if (lResult & 0x40000000) {    
return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);    
} else {    
return (lResult ^ 0x40000000 ^ lX8 ^ lY8);    
}    
} else {    
return (lResult ^ lX8 ^ lY8);    
}    
}    
function F(x, y, z) {    
return (x & y) | ((~x) & z);    
}    
function G(x, y, z) {    
return (x & z) | (y & (~z));    
}    
function H(x, y, z) {    
return (x ^ y ^ z);    
}    
function I(x, y, z) {    
return (y ^ (x | (~z)));    
}    
function FF(a, b, c, d, x, s, ac) {    
a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));    
return AddUnsigned(RotateLeft(a, s), b);    
}    
function GG(a, b, c, d, x, s, ac) {    
a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));    
return AddUnsigned(RotateLeft(a, s), b);    
}    
function HH(a, b, c, d, x, s, ac) {    
a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));    
return AddUnsigned(RotateLeft(a, s), b);    
}    
function II(a, b, c, d, x, s, ac) {    
a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));    
return AddUnsigned(RotateLeft(a, s), b);    
}    
function ConvertToWordArray(string) {    
var lWordCount;    
var lMessageLength = string.length;    
var lNumberOfWords_temp1 = lMessageLength+8;    
var lNumberOfWords_temp2 = (lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;    
var lNumberOfWords = (lNumberOfWords_temp2+1)*16;    
var lWordArray = Array(lNumberOfWords-1);    
var lBytePosition = 0;    
var lByteCount = 0;    
while (lByteCount<lMessageLength) {    
lWordCount = (lByteCount-(lByteCount%4))/4;    
lBytePosition = (lByteCount%4)*8;    
lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));    
lByteCount++;    
}    
lWordCount = (lByteCount-(lByteCount%4))/4;    
lBytePosition = (lByteCount%4)*8;    
lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);    
lWordArray[lNumberOfWords-2] = lMessageLength << 3;    
lWordArray[lNumberOfWords-1] = lMessageLength >>> 29;    
return lWordArray;    
}    
function WordToHex(lValue) {    
var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;    
for (lCount=0; lCount<=3; lCount++) {    
lByte = (lValue >>> (lCount*8)) & 255;    
WordToHexValue_temp = "0"+lByte.toString(16);    
WordToHexValue = WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2, 2);    
}    
return WordToHexValue;    
}    
function Utf8Encode(string) {    
var utftext = "";    
for (var n = 0; n<string.length; n++) {    
var c = string.charCodeAt(n);    
if (c<128) {    
utftext += String.fromCharCode(c);    
} else if ((c>127) && (c<2048)) {    
utftext += String.fromCharCode((c >> 6) | 192);    
utftext += String.fromCharCode((c & 63) | 128);    
} else {    
utftext += String.fromCharCode((c >> 12) | 224);    
utftext += String.fromCharCode(((c >> 6) & 63) | 128);    
utftext += String.fromCharCode((c & 63) | 128);    
}    
}    
return utftext;    
}
return MD5
}())

let IMG=new Image();
let SIZE=4294967296;
let MZSMshow=true;
let SRC="";
let OPICSRC="";
let INFO1="请先上传图片！";
let INFO2="本页面仅供技术研究使用，请勿用于非法用途，否则后果作者概不负责";

function selectonchange(){
if(["pe1","pe2"].indexOf(document.getElementById("slct").value)==-1){
document.getElementById("ikey2").style.display="none";
document.getElementById("ikey").style.display="inline";
}else{
document.getElementById("ikey").style.display="none";
document.getElementById("ikey2").style.display="inline";
}

}

function xuanze(){
if(MZSMshow){
document.getElementById("mzsm").style.display="none";
MZSMshow=false
}
document.getElementById("ipt").click();
}

function huanyuan(){
    
if(SRC==""){alert(INFO1)}else{
    
setpic(OPICSRC);
document.getElementById("picinfo").innerHTML="&emsp;"

}

}

function baocun(){
    
if(SRC==""){alert(INFO1)}else{
    
let alink=document.createElement("a");
alink.download="pic_"+(parseInt(Date.now()/1000)%Math.pow(36,6) +Math.pow(36,6)).toString(36).slice(1) +".png";
alink.href=SRC;
alink.click();

}

}

function setpic(dturl){
if(SRC){
URL.revokeObjectURL(SRC)
}
SRC=URL.createObjectURL(dataURLtoBlob(dturl));
IMG.src=SRC
document.getElementById("kimg").src=SRC;
}


function dataURLtoBlob(dataurl) {
	 var arr = dataurl.split(',');
	  //注意base64的最后面中括号和引号是不转译的   
	  var _arr = arr[1].substring(0,arr[1].length-2);
	  var mime = arr[0].match(/:(.*?);/)[1],
		  bstr =atob(_arr),
		  n = bstr.length,
		  u8arr = new Uint8Array(n);
	  while (n--) {
		  u8arr[n] = bstr.charCodeAt(n);
	  }
	  return new Blob([u8arr], {
		  type: mime
	  });
  }

function ipt(){
var oFReader = new FileReader();
var ofile = document.getElementById("ipt").files[0];
oFReader.readAsDataURL(ofile);
oFReader.onloadend = function(oFRevent){
var osrc = oFRevent.target.result;
OPICSRC=osrc;
setpic(osrc);
document.getElementById("picinfo").innerHTML="&emsp;"
}
}

function jiami(){
    
if(SRC==""){alert(INFO1)}else{
    
let t=Date.now();
let s="";
let a=document.getElementById("slct").value;
let k=document.getElementById("ikey").value;
let k2=parseFloat(document.getElementById("ikey2").value);

document.getElementById("imgwrap").style.display="none";
document.getElementById("loading").style.display="block";

requestAnimationFrame(function(){
requestAnimationFrame(function(){

if(a=="b"){
    s=encryptB2(IMG,k,32,32);
}else if(a=="c"){
    s=encryptC(IMG,k);
}else if(a=="pe1"){
    s=encryptPE1(IMG,k2);
}else if(a=="pe2"){
    s=encryptPE2(IMG,k2);
}else if(a=="xor"){
    s=encryptXOR(IMG,k);
}else if(a=="rotate"){
    s=encryptRotate(IMG,k);
}else if(a=="chaotic"){  // 新增
    s=encryptChaotic(IMG,k);
}else if(a=="diffusion"){  // 新增
    s=encryptDiffusion(IMG,k);
}else if(a=="arnold"){
    s=encryptArnold(IMG,k);
}else{
    s=encryptC2(IMG,k);
}






setpic(s[0]);
document.getElementById("picinfo").innerHTML="size:&ensp;"+s[1]+"×"+s[2]+"&emsp;time:&ensp;"+(Date.now()-t).toString()+"ms"
document.getElementById("imgwrap").style.display="block";
document.getElementById("loading").style.display="none";
})})

}

}

function jiemi(){
    
if(SRC==""){alert(INFO1)}else{

let t=Date.now();
let s="";
let a=document.getElementById("slct").value;
let k=document.getElementById("ikey").value;
let k2=parseFloat(document.getElementById("ikey2").value);

document.getElementById("imgwrap").style.display="none";
document.getElementById("loading").style.display="block";

requestAnimationFrame(function(){
requestAnimationFrame(function(){

if(a=="b"){
    s=decryptB2(IMG,k,32,32);
}else if(a=="c"){
    s=decryptC(IMG,k);
}else if(a=="pe1"){
    s=decryptPE1(IMG,k2);
}else if(a=="pe2"){
    s=decryptPE2(IMG,k2);
}else if(a=="xor"){
    s=decryptXOR(IMG,k);
}else if(a=="rotate"){
    s=decryptRotate(IMG,k);
}else if(a=="chaotic"){  // 新增
    s=decryptChaotic(IMG,k);
}else if(a=="diffusion"){  // 新增
    s=decryptDiffusion(IMG,k);
}else if(a=="arnold"){
    s=decryptArnold(IMG,k);
}else{
    s=decryptC2(IMG,k);
}




setpic(s[0]);
document.getElementById("kimg").src=SRC;
document.getElementById("picinfo").innerHTML="size:&ensp;"+s[1]+"×"+s[2]+"&emsp;time:&ensp;"+(Date.now()-t).toString()+"ms"
document.getElementById("imgwrap").style.display="block";
document.getElementById("loading").style.display="none";
})})

}

}




//随机打乱
function amess(arrlength,ast) {
var rand,temp;
var arr=new Array(arrlength).fill(0).map((a,b)=>b);
for(let i=arrlength-1; i>0 ; i-=1) {
rand = parseInt(md5(ast+i.toString()).substr(0,7),16)%(i+1);
temp = arr[rand];
arr[rand] = arr[i]
arr[i] = temp;
}
return arr;
}


//块混淆

function encryptB2(img1,key,sx,sy){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var wid1=wid;
var hit1=hit;
var imgdata;
var oimgdata;
var xl=new Array();
var yl=new Array();
var k=8;
var m=0;
var n=0;
var ssx;
var ssy;
//缩放大小
if(wid * hit > SIZE){
wid=parseInt(Math.pow(SIZE*img1.width/img1.height,1/2));
hit=parseInt(Math.pow(SIZE*img1.height/img1.width,1/2));
}

wid1=wid;
hit1=hit;

while(wid % sx >0){
wid++
}
while(hit % sy >0){
hit++
}

ssx=wid/sx;
ssy=hit/sy;

cv.width=wid;
cv.height=hit;

cvd.drawImage(img1,0,0,wid1,hit1);
cvd.drawImage(img1,0,hit1,wid1,hit1);
cvd.drawImage(img1,wid1,0,wid1,hit1);
cvd.drawImage(img1,wid1,hit1,wid1,hit1);

imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

xl=amess(sx,key);
yl=amess(sy,key);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=i;
n=j;
m=(xl[((n/ssy) | 0)%sx]*ssx+m)%wid;
m=xl[(m/ssx)|0]*ssx+m%ssx;
n=(yl[((m/ssx) | 0)%sy]*ssy+n)%hit;
n=yl[(n/ssy)|0]*ssy+n%ssy;

oimgdata.data[4*(i+j*wid)]=imgdata.data[4*(m+n*wid)];
oimgdata.data[4*(i+j*wid)+1]=imgdata.data[4*(m+n*wid)+1];
oimgdata.data[4*(i+j*wid)+2]=imgdata.data[4*(m+n*wid)+2];
oimgdata.data[4*(i+j*wid)+3]=imgdata.data[4*(m+n*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}

function decryptB2(img1,key,sx,sy){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var wid1=wid;
var hit1=hit;
var imgdata;
var oimgdata;
var xl=new Array();
var yl=new Array();
var k=8;
var m=0;
var n=0;
var ssx;
var ssy;

wid1=wid;
hit1=hit;

while(wid % sx >0){
wid++
}
while(hit % sy >0){
hit++
}

ssx=wid/sx;
ssy=hit/sy;

cv.width=wid;
cv.height=hit;

cvd.drawImage(img1,0,0,wid1,hit1);
cvd.drawImage(img1,0,hit1,wid1,hit1);
cvd.drawImage(img1,wid1,0,wid1,hit1);
cvd.drawImage(img1,wid1,hit1,wid1,hit1);


imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

xl=amess(sx,key);
yl=amess(sy,key);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=i;
n=j;
m=(xl[((n/ssy) | 0)%sx]*ssx+m)%wid;
m=xl[(m/ssx)|0]*ssx+m%ssx;
n=(yl[((m/ssx) | 0)%sy]*ssy+n)%hit;
n=yl[(n/ssy)|0]*ssy+n%ssy;

oimgdata.data[4*(m+n*wid)]=imgdata.data[4*(i+j*wid)];
oimgdata.data[4*(m+n*wid)+1]=imgdata.data[4*(i+j*wid)+1];
oimgdata.data[4*(m+n*wid)+2]=imgdata.data[4*(i+j*wid)+2];
oimgdata.data[4*(m+n*wid)+3]=imgdata.data[4*(i+j*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}






//算法C,逐像素混淆
function encryptC(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var xl=new Array();
var yl=new Array();
var m=0;
var n=0;

//缩放大小
if(wid * hit > SIZE){
wid=parseInt(Math.pow(SIZE*img1.width/img1.height,1/2));
hit=parseInt(Math.pow(SIZE*img1.height/img1.width,1/2));
}

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

xl=amess(wid,key);
yl=amess(hit,key);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=i;
n=j;
m=(xl[n%wid]+m)%wid;
m=xl[m];
n=(yl[m%hit]+n)%hit;
n=yl[n];

oimgdata.data[4*(i+j*wid)]=imgdata.data[4*(m+n*wid)];
oimgdata.data[4*(i+j*wid)+1]=imgdata.data[4*(m+n*wid)+1];
oimgdata.data[4*(i+j*wid)+2]=imgdata.data[4*(m+n*wid)+2];
oimgdata.data[4*(i+j*wid)+3]=imgdata.data[4*(m+n*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}

function decryptC(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var xl=new Array();
var yl=new Array();
var m=0;
var n=0;

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

xl=amess(wid,key);
yl=amess(hit,key);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=i;
n=j;
m=(xl[n%wid]+m)%wid;
m=xl[m];
n=(yl[m%hit]+n)%hit;
n=yl[n];

oimgdata.data[4*(m+n*wid)]=imgdata.data[4*(i+j*wid)];
oimgdata.data[4*(m+n*wid)+1]=imgdata.data[4*(i+j*wid)+1];
oimgdata.data[4*(m+n*wid)+2]=imgdata.data[4*(i+j*wid)+2];
oimgdata.data[4*(m+n*wid)+3]=imgdata.data[4*(i+j*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}



//行像素混淆
function encryptC2(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var xl=new Array();
var yl=new Array();
var m=0;
var n=0;

//缩放大小
if(wid * hit > SIZE){
wid=parseInt(Math.pow(SIZE*img1.width/img1.height,1/2));
hit=parseInt(Math.pow(SIZE*img1.height/img1.width,1/2));
}

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

xl=amess(wid,key);
yl=amess(hit,key);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=i;
n=j;
m=(xl[n%wid]+m)%wid;
m=xl[m];


oimgdata.data[4*(i+j*wid)]=imgdata.data[4*(m+n*wid)];
oimgdata.data[4*(i+j*wid)+1]=imgdata.data[4*(m+n*wid)+1];
oimgdata.data[4*(i+j*wid)+2]=imgdata.data[4*(m+n*wid)+2];
oimgdata.data[4*(i+j*wid)+3]=imgdata.data[4*(m+n*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}

function decryptC2(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var xl=new Array();
var yl=new Array();
var m=0;
var n=0;

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

xl=amess(wid,key);
yl=amess(hit,key);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=i;
n=j;
m=(xl[n%wid]+m)%wid;
m=xl[m];


oimgdata.data[4*(m+n*wid)]=imgdata.data[4*(i+j*wid)];
oimgdata.data[4*(m+n*wid)+1]=imgdata.data[4*(i+j*wid)+1];
oimgdata.data[4*(m+n*wid)+2]=imgdata.data[4*(i+j*wid)+2];
oimgdata.data[4*(m+n*wid)+3]=imgdata.data[4*(i+j*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}




//picencrypt算法

function produceLogisticSort(a,b){
return a[0]-b[0]
}
function produceLogistic(x1,n){
let l=new Array(n);
let x=x1;
l[0]=[x,0];
for(let i=1;i<n;i++){
x=3.9999999*x*(1-x);
l[i]=[x,i]
}
return l
}

//行混淆
function encryptPE1(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var arrayaddress=new Array();
var m=0;
var n=0;

//缩放大小
if(wid * hit > SIZE){
wid=parseInt(Math.pow(SIZE*img1.width/img1.height,1/2));
hit=parseInt(Math.pow(SIZE*img1.height/img1.width,1/2));
}

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

arrayaddress=produceLogistic(key,wid).sort(produceLogisticSort).map(x=>x[1]);

for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=arrayaddress[i];


oimgdata.data[4*(i+j*wid)]=imgdata.data[4*(m+j*wid)];
oimgdata.data[4*(i+j*wid)+1]=imgdata.data[4*(m+j*wid)+1];
oimgdata.data[4*(i+j*wid)+2]=imgdata.data[4*(m+j*wid)+2];
oimgdata.data[4*(i+j*wid)+3]=imgdata.data[4*(m+j*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}

function decryptPE1(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var arrayaddress=new Array();
var m=0;
var n=0;

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);

arrayaddress=produceLogistic(key,wid).sort(produceLogisticSort).map(x=>x[1]);


for(let i=0;i<wid;i++){
for(let j=0;j<hit;j++){
m=arrayaddress[i];


oimgdata.data[4*(m+j*wid)]=imgdata.data[4*(i+j*wid)];
oimgdata.data[4*(m+j*wid)+1]=imgdata.data[4*(i+j*wid)+1];
oimgdata.data[4*(m+j*wid)+2]=imgdata.data[4*(i+j*wid)+2];
oimgdata.data[4*(m+j*wid)+3]=imgdata.data[4*(i+j*wid)+3];
}
}
cvd.putImageData(oimgdata,0,0);
return [cv.toDataURL(),wid,hit]
}






//行+列混淆
function encryptPE2(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var o2imgdata;
var arrayaddress=new Array();
var x=key;
var m=0;
var n=0;


if(wid * hit > SIZE){
wid=parseInt(Math.pow(SIZE*img1.width/img1.height,1/2));
hit=parseInt(Math.pow(SIZE*img1.height/img1.width,1/2));
}

cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);
o2imgdata=cvd.createImageData(wid,hit);

for(let j=0;j<hit;j++){
arrayaddress=produceLogistic(x,wid);
x=arrayaddress[wid-1][0];
arrayaddress=arrayaddress.sort(produceLogisticSort).map(a=>a[1])
for(let i=0;i<wid;i++){
m=arrayaddress[i];


oimgdata.data[4*(i+j*wid)]=imgdata.data[4*(m+j*wid)];
oimgdata.data[4*(i+j*wid)+1]=imgdata.data[4*(m+j*wid)+1];
oimgdata.data[4*(i+j*wid)+2]=imgdata.data[4*(m+j*wid)+2];
oimgdata.data[4*(i+j*wid)+3]=imgdata.data[4*(m+j*wid)+3];
}
}


x=key;
for(let i=0;i<wid;i++){
arrayaddress=produceLogistic(x,hit);
x=arrayaddress[hit-1][0];
arrayaddress=arrayaddress.sort(produceLogisticSort).map(a=>a[1])
for(let j=0;j<hit;j++){
n=arrayaddress[j];



o2imgdata.data[4*(i+j*wid)]=oimgdata.data[4*(i+n*wid)];
o2imgdata.data[4*(i+j*wid)+1]=oimgdata.data[4*(i+n*wid)+1];
o2imgdata.data[4*(i+j*wid)+2]=oimgdata.data[4*(i+n*wid)+2];
o2imgdata.data[4*(i+j*wid)+3]=oimgdata.data[4*(i+n*wid)+3];
}
}


cvd.putImageData(o2imgdata,0,0);
return [cv.toDataURL(),wid,hit]
}


function decryptPE2(img1,key){
var cv=document.createElement("canvas");
var cvd=cv.getContext("2d");
var wid=img1.width;
var hit=img1.height;
var imgdata;
var oimgdata;
var o2imgdata;
var arrayaddress=new Array();
var x=key;
var m=0;
var n=0;


cv.width=wid;
cv.height=hit;
cvd.drawImage(img1,0,0,wid,hit);
imgdata=cvd.getImageData(0,0,wid,hit);
oimgdata=cvd.createImageData(wid,hit);
o2imgdata=cvd.createImageData(wid,hit);


for(let i=0;i<wid;i++){
arrayaddress=produceLogistic(x,hit);
x=arrayaddress[hit-1][0];
arrayaddress=arrayaddress.sort(produceLogisticSort).map(a=>a[1])
for(let j=0;j<hit;j++){
n=arrayaddress[j];


oimgdata.data[4*(i+n*wid)]=imgdata.data[4*(i+j*wid)];
oimgdata.data[4*(i+n*wid)+1]=imgdata.data[4*(i+j*wid)+1];
oimgdata.data[4*(i+n*wid)+2]=imgdata.data[4*(i+j*wid)+2];
oimgdata.data[4*(i+n*wid)+3]=imgdata.data[4*(i+j*wid)+3];
}
}
x=key;
for(let j=0;j<hit;j++){
arrayaddress=produceLogistic(x,wid);
x=arrayaddress[wid-1][0];
arrayaddress=arrayaddress.sort(produceLogisticSort).map(a=>a[1])
for(let i=0;i<wid;i++){
m=arrayaddress[i];


o2imgdata.data[4*(m+j*wid)]=oimgdata.data[4*(i+j*wid)];
o2imgdata.data[4*(m+j*wid)+1]=oimgdata.data[4*(i+j*wid)+1];
o2imgdata.data[4*(m+j*wid)+2]=oimgdata.data[4*(i+j*wid)+2];
o2imgdata.data[4*(m+j*wid)+3]=oimgdata.data[4*(i+j*wid)+3];
}
}





cvd.putImageData(o2imgdata,0,0);
return [cv.toDataURL(),wid,hit]
}


// XOR像素混淆算法
function encryptXOR(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    // 缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1/2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1/2));
    }
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var oimgdata = cvd.createImageData(wid, hit);
    
    // 使用MD5生成密钥流
    var keyStream = md5(key + "xor_salt");
    var keyIndex = 0;
    
    for (let i = 0; i < imgdata.data.length; i++) {
        // 对每个像素的RGB值进行XOR操作，跳过Alpha通道
        if ((i + 1) % 4 !== 0) {
            var keyByte = keyStream.charCodeAt(keyIndex % keyStream.length);
            oimgdata.data[i] = imgdata.data[i] ^ keyByte;
            keyIndex++;
        } else {
            oimgdata.data[i] = imgdata.data[i]; // Alpha通道保持不变
        }
    }
    
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

function decryptXOR(img1, key) {
    // XOR加密和解密使用相同的算法
    return encryptXOR(img1, key);
}

// 分块旋转混淆算法
function encryptRotate(img1, key, blockSize = 32) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    // 缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1/2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1/2));
    }
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var oimgdata = cvd.createImageData(wid, hit);
    
    // 生成随机旋转模式
    var rotationMap = [];
    var blocksX = Math.ceil(wid / blockSize);
    var blocksY = Math.ceil(hit / blockSize);
    
    // 为每个块生成旋转角度（0°, 90°, 180°, 270°）
    for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
            var hash = md5(key + bx + "," + by);
            var rotation = parseInt(hash.charAt(0), 16) % 4; // 0-3对应不同的旋转角度
            
            rotationMap[bx + by * blocksX] = rotation;
            
            // 处理当前块
            for (let y = 0; y < blockSize; y++) {
                for (let x = 0; x < blockSize; x++) {
                    var origX = bx * blockSize + x;
                    var origY = by * blockSize + y;
                    
                    if (origX >= wid || origY >= hit) continue;
                    
                    var newX, newY;
                    
                    // 根据旋转角度计算新坐标
                    switch (rotation) {
                        case 0: // 0° - 不旋转
                            newX = origX;
                            newY = origY;
                            break;
                        case 1: // 90° 顺时针
                            newX = bx * blockSize + (blockSize - 1 - y);
                            newY = by * blockSize + x;
                            break;
                        case 2: // 180°
                            newX = bx * blockSize + (blockSize - 1 - x);
                            newY = by * blockSize + (blockSize - 1 - y);
                            break;
                        case 3: // 270° 顺时针（或90°逆时针）
                            newX = bx * blockSize + y;
                            newY = by * blockSize + (blockSize - 1 - x);
                            break;
                    }
                    
                    // 确保新坐标在图像范围内
                    if (newX >= wid) newX = wid - 1;
                    if (newY >= hit) newY = hit - 1;
                    if (newX < 0) newX = 0;
                    if (newY < 0) newY = 0;
                    
                    var origIndex = 4 * (origX + origY * wid);
                    var newIndex = 4 * (newX + newY * wid);
                    
                    // 复制像素数据
                    oimgdata.data[newIndex] = imgdata.data[origIndex];
                    oimgdata.data[newIndex + 1] = imgdata.data[origIndex + 1];
                    oimgdata.data[newIndex + 2] = imgdata.data[origIndex + 2];
                    oimgdata.data[newIndex + 3] = imgdata.data[origIndex + 3];
                }
            }
        }
    }
    
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

function decryptRotate(img1, key, blockSize = 32) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var oimgdata = cvd.createImageData(wid, hit);
    
    // 生成随机旋转模式（与加密时相同）
    var rotationMap = [];
    var blocksX = Math.ceil(wid / blockSize);
    var blocksY = Math.ceil(hit / blockSize);
    
    for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
            var hash = md5(key + bx + "," + by);
            var rotation = parseInt(hash.charAt(0), 16) % 4;
            rotationMap[bx + by * blocksX] = rotation;
            
            // 解密时使用逆旋转
            var inverseRotation = (4 - rotation) % 4;
            
            for (let y = 0; y < blockSize; y++) {
                for (let x = 0; x < blockSize; x++) {
                    var origX = bx * blockSize + x;
                    var origY = by * blockSize + y;
                    
                    if (origX >= wid || origY >= hit) continue;
                    
                    var newX, newY;
                    
                    // 使用逆旋转恢复原始位置
                    switch (inverseRotation) {
                        case 0: // 0°
                            newX = origX;
                            newY = origY;
                            break;
                        case 1: // 逆时针90°（相当于顺时针270°）
                            newX = bx * blockSize + y;
                            newY = by * blockSize + (blockSize - 1 - x);
                            break;
                        case 2: // 180°
                            newX = bx * blockSize + (blockSize - 1 - x);
                            newY = by * blockSize + (blockSize - 1 - y);
                            break;
                        case 3: // 逆时针270°（相当于顺时针90°）
                            newX = bx * blockSize + (blockSize - 1 - y);
                            newY = by * blockSize + x;
                            break;
                    }
                    
                    if (newX >= wid) newX = wid - 1;
                    if (newY >= hit) newY = hit - 1;
                    if (newX < 0) newX = 0;
                    if (newY < 0) newY = 0;
                    
                    var origIndex = 4 * (origX + origY * wid);
                    var newIndex = 4 * (newX + newY * wid);
                    
                    oimgdata.data[newIndex] = imgdata.data[origIndex];
                    oimgdata.data[newIndex + 1] = imgdata.data[origIndex + 1];
                    oimgdata.data[newIndex + 2] = imgdata.data[origIndex + 2];
                    oimgdata.data[newIndex + 3] = imgdata.data[origIndex + 3];
                }
            }
        }
    }
    
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

// 完全重写的混沌映射像素置乱算法
function encryptChaotic(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    // 合理限制尺寸
    var maxPixels = 1000000; // 100万像素
    if (wid * hit > maxPixels) {
        var scale = Math.sqrt(maxPixels / (wid * hit));
        wid = Math.floor(wid * scale);
        hit = Math.floor(hit * scale);
    }
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var data = imgdata.data;
    
    // 生成确定性混沌序列
    var keyHash = md5(key + "chaotic_encrypt");
    var seed = 0;
    for (let i = 0; i < 8; i++) {
        seed = (seed * 256 + keyHash.charCodeAt(i)) % 2147483647;
    }
    seed = seed / 2147483647;
    
    var chaoticValue = seed;
    var pixelCount = wid * hit;
    
    // 生成混沌序列作为索引映射
    var chaoticSequence = new Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
        chaoticValue = 3.9999 * chaoticValue * (1 - chaoticValue);
        chaoticSequence[i] = chaoticValue;
    }
    
    // 创建索引数组并排序
    var indices = new Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
        indices[i] = {value: chaoticSequence[i], index: i};
    }
    
    // 按混沌值排序
    indices.sort((a, b) => a.value - b.value);
    
    // 创建映射表：原始位置 -> 新位置
    var mapping = new Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
        mapping[indices[i].index] = i;
    }
    
    // 应用像素置乱
    var newData = new Uint8ClampedArray(data.length);
    for (let i = 0; i < pixelCount; i++) {
        var newPos = mapping[i];
        var origIndex = i * 4;
        var newIndex = newPos * 4;
        
        newData[newIndex] = data[origIndex];
        newData[newIndex + 1] = data[origIndex + 1];
        newData[newIndex + 2] = data[origIndex + 2];
        newData[newIndex + 3] = data[origIndex + 3];
    }
    
    var oimgdata = new ImageData(newData, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

function decryptChaotic(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var data = imgdata.data;
    
    // 使用相同的密钥生成混沌序列
    var keyHash = md5(key + "chaotic_encrypt");
    var seed = 0;
    for (let i = 0; i < 8; i++) {
        seed = (seed * 256 + keyHash.charCodeAt(i)) % 2147483647;
    }
    seed = seed / 2147483647;
    
    var chaoticValue = seed;
    var pixelCount = wid * hit;
    
    // 生成相同的混沌序列
    var chaoticSequence = new Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
        chaoticValue = 3.9999 * chaoticValue * (1 - chaoticValue);
        chaoticSequence[i] = chaoticValue;
    }
    
    // 创建索引数组并排序（与加密时相同）
    var indices = new Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
        indices[i] = {value: chaoticSequence[i], index: i};
    }
    
    indices.sort((a, b) => a.value - b.value);
    
    // 创建逆映射表：新位置 -> 原始位置
    var inverseMapping = new Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
        inverseMapping[i] = indices[i].index;
    }
    
    // 应用逆映射恢复图像
    var newData = new Uint8ClampedArray(data.length);
    for (let i = 0; i < pixelCount; i++) {
        var origPos = inverseMapping[i];
        var encryptedIndex = i * 4;
        var originalIndex = origPos * 4;
        
        newData[originalIndex] = data[encryptedIndex];
        newData[originalIndex + 1] = data[encryptedIndex + 1];
        newData[originalIndex + 2] = data[encryptedIndex + 2];
        newData[originalIndex + 3] = data[encryptedIndex + 3];
    }
    
    var oimgdata = new ImageData(newData, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}




// 修复后的分块扩散混淆算法
function encryptDiffusion(img1, key, blockSize = 16, iterations = 2) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    // 确保宽度和高度是blockSize的整数倍
    var paddedWid = Math.ceil(wid / blockSize) * blockSize;
    var paddedHit = Math.ceil(hit / blockSize) * blockSize;
    
    cv.width = paddedWid;
    cv.height = paddedHit;
    
    // 绘制原图到画布，超出部分透明
    cvd.fillStyle = 'white';
    cvd.fillRect(0, 0, paddedWid, paddedHit);
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, paddedWid, paddedHit);
    var data = imgdata.data;
    
    // 使用密钥生成Arnold映射参数
    var keyHash = md5(key);
    var a = 1 + (parseInt(keyHash.substr(0, 4), 16) % 10);
    var b = 1 + (parseInt(keyHash.substr(4, 4), 16) % 10);
    
    var blocksX = paddedWid / blockSize;
    var blocksY = paddedHit / blockSize;
    
    // 多轮迭代
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);
        
        for (let by = 0; by < blocksY; by++) {
            for (let bx = 0; bx < blocksX; bx++) {
                // 对每个块应用Arnold猫映射
                var blockData = new Uint8ClampedArray(blockSize * blockSize * 4);
                
                // 提取块数据
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var origX = bx * blockSize + x;
                        var origY = by * blockSize + y;
                        var origIdx = (origY * paddedWid + origX) * 4;
                        var blockIdx = (y * blockSize + x) * 4;
                        
                        for (let c = 0; c < 4; c++) {
                            blockData[blockIdx + c] = data[origIdx + c];
                        }
                    }
                }
                
                // Arnold猫映射扩散
                var diffusedBlock = new Uint8ClampedArray(blockData.length);
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        // Arnold映射公式
                        var newX = (x + a * y) % blockSize;
                        var newY = (b * x + (a * b + 1) * y) % blockSize;
                        
                        if (newX < 0) newX += blockSize;
                        if (newY < 0) newY += blockSize;
                        
                        var origIdx = (y * blockSize + x) * 4;
                        var newIdx = (newY * blockSize + newX) * 4;
                        
                        for (let c = 0; c < 4; c++) {
                            diffusedBlock[newIdx + c] = blockData[origIdx + c];
                        }
                    }
                }
                
                // 将扩散后的块数据写回
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var destX = bx * blockSize + x;
                        var destY = by * blockSize + y;
                        var destIdx = (destY * paddedWid + destX) * 4;
                        var blockIdx = (y * blockSize + x) * 4;
                        
                        for (let c = 0; c < 4; c++) {
                            newData[destIdx + c] = diffusedBlock[blockIdx + c];
                        }
                    }
                }
            }
        }
        data = newData;
    }
    
    var oimgdata = new ImageData(data, paddedWid, paddedHit);
    cvd.putImageData(oimgdata, 0, 0);
    
    // 裁剪回原始尺寸
    var resultCanvas = document.createElement("canvas");
    var resultCtx = resultCanvas.getContext("2d");
    resultCanvas.width = wid;
    resultCanvas.height = hit;
    resultCtx.drawImage(cv, 0, 0, wid, hit);
    
    return [resultCanvas.toDataURL(), wid, hit];
}

function decryptDiffusion(img1, key, blockSize = 16, iterations = 2) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    // 确保宽度和高度是blockSize的整数倍
    var paddedWid = Math.ceil(wid / blockSize) * blockSize;
    var paddedHit = Math.ceil(hit / blockSize) * blockSize;
    
    cv.width = paddedWid;
    cv.height = paddedHit;
    
    // 绘制原图到画布，超出部分透明
    cvd.fillStyle = 'white';
    cvd.fillRect(0, 0, paddedWid, paddedHit);
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, paddedWid, paddedHit);
    var data = imgdata.data;
    
    // 使用相同的密钥生成Arnold映射参数
    var keyHash = md5(key);
    var a = 1 + (parseInt(keyHash.substr(0, 4), 16) % 10);
    var b = 1 + (parseInt(keyHash.substr(4, 4), 16) % 10);
    
    var blocksX = paddedWid / blockSize;
    var blocksY = paddedHit / blockSize;
    
    // 多轮迭代（逆向）
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);
        
        for (let by = 0; by < blocksY; by++) {
            for (let bx = 0; bx < blocksX; bx++) {
                // 对每个块应用逆向Arnold猫映射
                var blockData = new Uint8ClampedArray(blockSize * blockSize * 4);
                
                // 提取块数据
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var origX = bx * blockSize + x;
                        var origY = by * blockSize + y;
                        var origIdx = (origY * paddedWid + origX) * 4;
                        var blockIdx = (y * blockSize + x) * 4;
                        
                        for (let c = 0; c < 4; c++) {
                            blockData[blockIdx + c] = data[origIdx + c];
                        }
                    }
                }
                
                // 逆向Arnold猫映射
                var invertedBlock = new Uint8ClampedArray(blockData.length);
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        // 逆向Arnold映射公式
                        var newX = ((a * b + 1) * x - a * y) % blockSize;
                        var newY = (-b * x + y) % blockSize;
                        
                        if (newX < 0) newX += blockSize;
                        if (newY < 0) newY += blockSize;
                        
                        var origIdx = (y * blockSize + x) * 4;
                        var newIdx = (newY * blockSize + newX) * 4;
                        
                        for (let c = 0; c < 4; c++) {
                            invertedBlock[newIdx + c] = blockData[origIdx + c];
                        }
                    }
                }
                
                // 将逆向扩散后的块数据写回
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var destX = bx * blockSize + x;
                        var destY = by * blockSize + y;
                        var destIdx = (destY * paddedWid + destX) * 4;
                        var blockIdx = (y * blockSize + x) * 4;
                        
                        for (let c = 0; c < 4; c++) {
                            newData[destIdx + c] = invertedBlock[blockIdx + c];
                        }
                    }
                }
            }
        }
        data = newData;
    }
    
    var oimgdata = new ImageData(data, paddedWid, paddedHit);
    cvd.putImageData(oimgdata, 0, 0);
    
    // 裁剪回原始尺寸
    var resultCanvas = document.createElement("canvas");
    var resultCtx = resultCanvas.getContext("2d");
    resultCanvas.width = wid;
    resultCanvas.height = hit;
    resultCtx.drawImage(cv, 0, 0, wid, hit);
    
    return [resultCanvas.toDataURL(), wid, hit];
}


// 修复后的Arnold变换算法
function encryptArnold(img1, key, iterations = 5) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    // 保持原始尺寸
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var data = imgdata.data;
    
    // 使用密钥生成变换参数
    var keyHash = md5(key + "arnold");
    var a = 1 + (parseInt(keyHash.substr(0, 2), 16) % 3);
    var b = 1 + (parseInt(keyHash.substr(2, 2), 16) % 3);
    
    // 对图像中的最大正方形区域进行Arnold变换
    var squareSize = Math.min(wid, hit);
    
    // 多轮Arnold变换
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);
        
        // 只处理正方形区域
        for (let y = 0; y < squareSize; y++) {
            for (let x = 0; x < squareSize; x++) {
                // Arnold变换公式
                var newX = (x + a * y) % squareSize;
                var newY = (b * x + (a * b + 1) * y) % squareSize;
                
                // 计算原始图像中的实际位置
                var offsetX = Math.floor((wid - squareSize) / 2);
                var offsetY = Math.floor((hit - squareSize) / 2);
                
                var origX = offsetX + x;
                var origY = offsetY + y;
                var newOrigX = offsetX + newX;
                var newOrigY = offsetY + newY;
                
                // 确保坐标在有效范围内
                if (origX >= 0 && origX < wid && origY >= 0 && origY < hit &&
                    newOrigX >= 0 && newOrigX < wid && newOrigY >= 0 && newOrigY < hit) {
                    
                    var origIndex = (origY * wid + origX) * 4;
                    var newIndex = (newOrigY * wid + newOrigX) * 4;
                    
                    // 交换像素数据
                    for (let c = 0; c < 4; c++) {
                        newData[newIndex + c] = data[origIndex + c];
                    }
                }
            }
        }
        data = newData;
    }
    
    var oimgdata = new ImageData(data, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

function decryptArnold(img1, key, iterations = 5) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var data = imgdata.data;
    
    var keyHash = md5(key + "arnold");
    var a = 1 + (parseInt(keyHash.substr(0, 2), 16) % 3);
    var b = 1 + (parseInt(keyHash.substr(2, 2), 16) % 3);
    
    // 对图像中的最大正方形区域进行逆向Arnold变换
    var squareSize = Math.min(wid, hit);
    
    // 逆向多轮变换
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);
        
        // 只处理正方形区域
        for (let y = 0; y < squareSize; y++) {
            for (let x = 0; x < squareSize; x++) {
                // 逆向Arnold变换
                var newX = ((a * b + 1) * x - a * y) % squareSize;
                var newY = (-b * x + y) % squareSize;
                
                // 处理负值
                if (newX < 0) newX += squareSize;
                if (newY < 0) newY += squareSize;
                
                // 计算原始图像中的实际位置
                var offsetX = Math.floor((wid - squareSize) / 2);
                var offsetY = Math.floor((hit - squareSize) / 2);
                
                var origX = offsetX + x;
                var origY = offsetY + y;
                var newOrigX = offsetX + newX;
                var newOrigY = offsetY + newY;
                
                // 确保坐标在有效范围内
                if (origX >= 0 && origX < wid && origY >= 0 && origY < hit &&
                    newOrigX >= 0 && newOrigX < wid && newOrigY >= 0 && newOrigY < hit) {
                    
                    var origIndex = (origY * wid + origX) * 4;
                    var newIndex = (newOrigY * wid + newOrigX) * 4;
                    
                    // 交换像素数据（逆向恢复）
                    for (let c = 0; c < 4; c++) {
                        newData[newIndex + c] = data[origIndex + c];
                    }
                }
            }
        }
        data = newData;
    }
    
    var oimgdata = new ImageData(data, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

// 改进的Arnold变换算法（分块处理，适用于任意尺寸）
function encryptArnold(img1, key, blockSize = 64, iterations = 3) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var data = imgdata.data;
    
    // 使用密钥生成变换参数
    var keyHash = md5(key + "arnold_improved");
    var a = 1 + (parseInt(keyHash.substr(0, 2), 16) % 3);
    var b = 1 + (parseInt(keyHash.substr(2, 2), 16) % 3);
    
    // 分块处理
    var blocksX = Math.ceil(wid / blockSize);
    var blocksY = Math.ceil(hit / blockSize);
    
    // 多轮Arnold变换
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);
        
        // 对每个块进行处理
        for (let by = 0; by < blocksY; by++) {
            for (let bx = 0; bx < blocksX; bx++) {
                // 处理当前块
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var origX = bx * blockSize + x;
                        var origY = by * blockSize + y;
                        
                        if (origX >= wid || origY >= hit) continue;
                        
                        // Arnold变换公式
                        var newX = (x + a * y) % blockSize;
                        var newY = (b * x + (a * b + 1) * y) % blockSize;
                        
                        var newOrigX = bx * blockSize + newX;
                        var newOrigY = by * blockSize + newY;
                        
                        // 边界检查
                        if (newOrigX >= wid) newOrigX = wid - 1;
                        if (newOrigY >= hit) newOrigY = hit - 1;
                        
                        var origIndex = (origY * wid + origX) * 4;
                        var newIndex = (newOrigY * wid + newOrigX) * 4;
                        
                        // 交换像素数据
                        for (let c = 0; c < 4; c++) {
                            newData[newIndex + c] = data[origIndex + c];
                        }
                    }
                }
            }
        }
        data = newData;
    }
    
    var oimgdata = new ImageData(data, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

function decryptArnold(img1, key, blockSize = 64, iterations = 3) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    
    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    
    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var data = imgdata.data;
    
    var keyHash = md5(key + "arnold_improved");
    var a = 1 + (parseInt(keyHash.substr(0, 2), 16) % 3);
    var b = 1 + (parseInt(keyHash.substr(2, 2), 16) % 3);
    
    // 分块处理
    var blocksX = Math.ceil(wid / blockSize);
    var blocksY = Math.ceil(hit / blockSize);
    
    // 逆向多轮变换
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);
        
        // 对每个块进行逆向处理
        for (let by = 0; by < blocksY; by++) {
            for (let bx = 0; bx < blocksX; bx++) {
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var origX = bx * blockSize + x;
                        var origY = by * blockSize + y;
                        
                        if (origX >= wid || origY >= hit) continue;
                        
                        // 逆向Arnold变换
                        var newX = ((a * b + 1) * x - a * y) % blockSize;
                        var newY = (-b * x + y) % blockSize;
                        
                        // 处理负值
                        if (newX < 0) newX += blockSize;
                        if (newY < 0) newY += blockSize;
                        
                        var newOrigX = bx * blockSize + newX;
                        var newOrigY = by * blockSize + newY;
                        
                        // 边界检查
                        if (newOrigX >= wid) newOrigX = wid - 1;
                        if (newOrigY >= hit) newOrigY = hit - 1;
                        
                        var origIndex = (origY * wid + origX) * 4;
                        var newIndex = (newOrigY * wid + newOrigX) * 4;
                        
                        // 交换像素数据（逆向恢复）
                        for (let c = 0; c < 4; c++) {
                            newData[newIndex + c] = data[origIndex + c];
                        }
                    }
                }
            }
        }
        data = newData;
    }
    
    var oimgdata = new ImageData(data, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}
