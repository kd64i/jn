//块混淆
function encryptB2(img1, key, sx, sy) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var wid1 = wid;
    var hit1 = hit;
    var imgdata;
    var oimgdata;
    var xl = new Array();
    var yl = new Array();
    var k = 8;
    var m = 0;
    var n = 0;
    var ssx;
    var ssy;
    
    // 缩放大小：如果图像像素超过SIZE，则调整大小以保持宽高比
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    wid1 = wid;
    hit1 = hit;

    // 调整宽度和高度以整除sx和sy
    while (wid % sx > 0) {
        wid++;
    }
    while (hit % sy > 0) {
        hit++;
    }

    ssx = wid / sx;
    ssy = hit / sy;

    cv.width = wid;
    cv.height = hit;

    // 修复：绘制图像时拉伸到画布大小，而不是平铺四个副本
    cvd.drawImage(img1, 0, 0, wid, hit);

    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    xl = amess(sx, key);
    yl = amess(sy, key);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = i;
            n = j;
            m = (xl[((n / ssy) | 0) % sx] * ssx + m) % wid;
            m = xl[(m / ssx) | 0] * ssx + m % ssx;
            n = (yl[((m / ssx) | 0) % sy] * ssy + n) % hit;
            n = yl[(n / ssy) | 0] * ssy + n % ssy;

            oimgdata.data[4 * (i + j * wid)] = imgdata.data[4 * (m + n * wid)];
            oimgdata.data[4 * (i + j * wid) + 1] = imgdata.data[4 * (m + n * wid) + 1];
            oimgdata.data[4 * (i + j * wid) + 2] = imgdata.data[4 * (m + n * wid) + 2];
            oimgdata.data[4 * (i + j * wid) + 3] = imgdata.data[4 * (m + n * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

function decryptB2(img1, key, sx, sy) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var wid1 = wid;
    var hit1 = hit;
    var imgdata;
    var oimgdata;
    var xl = new Array();
    var yl = new Array();
    var k = 8;
    var m = 0;
    var n = 0;
    var ssx;
    var ssy;

    // 修复：添加与加密函数相同的缩放逻辑
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    wid1 = wid;
    hit1 = hit;

    // 调整宽度和高度以整除sx和sy
    while (wid % sx > 0) {
        wid++;
    }
    while (hit % sy > 0) {
        hit++;
    }

    ssx = wid / sx;
    ssy = hit / sy;

    cv.width = wid;
    cv.height = hit;

    // 修复：绘制图像时拉伸到画布大小，而不是平铺四个副本
    cvd.drawImage(img1, 0, 0, wid, hit);

    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    xl = amess(sx, key);
    yl = amess(sy, key);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = i;
            n = j;
            m = (xl[((n / ssy) | 0) % sx] * ssx + m) % wid;
            m = xl[(m / ssx) | 0] * ssx + m % ssx;
            n = (yl[((m / ssx) | 0) % sy] * ssy + n) % hit;
            n = yl[(n / ssy) | 0] * ssy + n % ssy;

            oimgdata.data[4 * (m + n * wid)] = imgdata.data[4 * (i + j * wid)];
            oimgdata.data[4 * (m + n * wid) + 1] = imgdata.data[4 * (i + j * wid) + 1];
            oimgdata.data[4 * (m + n * wid) + 2] = imgdata.data[4 * (i + j * wid) + 2];
            oimgdata.data[4 * (m + n * wid) + 3] = imgdata.data[4 * (i + j * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}



//算法C,逐像素混淆
function encryptC(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var xl = new Array();
    var yl = new Array();
    var m = 0;
    var n = 0;

    //缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    xl = amess(wid, key);
    yl = amess(hit, key);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = i;
            n = j;
            m = (xl[n % wid] + m) % wid;
            m = xl[m];
            n = (yl[m % hit] + n) % hit;
            n = yl[n];

            oimgdata.data[4 * (i + j * wid)] = imgdata.data[4 * (m + n * wid)];
            oimgdata.data[4 * (i + j * wid) + 1] = imgdata.data[4 * (m + n * wid) + 1];
            oimgdata.data[4 * (i + j * wid) + 2] = imgdata.data[4 * (m + n * wid) + 2];
            oimgdata.data[4 * (i + j * wid) + 3] = imgdata.data[4 * (m + n * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

function decryptC(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var xl = new Array();
    var yl = new Array();
    var m = 0;
    var n = 0;

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    xl = amess(wid, key);
    yl = amess(hit, key);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = i;
            n = j;
            m = (xl[n % wid] + m) % wid;
            m = xl[m];
            n = (yl[m % hit] + n) % hit;
            n = yl[n];

            oimgdata.data[4 * (m + n * wid)] = imgdata.data[4 * (i + j * wid)];
            oimgdata.data[4 * (m + n * wid) + 1] = imgdata.data[4 * (i + j * wid) + 1];
            oimgdata.data[4 * (m + n * wid) + 2] = imgdata.data[4 * (i + j * wid) + 2];
            oimgdata.data[4 * (m + n * wid) + 3] = imgdata.data[4 * (i + j * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

//行像素混淆
function encryptC2(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var xl = new Array();
    var yl = new Array();
    var m = 0;
    var n = 0;

    //缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    xl = amess(wid, key);
    yl = amess(hit, key);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = i;
            n = j;
            m = (xl[n % wid] + m) % wid;
            m = xl[m];


            oimgdata.data[4 * (i + j * wid)] = imgdata.data[4 * (m + n * wid)];
            oimgdata.data[4 * (i + j * wid) + 1] = imgdata.data[4 * (m + n * wid) + 1];
            oimgdata.data[4 * (i + j * wid) + 2] = imgdata.data[4 * (m + n * wid) + 2];
            oimgdata.data[4 * (i + j * wid) + 3] = imgdata.data[4 * (m + n * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

function decryptC2(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var xl = new Array();
    var yl = new Array();
    var m = 0;
    var n = 0;

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    xl = amess(wid, key);
    yl = amess(hit, key);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = i;
            n = j;
            m = (xl[n % wid] + m) % wid;
            m = xl[m];


            oimgdata.data[4 * (m + n * wid)] = imgdata.data[4 * (i + j * wid)];
            oimgdata.data[4 * (m + n * wid) + 1] = imgdata.data[4 * (i + j * wid) + 1];
            oimgdata.data[4 * (m + n * wid) + 2] = imgdata.data[4 * (i + j * wid) + 2];
            oimgdata.data[4 * (m + n * wid) + 3] = imgdata.data[4 * (i + j * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

//行混淆
function encryptPE1(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var arrayaddress = new Array();
    var m = 0;
    var n = 0;

    //缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    arrayaddress = produceLogistic(key, wid).sort(produceLogisticSort).map(x => x[1]);

    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = arrayaddress[i];


            oimgdata.data[4 * (i + j * wid)] = imgdata.data[4 * (m + j * wid)];
            oimgdata.data[4 * (i + j * wid) + 1] = imgdata.data[4 * (m + j * wid) + 1];
            oimgdata.data[4 * (i + j * wid) + 2] = imgdata.data[4 * (m + j * wid) + 2];
            oimgdata.data[4 * (i + j * wid) + 3] = imgdata.data[4 * (m + j * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

function decryptPE1(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var arrayaddress = new Array();
    var m = 0;
    var n = 0;

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);

    arrayaddress = produceLogistic(key, wid).sort(produceLogisticSort).map(x => x[1]);


    for (let i = 0; i < wid; i++) {
        for (let j = 0; j < hit; j++) {
            m = arrayaddress[i];


            oimgdata.data[4 * (m + j * wid)] = imgdata.data[4 * (i + j * wid)];
            oimgdata.data[4 * (m + j * wid) + 1] = imgdata.data[4 * (i + j * wid) + 1];
            oimgdata.data[4 * (m + j * wid) + 2] = imgdata.data[4 * (i + j * wid) + 2];
            oimgdata.data[4 * (m + j * wid) + 3] = imgdata.data[4 * (i + j * wid) + 3];
        }
    }
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

//行+列混淆
function encryptPE2(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var o2imgdata;
    var arrayaddress = new Array();
    var x = key;
    var m = 0;
    var n = 0;


    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);
    o2imgdata = cvd.createImageData(wid, hit);

    for (let j = 0; j < hit; j++) {
        arrayaddress = produceLogistic(x, wid);
        x = arrayaddress[wid - 1][0];
        arrayaddress = arrayaddress.sort(produceLogisticSort).map(a => a[1])
        for (let i = 0; i < wid; i++) {
            m = arrayaddress[i];


            oimgdata.data[4 * (i + j * wid)] = imgdata.data[4 * (m + j * wid)];
            oimgdata.data[4 * (i + j * wid) + 1] = imgdata.data[4 * (m + j * wid) + 1];
            oimgdata.data[4 * (i + j * wid) + 2] = imgdata.data[4 * (m + j * wid) + 2];
            oimgdata.data[4 * (i + j * wid) + 3] = imgdata.data[4 * (m + j * wid) + 3];
        }
    }


    x = key;
    for (let i = 0; i < wid; i++) {
        arrayaddress = produceLogistic(x, hit);
        x = arrayaddress[hit - 1][0];
        arrayaddress = arrayaddress.sort(produceLogisticSort).map(a => a[1])
        for (let j = 0; j < hit; j++) {
            n = arrayaddress[j];



            o2imgdata.data[4 * (i + j * wid)] = oimgdata.data[4 * (i + n * wid)];
            o2imgdata.data[4 * (i + j * wid) + 1] = oimgdata.data[4 * (i + n * wid) + 1];
            o2imgdata.data[4 * (i + j * wid) + 2] = oimgdata.data[4 * (i + n * wid) + 2];
            o2imgdata.data[4 * (i + j * wid) + 3] = oimgdata.data[4 * (i + n * wid) + 3];
        }
    }


    cvd.putImageData(o2imgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

function decryptPE2(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;
    var imgdata;
    var oimgdata;
    var o2imgdata;
    var arrayaddress = new Array();
    var x = key;
    var m = 0;
    var n = 0;


    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);
    imgdata = cvd.getImageData(0, 0, wid, hit);
    oimgdata = cvd.createImageData(wid, hit);
    o2imgdata = cvd.createImageData(wid, hit);


    for (let i = 0; i < wid; i++) {
        arrayaddress = produceLogistic(x, hit);
        x = arrayaddress[hit - 1][0];
        arrayaddress = arrayaddress.sort(produceLogisticSort).map(a => a[1])
        for (let j = 0; j < hit; j++) {
            n = arrayaddress[j];


            oimgdata.data[4 * (i + n * wid)] = imgdata.data[4 * (i + j * wid)];
            oimgdata.data[4 * (i + n * wid) + 1] = imgdata.data[4 * (i + j * wid) + 1];
            oimgdata.data[4 * (i + n * wid) + 2] = imgdata.data[4 * (i + j * wid) + 2];
            oimgdata.data[4 * (i + n * wid) + 3] = imgdata.data[4 * (i + j * wid) + 3];
        }
    }
    x = key;
    for (let j = 0; j < hit; j++) {
        arrayaddress = produceLogistic(x, wid);
        x = arrayaddress[wid - 1][0];
        arrayaddress = arrayaddress.sort(produceLogisticSort).map(a => a[1])
        for (let i = 0; i < wid; i++) {
            m = arrayaddress[i];


            o2imgdata.data[4 * (m + j * wid)] = oimgdata.data[4 * (i + j * wid)];
            o2imgdata.data[4 * (m + j * wid) + 1] = oimgdata.data[4 * (i + j * wid) + 1];
            o2imgdata.data[4 * (m + j * wid) + 2] = oimgdata.data[4 * (i + j * wid) + 2];
            o2imgdata.data[4 * (m + j * wid) + 3] = oimgdata.data[4 * (i + j * wid) + 3];
        }
    }

    cvd.putImageData(o2imgdata, 0, 0);
    return [cv.toDataURL(), wid, hit]
}

// XOR像素混淆算法
function encryptXOR(img1, key) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;

    // 缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
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
//分块旋转混淆算法
function encryptRotate(img1, key, blockSize = 32) {
    var cv = document.createElement("canvas");
    var cvd = cv.getContext("2d");
    var wid = img1.width;
    var hit = img1.height;

    // 缩放大小
    if (wid * hit > SIZE) {
        wid = parseInt(Math.pow(SIZE * img1.width / img1.height, 1 / 2));
        hit = parseInt(Math.pow(SIZE * img1.height / img1.width, 1 / 2));
    }

    cv.width = wid;
    cv.height = hit;
    cvd.drawImage(img1, 0, 0, wid, hit);

    var imgdata = cvd.getImageData(0, 0, wid, hit);
    var oimgdata = cvd.createImageData(wid, hit);

    // 确保宽度和高度是blockSize的整数倍
    var paddedWid = Math.ceil(wid / blockSize) * blockSize;
    var paddedHit = Math.ceil(hit / blockSize) * blockSize;

    // 生成随机旋转模式
    var rotationMap = [];
    var blocksX = Math.ceil(paddedWid / blockSize);
    var blocksY = Math.ceil(paddedHit / blockSize);

    // 为每个块生成旋转角度（0°, 90°, 180°, 270°）
    for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
            var hash = md5(key + bx + "," + by);
            var rotation = parseInt(hash.charAt(0), 16) % 4; // 0-3对应不同的旋转角度
            rotationMap[bx + by * blocksX] = rotation;
        }
    }

    // 复制原始数据到输出
    for (let i = 0; i < imgdata.data.length; i++) {
        oimgdata.data[i] = imgdata.data[i];
    }

    // 对每个块应用旋转
    for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
            var rotation = rotationMap[bx + by * blocksX];

            // 处理当前块
            for (let y = 0; y < blockSize; y++) {
                for (let x = 0; x < blockSize; x++) {
                    var origX = bx * blockSize + x;
                    var origY = by * blockSize + y;

                    // 如果超出实际图像范围，跳过
                    if (origX >= wid || origY >= hit) continue;

                    var newX, newY;

                    // 根据旋转角度计算新坐标
                    switch (rotation) {
                        case 0: // 0° - 不旋转
                            newX = origX;
                            newY = origY;
                            break;
                        case 1: // 90° 顺时针
                            newX = bx * blockSize + y;
                            newY = by * blockSize + (blockSize - 1 - x);
                            break;
                        case 2: // 180°
                            newX = bx * blockSize + (blockSize - 1 - x);
                            newY = by * blockSize + (blockSize - 1 - y);
                            break;
                        case 3: // 270° 顺时针（或90°逆时针）
                            newX = bx * blockSize + (blockSize - 1 - y);
                            newY = by * blockSize + x;
                            break;
                    }

                    // 确保新坐标在块范围内
                    if (newX < bx * blockSize) newX = bx * blockSize;
                    if (newX >= (bx + 1) * blockSize) newX = (bx + 1) * blockSize - 1;
                    if (newY < by * blockSize) newY = by * blockSize;
                    if (newY >= (by + 1) * blockSize) newY = (by + 1) * blockSize - 1;

                    // 如果新坐标超出实际图像范围，使用原始坐标
                    if (newX >= wid || newY >= hit) {
                        newX = origX;
                        newY = origY;
                    }

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

    // 确保宽度和高度是blockSize的整数倍
    var paddedWid = Math.ceil(wid / blockSize) * blockSize;
    var paddedHit = Math.ceil(hit / blockSize) * blockSize;

    // 生成随机旋转模式（与加密时相同）
    var rotationMap = [];
    var blocksX = Math.ceil(paddedWid / blockSize);
    var blocksY = Math.ceil(paddedHit / blockSize);

    for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
            var hash = md5(key + bx + "," + by);
            var rotation = parseInt(hash.charAt(0), 16) % 4;
            rotationMap[bx + by * blocksX] = rotation;
        }
    }

    // 复制原始数据到输出
    for (let i = 0; i < imgdata.data.length; i++) {
        oimgdata.data[i] = imgdata.data[i];
    }

    // 对每个块应用逆旋转
    for (let by = 0; by < blocksY; by++) {
        for (let bx = 0; bx < blocksX; bx++) {
            var rotation = rotationMap[bx + by * blocksX];
            var inverseRotation = (4 - rotation) % 4; // 计算逆旋转角度

            // 处理当前块
            for (let y = 0; y < blockSize; y++) {
                for (let x = 0; x < blockSize; x++) {
                    var origX = bx * blockSize + x;
                    var origY = by * blockSize + y;

                    // 如果超出实际图像范围，跳过
                    if (origX >= wid || origY >= hit) continue;

                    var newX, newY;

                    // 根据逆旋转角度计算新坐标（恢复原始位置）
                    switch (inverseRotation) {
                        case 0: // 0° - 不旋转
                            newX = origX;
                            newY = origY;
                            break;
                        case 1: // 90° 顺时针（相当于加密时270°逆时针）
                            newX = bx * blockSize + y;
                            newY = by * blockSize + (blockSize - 1 - x);
                            break;
                        case 2: // 180°
                            newX = bx * blockSize + (blockSize - 1 - x);
                            newY = by * blockSize + (blockSize - 1 - y);
                            break;
                        case 3: // 270° 顺时针（相当于加密时90°逆时针）
                            newX = bx * blockSize + (blockSize - 1 - y);
                            newY = by * blockSize + x;
                            break;
                    }

                    // 确保新坐标在块范围内
                    if (newX < bx * blockSize) newX = bx * blockSize;
                    if (newX >= (bx + 1) * blockSize) newX = (bx + 1) * blockSize - 1;
                    if (newY < by * blockSize) newY = by * blockSize;
                    if (newY >= (by + 1) * blockSize) newY = (by + 1) * blockSize - 1;

                    // 如果新坐标超出实际图像范围，使用原始坐标
                    if (newX >= wid || newY >= hit) {
                        newX = origX;
                        newY = origY;
                    }

                    var origIndex = 4 * (origX + origY * wid);
                    var newIndex = 4 * (newX + newY * wid);

                    // 复制像素数据（反向操作）
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

// 混沌映射像素置乱算法
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
        indices[i] = {
            value: chaoticSequence[i],
            index: i
        };
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
        indices[i] = {
            value: chaoticSequence[i],
            index: i
        };
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

// 分块扩散混淆算法
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

    // 绘制原图到画布，超出部分用白色填充
    cvd.fillStyle = 'white';
    cvd.fillRect(0, 0, paddedWid, paddedHit);
    cvd.drawImage(img1, 0, 0, wid, hit);

    var imgdata = cvd.getImageData(0, 0, paddedWid, paddedHit);
    var data = imgdata.data;

    // 使用密钥生成确定性参数
    var keyHash = md5(key + "diffusion_salt");
    var a = 1 + (parseInt(keyHash.substr(0, 4), 16) % 5); // 限制参数范围确保可逆
    var b = 1 + (parseInt(keyHash.substr(4, 4), 16) % 5);

    var blocksX = paddedWid / blockSize;
    var blocksY = paddedHit / blockSize;

    // 多轮迭代
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);

        for (let by = 0; by < blocksY; by++) {
            for (let bx = 0; bx < blocksX; bx++) {
                // 对每个块应用可逆的线性变换
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

                // 应用可逆的像素位置变换
                var transformedBlock = new Uint8ClampedArray(blockData.length);
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        // 使用简单的模运算确保可逆性
                        var newX = (a * x + b * y) % blockSize;
                        var newY = (b * x + a * y) % blockSize;

                        // 处理负数情况
                        if (newX < 0) newX += blockSize;
                        if (newY < 0) newY += blockSize;

                        var origIdx = (y * blockSize + x) * 4;
                        var newIdx = (newY * blockSize + newX) * 4;

                        for (let c = 0; c < 4; c++) {
                            transformedBlock[newIdx + c] = blockData[origIdx + c];
                        }
                    }
                }

                // 将变换后的块数据写回
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        var destX = bx * blockSize + x;
                        var destY = by * blockSize + y;
                        var destIdx = (destY * paddedWid + destX) * 4;
                        var blockIdx = (y * blockSize + x) * 4;

                        for (let c = 0; c < 4; c++) {
                            newData[destIdx + c] = transformedBlock[blockIdx + c];
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

    // 绘制原图到画布
    cvd.fillStyle = 'white';
    cvd.fillRect(0, 0, paddedWid, paddedHit);
    cvd.drawImage(img1, 0, 0, wid, hit);

    var imgdata = cvd.getImageData(0, 0, paddedWid, paddedHit);
    var data = imgdata.data;

    // 使用相同的密钥生成参数
    var keyHash = md5(key + "diffusion_salt");
    var a = 1 + (parseInt(keyHash.substr(0, 4), 16) % 5);
    var b = 1 + (parseInt(keyHash.substr(4, 4), 16) % 5);

    var blocksX = paddedWid / blockSize;
    var blocksY = paddedHit / blockSize;

    // 多轮迭代（逆向）
    for (let iter = 0; iter < iterations; iter++) {
        var newData = new Uint8ClampedArray(data);

        for (let by = 0; by < blocksY; by++) {
            for (let bx = 0; bx < blocksX; bx++) {
                // 对每个块应用逆向变换
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

                // 应用逆向变换（解方程求逆）
                var invertedBlock = new Uint8ClampedArray(blockData.length);
                for (let y = 0; y < blockSize; y++) {
                    for (let x = 0; x < blockSize; x++) {
                        // 解加密时的方程：newX = (a*x + b*y) mod N, newY = (b*x + a*y) mod N
                        // 求逆：x = (a*newX - b*newY) * det_inv mod N, y = (-b*newX + a*newY) * det_inv mod N
                        var det = (a * a - b * b) % blockSize;
                        if (det < 0) det += blockSize;

                        // 求模逆元
                        var detInv = 1;
                        for (let i = 1; i < blockSize; i++) {
                            if ((det * i) % blockSize === 1) {
                                detInv = i;
                                break;
                            }
                        }

                        var origX = (a * x - b * y) * detInv % blockSize;
                        var origY = (-b * x + a * y) * detInv % blockSize;

                        // 处理负数情况
                        if (origX < 0) origX += blockSize;
                        if (origY < 0) origY += blockSize;

                        var origIdx = (y * blockSize + x) * 4;
                        var newIdx = (origY * blockSize + origX) * 4;

                        for (let c = 0; c < 4; c++) {
                            invertedBlock[newIdx + c] = blockData[origIdx + c];
                        }
                    }
                }

                // 将逆向变换后的块数据写回
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

// 改进的Arnold变换加密算法
// 改进的Arnold变换加密算法
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

    // 创建临时缓冲区存储处理后的数据
    var tempData = new Uint8ClampedArray(data.length);

    // 多轮Arnold变换
    for (let iter = 0; iter < iterations; iter++) {
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

                        // 复制像素数据到临时缓冲区
                        for (let c = 0; c < 4; c++) {
                            tempData[newIndex + c] = data[origIndex + c];
                        }
                    }
                }
            }
        }
        // 更新数据为当前轮次处理结果
        data.set(tempData);
    }

    var oimgdata = new ImageData(data, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}

// 改进的Arnold变换解密算法
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

    // 创建临时缓冲区存储处理后的数据
    var tempData = new Uint8ClampedArray(data.length);

    // 逆向多轮变换
    for (let iter = 0; iter < iterations; iter++) {
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

                        // 复制像素数据到临时缓冲区（逆向恢复）
                        for (let c = 0; c < 4; c++) {
                            tempData[newIndex + c] = data[origIndex + c];
                        }
                    }
                }
            }
        }
        // 更新数据为当前轮次处理结果
        data.set(tempData);
    }

    var oimgdata = new ImageData(data, wid, hit);
    cvd.putImageData(oimgdata, 0, 0);
    return [cv.toDataURL(), wid, hit];
}
