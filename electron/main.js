const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const iconv = require('iconv-lite');
const exec = require('child_process').exec;
const encoding = 'cp936';
const binaryEncoding = 'binary';

var gws;
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 9000 });
wss.on('connection', function (ws) {
  gws = ws;
  console.log('client connected');
  ws.on('message', function (message) {
    console.log(message);
    //测试用
    // setInterval(show,5000);
  });
});

function show() {
  if (gws) {
    gws.send("refresh");
  }
}

/**
 * 调用命令行
 *
 * @param {*} cmdStr
 */
function runExec(cmdStr, callback) {
  var that = this;
  // 任何你期望执行的cmd命令，ls都可以
  cmdStr = cmdStr || 'ECHO hello world!';

  // 执行cmd命令的目录，如果使用cd xx && 上面的命令，这种将会无法正常退出子进程
  let cmdPath = 'C:\\windows\\system32'

    // 子进程名称
    , workerProcess
    , result;

  console.log(cmdStr);

  // 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
  workerProcess = exec(cmdStr
    // 参数
    , {
      encoding: 'GBK',
      // timeout: 100000,
      cwd: cmdPath,
      // maxBuffer: 200 * 1024,
      // killSignal: 'SIGTERM',
      // env: null
    }
  )
  // 打印正常的后台可执行程序输出
  workerProcess.stdout.on('data', function (data) {
    console.log('data:' + data);
    data = data.toString();
    if (data.indexOf(',') > 0) {
      result = data.split(',')[1].trim();
      console.log('result:', result);
    }
    // 进度条
    else if (data.indexOf('progress') != -1) {
      var str = data.split('progress:')[1].trim();
      // console.log('progress value:', str);
      if (win) {
        win.webContents.send('process-reply', str);
      }
    }
  });

  // 打印错误的后台可执行程序输出
  workerProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  // 退出之后的输出
  workerProcess.on('close', function (code) {
    console.log('out code：' + code);
    if (callback) callback(code, result);
  });
}

function createWindow() {

  /*隐藏electron创听的菜单栏*/
  Menu.setApplicationMenu(null);

  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 并且为你的应用加载index.html
  win.loadFile('index.html');

  // 打开开发者工具
  // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow).then();

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

function GetVedioDuration(cascadeId, duration) {
  var request = require('request');
  var url = "http://172.16.0.43:8080/IVAS/vdapi/v1/vddevice/update";
  var requestData = { cascadeId: cascadeId, duration: duration };
  request({
    url: url,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: requestData
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}

// 监听cmdCall事件
// 在主线程下，通过ipcMain对象监听渲染线程传过来的
ipcMain.on('cmdCall', (event, arg) => {
  console.log('cmdCall', arg);

  // 获取视频时长
  runExec(`C:\\video_transfer\\VideoStreamer\\GetVedioDuration.exe "${arg.path}"`
    , function (code, duration) {
      console.log(144, duration)
      if (duration) {
        show();
        GetVedioDuration(arg.cascadeId, duration);
      }
    }
  );

  // VideoStreamer.exe 文件名 ip port
  runExec(`C:\\video_transfer\\VideoStreamer\\VideoStreamer.exe "${arg.path}" ${arg.ip} ${arg.port}`);
})
