var g_iWndIndex =
    0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
var zTree;
$(function() {
  //初始化树形控件
  $.fn.zTree.init($("#treeDemo"), setting, zNodes);
  zTree = $.fn.zTree.getZTreeObj("treeDemo");

  // 检查插件是否已经安装过
  if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
    alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
    return;
  }

  // 初始化插件参数及插入插件
  WebVideoCtrl.I_InitPlugin(750, 500, {
    iWndowType : 1,
    cbSelWnd : function(xmlDoc) {
      g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
      var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
    }
  });
  WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

  // 检查插件是否最新
  if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
    alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
    return;
  }

  // 窗口事件绑定
  $(window)
      .bind({
        resize : function() {
          var $Restart = $("#restartDiv");
          if ($Restart.length > 0) {
            var oSize = getWindowSize();
            $Restart.css(
                {width : oSize.width + "px", height : oSize.height + "px"});
          }
        }
      });
  var inWin;
  $('#footbar > img').mouseover(function() { $("#Wnd").show(); });
  $('#footbar > img')
      .mouseout(function(e) {
        if (e.pageY <= getElementTop(this) + this.offsetHeight) {
          $("#Wnd").hide();
        } else {
        }
      });

  $("#Wnd")
      .mouseout(function(e) {
        console.log(e.pageY + '--' + (getElementTop(this)));
        if (getElementTop(this) && e.pageY > getElementTop(this)) {
          $("#Wnd").hide();
        } else if (getElementTop(this) == 0) {
          $("#Wnd").show();
        }
      });
});

// 登录
function clickLogin(treeNode) {
  var szIP = treeNode.ip, szPort = '80', szChannel = treeNode.channel,
      szUsername = 'admin', szPassword = '12345';

  if ("" == szIP || "" == szPort) {
    return;
  }

  var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
    success : function(xmlDoc) {
      console.log(szIP + " 登录成功！");
      setTimeout(function() { getChannelInfo(treeNode); }, 10);
    },
    error : function() { console.log(szIP + " 登录失败！"); }
  });

  if (-1 == iRet) {
    console.log(szIP + " 已登录过！");
    clickStartRealPlay(treeNode);
  }
}

// 获取通道
function getChannelInfo(treeNode) {
  var szIP = treeNode.ip, nAnalogChannel = 0;

  if ("" == szIP) {
    return;
  }
  // 模拟通道
  WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
    async : false,
    success : function(xmlDoc) {
      var oChannels = $(xmlDoc).find("VideoInputChannel");
      console.log(szIP + " 获取模拟通道成功！");
      if (oChannels.length)
        clickStartRealPlay(treeNode);
    },
    error : function() { console.log(szIP + " 获取模拟通道失败！"); }
  });

  // 数字通道
  WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
    async : false,
    success : function(xmlDoc) {
      var oChannels = $(xmlDoc).find("InputProxyChannelStatus");
      console.log(szIP + " 获取数字通道成功！");
      if (oChannels.length)
        clickStartRealPlay(treeNode);
    },
    error : function() { console.log(szIP + " 获取数字通道失败！"); }
  });
}

// 开始预览
function clickStartRealPlay(treeNode) {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
      szIP = treeNode.ip, iStreamType = 1, iChannelID = treeNode.channel,
      szInfo = "";
  var iRet;
  if ("" == szIP) {
    return;
  }

  if (oWndInfo != null) { // 已经在播放了，停止预览
    iRet = WebVideoCtrl.I_Stop();
    if (0 == iRet) {
      szInfo = "停止预览成功！";
      treeNode.icon = './images/Camera_1.png';
    } else {
      szInfo = "停止预览失败！";
    }

  } else { //开始预览
    iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
      iStreamType : iStreamType,
      iChannelID : iChannelID,
      bZeroChannel : false
    });

    if (0 == iRet) {
      szInfo = "开始预览成功！";
      treeNode.icon = './images/Camera_2.png';
    } else {
      szInfo = "开始预览失败！";
    }
  }
  if (treeNode.pId)
    zTree.updateNode(treeNode);

  console.log(szIP + " " + szInfo);
}

function changewin(num) {
  console.log('屏幕切换为:' + num + '*' + num);
  $("embed")[0].HWP_ArrangeWindow(num);
}

function getElementTop(element) {
  　　　　var actualButtom = element.offsetTop;
  　　　　var current = element.offsetParent;
  　　　　while (current !== null) {
    　　　　　　actualButtom += current.offsetTop;
    　　　　　　current = current.offsetParent;
    　　　　
  }
  　　　　return actualButtom;
  　　
}

function getElementLeft(element) {
  　　　　var actualLeft = element.offsetLeft;
  　　　　var current = element.offsetParent;
  　　　　while (current !== null) {
    　　　　　　actualLeft += current.offsetLeft;
    　　　　　　current = current.offsetParent;
    　　　　
  }
  　　　　return actualLeft;
  　　
}
