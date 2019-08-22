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
        max-height: 500px;
        overflow: auto;
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
      .view {
        padding: 1px 10px;
        background: #3bc3ff;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
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
      a {
        color: #1890ff;
        background-color: transparent;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color 0.3s;
        -webkit-text-decoration-skip: objects;
      }
      a:focus {
        text-decoration: underline;
        -webkit-text-decoration-skip: ink;
        text-decoration-skip-ink: auto;
      }
      a:hover {
        color: #40a9ff;
      }
      a:active {
        color: #096dd9;
      }
      a:active,
      a:hover {
        outline: 0;
        text-decoration: none;
      }
      a[disabled] {
        color: rgba(0, 0, 0, 0.25);
        cursor: not-allowed;
        pointer-events: none;
      }
    </style>
    <script>
      let APIDATA = {{ JSON.stringify(_this) }}
    </script>
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
          let prefix = item.name;
          let apis = item.apis;
      
    %>
      <div class="folder" style="margin-left: 20px;">
        <div style="font-size: 16px; font-weight: bold; display: inline-block;">{{ prefix }} </div>
    <%
      for (let j = 0; j < apis.length; j++) {
        let meta = apis[j];
    %>
        <div style="border: 1px solid #eee; padding: 5px 10px;">
          <div style="font-size: 14px; line-height: 30px;"><span class="view" data-id="{{ project + prefix + meta.path}}">查看</span>: <a href="{{ meta.path }}" target="_blank">{{ meta.path }}</a></div>
          <div style="font-size: 12px; line-height: 20px;">Method:
            <%
              if (/get/i.test(meta.method)) {
            %>
              <label>get<input type="radio" name="{{ project + prefix + meta.path}}" value="get" checked></label>
            <%
            }
            %>
            <%
              if (/post/i.test(meta.method)) {
            %>
              <label>post<input type="radio" name="{{ project + prefix + meta.path}}" value="post" checked></label>
            <%
            }
            %>
          </div>
          <%
            if (meta.type) {
          %>
            <div style="font-size: 12px; line-height: 20px;">Type: {{ meta.type }}</div>
          <%
          }
          %>
          <%
            if (meta.params) {
          %>
            <div style="font-size: 12px; line-height: 20px;">Params:
              <textarea id="{{ project + prefix + meta.path }}-textarea" style="width: 100%; outline: none; resize: none; border-color: #ddd;">{{ meta.params }}</textarea>
            </div>
          <%
          }
          %>
          <%
            if (meta.headers) {
          %>
            <div style="font-size: 12px; line-height: 20px;">Headers:
              <textarea id="{{ project + prefix + meta.path }}-headers" style="width: 100%; outline: none; resize: none; border-color: #ddd;">{{ meta.headers }}</textarea>
            </div>
          <%
          }
          %>
          <%
            if (meta.desc) {
          %>
            <div style="font-size: 12px; line-height: 20px;">Desc: {{ meta.desc }}</div>
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
