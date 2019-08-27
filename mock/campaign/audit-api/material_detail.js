<meta>
  @path /audit-api/material/detail
  @method get|post
  @params { id: 1 }
  @params.id Number,必填,物料ID
  @type json
  @desc 审核指定物料
</meta>

function (params) {
  return {
    code: 200,
    sleep: 3000,
    data: {
      id: 1, // 物料ID
      name: '新浪首页物料1', // 物料名称
      url: 'https://www.sina.com/xxxx.jpg' // 物料地址
    },
    msg: 'success'
  }
}