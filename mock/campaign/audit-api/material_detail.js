<meta>
  @path /audit-api/material/detail
  @method get
  @params { id: Number }
  @desc 审核指定物料
</meta>

function (params) {
  return {
    code: 200,
    sleep: 3000,
    data: {
      id: 1,
      name: '新浪首页物料1',
      url: 'https://www.sina.com/xxxx.jpg'
    },
    msg: 'success'
  }
}