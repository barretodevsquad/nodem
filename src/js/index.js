let nodemVersion = 'loading version...';

document.addEventListener("DOMContentLoaded", (event) => {

    (function(){
        let container = document.getElementsByClassName('efeitoMaquina');

        function efeitoMaquinaEscrever(el, text) {
            let timeEffect = 50;
            let interval = setInterval(function(){
                el.innerHTML += text.substr(0, 1);
                text = text.substr(1);

                if(!text.length) clearInterval(interval);
            }, timeEffect);
        }

        for (let i = container.length - 1; i >= 0; i--) {
            efeitoMaquinaEscrever(container[i], container[i].getAttribute('data'));
        }
    }(this));

    // get version of the last release
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let dummy_html        = document.createElement('html');
            let el_version        = document.getElementById('brand-version');
            dummy_html.innerHTML  = JSON.parse(xmlhttp.responseText).contents;
            nodemVersion     = dummy_html.getElementsByClassName('commit-title')[0].children[0].innerHTML;
            el_version.innerHTML = nodemVersion;
        }
    }

    xmlhttp.open("GET", 'http://api.allorigins.ml/get?url=' + 'github.com/marcoT89/nodem/tags', true);
    xmlhttp.withCredentials = false;
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept',       'application/json');
    xmlhttp.send();
});

let interval;

function write(argument) {
    clearInterval(interval)
    let el         = document.getElementById('terminal');
    el.innerHTML   = '';

    interval       = setInterval(function(){
        el.innerHTML += argument.substr(0, 1)
            .replace(' ', '&nbsp;')
            .replace('\n', "<br />")
            .replace('\1', '<a href="https://github.com/victoreduardobarreto">barreto</a>')
            .replace('\2', '<a href="https://github.com/marcoT89">marco tulio avila</a>')
        argument = argument.substr(1);

        if(!argument.length) clearInterval(interval);
    }, 50);
}

function terminal(param) {
    let text = '';

    switch(param) {
        case 'use':
            text = '$ nodem available \n \n'
                  +'Listing available versions: \n'
                  +'10.14.0 \n'
                  +'10.14.1 \n'
                  +'10.14.2 \n \n'
                  +'$ nodem install 10.14.2 \n \n'
                  +'Default version changed to 10.14.2 \n'
                  +'Node Version 10.14.2 successfully installed \n';
        break;

        case 'install':
            text = '$ nodem available \n \n'
                  +'Listing available versions: \n'
                  +'10.14.0 \n'
                  +'10.14.1 \n'
                  +'10.14.2 \n \n'
                  +'$ nodem install 10.14.2 \n \n'
                  +'Default version changed to 10.14.2 \n'
                  +'Node Version 10.14.2 successfully installed \n';
        break;

        case 'about':
            text = `nodem version : ${nodemVersion.trim()} \n`
                  +'license : MIT \n'
                  +'developer : \2 \n'
                  +'website design concept : \1 \n';
        break;
    }

    this.write(text);
}
