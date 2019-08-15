<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  </head>
  <body>
    <center style="font-size: 18px; font-weight: bold; margin-bottom: 50px;">API接口列表</center>
    <%
      for (let p = 0; p < _this.length; p++) {
        let project = _this[p].path.split('/').pop();
        let rules = _this[p].rules;
    %>
      <div style="display: inline-block; vertical-align: top; margin: 10px; padding: 10px; border: 1px solid #eee;">
        <div style="font-size: 17px; font-weight: bold; margin-bottom: 10px;">{{ project }}</div>
    <%
        for (let i = 0; i < rules.length; i++) {
          let item = rules[i];
          let dirName = item.name;
          let apis = item.apis;
      
    %>
      <div style="margin-left: 50px;">
        <div style="font-size: 16px; font-weight: bold;">{{ dirName }} </div>
    <%
      for (let j = 0; j < apis.length; j++) {
        let apiCfg = apis[j];
        let api = dirName + '/' + apiCfg.api;
        let meta = apiCfg.meta;
    %>
        <div style="border: 1px solid #eee; margin: 5px 0; padding: 5px 0;">
          <div style="margin-left: 20px; line-height: 40px;">Path: <a href="{{ api }}" target="_blank">{{ meta.path || api }}</a></div>
          <%
            if (meta.method) {
          %>
            <div style="margin-left: 20px; font-size: 12px; line-height: 20px;">Method: {{ meta.method }}</div>
          <%
          }
          %>
          <%
            if (meta.params) {
          %>
            <div style="margin-left: 20px; font-size: 12px; line-height: 20px;">Params: {{ meta.params }}</div>
          <%
          }
          %>
          <%
            if (meta.desc) {
          %>
            <div style="margin-left: 20px; font-size: 12px; line-height: 20px;">Desc: {{ meta.desc }}</div>
          <%
          }
          %>
        </div>
    <%
      }
    %>
      </div>
    <%
      }
    %>
      </div>
    <%
    }
    %>
  </body>
</html>
