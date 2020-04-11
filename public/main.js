// Graphical user interface for phantom
const childProcess = require('child_process');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');

var params = {
	server:null,
	boundIP:null,
	boundPort:null,
	timeOut:null
},
win = null,
running = false,
history = [],
phantom = null;


function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        icon: path.join(__dirname, '/lib/favicon/icon.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    // and load the index.html of the app.
    win.show();
    win.loadFile(path.join(__dirname, '/index.html'));
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {

    //stop any open instances of phantom
    try{ 
        stop();
    } catch(e){
        console.log(e);
    }

    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

ipcMain.on('asynchronous-message', (event, data) => {
	console.log('async message recieved');
  
    // send message to index.html
    event.sender.send('asynchronous-reply', 'async message recieved' );

    if(data.parameters != params){   
        params = data.parameters;
    }

    switch(data.command){
        case 'start':
            start();
        break;
        case 'stop':
            stop();
        break;
        case 'restart':
            restart();
        break;
    }
});


//Starts phantom
function start(){
    if(running != true){
        
        console.log('\n Starting phantom... \n');
        history.push('Starting phantom...')
        running = true;


        //get the correct os
        var os;
        switch(process.platform){
            case 'win32':
                os = 'windows.exe';
            break;
            case 'darwin':
                os = 'macos';
            break;
            case 'linux':
                os = 'linux'
            break;
        }


        var p = path.join(process.resourcesPath, 'app/public/bin/phantom-' + os)

        if(os == 'linux' || os == 'macos'){

            try{
                fs.chmodSync(p, 0o5)
            } catch(err){
                throw err;
            }
            
        }


        //determine which parameters have been set by user
        var args = ['-server',params.server];


        if(params.boundIP != null){
            args.push('-bind');
            args.push(params.boundIP);
        }

        if(params.boundPort != null){
            args.push('-bind_port');
            args.push(params.boundPort);
        }

        if(params.timeOut != null){
            args.push('-timeout');
            args.push(params.timeOut);
        }

        //Launches phantom as a child process
    
        phantom = childProcess.execFile(p,args);

        phantom.stderr.on('data', function(data) {
            history.push(data);
            console.log(data);
            win.webContents.send('asynchronous-message', {parameters:params,running:running,history:history});
        });

        phantom.stdout.on('data', function(data) {
            history.push(data);
            console.log(data);
            win.webContents.send('asynchronous-message', {parameters:params,running:running,history:history});
        });
        
        phantom.on('close', function(code) {
            history.push('Phantom stopped.')
            console.log('Phantom stopped.');
            win.webContents.send('asynchronous-message', {parameters:params,running:running,history:history,code:code});
            running = false;
        });

        phantom.on('error',function(err) {
            throw(err);
        });
        
    }
}

//Stops phantom
function stop(){
    if(phantom != null){
        phantom.kill();
    }
}

//Restarts Phantom
function restart(){
    if(running){
        stop();
        setTimeout(()=>{
            restart()
        }, 1000);
    } else {
        start();
    }
}