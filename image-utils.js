let IMG = new Image();
let SIZE = 4294967296;
let MZSMshow = true;
let SRC = "";
let OPICSRC = "";
let INFO1 = "请先上传图片！";
let INFO2 = "本页面仅供技术研究使用，请勿用于非法用途，否则后果作者概不负责";

function selectonchange() {
    if (["pe1", "pe2"].indexOf(document.getElementById("slct").value) == -1) {
        document.getElementById("ikey2").style.display = "none";
        document.getElementById("ikey").style.display = "inline";
    } else {
        document.getElementById("ikey").style.display = "none";
        document.getElementById("ikey2").style.display = "inline";
    }

}

function xuanze() {
    if (MZSMshow) {
        document.getElementById("mzsm").style.display = "none";
        MZSMshow = false
    }
    document.getElementById("ipt").click();
}

function huanyuan() {

    if (SRC == "") {
        alert(INFO1)
    } else {

        setpic(OPICSRC);
        document.getElementById("picinfo").innerHTML = "&emsp;"

    }

}

function baocun() {

    if (SRC == "") {
        alert(INFO1)
    } else {

        let alink = document.createElement("a");
        alink.download = "pic_" + (parseInt(Date.now() / 1000) % Math.pow(36, 6) + Math.pow(36, 6)).toString(36).slice(1) + ".png";
        alink.href = SRC;
        alink.click();

    }

}

// function setpic(dturl){
// if(SRC){
// URL.revokeObjectURL(SRC)
// }
// SRC=URL.createObjectURL(dataURLtoBlob(dturl));
// IMG.src=SRC
// document.getElementById("kimg").src=SRC;
// }

function setpic(dturl) {
    if (SRC) {
        URL.revokeObjectURL(SRC)
    }

    // 创建临时图片对象来获取原始尺寸
    var tempImg = new Image();
    tempImg.onload = function() {
        var maxPreviewSize = 2000; // 最大预览尺寸
        var width = tempImg.width;
        var height = tempImg.height;

        // 如果图片尺寸过大，进行压缩预览
        if (width > maxPreviewSize || height > maxPreviewSize) {
            var scale = Math.min(maxPreviewSize / width, maxPreviewSize / height);
            var previewWidth = Math.floor(width * scale);
            var previewHeight = Math.floor(height * scale);

            // 创建画布进行压缩
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = previewWidth;
            canvas.height = previewHeight;

            // 绘制压缩后的图片
            ctx.drawImage(tempImg, 0, 0, previewWidth, previewHeight);

            // 使用压缩后的图片作为预览
            SRC = canvas.toDataURL();
        } else {
            // 使用原始图片
            SRC = URL.createObjectURL(dataURLtoBlob(dturl));
        }

        IMG.src = SRC;
        document.getElementById("kimg").src = SRC;
    };

    tempImg.src = dturl;
    document.getElementById("picinfo").innerHTML = "&emsp;"
}



function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',');
    //注意base64的最后面中括号和引号是不转译的   
    var _arr = arr[1].substring(0, arr[1].length - 2);
    var mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(_arr),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

function ipt() {
    var oFReader = new FileReader();
    var ofile = document.getElementById("ipt").files[0];
    oFReader.readAsDataURL(ofile);
    oFReader.onloadend = function(oFRevent) {
        var osrc = oFRevent.target.result;
        OPICSRC = osrc;
        setpic(osrc);
        document.getElementById("picinfo").innerHTML = "&emsp;"
    }
}