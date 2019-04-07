const fs = require('fs');
const shell = require('shelljs');
const path = './doc';

function createFolder(path){
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
            console.log("folder2 "+path+" created")
        }
    } catch(err) {
    
    }
}

function generateAnalyze(path){
    shell.exec(`polymer analyze > ${path}/analysis.json`).stdout;
    console.log("analysis.json generated ")
}

function generateLayout(path){ 
    const template = `
    <!doctype html>
    <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
        <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
        <script type="module" src="/node_modules/@polymer/iron-component-page/iron-component-page.js"></script>
        </head>
        <body>
        <iron-component-page></iron-component-page>
        </body>
    </html>`;

    fs.writeFile(path + "/index.html", template, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(path + "/index.html was created");
    });
}

function serve(){
    shell.exec(`polymer serve`);
}

createFolder(path);
generateAnalyze(path);
generateLayout(path);
//serve();