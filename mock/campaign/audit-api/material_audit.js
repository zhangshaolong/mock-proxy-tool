<meta>
  @path /audit-api/material/audit
  @method post|get
  @type form
  @params { id: Number }
  @headers {auth: 'xxxx'}
  @desc 审核指定物料
</meta>

function (params) {
  return {
    code: 230,
    data: params,
    msg: 'success'
  }
}