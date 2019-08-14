<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  </head>
  <body>
    <center>API接口列表</center>
    <%
      for (let i = 0; i < 10; i++) {
    %>
      <div><a href="{{ i }}" target="_blank">{{ i }}</a></div>
    <%
    }
    %>
  </body>
</html>
