/**
 * @Title uploader 文件上传模块
 * 
 * @Version 1.0.0.0
 * 
 * @Date 2020年3月2日
 * 
 * 在layui环境下部署使用百度上传控件[webuploader]
 */

// (function (win) { // 非layui环境下运行打开
layui.define('layer', function (exports) {// 非layui环境下注释
    "use strict";

    var $ = layui.$
        , _step = 1
        , _layero = 0
        , _opened = []
        , uploadView = {
            edit_items: ko.observableArray([]),
            fileuploadlist: ko.observableArray([]),
            filelist: ko.observableArray([]),
            fileinfo: ko.observableArray([]),
            pages: ko.observableArray([]),
            select_item: ko.observable({}),
            label_cancel: ko.observable("取消"),
            label_save: ko.observable("保存"),
            load_first: ko.observable(0),
            file_cnt: ko.observable(''),
            clear_upload_list: function () { },
            reUpload: function () { },
            cancelUpload: function () { },
            delUpload: function () { },
            file_cnt: ko.observable(''),
        }
        , upload_list = []
        , upload_wait = []
        , Uploader = null

        // 常量
        , MOD_NAME = 'uploader'

        // 构造器
        , Upload = function (options) {
            var that = this;
            that.config = $.extend({}, that.config, upload.config, options);
            that.render();
        };

    //  上传参数：
    // --------------------------------------------------------------
    //     dnd {Selector} [可选] [默认值：undefined] 指定Drag And Drop拖拽的容器，如果不指定，则不启动。
    //     disableGlobalDnd {Selector} [可选] [默认值：false] 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
    //     paste {Selector} [可选] [默认值：undefined] 指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为document.body.
    //     pick {Selector, Object} [可选] [默认值：undefined] 指定选择文件的按钮容器，不指定则不创建按钮。
    //     id {Seletor|dom} 指定选择文件的按钮容器，不指定则不创建按钮。注意 这里虽然写的是 id, 但是不是只支持 id, 还支持 class, 或者 dom 节点。
    //     label {String} 请采用 innerHTML 代替
    //     innerHTML {String} 指定按钮文字。不指定时优先从指定的容器中看是否自带文字。
    //     multiple {Boolean} 是否开起同时选择多个文件能力。
    //     accept {Arroy} [可选] [默认值：null] 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
    //     title {String} 文字描述
    //     extensions {String} 允许的文件后缀，不带点，多个用逗号分割。
    //     mimeTypes {String} 多个用逗号分割。
    //     thumb {Object} [可选] 配置生成缩略图的选项。
    //     compress {Object} [可选] 配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
    //     auto {Boolean} [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
    //     runtimeOrder {Object} [可选] [默认值：html5,flash] 指定运行时启动顺序。默认会想尝试 html5 是否支持，如果支持则使用 html5, 否则则使用 flash.
    //     可以将此值设置成 flash，来强制使用 flash 运行时。
    //     prepareNextFile {Boolean} [可选] [默认值：false] 是否允许在文件传输时提前把下一个文件准备好。 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
    //     chunked {Boolean} [可选] [默认值：false] 是否要分片处理大文件上传。
    //     chunkSize {Boolean} [可选] [默认值：5242880] 如果要分片，分多大一片？ 默认大小为5M.
    //     chunkRetry {Boolean} [可选] [默认值：2] 如果某个分片由于网络问题出错，允许自动重传多少次？
    //     threads {Boolean} [可选] [默认值：3] 上传并发数。允许同时最大上传进程数。
    //     formData {Object} [可选] [默认值：{}] 文件上传请求的参数表，每次发送都会发送此对象中的参数。
    //     fileVal {Object} [可选] [默认值：'file'] 设置文件上传域的name。
    //     method {Object} [可选] [默认值：'POST'] 文件上传方式，POST或者GET。
    //     sendAsBinary {Object} [可选] [默认值：false] 是否已二进制的流的方式发送文件，这样整个上传内容php://input都为文件内容， 其他参数在$_GET数组中。
    //     fileNumLimit {int} [可选] [默认值：undefined] 验证文件总数量, 超出则不允许加入队列。
    //     fileSizeLimit {int} [可选] [默认值：undefined] 验证文件总大小是否超出限制, 超出则不允许加入队列。
    //     fileSingleSizeLimit {int} [可选] [默认值：undefined] 验证单个文件大小是否超出限制, 超出则不允许加入队列。
    //     duplicate {Boolean} [可选] [默认值：undefined] 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
    //     disableWidgets {String, Array} [可选] [默认值：undefined] 默认所有 Uploader.register 了的 widget 都会被加载，如果禁用某一部分，请通过此 option 指定黑名单。
    // --------------------------------------------------------------

    //默认配置
    Upload.prototype.config = {
        id: '',
        auto: false,
        disableGlobalDnd: false,
        swf: '../Lib/upload/Uploader.swf',// 文件接收服务端。
        server: '',
        formData: '',
        threads: 6,
        chunked: false,
        // chunked: true,
        // chunkSize: 2048000,
        pick: {},// 选择文件的按钮。
        method: 'Get',
        sendAsBinary: false,
        compress: false,// 不压缩image
        accept: {
            title: '',
            // extensions: 'png,jpg,jpeg,bmp,png,doc,docx,xls,xlsx,txt,pdf,mp4,mp3,rmvb,avi',
            extensions: 'dav,png,jpg,jpeg,bmp,png,doc,docx,xls,xlsx,txt,pdf,mp4,mp3,rmvb,avi,wmv',
            mimeTypes: '*'
        },
        fileNumLimit: 50,
        // duplicate:'',
        step: [],
    };

    /**
    * 初始化文件上传控件
    * 上传实例闭包
    */
    Upload.prototype.render = function (options) {
        var that = this
            , options = that.config;

        Uploader = WebUploader.create(options);
        
        Uploader.on('fileQueued', function (file) {
            var options = this.options;
            Uploader.md5File(file).then(function (val) {
                // console.log('md5 result:', val);
                var newfileobj = {
                    "fileImg": that.find_file_icon(file.source.ext),
                    "filePath": "",
                    "file_id": file.id,
                    "file_dir": file.source.source.path,
                    "file_name": file.name,
                    "file_type": file.source.ext, //类型 “jpg”, ”xls”… 
                    "file_size": file.source.size, //大小 “3243321” 单位 字节
                    "file_vision": "1", //当前版本
                    'percent': 0,
                    'upload_status': 0,
                    "guid": Math.random().toString().replace("0.", ""),
                    'md5': val
                }
                upload_list.push(newfileobj);
                uploadView.fileuploadlist.push(newfileobj);

                options.queued(newfileobj)

                Uploader.upload(file.id);
            });
        });

        Uploader.on("error",function (type){ 
            layer.msg("视频为不常见视频，请利用厂家的工具，转码为常见视频。")
        });

        Uploader.on('uploadBeforeSend', function (obj, data) {
            var options = this.options;
            var fileid = obj.file.id;
            var fileObj = upload_list.find(function (ele) {
                return ele.file_id == fileid;
            })

            var md5_s = "";
            if (fileObj) {
                md5_s = fileObj.md5;
            }

            //传入表单参数
            options.before(Object.assign(data, {
                "guid": fileObj.guid,
                "md5": md5_s || "",
                "uptime": new Date().format('yyyy/MM/dd hh:mm:ss')
            }))
        });

        Uploader.on('uploadProgress', function (file, percentage) {
            var options = this.options;
            // // console.log('uploadProgress', file, percentage);
            // layui.element.progress('progress_' + file.id, parseFloat(percentage * 100).toFixed(2) + '%')
            // /*$percent.css('width', percentage * 100 + '%');*/
            // var list = upload_list;
            // for (var i in list) {
            //     if (!isNaN(Number(i)) && list[i].file_id == file.id) {
            //         list[i].percent = parseFloat(percentage * 100).toFixed(2);
            //         break;
            //     }
            // }
            options.progress(file, percentage);
        });

        Uploader.on('uploadSuccess', function (file, response) {
            var options = this.options;
            console.log('uploadSuccess', file, response);
            var list = upload_list;
            for (var i = 0, il = list.length; i < il; i++) {
                var item = list[i];
                if (item.file_id == file.id) {
                    if (response.code == 500) {
                        layer.msg(response.msg)
                        item.upload_status = 0;
                        $('#file_cancel_btn_' + file.id).html("文件已存在");
                        // $('#progress_bar_' + file.id).removeClass('layui-bg-green').addClass('layui-bg-red');
                        layui.element.progress('progress_' + file.id, '0%');
                        return;
                    }
                    item.upload_status = 1;
                    item.folder_path = response.data.folder_path;
                    $("#file" + file.id + " .file-name").attr("name", response.data.folder_path);
                    item.percent = 100;
                    break;
                }
            };
            $('#file_cancel_btn_' + file.id).hide();
            $('#file_done_btn_' + file.id).show();
            $('#file_del_btn_' + file.id).show();
            // layui.element.progress('progress_' + file.id, '100%');
            options.success(response);
        });

        Uploader.on('uploadError', function (file, response) {
            var options = this.options;
            console.log('error', response);
            var fileid = file.id;
            var list = upload_list;
            for (var i = 0, il = list.length; i < il; i++) {
                var item = list[i];
                if (item.id == file.file_id) {
                    item.upload_status = 0;
                    break;
                }
            };
            // $('#file_cancel_btn_' + fileid).html("上传中断");
            // $('#progress_bar_' + fileid).removeClass('layui-bg-green').addClass('layui-bg-red');
            // $('#file_reupload_btn_' + fileid).show();
            // options.error(response);

            // sim success wzz 2020年5月25日
            $('#file_cancel_btn_' + file.id).hide();
            $('#file_done_btn_' + file.id).show();
            // $('#file_del_btn_' + file.id).show();
            // layui.element.progress('progress_' + file.id, '100%');
            options.success(response);
        
        });

        Uploader.on('uploadComplete', function (file, response) {
            var options = this.options;
            /*$('#' + file.id).find('.progress').fadeOut();*/
            // console.log('uploadComplete:' + file.name)
            // $('#file_reupload_btn_' + file.id).hide();

            // 剩余待传输文件
            if (upload_wait.length > 0) {
                for (let i = 0; i < upload_wait.length; i++) {
                    const ele = upload_wait[i];
                    // 传输完毕
                    if (ele.file_name == file.name) {
                        upload_wait.splice(i--, 1);
                    }
                }
            }
            uploadView.file_cnt(uploadView.fileuploadlist().length + '个文件上传成功');
            layer.msg("文件上传成功，开始解码...");
            options.complete(response);
            // 调用文件预览接口
            // $.ajax({
            //     url: web_config.zofficeUrl + "/word2pdf",
            //     type: "POST",
            //     dataType: "json",
            //     data: {
            //         file: '/home/kblibrary/public/files/' + file.name,
            //         file_path: '/home/kblibrary/public/previews/'
            //     },
            //     success: function (res) {
            //         console.log(res);
            //     }, error: function (error) {
            //         console.log(error);
            //     }
            // });
        });

        that.events();
    }

    /**
     * 清空上传列表
     *
     */
    uploadView.clear_upload_list = function () {
        // parent.layer.confirm("确定清空上传列表?", { icon: 3, title: '提示', offset: '200px' },
        // function (index) {
        //     Uploader.reset();
        //     upload_list = [];
        //     uploadView.fileuploadlist([]);
        //     parent.layer.close(index);
        // })
        Uploader.reset();
        upload_list = [];
        uploadView.fileuploadlist([]);
        uploadView.file_cnt('');
        // parent.layer.close(index);
    }

    /**
     * @description 重新上传
     * 
     */
    uploadView.reUpload = function () {
        // console.log(this);
        var fileid = this.file_id;
        Uploader.upload(fileid);

        $('#progress_bar_' + fileid).removeClass('layui-bg-red').addClass('layui-bg-green');
        $('#file_cancel_btn_' + fileid).html("取消");
        $('#file_reupload_btn_' + fileid).hide();
    }

    /**
     * @description 取消上传
     * 
     */
    uploadView.cancelUpload = function () {
        // console.log(this);
        var fileid = this.file_id;
        var file = this.file;
        Uploader.stop(file);

        $('#file_cancel_btn_' + fileid).html("已取消");
        // $('#progress_bar_' + fileid).removeClass('layui-bg-green').addClass('layui-bg-red');
        $('#file_reupload_btn_' + fileid).show();
    }

    /**
     *  文件删除
     *
     */
    uploadView.delUpload = function () {
        // console.log(this);
        var file_name = this.file_name;
        layer.confirm('是否需要从服务器删除 ' + file_name + ' ?', { icon: 3, title: '提示', offset: '200px' },
            function (index) {
                //do something
                // layer.close(index);
            });
    }

    //事件处理
    Upload.prototype.events = function () {
        var that = this
            , options = that.config

        // 选择文件夹
        $('#btnClick').bind('click', function () {
            if (options.step.length == 0) {
                $('#add_files_button label').click();
            }
            else {
                that.openWindow('select');
            }
        });

        $("#nav2file").click(function () {
            var cookie = document.cookie.split(";")
            var cookies = [];
            for (let i in cookie) {
                var temp = cookie[i].split("=");
                cookies[temp[0].trim()] = temp[1];
            }

            let user_type = '';
            if (cookies) {
                user_type = cookies['usertype_id'];
            }
            if (user_type == 1) {
                parent[0].$("#mgt_files")[0].click()
            } else if (user_type == 2) {
                parent[0].$("#userfile")[0].click()
            }
        })

        $(".file-tree").on('click', '.file-name', function () {
            var cookie = document.cookie.split(";")
            var cookies = [];
            for (let i in cookie) {
                var temp = cookie[i].split("=");
                cookies[temp[0].trim()] = temp[1];
            }

            let user_type = '';
            if (cookies) {
                user_type = cookies['usertype_id'];
            }
            if (user_type == 1) {
                parent[0].$("#system-content").attr("src", '/mgt_files?Upath=' + encodeURI($(this).attr(
                    "name")))
            } else
                if (user_type == 2) {
                    parent[0].$("#userinfo-content").attr("src", '/userfile?Upath=' + encodeURI($(this).attr(
                        "name")))
                }
        })
    }

    /**
     * 关闭其它上传子窗口
     *
     */
    Upload.prototype.closeOtherWin = function () {
        for (let i = 0; i < _opened.length; i++) {
            parent.layer.close(_opened[i]);
            _opened.splice(i--, 1);
        }
    }

    /**
     * 文件上传步骤提示页面
     * 如果需要在上传之前添加参数，可以采用这种方式
     * @param {*} type
     */
    Upload.prototype.openWindow = function (type) {
        this.closeOtherWin();

        $('body').css('height', '100%');
        var $add_files_button = $('#add_files_button label');
        var areaWidth = 1400;
        var areaHeight = 700;

        if ($(window).width() < 1400) {
            areaWidth = 900;
        }
        if ($(window).height() < 800) {
            areaHeight = 600;
        }

        $jq = parent.layui.jquery;
        index = parent.layer.open({
            type: 2,
            title: "上传文件",
            skin: 'configClass', // 加上边框
            area: [areaWidth + 'px', areaHeight + 'px'], // 宽高
            offset: 'auto',
            resize: true,
            scrollbar: false, // 滚动条
            content: ["userztree"],
            success: function (layero) {
                
                _layero = layero;

                //置顶
                var shadeidx = parseInt($jq('.layui-layer-shade').css('z-index'));
                $jq('#layui-layer1').css('z-index', shadeidx + 2);
                $(layero).css({ zIndex: 20000000 });

                parent.layer.setTop(layero); //叠加弹出

                // console.log(res)
                // $jq("body .configClass .layui-layer-title").css({
                //     'background-color': 'rgb(36, 124, 204)',
                //     'color': 'white',
                //     'font-size': '15px',
                //     'font-weight': 'bold'
                // });
                $jq(".layui-layer-btn").css({
                    'background-color': 'white'
                });

                $jq(".layui-layer-btn1").css({
                    'border-color': '#1E9FFF',
                    'background-color': '#1E9FFF',
                    'color': '#fff'
                });
                // console.log(data)
            },
            btn: [
                '上一步',
                '下一步',
                '关闭'
            ],
            yes: function (index, layero) {
                if (_step == 2) {
                    parent.layer.iframeSrc(index, "/userztree");
                }
                if (_step > 1) _step--;

            },
            btn2: function (index, layero) {
                if (_step == 1) {
                    // 第1步 选择文件夹 
                    var res = parent.window["layui-layer-iframe" + index].callbackdata();
                    console.log("step1 folder:", res.folder)

                    if (!res.folder || res.folder == "") {
                        // 提示框层级
                        $jq('#layui-layer1').css('z-index', 2);
                        $(layero).css({ zIndex: 2 });
                        parent.layer.msg('请先指定文件夹');

                        // 提示后回复上传框层级
                        setTimeout(() => {
                            var shadeidx = parseInt($jq('.layui-layer-shade').css('z-index'));
                            $jq('#layui-layer1').css('z-index', shadeidx + 2);
                            $(layero).css({ zIndex: 20000000 });
                        }, 1000);
                        return false;
                    } else {
                        Uploader.options.formData.folder = res.folder;
                        Uploader.options.formData.file_role = res.role;

                        // 第2步 选择分集
                        parent.layer.iframeSrc(index, "/file_sel_diversity");
                    }
                } else if (_step == 3) {
                    // 第3步 选择属性
                    // parent.layer.iframeSrc(index, "/userfile");
                    // parent.window.location.href = '/userfile';
                    // layer.msg('跳转到个人文件页面 userfile');
                    parent.layer.close(index);
                } else {
                    // 选择分集回调
                    Uploader.options.formData.file_classify = JSON.stringify(parent.window["layui-layer-iframe" + index].callbackdata());

                    // 提交
                    // parent.layer.msg('文件夹选择完成，请选择图片...');
                    // parent.layer.close(index);
                    setTimeout(() => {
                        $add_files_button.click();

                        // 遮罩上下层排布
                        // $(layero).css({ zIndex: idx - 2 })
                        var shadeidx = parseInt($jq('.layui-layer-shade').css('z-index'));
                        $jq('#layui-layer1').css('z-index', shadeidx + 4);
                        $(layero).css({ zIndex: shadeidx + 2 });
                    }, 1000);
                }
                if (_step < 2) _step++;
                return false;
            },
            btn3: function (index, layero) {
                parent.layer.close(index);
            },
            end: function () {
                _step = 1;
            }
        });
        _opened.push(index);
    }

    /**
     *  查找文件图标
     *
     */
    Upload.prototype.find_file_icon = function (filetype) {
        var fileImg = "";
        if (filetype && filetype.length > 0) {
            var filePath = "./images/fileicon/";
            filetype = filetype.toLowerCase();
            switch (filetype) {
                case "gif":
                case "jpg":
                case "jpeg":
                case "png":
                    fileImg = filePath + "png.png";
                    break;
                case "gif":
                case "jpg":
                case "png":
                    fileImg = filePath + "jpg.png";
                    break;
                case "raw":
                    fileImg = filePath + "raw.png";
                    break;
                case "eps":
                    fileImg = filePath + "eps.png";
                    break;
                case "raw":
                    fileImg = filePath + "raw.png";
                    break;
                case "doc":
                case "docx":
                    fileImg = filePath + "doc.png";
                    break;
                case "ppt":
                case "pptx":
                    fileImg = filePath + "ppt.png";
                    break;
                case "xls":
                case "xlsx":
                    fileImg = filePath + "xls.png";
                    break;
                case "csv":
                    fileImg = filePath + "csv.png";
                    break;
                case "txt":
                    fileImg = filePath + "txt.png";
                    break;
                case "pdf":
                    fileImg = filePath + "pdf.png";
                    break;
                case "wav":
                case "wma":
                case "mmf":
                    fileImg = filePath + "wav.png";
                    break;
                case "mp3":
                case "mid":
                case "amr":
                case "aac":
                case "flac":
                    fileImg = filePath + "mp3.png";
                    break;
                case "flv":
                case "swf":
                case "mkv":
                case "avi":
                    fileImg = filePath + "avi.png";
                    break;
                case "rm":
                case "rmvb":
                case "mpeg":
                case "mpg":
                case "ogg":
                case "ogv":
                case "mov":
                    fileImg = filePath + "mov.png";
                    break;
                case "wmv":
                case "mp4":
                case "webm":
                case "wav":
                case "mid":
                    fileImg = filePath + "video.png";
                    break;
                case "rar":
                    fileImg = filePath + "rar.png";
                    break;
                case "zip":
                case "7z":
                case "arj":
                case "z":
                case "gz":
                case "iso":
                case "bak":
                    fileImg = filePath + "zip.png";
                    break;
                case "exe":
                case "bin":
                case "com":
                    fileImg = filePath + "exe.png"; 
                    break;
                case "dwg":
                case "dwt":
                    fileImg = filePath + "dwg.png";
                    break;
                case "htm":
                case "html":
                case "chm":
                    fileImg = filePath + "html.png";
                    break;
                case "css":
                    fileImg = filePath + "css.png";
                    break;
                default:
                    fileImg = filePath + "video.png";
                    break;
            }
        }
        return fileImg;
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份 
            "d+": this.getDate(),                    //日 
            "h+": this.getHours(),                   //小时 
            "m+": this.getMinutes(),                 //分 
            "s+": this.getSeconds(),                 //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds()             //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    //外部接口
    var upload = {
        config: {} //全局配置项

        //设置全局项
        , set: function (options) {
            var that = this;
            that.config = $.extend({}, that.config, options);
            return that;
        }

        , render: function (options) {
            var that = this;
            var inst = new Upload(options);

            return {
                render: function (options) {
                    that.render.call(inst, options);
                }
                , config: that.config
            }
        }
    };
    ko.applyBindings(uploadView, document.getElementById('upload_page_view'));

    exports(MOD_NAME, upload);// 非layui环境下注释
});
// })(window) // 非layui环境下运行打开