init();

function init() {
    load_public_key();
}

function load_public_key() {
    getText();
}

function getText(){
    let http = new XMLHttpRequest();
    http.timeout = 10000;
    http.addEventListener("loadend", function (ev) {
        if (http.readyState === 4 && http.status === 200) {
            let type = http.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                const el = document.getElementById("Public_commit_key");
                
                el.innerText = http.responseText;
                
                el.style.visibility = null;
            }
        } else {
            console.log(new Error(`Loading error.\nreadyState: ${http.readyState}\nhttp.status: ${http.status}\n`));
        }
    });
    // http.addEventListener("error", function () {});
    // http.addEventListener("abort", handleEvent);
    
    http.open('GET', './82A59AD376D5A94E', true);
    http.send(null);
}