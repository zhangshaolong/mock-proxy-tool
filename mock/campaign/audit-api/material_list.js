<meta>
  @path /audit-api/material/list
  @method get
  @desc 获取物料列表
</meta>

{
  code: 200,
  sleep: 3000,
  data: {
    list: [
      {
        id: 1,
        "name": '新浪首页物料1',
        url: 'https://www.sina.com/xxxx.jpg'
      },
      {
        id: 2,
        name: '新浪首页物料2',
        url: 'https://www.sina.com/xxxx2.jpg'
      }
    ]
  },
  msg: 'ok'
}