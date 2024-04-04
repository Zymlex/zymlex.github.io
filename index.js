'use strict';

(function init() {
    publicKey();
})();

function publicKey() {
    let key = getPubKey();
    
    let observer = new MutationObserver(mutationRecords => {
        mutationRecords.forEach(function (v/*, index, arr*/) {
            v.addedNodes.forEach(function (v/*, index, arr*/) {
                if (v.nodeName === 'TEXTAREA' && v.id === "public commit key") {
                    setKeyValue(key, v);
                }
            });
            
        });
    });
    
    observer.observe(window.document, {
        childList: true, subtree: true,
    });
}

function getPubKey() {
    let http = new XMLHttpRequest();
    // http.timeout = 10000;
    // http.addEventListener('loadend', function () {});
    http.addEventListener('error', function () {
        return new Error(`Loading error.\nreadyState: ${http.readyState}\nhttp.status: ${http.status}\n`);
    });
    // http.addEventListener("abort", handleEvent);
    
    http.open('GET', './pubkey', false); // will wait
    http.send(null);
    
    if (http.readyState === 4 && http.status === 200) {
        let type = http.getResponseHeader('Content-Type');
        if (type.indexOf('text') !== 1) {
            return http.responseText;
        }
    } else {
        return new Error(`Loading error.\nreadyState: ${http.readyState}\nhttp.status: ${http.status}\n`);
    }
}

function setKeyValue(str, node) {
    node.value = str;
    node.style.visibility = null;
}