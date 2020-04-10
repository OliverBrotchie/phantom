// Graphical user interface for phantom
require('node-go-require');
const Phantom = require(__dirname + '/source/cmd/phantom.go').phantom;
const {app, BrowserWindow, ipcMain} = require('electron');

var params = {
	server:null,
	boundIP:null,
	boundPort:null,
	timeOut:null
},
running = false,
history = [],
p = null;


function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon:'lib/favicon/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.show();

  // and load the index.html of the app.
  win.loadFile('index.html');
  
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
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

        //Defualts: RemoteServer "", BindAddress = "0.0.0.0", BindPort = 0 IdleTimeout = 60 (time.duration)


        //determine which parameters have been set by user
        var args = [params.server];

        if(params.boundIP != null){
            args.push(params.boundIP);
        } else {
            args.push("0.0.0.0");
        }

        if(params.boundPort != null){
            args.push(params.boundPort);
        } else {
            args.push(0);
        }

        if(params.timeOut != null){
           args.push(params.timeOut);
        } else {
            args.push(60);
        }

        p = Phantom.new(...args);

        

        // //Launches phantom as a child process
        // phantom = childProcess.execFile('phantom-' + os,args);

        // phantom.stderr.on('data', function(data) {
        //     history.push(data);
        //     console.log(data);
        //     event.sender.send('asynchronous-message', {parameters:params,running:runnig,history:history});
        // });

        // phantom.stdout.on('data', function(data) {
        //     history.push(data);
        //     console.log(data);
        //     event.sender.send('asynchronous-message', {parameters:params,running:runnig,history:history});
        // });
        
        // phantom.on('close', function(code) {
        //     history.push('Phantom stopped.')
        //     console.log('Phantom stopped.');
        //     running = false;
        //     event.sender.send('asynchronous-message', {parameters:params,running:runnig,history:history});
        // });
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