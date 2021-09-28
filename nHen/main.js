const dc = document;
let lock = true;

const magic = async (d) => {
    gebi("inpD").style.display = "none";
    let a = new Date(d.value),
        b = gebi("bdy");
    a = code = "" + a.getDate() + a.getMonth() + a.getYear();
    console.log(a);
    //b.innerHTML = await getUrl("https://cors-anywhere.herokuapp.com/https://nhentai.net/g/" + a + "/");
    console.log("https://nhentai.net/g/" + a + "/");
    //b.style.backgroundImage = "url('" + img(await get(proxy(await getUrl(a)))) + "')";
    b.style.backgroundImage = "url('" + (await getUrl(a)) + "')";
    console.log("url('" + (await getUrl(a)) + "')");
    lock = false;
    //console.log(b);
    //console.log(b.style.backgroundImage);
};

/*const img = (a) => {
    data = JSON.parse(a)["contents"];
    console.log(data);
    data = new Blob([data]);
    console.log(data);
    url = URL.createObjectURL(data);
    var reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = function () {
        var base64String = reader.result;
        console.log("Base64 String - ", base64String);

        // Simply Print the Base64 Encoded String,
        // without additional data: Attributes.
        console.log("Base64 String without Tags- ", base64String.substr(base64String.indexOf(", ") + 1));
    };
    return url;
};*/

const proxy = (u) => {
    console.log("https://api.allorigins.win/get?url=" + encodeURIComponent(u));
    return "https://api.allorigins.win/get?url=" + encodeURIComponent(u);
};

const opn = () => {
    if (lock) return;
    console.log("https://nhentai.net/g/" + code + "/", "_blank");
    window.open("https://nhentai.net/g/" + code + "/", "_blank");
};

const gebi = (a) => {
    return dc.getElementById(a);
};

const getUrl = async (c) => {
    const lop = async () => {
        console.log("Failed but trying again");
        c = Math.abs(c * Math.PI * Math.tan(c * c + c) * 10000000000) % 1000000;
        code = c = c > 374836 ? c / 10 : c;
        return await getUrl(parseInt(c));
    };
    let cont = (await get(proxy("https://nhentai.net/g/" + c + "/"))).replaceAll("\\", "");
    if (typeof cont == "number" && ("" + c)[0] == 4) return await lop();
    else if (cont == "t") return await getUrl(c);
    //console.log(cont);
    cont = cont.substr(cont.indexOf('r.jpg" w') - 69, 96);
    console.log(cont);
    cont = cont.substring(cont.indexOf("http"), cont.indexOf('" w'));
    if (cont.length == 0) return await lop();
    gebi("hlp").style.display = "block";
    console.log(cont);
    return cont;
};

const get = (url) => {
    return new Promise((r) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                r(xhr.response);
            }
        };
        xhr.onerror = () => {
            r(xhr.status);
        };
        xhr.timeout = 10000; //6969;
        xhr.ontimeout = () => {
            console.log("timeout : ", xhr);
            r("t");
        };
        xhr.open("GET", url, true);
        /*xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.withCredentials = false;*/
        xhr.send();
    });
};
