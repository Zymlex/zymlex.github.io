"use strict";

init();

function init() {
    loadPubKey();
}

function loadPubKey(){
    let http = new XMLHttpRequest();
    http.timeout = 10000;
    http.addEventListener("loadend", function (ev) {
        if (http.readyState === 4 && http.status === 200) {
            let type = http.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                setKeyValue(http.responseText);
            }
        } else {
            setKeyValue(new Error(`Loading error.\nreadyState: ${http.readyState}\nhttp.status: ${http.status}\n`));
        }
    });
    // http.addEventListener("error", function () {});
    // http.addEventListener("abort", handleEvent);
    
    http.open('GET', './82A59AD376D5A94E!!', true);
    http.send(null);
}

function setKeyValue(str) {
    const el = document.getElementById("Public_commit_key");
    
    el.value = str;
    
    el.style.visibility = null;
}