step 1:
download vm file:
http://dragonli-vm.test.upcdn.net/dragonli-demo-user-asset.zip

step 2:
set up the vmware on your local server .
unzip,and create vm(virtual machine run on vmware) by ovf file: dragonli-demo-user-asset.ovf
login the vm :
username: root
passwd: dragonli

type "ip addr" and view the ip address.
from now on we will Using ${ip} to refer to IP of virtual machine,and ${your-host-name} refer to the hostname you want set to.

step 3:
cd ~
sh setup.sh ${ip} ${your-host-name}
reboot
(login when vm had started )

step 4:
now,use your dev machine , such as your Notebook computer
cd ${your development directory}
git clone https://github.com/dragonli-people/dragonli-node-with-account-demo.git
cd dragonli-node-with-account-demo

open project-configs/service-config-dev by a text-editor , modify "local-address: 192.168.7.189" to "local-address: ${ip}.
save the file.
open .git/config , modify "url = https://github.com/dragonli-people/dragonli-node-with-account-demo.git" to "url = git address of your project"
git add .
git commit -m "init project"
git push

You can change the directory name of the project if you want:
cd ..
mv dragonli-node-with-account-demo ${your-project-name}

step 5:
http://${ip}:8080
username: admin
passwd: dragonli

http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/configure
modify Repository URL to the git address of your project , and click save.
http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/
and execute build task manually

http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/configure
modify Repository URL to the git address of your project , and click save.
http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-demo-simple-config/
and execute build task manually

http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-node-with-account-demo/configure
modify Repository URL to the git address of your project , and click save.
http://${ip}:8080/view/dragonli-demo-simple-dev/job/dragonli-node-with-account-demo/
and execute build task manually

You can change the project-name of jenkins task if you want:
http://${ip}:8080/view/dragonli-demo-simple-dev/newJob
type your project-name in "project name" , type dragonli-demo-simple-dev in "duplicate by"
click ok.
and remove the project dragonli-demo-simple-dev.

step 6:
http://${ip}:3003
all be ok.

step 7:
how to dev and debug ?
I suppose you had used one of mature IDE, such as webstorm.
add the environment variable "ENV_SERVICE_CONFIG_URL" with value "http://${ip}:8888/service-config/dev" in IDE config.
now you can run or debug app.js at local.

step 8:
how to publish to vm ?
after your "git push".
http://${ip}:8080/view/dragonli-demo-simple-dev/job/${your-project}/
and execute build task manually






