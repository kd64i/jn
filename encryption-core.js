function jiami() {
    if (SRC == "") {
        alert(INFO1)
    } else {
        let t = Date.now();
        let s = "";
        let a = document.getElementById("slct").value;
        let k = document.getElementById("ikey").value;
        let k2 = parseFloat(document.getElementById("ikey2").value);
        document.getElementById("imgwrap").style.display = "none";
        document.getElementById("loading").style.display = "block";
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                if (a == "b") {
                    s = encryptB2(IMG, k, 32, 32);
                } else if (a == "c") {
                    s = encryptC(IMG, k);
                } else if (a == "pe1") {
                    s = encryptPE1(IMG, k2);
                } else if (a == "pe2") {
                    s = encryptPE2(IMG, k2);
                } else if (a == "xor") {
                    s = encryptXOR(IMG, k);
                } else if (a == "rotate") {
                    s = encryptRotate(IMG, k);
                } else if (a == "chaotic") { // 新增
                    s = encryptChaotic(IMG, k);
                } else if (a == "diffusion") { // 新增
                    s = encryptDiffusion(IMG, k);
                } else if (a == "arnold") {
                    s = encryptArnold(IMG, k);
                } else if (a == "Hilbert") {
                    s = encryptHilbert(IMG, k);
                } else {
                    s = encryptC2(IMG, k);
                }
                setpic(s[0]);
                document.getElementById("picinfo").innerHTML = "size:&ensp;" + s[1] + "×" + s[2] + "&emsp;time:&ensp;" + (Date.now() - t).toString() + "ms"
                document.getElementById("imgwrap").style.display = "block";
                document.getElementById("loading").style.display = "none";
            })
        })
    }
}

function jiemi() {

    if (SRC == "") {
        alert(INFO1)
    } else {
        let t = Date.now();
        let s = "";
        let a = document.getElementById("slct").value;
        let k = document.getElementById("ikey").value;
        let k2 = parseFloat(document.getElementById("ikey2").value);
        document.getElementById("imgwrap").style.display = "none";
        document.getElementById("loading").style.display = "block";
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                if (a == "b") {
                    s = decryptB2(IMG, k, 32, 32);
                } else if (a == "c") {
                    s = decryptC(IMG, k);
                } else if (a == "pe1") {
                    s = decryptPE1(IMG, k2);
                } else if (a == "pe2") {
                    s = decryptPE2(IMG, k2);
                } else if (a == "xor") {
                    s = decryptXOR(IMG, k);
                } else if (a == "rotate") {
                    s = decryptRotate(IMG, k);
                } else if (a == "chaotic") { // 新增
                    s = decryptChaotic(IMG, k);
                } else if (a == "diffusion") { // 新增
                    s = decryptDiffusion(IMG, k);
                } else if (a == "arnold") {
                    s = decryptArnold(IMG, k);
                } else if (a == "Hilbert") {
                    s = decrypHilbert(IMG, k);
                } else {
                    s = decryptC2(IMG, k);
                }
                setpic(s[0]);
                document.getElementById("kimg").src = SRC;
                document.getElementById("picinfo").innerHTML = "size:&ensp;" + s[1] + "×" + s[2] + "&emsp;time:&ensp;" + (Date.now() - t).toString() + "ms"
                document.getElementById("imgwrap").style.display = "block";
                document.getElementById("loading").style.display = "none";
            })
        })
    }
}

//随机打乱
function amess(arrlength, ast) {
    var rand, temp;
    var arr = new Array(arrlength).fill(0).map((a, b) => b);
    for (let i = arrlength - 1; i > 0; i -= 1) {
        rand = parseInt(md5(ast + i.toString()).substr(0, 7), 16) % (i + 1);
        temp = arr[rand];
        arr[rand] = arr[i]
        arr[i] = temp;
    }
    return arr;
}
//picencrypt算法
function produceLogisticSort(a, b) {
    return a[0] - b[0]
}

function produceLogistic(x1, n) {
    let l = new Array(n);
    let x = x1;
    l[0] = [x, 0];
    for (let i = 1; i < n; i++) {
        x = 3.9999999 * x * (1 - x);
        l[i] = [x, i]
    }
    return l
}