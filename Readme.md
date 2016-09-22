### 视频监控预览demo

一个使用海康威视WebComponents.exe控件做开发的小例子，可以预览摄像头，云台，录像机等设备。
####主要使用技术与插件：
- 视频插件 webVideoCtrl.js（不支持chrome:( ）
- 服务环境 nodeJs+express
- 布局 bootstrap
- 树形控件 zTree

#### 主要功能：
- 监控节点信息动态从mysql数据库读取，可按照按照实际情况组织结构关系。默认有两级，一级是机构，二级是摄像头。
- 点击摄像头节点可实现预览与暂停的功能。
- 实现1\*1,2\*2,3\*3 分屏显示。


#### 配置&使用说明

- 导入data/school_camera.sql & 修改数据库配置  route/index.js line 14
- 修改摄像服务器登录信息配置 public/javascripts/list.js line 66
- npm intall & npm start
- 访问localhost:3000/list
- 开始预览~

#### ps

> demo有诸多不完善的地方，个人水平有限，希望能给刚接触的朋友提供一些帮助：）