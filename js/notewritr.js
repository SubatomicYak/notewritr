$( document ).ready(function() {
    console.log( "ready!" );
});

var documentChanged = false;
var fileNamed = false;
var path;

function save(){
    document.getElementById('status').innerHTML = 'saved!';
}

function fileNew(){
    if(documentChanged == true){
        switch(confirmSave()){
            case 0:
                if(fileNamed == true){
                    fileSave();
                }else{
                    fileSaveAs();
                }break;
            case 2: return;
        }
    }$("text_area").text("");
    documentChanged = false;
    fileNamed = false;
}

function fileOpen(){
    //open a file explorer so we can get the path of the file selected
    const remote = require('electron').remote;
    const fs = require('fs');
    var dialog = remote.dialog;
    var content;
    path = dialog.showOpenDialog({
        properties: ['openFile']
    });

    fs.readFile(String(path), (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
        content = data;
        document.getElementById("text_area").value = String(content);
        $("#fileName").text(path);
    });
    documentChanged = false;
    fileNamed = true;
}

function fileSaveAs(){
    const remote = require('electron').remote;
    const fs = require('fs');
    var dialog = remote.dialog;
    var contents = document.getElementById("text_area").value;
    path = dialog.showSaveDialog({
        filters: [
            {name: 'text', extensions: ['txt']}
        ]
    }, function (fileName) {
        if (fileName === undefined) return;
        console.log(fileName);
        $("#fileName").text() = fileName;
        fs.writeFile(fileName, contents, function (err) {   
        });
    });
    documentChanged = false;
    fileNamed = true;
    $("#liSave").addClass("disabled");
}

function fileSave(){
    const fs = require('fs');
    var contents = document.getElementById("text_area").value;
    fs.writeFile(path, contents, function (err) {   
        });
}

function confirmSave(){
    const remote = require('electron').remote;
    var dialog = remote.dialog;
    var num = dialog.showMessageBox({ message: "Do you want to continue without saving?",
        buttons: ["Save", "Dont't Save", "Cancel"] 
    });
    return num;
}

function btnClose(){
    if(documentChanged == true){
        switch(confirmSave()){
            case 0:
                if(fileNamed == true){
                    fileSave();
                }else{
                    fileSaveAs();
                }break;
            case 2: return;
        }
    }
    //get the electron process and cast as a remote so we can control it
    const remote = require('electron').remote;
    var window = remote.getCurrentWindow();
    window.close();
}

function documentChange(){
    if(documentChanged == false){
        documentChanged = true;
        if(fileNamed == true){
            $("#liSave").removeClass("disabled");
        }
    }
}
