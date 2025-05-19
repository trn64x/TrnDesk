const {app,BrowserWindow} = require('electron');

const CreateWindow = () => {
    const win = new BrowserWindow({
        show:false,
        backgroundColor:"#060606"
    })
    win.maximize();
    win.loadURL("http://localhost:3000");
    win.webContents.on("did-finish-load",()=>{
        win.show();
    })
}
app.whenReady().then(()=> {
    CreateWindow()
    app.on("activate",()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            CreateWindow()
        }
    });
    app.on("window-all-closed",()=>{
        if(process.platform !== "darwin"){
            app.quit();
        }
    })
    })