var camera = function(zTree) {
  var that = {};
  var camera_list = new Array();
  var zTree = zTree;
  //新增节点
  that.add = function(treeNode, win_index) {
    if (!camera_list[treeNode.ip + ":" + treeNode.channel]) {
      that.updateCamera(treeNode, 1);
      return camera_list[treeNode.ip + ":" + treeNode.channel] = win_index;
    }
    return false;
  };
  //检测节点是否存在
  that.exist = function(treeNode) {
    return camera_list[treeNode.ip + ":" + treeNode.channel];
  };
  //删除节点
  that.del = function(treeNode) {
    that.updateCamera(treeNode, 0);
    delete camera_list[treeNode.ip + ":" + treeNode.channel];
  };
  //根据窗口索引删除
  that.delByIndex = function(win_index) {
    var treeNode;
    for (var node in camera_list) {
      if (camera_list[node] == win_index) {
        delete camera_list[node];
        nodeInfo = node.split(':');
        treeNode = zTree.getNodesByFilter(filter, true);
        that.updateCamera(treeNode, 0);
      }
    }
  };
  //更新树形控件
  that.updateCamera = function(treeNode, stauts) {
    if (treeNode.pId) {
      if (0 == stauts) {
        treeNode.icon = './images/Camera_1.png';
      } else {
        treeNode.icon = './images/Camera_2.png';
      }
      zTree.updateNode(treeNode);
    }
  };

  //过滤树形控件
  function filter(node) {
    if (nodeInfo)
      return (node.ip == nodeInfo[0] && node.channel == nodeInfo[1]);
    return false;
  }
  return that;
}
