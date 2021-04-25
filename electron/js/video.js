let video = (function () {

    'use strict';

    let simediaService = window.cn.ac.trimps.simedia.service,
        simediaTransfer = window.cn.ac.trimps.simedia.transfer
        , liproxyService = window.cn.ac.trimps.liproxy.service
        , location = {
            host1: '172.16.0.43:8180', // proxy
            host2: '172.16.0.43:8280', // presenter
            host3: '172.16.0.43:8380', // transfer
        }
        , serverId
        , providerId
        , catalogCharset = 'UTF8'
        , simediaClient
        , simediaChannel
        , liproxyClient
        , liproxyHandler
        , liproxyPTZHandler
        , streamControllerClient
        , ptzControllerClient
        , transferClient
        , transferHandler
        , canplayback = false;
    ;

    /**
     * 初始化
     *
     * @param {*} Elem
     */
    function init(Elem) {
        let simediaLocation = `${location.host2}`;
        let video = Elem ? Elem : document.getElementById('video');
        let that = this;

        simediaClient = new simediaService.SiMediaClient(video, simediaLocation, (error) => {
            if (error === null) {
                that.canplayback = true;
            }
            else {
                //console.error(error, 'Cannot initialize simedia client.');
            }
        });

        let liproxyUrl = `http://${location.host1}/liproxy/LiProxy`
        let proxyTransport = new Thrift.Transport(liproxyUrl)
        let proxyProtocol = new Thrift.Protocol(proxyTransport);
        liproxyClient = new liproxyService.LiProxyClient(proxyProtocol);

        let transferUrl = `http://${location.host3}/PSTransfer`;
        let transferTransport = new Thrift.Transport(transferUrl);
        let transferProtocol = new Thrift.Protocol(transferTransport);
        transferClient = new simediaTransfer.PSTransferClient(transferProtocol);
    }

    /**
     * 开始视频解码
     * 0上传成功 -1不能解码 -2 网络问题，提示，请检查网络。
     * 另外，js接口可以知道流媒体是不是正常；
     * 若连接流媒体服务失败；提示，请联系运维人员；
     * @param {*} callback 页面回调函数
     */
    function analyze(deviceId, callback) {
        // deviceId = '31011000001390000001';
        // console.log(`Updating ${deviceId}.`);

        let deviceItem = new liproxyService.DeviceItem()
        let deviceInfo = new liproxyService.DeviceInfo();
        deviceInfo.UseType = 'File';
        deviceItem.DeviceID = deviceId;
        deviceItem.Name = '文件';
        deviceItem.info = deviceInfo;

        liproxyClient.updateDevice(deviceItem, function (result) {
            if (result instanceof Error) {
                console.log(result, 'Cannot update device.');
            }
        });

        transferClient.start("0.0.0.0", 0, `es://0.0.0.0:0?sid=${deviceId}`, function (result) {
            let res = {
                code: -2
                , msg: '请联系运维人员!'
                , data: []
            }

            if (result instanceof Error) {
                console.log(result, 'Cannot start transfer.');

                // res.msg = result.code == -1
                //     ? '不能解码。'
                //     : '请检查网络。'

            }
            else {
                res.msg = '上传成功。';
                res.code = 0;
                res.data = result;

                transferHandler = result;
                console.log({
                    appendix: {
                        handler: transferHandler
                    }
                }, 'PSTransfer started.');
            }

            callback(res);
        });
    }

    function playback(deviceId) {
        var start = 1526994301; // unix time
        //deviceId = '31011501011395574991';
        simediaClient.openChannel(deviceId, {
            address: '', videoPorts: [0], audioPorts: []
        }, simediaService.ChannelMode.UNICAST_MODE, 0, function (error, channel) {
            if (error === null) {
                simediaChannel = channel;
                console.log({
                    appendix: {
                        channel: channel
                    }
                }, 'SiMedia channel opened.');

                if (channel.referenced === false) {

                }
                else {
                    console.log('Unicast channel should not be referenced.');
                }

                transferClient.start(channel.sinkAddress, channel.videoSinkPorts[0], `rtsp://0.0.0.0:${channel.videoSinkPorts[0] + 1000}?sid=${deviceId}&starttime=${start}&endtime=${start + 60}`, function (result) {
                    if (result instanceof Error) {
                        console.error(result, 'Cannot start transfer.');
                        simediaClient.closeChannel(function (error, result) {
                            if (error === null) {
                                console.log({
                                    appendix: {
                                        channel: simediaChannel,
                                        released: result
                                    }
                                }, 'SiMedia Channel closed.');

                                simediaChannel = undefined;
                            }
                        });
                    }
                    else {
                        transferHandler = result;
                        console.log({
                            appendix: {
                                handler: transferHandler
                            }
                        }, 'PSTransfer started.');
                    }
                });
            }
            else {
                console.error(error, 'Cannot open channel.');
            }
        });
    }

    function removeDevice(deviceId) {
        deviceId = $('#removingDevice').val();
        console.log(`Removing ${deviceId}.`);

        liproxyClient.removeDevice(deviceId, function (result) {
            if (result instanceof Error) {
                console.error(result, 'Cannot remove device.');
            }
        });
    }

    /**
     * 通知保存数据库
     *
     * @param {*} res  ip、端口号
     * @param {*} file 上传的文件
     * @returns
     */
    function notice(res, file, $, deviceId, callback) {
        if (!res.sinkAddress || !res.sinkPort || file != null) {
            console.log('not found ip or file.');
            // return;
        }

        let sendData = {
            cascadeId: deviceId,
            file_name: file.name,
            ip: res.sinkAddress || '',
            port: res.sinkPort || '',
            path: file.source.source.path
        }
        
        $.ajax({
            url: videoConf.insertDevice,
            type: "POST",
            dataType: "json",
            data: sendData,
            success: function (res) {
                console.log(res);
                ipcSend(sendData, callback);
            }
            , error: function (error) {
                console.log(error);
                ipcSend(sendData, callback);
            },
        });
    }

    /**
     * 调用cmd命令，客户端上传
     *
     * @param {*} params
     */
    function ipcSend(params, callback) {
        // 引入ipcRenderer模块
        let { ipcRenderer } = window.require('electron');

        ipcRenderer.send("cmdCall",
            params != null ? params : {});

        // 接收主进程发送回来的下载成功回调
        ipcRenderer.once('succee', event => {
            console.log(succee)
        });

        // 接收主进程发送回来的下载失败回调
        ipcRenderer.once('error', event => {
            // 失败回调
        });

        // 获取进度条最新进度
        ipcRenderer.on('process-reply', (event, arg) => {
            console.log(arg)
            callback(arg);
        })
    }

    /**
     * 每个上传文件需新建虚拟相机，
     * 设备编号参考GB28181.pdf中65页附录D的编码规则
     * 前10位为地区编码，
     * 11-13为设备类型，拟使用139，剩下7位可自定义
     * @returns
     */
    function GB(file_name, callback, $) {
        var ret = '3101150101139' + Math.random().toString().match(/.(\d{7})/)[1];

        $.ajax({
            url: videoConf.getGBurl,
            type: "POST",
            dataType: "json",
            data: {
                file_name: file_name
            },
            success: function (res) {
                if (res.code != 200) {
                    alert(res.msg)
                } else {
                    ret = res.data;
                    callback(ret);
                }
            }
            , error: function (error) {
                console.log(error);
                callback(ret);
            },
        });
    }

    return {
        init: init,
        analyze: analyze,
        notice: notice,
        playback: playback,
        GB: GB,
        removeDevice: removeDevice,
        canplayback: canplayback
    }
})();
