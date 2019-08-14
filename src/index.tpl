<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  </head>
  <body>
    <center style="font-size: 18px; font-weight: bold; margin-bottom: 50px;">API接口列表</center>
    <%
      for (let i = 0; i < _this.length; i++) {
        let item = _this[i];
        let dirName = item.name;
        let apis = item.apis;
    %>
      <div style="margin-left: 50px;">
        <div style="font-size: 16px; font-weight: bold;">{{ dirName }} </div>
    <%
      for (let j = 0; j < apis.length; j++) {
        let api = dirName + '/' + apis[j];
    %>
        <div style="margin-left: 20px; line-height: 40px;"><a href="{{ api }}" target="_blank">{{ api }}</a></div>
    <%
      }
    %>
      </div>
    <%
    }
    %>
  </body>
</html>
