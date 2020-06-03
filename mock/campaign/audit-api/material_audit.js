<meta>
  @path /audit-api/material/audit
  @method post|get
  @type form
  @params {id:1,name:'test',type: 1}
  @params.id Number,必填,账号ID
  @params.name String,选填,用户名
  @params.type Long,选填,三个值(1:开放;2:封闭;3:内部)
  @headers {auth: 'xxxx'}
  @desc 审核指定物料
</meta>

function (params) {
  console.log('mock received', params)
  return {
    code: 230,
    data: params,
    msg: 'success'
  }
}