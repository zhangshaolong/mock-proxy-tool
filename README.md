# mock-proxy-tool
接口模拟+接口代理工具

1. 下载node环境及npm
http://nodejs.cn/

2. cd mock-proxy-tool

3. npm install

4. npm start

5. 可以通过修改tools/config.js中的isHttps属性来mock https和http协议的请求

6. 可以通过修改tools/config.js中的port属性来启动不同端口的服务

7. 可以通过（npm start -- --port=xxxx --project=xxxx）参数方式并行启动多个不同端口的服务，或者只启动某个项目的服务