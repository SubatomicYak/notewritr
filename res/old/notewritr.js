function save(){
    document.getElementById('status').innerHTML = 'saved!';
}

function file_open(){
    //open a file explorer so we can get the path of the file selected
    const remote = require('electron').remote;
    var dialog = remote.dialog;
    var path = dialog.showOpenDialog({
        properties: ['openFile']
    });
    document.getElementById('status').innerHTML = path;
    //TODO change 
}

function file_menu(){
    var element;
    element = document.getElementById('file_menu').style.display;
    if(element == 'none'){
        document.getElementById('file_menu').style.display = 'inline';
    }else{
        document.getElementById('file_menu').style.display = 'none';
    }
}

function win_close(){
    //get the electron process and cast as a remote so we can control it
    const remote = require('electron').remote;
    var window = remote.getCurrentWindow();
    window.close();
}