<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <style type="text/css">
      #result {
        position: fixed;
        top: 50%;
        left: 50%;
        padding: 15px;
        border: 1px solid #eee;
        background: #fff;
        box-shadow:4px 4px 10px #ddd;

      }
      .hide {
        display: none;
      }
      .folder > div:first-child:before {
        vertical-align: top;
        content: '-';
        color: #1890ff;
        line-height: 20px;
        margin-right: 5px;
      }
      .folder.closed > div:first-child:before {
        content: '+';
      }
      .folder.closed > div:nth-child(n+2) {
        display: none;
      }
      pre {
        font-family: Consolas, 'Courier New', Courier, FreeMono, monospace, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', Helvetica, Arial, sans-serif;
        text-align: left;
      }
      pre .json-string-value {
        color: #007777;
      }
      pre .json-number-value {
        color: #AA00AA;
        white-space: pre-line;
        word-wrap: break-word;
      }
      pre .json-array-tag {
        color: #0033FF;
        font-weight: bold;
      }
      pre .json-object-tag {
        color: #00AA00;
        font-weight: bold;
      }
      pre .json-object-key {
        color: #CC0000;
        font-weight: bold;
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
        <div style="font-size: 17px; font-weight: bold; margin-bottom: 10px; display: inline-block;">Project: {{ project }}</div>
    <%
        for (let i = 0; i < rules.length; i++) {
          let item = rules[i];
          let dirName = item.name;
          let apis = item.apis;
      
    %>
      <div class="folder" style="margin-left: 20px;">
        <div style="font-size: 16px; font-weight: bold; display: inline-block;">{{ dirName }} </div>
    <%
      for (let j = 0; j < apis.length; j++) {
        let apiCfg = apis[j];
        let api = dirName + '/' + apiCfg.api;
        let meta = apiCfg.meta;
    %>
        <div style="border: 1px solid #eee; margin: 5px 0;">
          <div style="margin-left: 20px; margin-right: 5px; font-size: 14px; line-height: 30px;"><button class="view" data-path="{{ meta.path || api }}">查看</button>: <a href="{{ meta.path || api }}" target="_blank">{{ meta.path || api }}</a></div>
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

    <pre id="result" class="hide"></pre>
  </body>
</html>
