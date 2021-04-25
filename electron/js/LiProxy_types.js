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
if (typeof cn.ac.trimps.liproxy === 'undefined') {
  cn.ac.trimps.liproxy = {};
}
if (typeof cn.ac.trimps.liproxy.service === 'undefined') {
  cn.ac.trimps.liproxy.service = {};
}
cn.ac.trimps.liproxy.service.DeviceStatus = {
  'OK' : 0,
  'OFFLINE' : 1,
  'ERROR' : 2,
  'UNKNOWN' : 3
};
cn.ac.trimps.liproxy.service.Encoding = {
  'H264' : 0,
  'H265' : 1,
  'G711' : 2,
  'G723' : 3,
  'G729' : 4,
  'G722' : 5,
  'UNKNOWN' : 6
};
cn.ac.trimps.liproxy.service.BindMode = {
  'ALLOW_DUP_ADDR' : 0,
  'DISALLOW_DUP_ADDR' : 1
};
cn.ac.trimps.liproxy.service.ProxyException = function(args) {
  this.errorCode = null;
  this.message = null;
  if (args) {
    if (args.errorCode !== undefined && args.errorCode !== null) {
      this.errorCode = args.errorCode;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(cn.ac.trimps.liproxy.service.ProxyException, Thrift.TException);
cn.ac.trimps.liproxy.service.ProxyException.prototype.name = 'ProxyException';
cn.ac.trimps.liproxy.service.ProxyException.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.errorCode = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString().value;
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

cn.ac.trimps.liproxy.service.ProxyException.prototype.write = function(output) {
  output.writeStructBegin('ProxyException');
  if (this.errorCode !== null && this.errorCode !== undefined) {
    output.writeFieldBegin('errorCode', Thrift.Type.I32, 1);
    output.writeI32(this.errorCode);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.ProtocolException = function(args) {
  this.errorCode = null;
  this.message = null;
  if (args) {
    if (args.errorCode !== undefined && args.errorCode !== null) {
      this.errorCode = args.errorCode;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(cn.ac.trimps.liproxy.service.ProtocolException, Thrift.TException);
cn.ac.trimps.liproxy.service.ProtocolException.prototype.name = 'ProtocolException';
cn.ac.trimps.liproxy.service.ProtocolException.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.errorCode = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString().value;
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

cn.ac.trimps.liproxy.service.ProtocolException.prototype.write = function(output) {
  output.writeStructBegin('ProtocolException');
  if (this.errorCode !== null && this.errorCode !== undefined) {
    output.writeFieldBegin('errorCode', Thrift.Type.I32, 1);
    output.writeI32(this.errorCode);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.InvalidArgumentException = function(args) {
  this.errorCode = null;
  this.message = null;
  if (args) {
    if (args.errorCode !== undefined && args.errorCode !== null) {
      this.errorCode = args.errorCode;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(cn.ac.trimps.liproxy.service.InvalidArgumentException, Thrift.TException);
cn.ac.trimps.liproxy.service.InvalidArgumentException.prototype.name = 'InvalidArgumentException';
cn.ac.trimps.liproxy.service.InvalidArgumentException.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.errorCode = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString().value;
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

cn.ac.trimps.liproxy.service.InvalidArgumentException.prototype.write = function(output) {
  output.writeStructBegin('InvalidArgumentException');
  if (this.errorCode !== null && this.errorCode !== undefined) {
    output.writeFieldBegin('errorCode', Thrift.Type.I32, 1);
    output.writeI32(this.errorCode);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.NetworkException = function(args) {
  this.errorCode = null;
  this.message = null;
  if (args) {
    if (args.errorCode !== undefined && args.errorCode !== null) {
      this.errorCode = args.errorCode;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(cn.ac.trimps.liproxy.service.NetworkException, Thrift.TException);
cn.ac.trimps.liproxy.service.NetworkException.prototype.name = 'NetworkException';
cn.ac.trimps.liproxy.service.NetworkException.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.errorCode = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString().value;
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

cn.ac.trimps.liproxy.service.NetworkException.prototype.write = function(output) {
  output.writeStructBegin('NetworkException');
  if (this.errorCode !== null && this.errorCode !== undefined) {
    output.writeFieldBegin('errorCode', Thrift.Type.I32, 1);
    output.writeI32(this.errorCode);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.DateTime = function(args) {
  this.year = null;
  this.month = null;
  this.day = null;
  this.hour = null;
  this.minute = null;
  this.second = null;
  if (args) {
    if (args.year !== undefined && args.year !== null) {
      this.year = args.year;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field year is unset!');
    }
    if (args.month !== undefined && args.month !== null) {
      this.month = args.month;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field month is unset!');
    }
    if (args.day !== undefined && args.day !== null) {
      this.day = args.day;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field day is unset!');
    }
    if (args.hour !== undefined && args.hour !== null) {
      this.hour = args.hour;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field hour is unset!');
    }
    if (args.minute !== undefined && args.minute !== null) {
      this.minute = args.minute;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field minute is unset!');
    }
    if (args.second !== undefined && args.second !== null) {
      this.second = args.second;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field second is unset!');
    }
  }
};
cn.ac.trimps.liproxy.service.DateTime.prototype = {};
cn.ac.trimps.liproxy.service.DateTime.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I16) {
        this.year = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I16) {
        this.month = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I16) {
        this.day = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I16) {
        this.hour = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I16) {
        this.minute = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.I16) {
        this.second = input.readI16().value;
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

cn.ac.trimps.liproxy.service.DateTime.prototype.write = function(output) {
  output.writeStructBegin('DateTime');
  if (this.year !== null && this.year !== undefined) {
    output.writeFieldBegin('year', Thrift.Type.I16, 1);
    output.writeI16(this.year);
    output.writeFieldEnd();
  }
  if (this.month !== null && this.month !== undefined) {
    output.writeFieldBegin('month', Thrift.Type.I16, 2);
    output.writeI16(this.month);
    output.writeFieldEnd();
  }
  if (this.day !== null && this.day !== undefined) {
    output.writeFieldBegin('day', Thrift.Type.I16, 3);
    output.writeI16(this.day);
    output.writeFieldEnd();
  }
  if (this.hour !== null && this.hour !== undefined) {
    output.writeFieldBegin('hour', Thrift.Type.I16, 4);
    output.writeI16(this.hour);
    output.writeFieldEnd();
  }
  if (this.minute !== null && this.minute !== undefined) {
    output.writeFieldBegin('minute', Thrift.Type.I16, 5);
    output.writeI16(this.minute);
    output.writeFieldEnd();
  }
  if (this.second !== null && this.second !== undefined) {
    output.writeFieldBegin('second', Thrift.Type.I16, 6);
    output.writeI16(this.second);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.Handler = function(args) {
  this.id = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field id is unset!');
    }
  }
};
cn.ac.trimps.liproxy.service.Handler.prototype = {};
cn.ac.trimps.liproxy.service.Handler.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.id = input.readI32().value;
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

cn.ac.trimps.liproxy.service.Handler.prototype.write = function(output) {
  output.writeStructBegin('Handler');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I32, 1);
    output.writeI32(this.id);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.DeviceInfo = function(args) {
  this.PTZType = null;
  this.PositionType = null;
  this.RoomType = null;
  this.UseType = null;
  this.SupplyLightType = null;
  this.DirectionType = null;
  this.Resolution = null;
  this.BusinessGroupID = null;
  if (args) {
    if (args.PTZType !== undefined && args.PTZType !== null) {
      this.PTZType = args.PTZType;
    }
    if (args.PositionType !== undefined && args.PositionType !== null) {
      this.PositionType = args.PositionType;
    }
    if (args.RoomType !== undefined && args.RoomType !== null) {
      this.RoomType = args.RoomType;
    }
    if (args.UseType !== undefined && args.UseType !== null) {
      this.UseType = args.UseType;
    }
    if (args.SupplyLightType !== undefined && args.SupplyLightType !== null) {
      this.SupplyLightType = args.SupplyLightType;
    }
    if (args.DirectionType !== undefined && args.DirectionType !== null) {
      this.DirectionType = args.DirectionType;
    }
    if (args.Resolution !== undefined && args.Resolution !== null) {
      this.Resolution = args.Resolution;
    }
    if (args.BusinessGroupID !== undefined && args.BusinessGroupID !== null) {
      this.BusinessGroupID = args.BusinessGroupID;
    }
  }
};
cn.ac.trimps.liproxy.service.DeviceInfo.prototype = {};
cn.ac.trimps.liproxy.service.DeviceInfo.prototype.read = function(input) {
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
        this.PTZType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.PositionType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.RoomType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.UseType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.SupplyLightType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.DirectionType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.Resolution = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.BusinessGroupID = input.readString().value;
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

cn.ac.trimps.liproxy.service.DeviceInfo.prototype.write = function(output) {
  output.writeStructBegin('DeviceInfo');
  if (this.PTZType !== null && this.PTZType !== undefined) {
    output.writeFieldBegin('PTZType', Thrift.Type.STRING, 1);
    output.writeString(this.PTZType);
    output.writeFieldEnd();
  }
  if (this.PositionType !== null && this.PositionType !== undefined) {
    output.writeFieldBegin('PositionType', Thrift.Type.STRING, 2);
    output.writeString(this.PositionType);
    output.writeFieldEnd();
  }
  if (this.RoomType !== null && this.RoomType !== undefined) {
    output.writeFieldBegin('RoomType', Thrift.Type.STRING, 3);
    output.writeString(this.RoomType);
    output.writeFieldEnd();
  }
  if (this.UseType !== null && this.UseType !== undefined) {
    output.writeFieldBegin('UseType', Thrift.Type.STRING, 4);
    output.writeString(this.UseType);
    output.writeFieldEnd();
  }
  if (this.SupplyLightType !== null && this.SupplyLightType !== undefined) {
    output.writeFieldBegin('SupplyLightType', Thrift.Type.STRING, 5);
    output.writeString(this.SupplyLightType);
    output.writeFieldEnd();
  }
  if (this.DirectionType !== null && this.DirectionType !== undefined) {
    output.writeFieldBegin('DirectionType', Thrift.Type.STRING, 6);
    output.writeString(this.DirectionType);
    output.writeFieldEnd();
  }
  if (this.Resolution !== null && this.Resolution !== undefined) {
    output.writeFieldBegin('Resolution', Thrift.Type.STRING, 7);
    output.writeString(this.Resolution);
    output.writeFieldEnd();
  }
  if (this.BusinessGroupID !== null && this.BusinessGroupID !== undefined) {
    output.writeFieldBegin('BusinessGroupID', Thrift.Type.STRING, 8);
    output.writeString(this.BusinessGroupID);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

cn.ac.trimps.liproxy.service.DeviceItem = function(args) {
  this.DeviceID = null;
  this.Name = null;
  this.Manufacturer = null;
  this.Model = null;
  this.Owner = null;
  this.CivilCode = null;
  this.Address = null;
  this.Parental = null;
  this.ParentID = null;
  this.SafetyWay = null;
  this.RegisterWay = null;
  this.Secrecy = null;
  this.IPAddress = null;
  this.Port = null;
  this.Password = null;
  this.Status = null;
  this.CertNum = null;
  this.Certifiable = null;
  this.ErrCode = null;
  this.EndTime = null;
  this.Longitude = null;
  this.Latitude = null;
  this.info = null;
  if (args) {
    if (args.DeviceID !== undefined && args.DeviceID !== null) {
      this.DeviceID = args.DeviceID;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field DeviceID is unset!');
    }
    if (args.Name !== undefined && args.Name !== null) {
      this.Name = args.Name;
    } else {
      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.UNKNOWN, 'Required field Name is unset!');
    }
    if (args.Manufacturer !== undefined && args.Manufacturer !== null) {
      this.Manufacturer = args.Manufacturer;
    }
    if (args.Model !== undefined && args.Model !== null) {
      this.Model = args.Model;
    }
    if (args.Owner !== undefined && args.Owner !== null) {
      this.Owner = args.Owner;
    }
    if (args.CivilCode !== undefined && args.CivilCode !== null) {
      this.CivilCode = args.CivilCode;
    }
    if (args.Address !== undefined && args.Address !== null) {
      this.Address = args.Address;
    }
    if (args.Parental !== undefined && args.Parental !== null) {
      this.Parental = args.Parental;
    }
    if (args.ParentID !== undefined && args.ParentID !== null) {
      this.ParentID = args.ParentID;
    }
    if (args.SafetyWay !== undefined && args.SafetyWay !== null) {
      this.SafetyWay = args.SafetyWay;
    }
    if (args.RegisterWay !== undefined && args.RegisterWay !== null) {
      this.RegisterWay = args.RegisterWay;
    }
    if (args.Secrecy !== undefined && args.Secrecy !== null) {
      this.Secrecy = args.Secrecy;
    }
    if (args.IPAddress !== undefined && args.IPAddress !== null) {
      this.IPAddress = args.IPAddress;
    }
    if (args.Port !== undefined && args.Port !== null) {
      this.Port = args.Port;
    }
    if (args.Password !== undefined && args.Password !== null) {
      this.Password = args.Password;
    }
    if (args.Status !== undefined && args.Status !== null) {
      this.Status = args.Status;
    }
    if (args.CertNum !== undefined && args.CertNum !== null) {
      this.CertNum = args.CertNum;
    }
    if (args.Certifiable !== undefined && args.Certifiable !== null) {
      this.Certifiable = args.Certifiable;
    }
    if (args.ErrCode !== undefined && args.ErrCode !== null) {
      this.ErrCode = args.ErrCode;
    }
    if (args.EndTime !== undefined && args.EndTime !== null) {
      this.EndTime = args.EndTime;
    }
    if (args.Longitude !== undefined && args.Longitude !== null) {
      this.Longitude = args.Longitude;
    }
    if (args.Latitude !== undefined && args.Latitude !== null) {
      this.Latitude = args.Latitude;
    }
    if (args.info !== undefined && args.info !== null) {
      this.info = new cn.ac.trimps.liproxy.service.DeviceInfo(args.info);
    }
  }
};
cn.ac.trimps.liproxy.service.DeviceItem.prototype = {};
cn.ac.trimps.liproxy.service.DeviceItem.prototype.read = function(input) {
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
        this.DeviceID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.Name = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.Manufacturer = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.Model = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.Owner = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.CivilCode = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.Address = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.STRING) {
        this.Parental = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.ParentID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.STRING) {
        this.SafetyWay = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 11:
      if (ftype == Thrift.Type.STRING) {
        this.RegisterWay = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 12:
      if (ftype == Thrift.Type.STRING) {
        this.Secrecy = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 13:
      if (ftype == Thrift.Type.STRING) {
        this.IPAddress = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 14:
      if (ftype == Thrift.Type.STRING) {
        this.Port = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 15:
      if (ftype == Thrift.Type.STRING) {
        this.Password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 16:
      if (ftype == Thrift.Type.STRING) {
        this.Status = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 17:
      if (ftype == Thrift.Type.STRING) {
        this.CertNum = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 18:
      if (ftype == Thrift.Type.STRING) {
        this.Certifiable = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 19:
      if (ftype == Thrift.Type.STRING) {
        this.ErrCode = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 20:
      if (ftype == Thrift.Type.STRING) {
        this.EndTime = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 21:
      if (ftype == Thrift.Type.STRING) {
        this.Longitude = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 22:
      if (ftype == Thrift.Type.STRING) {
        this.Latitude = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 23:
      if (ftype == Thrift.Type.STRUCT) {
        this.info = new cn.ac.trimps.liproxy.service.DeviceInfo();
        this.info.read(input);
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

cn.ac.trimps.liproxy.service.DeviceItem.prototype.write = function(output) {
  output.writeStructBegin('DeviceItem');
  if (this.DeviceID !== null && this.DeviceID !== undefined) {
    output.writeFieldBegin('DeviceID', Thrift.Type.STRING, 1);
    output.writeString(this.DeviceID);
    output.writeFieldEnd();
  }
  if (this.Name !== null && this.Name !== undefined) {
    output.writeFieldBegin('Name', Thrift.Type.STRING, 2);
    output.writeString(this.Name);
    output.writeFieldEnd();
  }
  if (this.Manufacturer !== null && this.Manufacturer !== undefined) {
    output.writeFieldBegin('Manufacturer', Thrift.Type.STRING, 3);
    output.writeString(this.Manufacturer);
    output.writeFieldEnd();
  }
  if (this.Model !== null && this.Model !== undefined) {
    output.writeFieldBegin('Model', Thrift.Type.STRING, 4);
    output.writeString(this.Model);
    output.writeFieldEnd();
  }
  if (this.Owner !== null && this.Owner !== undefined) {
    output.writeFieldBegin('Owner', Thrift.Type.STRING, 5);
    output.writeString(this.Owner);
    output.writeFieldEnd();
  }
  if (this.CivilCode !== null && this.CivilCode !== undefined) {
    output.writeFieldBegin('CivilCode', Thrift.Type.STRING, 6);
    output.writeString(this.CivilCode);
    output.writeFieldEnd();
  }
  if (this.Address !== null && this.Address !== undefined) {
    output.writeFieldBegin('Address', Thrift.Type.STRING, 7);
    output.writeString(this.Address);
    output.writeFieldEnd();
  }
  if (this.Parental !== null && this.Parental !== undefined) {
    output.writeFieldBegin('Parental', Thrift.Type.STRING, 8);
    output.writeString(this.Parental);
    output.writeFieldEnd();
  }
  if (this.ParentID !== null && this.ParentID !== undefined) {
    output.writeFieldBegin('ParentID', Thrift.Type.STRING, 9);
    output.writeString(this.ParentID);
    output.writeFieldEnd();
  }
  if (this.SafetyWay !== null && this.SafetyWay !== undefined) {
    output.writeFieldBegin('SafetyWay', Thrift.Type.STRING, 10);
    output.writeString(this.SafetyWay);
    output.writeFieldEnd();
  }
  if (this.RegisterWay !== null && this.RegisterWay !== undefined) {
    output.writeFieldBegin('RegisterWay', Thrift.Type.STRING, 11);
    output.writeString(this.RegisterWay);
    output.writeFieldEnd();
  }
  if (this.Secrecy !== null && this.Secrecy !== undefined) {
    output.writeFieldBegin('Secrecy', Thrift.Type.STRING, 12);
    output.writeString(this.Secrecy);
    output.writeFieldEnd();
  }
  if (this.IPAddress !== null && this.IPAddress !== undefined) {
    output.writeFieldBegin('IPAddress', Thrift.Type.STRING, 13);
    output.writeString(this.IPAddress);
    output.writeFieldEnd();
  }
  if (this.Port !== null && this.Port !== undefined) {
    output.writeFieldBegin('Port', Thrift.Type.STRING, 14);
    output.writeString(this.Port);
    output.writeFieldEnd();
  }
  if (this.Password !== null && this.Password !== undefined) {
    output.writeFieldBegin('Password', Thrift.Type.STRING, 15);
    output.writeString(this.Password);
    output.writeFieldEnd();
  }
  if (this.Status !== null && this.Status !== undefined) {
    output.writeFieldBegin('Status', Thrift.Type.STRING, 16);
    output.writeString(this.Status);
    output.writeFieldEnd();
  }
  if (this.CertNum !== null && this.CertNum !== undefined) {
    output.writeFieldBegin('CertNum', Thrift.Type.STRING, 17);
    output.writeString(this.CertNum);
    output.writeFieldEnd();
  }
  if (this.Certifiable !== null && this.Certifiable !== undefined) {
    output.writeFieldBegin('Certifiable', Thrift.Type.STRING, 18);
    output.writeString(this.Certifiable);
    output.writeFieldEnd();
  }
  if (this.ErrCode !== null && this.ErrCode !== undefined) {
    output.writeFieldBegin('ErrCode', Thrift.Type.STRING, 19);
    output.writeString(this.ErrCode);
    output.writeFieldEnd();
  }
  if (this.EndTime !== null && this.EndTime !== undefined) {
    output.writeFieldBegin('EndTime', Thrift.Type.STRING, 20);
    output.writeString(this.EndTime);
    output.writeFieldEnd();
  }
  if (this.Longitude !== null && this.Longitude !== undefined) {
    output.writeFieldBegin('Longitude', Thrift.Type.STRING, 21);
    output.writeString(this.Longitude);
    output.writeFieldEnd();
  }
  if (this.Latitude !== null && this.Latitude !== undefined) {
    output.writeFieldBegin('Latitude', Thrift.Type.STRING, 22);
    output.writeString(this.Latitude);
    output.writeFieldEnd();
  }
  if (this.info !== null && this.info !== undefined) {
    output.writeFieldBegin('info', Thrift.Type.STRUCT, 23);
    this.info.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

