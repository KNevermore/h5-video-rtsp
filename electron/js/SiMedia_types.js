//
// Autogenerated by Thrift Compiler (0.12.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


if (typeof cn === 'undefined') {
    cn = {};
  }
  if (typeof cn.ac === 'undefined') {
    cn.ac = {};
  }
  if (typeof cn.ac.trimps === 'undefined') {
    cn.ac.trimps = {};
  }
  if (typeof cn.ac.trimps.simedia === 'undefined') {
    cn.ac.trimps.simedia = {};
  }
  if (typeof cn.ac.trimps.simedia.service === 'undefined') {
    cn.ac.trimps.simedia.service = {};
  }
  cn.ac.trimps.simedia.service.ChannelMode = {
    'UNICAST_MODE' : 1,
    'MULTICAST_MODE' : 2
  };
  cn.ac.trimps.simedia.service.ChannelException = function(args) {
    this.message = null;
    if (args) {
      if (args.message !== undefined && args.message !== null) {
        this.message = args.message;
      }
    }
  };
  Thrift.inherits(cn.ac.trimps.simedia.service.ChannelException, Thrift.TException);
  cn.ac.trimps.simedia.service.ChannelException.prototype.name = 'ChannelException';
  cn.ac.trimps.simedia.service.ChannelException.prototype.read = function(input) {
    input.readStructBegin();
    while (true) {
      var ret = input.readFieldBegin();
      var ftype = ret.ftype;
      var fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid) {
        case 1:
        if (ftype == Thrift.Type.STRING) {
          this.message = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 0:
          input.skip(ftype);
          break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  };
  
  cn.ac.trimps.simedia.service.ChannelException.prototype.write = function(output) {
    output.writeStructBegin('ChannelException');
    if (this.message !== null && this.message !== undefined) {
      output.writeFieldBegin('message', Thrift.Type.STRING, 1);
      output.writeString(this.message);
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  };
  
  cn.ac.trimps.simedia.service.ChannelClientConnection = function(args) {
    this.address = null;
    this.videoPorts = null;
    this.audioPorts = null;
    if (args) {
      if (args.address !== undefined && args.address !== null) {
        this.address = args.address;
      }
      if (args.videoPorts !== undefined && args.videoPorts !== null) {
        this.videoPorts = Thrift.copyList(args.videoPorts, [null]);
      }
      if (args.audioPorts !== undefined && args.audioPorts !== null) {
        this.audioPorts = Thrift.copyList(args.audioPorts, [null]);
      }
    }
  };
  cn.ac.trimps.simedia.service.ChannelClientConnection.prototype = {};
  cn.ac.trimps.simedia.service.ChannelClientConnection.prototype.read = function(input) {
    input.readStructBegin();
    while (true) {
      var ret = input.readFieldBegin();
      var ftype = ret.ftype;
      var fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid) {
        case 1:
        if (ftype == Thrift.Type.STRING) {
          this.address = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 2:
        if (ftype == Thrift.Type.LIST) {
          this.videoPorts = [];
          var _rtmp31 = input.readListBegin();
          var _size0 = _rtmp31.size || 0;
          for (var _i2 = 0; _i2 < _size0; ++_i2) {
            var elem3 = null;
            elem3 = input.readI32().value;
            this.videoPorts.push(elem3);
          }
          input.readListEnd();
        } else {
          input.skip(ftype);
        }
        break;
        case 3:
        if (ftype == Thrift.Type.LIST) {
          this.audioPorts = [];
          var _rtmp35 = input.readListBegin();
          var _size4 = _rtmp35.size || 0;
          for (var _i6 = 0; _i6 < _size4; ++_i6) {
            var elem7 = null;
            elem7 = input.readI32().value;
            this.audioPorts.push(elem7);
          }
          input.readListEnd();
        } else {
          input.skip(ftype);
        }
        break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  };
  
  cn.ac.trimps.simedia.service.ChannelClientConnection.prototype.write = function(output) {
    output.writeStructBegin('ChannelClientConnection');
    if (this.address !== null && this.address !== undefined) {
      output.writeFieldBegin('address', Thrift.Type.STRING, 1);
      output.writeString(this.address);
      output.writeFieldEnd();
    }
    if (this.videoPorts !== null && this.videoPorts !== undefined) {
      output.writeFieldBegin('videoPorts', Thrift.Type.LIST, 2);
      output.writeListBegin(Thrift.Type.I32, this.videoPorts.length);
      for (var iter8 in this.videoPorts) {
        if (this.videoPorts.hasOwnProperty(iter8)) {
          iter8 = this.videoPorts[iter8];
          output.writeI32(iter8);
        }
      }
      output.writeListEnd();
      output.writeFieldEnd();
    }
    if (this.audioPorts !== null && this.audioPorts !== undefined) {
      output.writeFieldBegin('audioPorts', Thrift.Type.LIST, 3);
      output.writeListBegin(Thrift.Type.I32, this.audioPorts.length);
      for (var iter9 in this.audioPorts) {
        if (this.audioPorts.hasOwnProperty(iter9)) {
          iter9 = this.audioPorts[iter9];
          output.writeI32(iter9);
        }
      }
      output.writeListEnd();
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  };
  
  cn.ac.trimps.simedia.service.Channel = function(args) {
    this.referenced = null;
    this.clientSessionId = null;
    this.sinkAddress = null;
    this.videoSinkPorts = null;
    this.audioSinkPorts = null;
    if (args) {
      if (args.referenced !== undefined && args.referenced !== null) {
        this.referenced = args.referenced;
      }
      if (args.clientSessionId !== undefined && args.clientSessionId !== null) {
        this.clientSessionId = args.clientSessionId;
      }
      if (args.sinkAddress !== undefined && args.sinkAddress !== null) {
        this.sinkAddress = args.sinkAddress;
      }
      if (args.videoSinkPorts !== undefined && args.videoSinkPorts !== null) {
        this.videoSinkPorts = Thrift.copyList(args.videoSinkPorts, [null]);
      }
      if (args.audioSinkPorts !== undefined && args.audioSinkPorts !== null) {
        this.audioSinkPorts = Thrift.copyList(args.audioSinkPorts, [null]);
      }
    }
  };
  cn.ac.trimps.simedia.service.Channel.prototype = {};
  cn.ac.trimps.simedia.service.Channel.prototype.read = function(input) {
    input.readStructBegin();
    while (true) {
      var ret = input.readFieldBegin();
      var ftype = ret.ftype;
      var fid = ret.fid;
      if (ftype == Thrift.Type.STOP) {
        break;
      }
      switch (fid) {
        case 1:
        if (ftype == Thrift.Type.BOOL) {
          this.referenced = input.readBool().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 2:
        if (ftype == Thrift.Type.STRING) {
          this.clientSessionId = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 3:
        if (ftype == Thrift.Type.STRING) {
          this.sinkAddress = input.readString().value;
        } else {
          input.skip(ftype);
        }
        break;
        case 4:
        if (ftype == Thrift.Type.LIST) {
          this.videoSinkPorts = [];
          var _rtmp311 = input.readListBegin();
          var _size10 = _rtmp311.size || 0;
          for (var _i12 = 0; _i12 < _size10; ++_i12) {
            var elem13 = null;
            elem13 = input.readI32().value;
            this.videoSinkPorts.push(elem13);
          }
          input.readListEnd();
        } else {
          input.skip(ftype);
        }
        break;
        case 5:
        if (ftype == Thrift.Type.LIST) {
          this.audioSinkPorts = [];
          var _rtmp315 = input.readListBegin();
          var _size14 = _rtmp315.size || 0;
          for (var _i16 = 0; _i16 < _size14; ++_i16) {
            var elem17 = null;
            elem17 = input.readI32().value;
            this.audioSinkPorts.push(elem17);
          }
          input.readListEnd();
        } else {
          input.skip(ftype);
        }
        break;
        default:
          input.skip(ftype);
      }
      input.readFieldEnd();
    }
    input.readStructEnd();
    return;
  };
  
  cn.ac.trimps.simedia.service.Channel.prototype.write = function(output) {
    output.writeStructBegin('Channel');
    if (this.referenced !== null && this.referenced !== undefined) {
      output.writeFieldBegin('referenced', Thrift.Type.BOOL, 1);
      output.writeBool(this.referenced);
      output.writeFieldEnd();
    }
    if (this.clientSessionId !== null && this.clientSessionId !== undefined) {
      output.writeFieldBegin('clientSessionId', Thrift.Type.STRING, 2);
      output.writeString(this.clientSessionId);
      output.writeFieldEnd();
    }
    if (this.sinkAddress !== null && this.sinkAddress !== undefined) {
      output.writeFieldBegin('sinkAddress', Thrift.Type.STRING, 3);
      output.writeString(this.sinkAddress);
      output.writeFieldEnd();
    }
    if (this.videoSinkPorts !== null && this.videoSinkPorts !== undefined) {
      output.writeFieldBegin('videoSinkPorts', Thrift.Type.LIST, 4);
      output.writeListBegin(Thrift.Type.I32, this.videoSinkPorts.length);
      for (var iter18 in this.videoSinkPorts) {
        if (this.videoSinkPorts.hasOwnProperty(iter18)) {
          iter18 = this.videoSinkPorts[iter18];
          output.writeI32(iter18);
        }
      }
      output.writeListEnd();
      output.writeFieldEnd();
    }
    if (this.audioSinkPorts !== null && this.audioSinkPorts !== undefined) {
      output.writeFieldBegin('audioSinkPorts', Thrift.Type.LIST, 5);
      output.writeListBegin(Thrift.Type.I32, this.audioSinkPorts.length);
      for (var iter19 in this.audioSinkPorts) {
        if (this.audioSinkPorts.hasOwnProperty(iter19)) {
          iter19 = this.audioSinkPorts[iter19];
          output.writeI32(iter19);
        }
      }
      output.writeListEnd();
      output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
  };
  