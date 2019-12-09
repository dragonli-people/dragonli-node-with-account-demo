step 1:
下载vmware虚拟机文件:
http://dragonli-vm.test.upcdn.net/dragonli-demo-user-account.zip

step 2:
解压dragonli-demo-user-account.zip，使用这两个文件，通过导入ovf文件的方式，在您的本地服务器上导入虚拟机（需要服务器安装了vmware相关软件，如vmware exsi）
登陆虚拟机 :
用户名: root
密码: dragonli
进入系统后，键入 "ip addr"命令，查看虚拟机被分配的ip地址和mac地址。
让负责内网管理的同学，将这个mac地址与这个ip绑定，以免它重启后发生变化。假设虚拟机的ip是${ip}
给这台虚拟机起个主机名（hostname），假设您命名为: ${your-host-name}

step 3:
在虚拟机中执行命令：
cd ~
sh setup.sh ${your-host-name} ${ip}
reboot
(注意，每次重启之后，都需要至少登陆一次)

step 4:
创建您的项目git仓库。假设您的仓库地址是${your-project-git-url}，您的项目名（即git clone下来的目录名）是${your-project-name}
现在，切回到您的开发电脑，比如您开发用的本本。此处以mac或linux系统为例（windows类似），{your development directory}代指您您准备长期存放该项目的目录：
cd ${your development directory}

git clone ${your-project-git-url}
git clone https://github.com/dragonli-people/dragonli-node-with-account-demo.git
rm -rf dragonli-node-with-account-demo/.git
cp -rf dragonli-node-with-account-demo/* ${your-project-name}/

cd ${your-project-name}
用文本编辑器打开项目目录中的 ./public-configs/service-config-dev.yml  , 将 "local-address: 192.168.7.189" 修改为 "local-address: ${ip}.
保存文件.
git add .
git commit -m "init project"
git push
rm -rf ../dragonli-node-with-account-demo

step 5:
用浏览器打开jenkins
http://${ip}:8080
并登陆：
username: admin
passwd: dragonli

http://${ip}:8080/configure
找到 Locale->Default Language项，将en_US 改为 : zh_CN
找到 Jenkins Location->Jenkins URL项，设为 : http://${ip}:8080/
创建jenkins对应私服帐户的id（此处如有不清楚之处，可搜索之，文章大把）
http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/configure
将Repository URL 修改为 ${your-project-git-url} , 点击保存
http://${ip}/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/ws/
点击"清理工作空间"，并在提示确认时点"是"
点击"立即构建"
http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/confirm-rename
在新名称处填入: 您想要的名字（大意为整套环境、各个工程所需的配置) , 点击"重命名"

http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-node-with-account-demo/configure
将Repository URL 修改为 ${your-project-git-url} ; 找到最后一个多行文本框（在 构建->执行 shell 下面）:
    1 将project=account-demo换成project=${your-project-name};
    2 找到 192.168.7.189:8888 改为 ${ip}:8888
    3 点击保存

http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-node-with-account-demo/ws/
点击"清理工作空间"，并在提示确认时点"是"
点击"立即构建"
可选操作：登陆vm服务器，执行:
cd /node-service/account-demo
sh stop.sh
cd ..
rm -rf /node-service/account-demo

http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-node-with-account-demo/confirm-rename
在新名称处填入: ${your-project-name} , 点击"重命名"

http://${ip}:8080/view/general-service/job/general-service-restart-all/configure
将最下面一个多行文本框中的 project=account-demo 改为 project=${your-project-name},保存（注意与上面的${project-name}保持一致
http://${ip}:8080/view/general-service/job/general-service-restart-all/
点击"立即构建"
（当您觉得整套环境因为意外原因而变得不稳定时，可以考虑执行一次这个任务，即全部重启)

step 6:
http://${ip}:3003
可以访问即为正常.

step 7:
how to dev and debug ?
首先，第一次调试前要运行 npm install 下载依赖
先假设您是使用成熟的IDE开发工具（如webstorm或类似产品），而非记事本编程。
请在您的IDE配置环境变量 ENV_SERVICE_CONFIG_URL 为 "http://${ip}:8888/service-config/dev"
然后您运行 app.js，或debug app.js，均可

step 8:
修改如何发布到虚拟机环境中 ?
在 "git push" 之后，到jenkins中重新构建任务即可.

比如:
http://${ip}:8080/view/dragonli-demo-simple-dev/job/${your-project-name}/
点击"立即构建"






