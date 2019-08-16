<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <style type="text/css">
      .folder > div:first-child:after {
        display: inline-block;
        vertical-align: top;
        content: '-';
        color: #1890ff;
        line-height: 20px;
        margin-left: 5px;
      }
      .folder.hide > div:first-child:after {
        content: '+';
      }
      .folder.hide > div:nth-child(n+2) {
        display: none;
      }
    </style>
  </head>
  <body>
    <center style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">API接口列表</center>
    <%
      for (let p = 0; p < _this.length; p++) {
        let project = _this[p].path.split('/').pop();
        let rules = _this[p].rules;
    %>
      <div class="folder" style="display: inline-block; vertical-align: top; margin: 10px; padding: 10px; border: 1px solid #eee;">
        <div style="font-size: 17px; font-weight: bold; margin-bottom: 10px; display: inline-block;">{{ project }}</div>
    <%
        for (let i = 0; i < rules.length; i++) {
          let item = rules[i];
          let dirName = item.name;
          let apis = item.apis;
      
    %>
      <div class="folder" style="margin-left: 50px;">
        <div style="font-size: 16px; font-weight: bold; display: inline-block;">{{ dirName }} </div>
    <%
      for (let j = 0; j < apis.length; j++) {
        let apiCfg = apis[j];
        let api = dirName + '/' + apiCfg.api;
        let meta = apiCfg.meta;
    %>
        <div style="border: 1px solid #eee; margin: 5px 0; padding: 5px 0;">
          <div style="margin-left: 20px; margin-right: 5px; line-height: 40px;">Path: <a href="{{ meta.path || api }}" target="_blank">{{ meta.path || api }}</a></div>
          <%
            if (meta.method) {
          %>
            <div style="margin-left: 20px; margin-right: 5px; font-size: 12px; line-height: 20px;">Method: {{ meta.method }}</div>
          <%
          }
          %>
          <%
            if (meta.params) {
          %>
            <div style="margin-left: 20px; margin-right: 5px; font-size: 12px; line-height: 20px;">Params: {{ meta.params }}</div>
          <%
          }
          %>
          <%
            if (meta.desc) {
          %>
            <div style="margin-left: 20px; margin-right: 5px; font-size: 12px; line-height: 20px;">Desc: {{ meta.desc }}</div>
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
